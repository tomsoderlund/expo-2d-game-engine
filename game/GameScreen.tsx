import React, { useEffect, useCallback, useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import { Image, useImage } from '@shopify/react-native-skia'
import { SharedValue, useSharedValue, withDecay } from 'react-native-reanimated'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'

import { areCircleAndRectangleColliding } from '../lib/math'
import useSound from '../hooks/useSound'
import GameCanvas from '../components/GameCanvas'
import Paddle, { paddleWidth, paddleHeight } from './Paddle'
import Ball, { ballSize } from './Ball'

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

  const playBounceSound = useSound(require('../assets/sounds/bounce.mp3')) // eslint-disable-line @typescript-eslint/no-var-requires
  const playBounceSound2 = useSound(require('../assets/sounds/bounce2.mp3')) // eslint-disable-line @typescript-eslint/no-var-requires

  // Shared values for ball position and velocity
  const ballPositionX = useSharedValue(windowDimensions.width / 2)
  const ballPositionY = useSharedValue(windowDimensions.height / 2)
  const ballVelocityX = useSharedValue(-3)
  const ballVelocityY = useSharedValue(5)

  // Inspired by @sergeymorkovkin: https://github.com/expo/expo/issues/11267#issuecomment-873630818
  const frameHandle = useRef<number | null>()
  const frameCounter = useRef<number>(0)
  const frameTimer = useRef<number>(0) // Nr of seconds since January 1, 1970

  const gameLoop = useCallback((time: number) => {
    frameCounter.current += 1
    frameTimer.current = time
    console.log('frame #', frameCounter.current, 'time:', frameTimer.current)

    // Update ball position
    ballPositionX.value += ballVelocityX.value
    ballPositionY.value += ballVelocityY.value

    // Detect collision with walls
    const didCollideSides = bounceWalls(ballPositionX, ballVelocityX, 0, windowDimensions.width - ballSize)
    const didCollideCeiling = bounceWalls(ballPositionY, ballVelocityY, 0, windowDimensions.height - ballSize)

    // Detect collision with paddle
    const didCollidePaddle = areCircleAndRectangleColliding(
      ballPositionX.value + ballSize / 2,
      ballPositionY.value + ballSize / 2,
      ballSize / 2,
      paddleX.value,
      paddleY.value,
      paddleWidth,
      paddleHeight
    )

    if (didCollidePaddle) {
      ballPositionY.value = paddleY.value - ballSize - 5
      ballVelocityY.value = -ballVelocityY.value // Reverse vertical velocity
    }

    // Play sounds for collisions
    if (didCollideSides || didCollideCeiling) {
      void playBounceSound()
    }
    if (didCollidePaddle) {
      void playBounceSound2()
    }

    // Request the next animation frame
    frameHandle.current = requestAnimationFrame(gameLoop)
  }, [windowDimensions.width, windowDimensions.height])

  useEffect(() => {
    frameHandle.current = requestAnimationFrame(gameLoop)
    // Cleanup function to cancel the animation frame
    return () => {
      if (frameHandle.current !== undefined && frameHandle.current !== null) {
        cancelAnimationFrame(frameHandle.current)
      }
    }
  }, [gameLoop])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <GameCanvas backgroundColor='#fcfcfc'>
          <LogoBitmapImage />
          <Ball x={ballPositionX} y={ballPositionY} />
          <Paddle x={paddleX} y={paddleY} />
        </GameCanvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default GameScreen

function bounceWalls (position: SharedValue<number>, velocity: SharedValue<number>, minValue: number, maxValue: number, bounceMargin: number = 5): boolean {
  // Left side or ceiling
  if (position.value <= minValue) {
    position.value = minValue + bounceMargin
    velocity.value = -velocity.value
    return true
  }
  // Right side or floor
  if (position.value >= maxValue) {
    position.value = maxValue - bounceMargin
    velocity.value = -velocity.value
    return true
  }
  return false
}

const LogoBitmapImage: React.FC = () => {
  const windowDimensions = useWindowDimensions()
  const logoBitmapImage = useImage(require('../assets/game/tomorroworld_logo.png')) // eslint-disable-line @typescript-eslint/no-var-requires
  return (
    <Image
      image={logoBitmapImage}
      width={50}
      height={50}
      x={windowDimensions.width - 50 - 25}
      y={25}
      fit='contain'
    />
  )
}
