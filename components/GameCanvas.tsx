import React, { useRef, useCallback, useEffect } from 'react'
import { GestureResponderEvent, PixelRatio } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

import GameObject, { GameUpdate, TouchPosition } from '../game/GameObject'
import GridLines from '../game/GridLines'
import Ball from '../game/Ball'
import TouchDragRelease from '../game/input/TouchDragRelease'

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
      frameCounter.current += 1
      const gameUpdate: GameUpdate = {
        frameNumber: frameCounter.current,
        deltaTime: time - frameTimer.current
      }
      frameTimer.current = time
      update(gameUpdate)
      draw(gameUpdate)
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
    gameObjects.forEach((gameObject) => { gameObject.handleTouchPress(touchPosition) })
  }

  const handleTouchRelease = (event: GestureResponderEvent): void => {
    const touchPosition: TouchPosition = [Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY)]
    // console.log('handleTouchRelease', touchPosition)
    gameObjects.forEach((gameObject) => { gameObject.handleTouchRelease(touchPosition) })
  }

  const handleTouchMove = (event: GestureResponderEvent): void => {
    const touchPosition: TouchPosition = [Math.round(pixelRatio * event.nativeEvent.locationX), Math.round(pixelRatio * event.nativeEvent.locationY)]
    // console.log('handleTouchMove', touchPosition)
    gameObjects.forEach((gameObject) => { gameObject.handleTouchMove(touchPosition) })
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
    gameObjects.push(new TouchDragRelease(ctx))
    await Promise.all(gameObjects.map(async gameObject => await gameObject.setup()))
  }

  const update = (update: GameUpdate): void => {
    gameObjects.forEach((gameObject) => gameObject.update(update))
  }

  const draw = (update: GameUpdate): void => {
    // console.log('pX:', pX, frameTimer.current);
    const ctx = ctxRef.current as Expo2DContext
    // Init
    resetTransforms()
    ctx.clearRect(0, 0, ctx.width, ctx.height)
    gameObjects.forEach((gameObject) => {
      ctx.save()
      gameObject.draw(update)
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
