import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Image, useImage } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import {
  useSharedValue, withDecay
} from 'react-native-reanimated'

import GameCanvas from '../components/GameCanvas'
import Paddle, { paddleWidth } from './Paddle'
import Ball from './Ball'

const logoImageRequire = require('../assets/game/tomorroworld_logo.png') // eslint-disable-line @typescript-eslint/no-var-requires

const GameScreen: React.FC = (): React.ReactElement => {
  const windowDimensions = useWindowDimensions()

  const leftBoundary = 0
  const rightBoundary = windowDimensions.width - paddleWidth
  const translateX = useSharedValue(windowDimensions.width / 2)

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary]
      })
    })

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <GameCanvas>
          <Paddle x={translateX} />
          <Ball x={translateX} />
          <LogoBitmapImage />
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
