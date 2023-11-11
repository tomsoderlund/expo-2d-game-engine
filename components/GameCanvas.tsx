import React, { useRef, useCallback, useEffect } from 'react'
import { GestureResponderEvent, PixelRatio } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

import { GameUpdate, TouchPosition } from '../game/GameObject'
import GameWorld from '../game/GameWorld'

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
