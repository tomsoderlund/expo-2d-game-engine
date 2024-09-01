import React, { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { Canvas, Circle, Group, useCanvasRef, Fill, Image, useImage } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import {
  useSharedValue, withDecay, useDerivedValue,
  withRepeat, withTiming
} from 'react-native-reanimated'

import ScaledSVG from '../components/ScaledSVG'

const logoImageRequire = require('../assets/game/tomorroworld_logo.png') // eslint-disable-line @typescript-eslint/no-var-requires

const GameCanvas: React.FC = (): React.ReactElement => {
  const ref = useCanvasRef()
  const size = 256
  const r = useSharedValue(0)
  const c = useDerivedValue(() => size - r.value)
  useEffect(() => {
    r.value = withRepeat(withTiming(size * 0.33, { duration: 1000 }), -1)
  }, [r, size])

  const windowDimensions = useWindowDimensions()
  const leftBoundary = 0
  const rightBoundary = windowDimensions.width
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

  const smallSize = 50

  const logoBitmapImage = useImage(logoImageRequire)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1 }} ref={ref}>
          <Fill color='white' />
          <Circle cx={translateX} cy={40} r={20} color='#3E3E' />
          <Group blendMode='multiply'>
            <Circle cx={r} cy={r} r={r} color='cyan' />
            <Circle cx={c} cy={r} r={r} color='magenta' />
            <Circle
              cx={windowDimensions.width - size}
              cy={c}
              r={r}
              color='yellow'
            />
          </Group>
          <Circle cx={smallSize} cy={windowDimensions.height - smallSize} r={smallSize} color='lime' />
          <Circle cx={windowDimensions.width - smallSize} cy={windowDimensions.height - smallSize} r={smallSize} color='lime' />
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
