import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { Image, useImage } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useSharedValue, withDecay } from 'react-native-reanimated'

import GameCanvas from '../components/GameCanvas'
import Paddle, { paddleWidth } from './Paddle'
import Ball from './Ball'

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
  const ballX = useSharedValue(windowDimensions.width / 2)
  const ballY = useSharedValue(windowDimensions.height / 2)
  const velocityX = useSharedValue(0)
  const velocityY = useSharedValue(5)

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Update ball position
      ballX.value += velocityX.value
      ballY.value += velocityY.value

      // Detect collision with walls
      if (ballX.value <= 0 || ballX.value >= windowDimensions.width - 20) {
        velocityX.value = -velocityX.value
      }
      if (ballY.value <= 0 || ballY.value >= windowDimensions.height - 20) {
        velocityY.value = -velocityY.value
      }

      // Detect collision with paddle
      if (
        ballY.value + 20 >= paddleY.value && // Ball is at the paddle's vertical position
        ballX.value + 20 >= paddleX.value && // Ball is within the paddle's horizontal bounds
        ballX.value <= paddleX.value + 100
      ) {
        velocityY.value = -velocityY.value // Reverse vertical velocity
      }
    }, 16) // Approx. 60 FPS

    return () => clearInterval(gameLoop)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <GameCanvas>
          <LogoBitmapImage />
          <Ball x={ballX} y={ballY} />
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
