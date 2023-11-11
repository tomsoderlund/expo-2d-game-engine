import React, { useRef, useCallback, useEffect } from 'react'
import { GestureResponderEvent, PixelRatio } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

import GameObject from '../game/GameObject'
import GridLines from '../game/GridLines'
import Ball from '../game/Ball'

const GameCanvas = (): React.ReactElement => {
  const ctxRef = useRef<Expo2DContext | null>(null)
  const pixelRatio = PixelRatio.get()
  const gameObjects: GameObject[] = []

  // Inspired by @sergeymorkovkin: https://github.com/expo/expo/issues/11267#issuecomment-873630818
  const frameTimer = useRef<number>(0)
  const frameCounter = useRef<number>(0)
  const frameHandle = useRef<number | null>()

  const processNextFrame = useCallback((time: number) => {
    if (ctxRef.current !== null) {
      update(time)
      draw(frameCounter.current)
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
    // console.log('handleTouchPress', Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY))
    gameObjects.forEach((gameObject) => { gameObject.handleTouchPress(event) })
  }

  const handleTouchRelease = (event: GestureResponderEvent): void => {
    // console.log('handleTouchRelease', Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY))
    gameObjects.forEach((gameObject) => { gameObject.handleTouchRelease(event) })
  }

  const handleTouchMove = (event: GestureResponderEvent): void => {
    // console.log('handleTouchMove', Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY))
    gameObjects.forEach((gameObject) => { gameObject.handleTouchMove(event) })
  }

  const resetTransforms = (): void => {
    ctxRef.current?.setTransform(1, 0, 0, 1, 0, 0)
  }

  const handleSetupGLView = useCallback((gl: WebGLRenderingContext) => {
    const ctx = new Expo2DContext(gl as unknown as number, undefined as unknown as Expo2dContextOptions)
    ctxRef.current = ctx
    console.log('Canvas size:', ctx.width, '*', ctx.height, { pixelRatio })
    void setup(ctx)
  }, [])

  const setup = async (ctx: Expo2DContext): Promise<void> => {
    // ctx.translate(100, -100)
    // const scale = 3
    // ctx.scale(scale, scale)
    gameObjects.push(new GridLines(ctx))
    gameObjects.push(new Ball(ctx))
    await Promise.all(gameObjects.map(async gameObject => await gameObject.setup()))
  }

  const update = (time: number): void => {
    frameCounter.current += 1
    frameTimer.current = time
    gameObjects.forEach((gameObject) => gameObject.update(time))
  }

  const draw = (frameNr: number): void => {
    // console.log('pX:', pX, frameTimer.current);
    const ctx = ctxRef.current as Expo2DContext
    // Init
    resetTransforms()
    ctx.clearRect(0, 0, ctx.width, ctx.height)
    gameObjects.forEach((gameObject) => {
      ctx.save()
      gameObject.draw(frameNr)
      ctx.restore()
    })
    // Send drawing commands to GPU for rendering
    ctx.flush()
  }

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={handleSetupGLView}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTouchPress}
      onResponderRelease={handleTouchRelease}
      onResponderMove={handleTouchMove}
    />
  )
}

export default GameCanvas
