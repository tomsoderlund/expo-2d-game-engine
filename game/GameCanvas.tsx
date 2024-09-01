import React from 'react'
import { useWindowDimensions } from 'react-native'
import { Canvas, useCanvasRef, Fill, Image, useImage } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import {
  useSharedValue, withDecay
} from 'react-native-reanimated'

import ScaledSVG from '../components/ScaledSVG'
import Paddle, { paddleWidth } from './Paddle'

const logoImageRequire = require('../assets/game/tomorroworld_logo.png') // eslint-disable-line @typescript-eslint/no-var-requires

const GameCanvas: React.FC = (): React.ReactElement => {
  const ref = useCanvasRef()
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

  const logoBitmapImage = useImage(logoImageRequire)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1 }} ref={ref}>
          <Fill color='white' />
          <Paddle x={translateX} />
          <ScaledSVG imageRequire={require('../assets/game/svg_guy.svg')} x={windowDimensions.width / 2} y={windowDimensions.height / 2} width={100} height={100} />
          <Image
            image={logoBitmapImage}
            x={windowDimensions.width - 40 - 10}
            y={10}
            width={40}
            height={40}
            fit='contain'
          />
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default GameCanvas
