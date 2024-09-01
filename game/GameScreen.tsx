import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { Image, useImage } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useSharedValue, withDecay } from 'react-native-reanimated'

import GameCanvas from '../components/GameCanvas'
import Paddle, { paddleWidth } from './Paddle'
import Ball, { ballSize } from './Ball'

const logoImageRequire = require('../assets/game/tomorroworld_logo.png') // eslint-disable-line @typescript-eslint/no-var-requires

const GameScreen: React.FC = (): React.ReactElement => {
  const windowDimensions = useWindowDimensions()

  const leftBoundary = 0
  const rightBoundary = windowDimensions.width - paddleWidth
  // Shared values for paddle position
  const paddleX = useSharedValue(windowDimensions.width / 2 - 50)
  const paddleY = useSharedValue(windowDimensions.height - 120)

  const gesture = Gesture.Pan()
    .onChange((e) => {
      paddleX.value += e.changeX
    })
    .onEnd((e) => {
      paddleX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary]
      })
    })

  // Shared values for ball position and velocity
  const ballPositionX = useSharedValue(windowDimensions.width / 2)
  const ballPositionY = useSharedValue(windowDimensions.height / 2)
  const ballVelocityX = useSharedValue(-3)
  const ballVelocityY = useSharedValue(5)

  const bounceMargin = 5

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Update ball position
      ballPositionX.value += ballVelocityX.value
      ballPositionY.value += ballVelocityY.value

      // Detect collision with walls
      if (ballPositionX.value <= 0) {
        ballVelocityX.value = -ballVelocityX.value
        ballPositionX.value = bounceMargin
      }
      if (ballPositionX.value >= windowDimensions.width - ballSize) {
        ballVelocityX.value = -ballVelocityX.value
        ballPositionX.value = windowDimensions.width - ballSize - bounceMargin
      }
      // Detect collision with ceiling or floor
      if (ballPositionY.value <= 0) {
        ballVelocityY.value = -ballVelocityY.value
        ballPositionY.value = bounceMargin
      }
      if (ballPositionY.value >= windowDimensions.height - ballSize) {
        ballVelocityY.value = -ballVelocityY.value
        ballPositionY.value = windowDimensions.height - ballSize - bounceMargin
      }

      // Detect collision with paddle
      if (
        ballPositionY.value + 20 >= paddleY.value && // Ball is at the paddle's vertical position
        ballPositionX.value + 20 >= paddleX.value && // Ball is within the paddle's horizontal bounds
        ballPositionX.value <= paddleX.value + 100
      ) {
        ballVelocityY.value = -ballVelocityY.value // Reverse vertical velocity
        ballPositionY.value = paddleY.value - ballSize
      }
    }, 16) // Approx. 60 FPS

    return () => clearInterval(gameLoop)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <GameCanvas>
          <LogoBitmapImage />
          <Ball x={ballPositionX} y={ballPositionY} />
          <Paddle x={paddleX} y={paddleY} />
        </GameCanvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default GameScreen

const LogoBitmapImage: React.FC = () => {
  const windowDimensions = useWindowDimensions()
  const logoBitmapImage = useImage(logoImageRequire)
  return (
    <Image
      image={logoBitmapImage}
      x={windowDimensions.width - 40 - 10}
      y={10}
      width={40}
      height={40}
      fit='contain'
    />
  )
}
