import React, { useRef, useCallback, useEffect } from 'react'
import { GestureResponderEvent, PixelRatio, useWindowDimensions } from 'react-native'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'
import { Canvas, Circle, Group, useCanvasRef, Fill } from '@shopify/react-native-skia'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import {
  useSharedValue, withDecay, useDerivedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'

import { GameUpdate, TouchPosition } from '../game/GameObject'
import GameWorld from '../game/GameWorld'
import ScaledSVG from './ScaledSVG'

const GameCanvas = (): React.ReactElement => {
  const ctxRef = useRef<Expo2DContext | null>(null)
  const pixelRatio = PixelRatio.get()
  let gameWorld: GameWorld | null = null

  // Inspired by @sergeymorkovkin: https://github.com/expo/expo/issues/11267#issuecomment-873630818
  const frameTimer = useRef<number>(0)
  const frameCounter = useRef<number>(0)
  const frameHandle = useRef<number | null>()

  const processNextFrame = useCallback((time: number) => {
    if (ctxRef.current !== null) {
      frameCounter.current += 1
      const gameUpdate: GameUpdate = {
        frameNumber: frameCounter.current,
        deltaTime: time - frameTimer.current
      }
      frameTimer.current = time
      gameWorld?.update(gameUpdate)
      gameWorld?.draw(gameUpdate)
    }
    frameHandle.current = requestAnimationFrame(processNextFrame)
  }, [])

  useEffect(() => {
    frameHandle.current = requestAnimationFrame(processNextFrame)
    // Cleanup function to cancel the animation frame
    return () => {
      if (frameHandle.current !== undefined && frameHandle.current !== null) {
        cancelAnimationFrame(frameHandle.current)
      }
    }
  }, [])

  const handleTouchPress = (event: GestureResponderEvent): void => {
    const touchPosition: TouchPosition = [Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY)]
    // console.log('handleTouchPress', touchPosition)
    gameWorld?.handleTouchPress(touchPosition)
  }

  const handleTouchRelease = (event: GestureResponderEvent): void => {
    const touchPosition: TouchPosition = [Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY)]
    // console.log('handleTouchRelease', touchPosition)
    gameWorld?.handleTouchRelease(touchPosition)
  }

  const handleTouchMove = (event: GestureResponderEvent): void => {
    const touchPosition: TouchPosition = [Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY)]
    // console.log('handleTouchMove', touchPosition)
    gameWorld?.handleTouchMove(touchPosition)
  }

  const handleSetupGLView = useCallback((gl: WebGLRenderingContext) => {
    const ctx = new Expo2DContext(gl as unknown as number, undefined as unknown as Expo2dContextOptions)
    ctxRef.current = ctx
    console.log('Canvas size:', ctx.width, '*', ctx.height, { pixelRatio })
    gameWorld = new GameWorld(ctx)
    void gameWorld?.setup()
  }, [])

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

  console.log('windowDimensions:', windowDimensions)

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
        </Canvas>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

export default GameCanvas
