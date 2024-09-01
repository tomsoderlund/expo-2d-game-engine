import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { Image, useImage } from '@shopify/react-native-skia'
import { SharedValue, useSharedValue, withDecay } from 'react-native-reanimated'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'

import { areCircleAndRectangleColliding } from '../lib/math'
import GameCanvas from '../components/GameCanvas'
import Paddle, { paddleWidth, paddleHeight } from './Paddle'
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

  useEffect(() => {
    const gameLoop = setInterval(() => {
      // Update ball position
      ballPositionX.value += ballVelocityX.value
      ballPositionY.value += ballVelocityY.value

      // Detect collision with walls
      bounceWalls(ballPositionX, ballVelocityX, 0, windowDimensions.width - ballSize)
      // Detect collision with ceiling or floor
      bounceWalls(ballPositionY, ballVelocityY, 0, windowDimensions.height - ballSize)

      // Detect collision with paddle
      if (areCircleAndRectangleColliding(
        ballPositionX.value + ballSize / 2,
        ballPositionY.value + ballSize / 2,
        ballSize / 2,
        paddleX.value + paddleWidth / 2,
        paddleY.value + paddleHeight / 2,
        paddleWidth,
        paddleHeight
      )) {
        ballPositionY.value = paddleY.value - ballSize - 5
        ballVelocityY.value = -ballVelocityY.value // Reverse vertical velocity
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

function bounceWalls (position: SharedValue<number>, velocity: SharedValue<number>, minValue: number, maxValue: number, bounceMargin: number = 5): void {
  // Left side or ceiling
  if (position.value <= minValue) {
    position.value = minValue + bounceMargin
    velocity.value = -velocity.value
  }
  // Right side or floor
  if (position.value >= maxValue) {
    position.value = maxValue - bounceMargin
    velocity.value = -velocity.value
  }
}

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
