// See https://github.com/expo/expo/issues/11267#issuecomment-873630818 for inspiration

import React, { useRef, useCallback, useEffect } from 'react'
import { GestureResponderEvent, PixelRatio } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

const GameCanvas = (): React.ReactElement => {
  const ctxRef = useRef<Expo2DContext | null>(null)
  const pixelRatio = PixelRatio.get()

  const frameTimer = useRef<number>(0)
  const frameValue = useRef<number>(0)
  const frameHandle = useRef<number | null>()
  const frameTicker = useCallback((time: number) => {
    if (ctxRef.current !== null) {
      update(time)
      draw()
    }
    frameHandle.current = requestAnimationFrame(frameTicker)
  }, [])

  // const handleToggleAnimation =
  useEffect(() => {
    frameHandle.current = requestAnimationFrame(frameTicker)
    // setAnimating(!animating)
    // if (!animating) {
    //   frameHandle.current = requestAnimationFrame(frameTicker)
    // } else {
    //   cancelAnimationFrame(frameHandle.current as number)
    //   frameHandle.current = null
    // }
  }, [])

  const handleTouchPress = (e: GestureResponderEvent): void => {
    console.log('handleTouchPress', Math.round(pixelRatio * e.nativeEvent.locationX), Math.round(pixelRatio * e.nativeEvent.locationY))
  }

  const handleTouchRelease = (e: GestureResponderEvent): void => {
    console.log('handleTouchRelease', Math.round(pixelRatio * e.nativeEvent.locationX), Math.round(pixelRatio * e.nativeEvent.locationY))
  }

  const handleTouchMove = (e: GestureResponderEvent): void => {
    console.log('handleTouchMove', Math.round(pixelRatio * e.nativeEvent.locationX), Math.round(pixelRatio * e.nativeEvent.locationY))
    const posX = pixelRatio * e.nativeEvent.locationX
    const ctx = ctxRef.current as Expo2DContext
    // frameValue.current = posX / ctx.width * 100
    const scale = posX / ctx.width * 4
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
    ctx.scale(scale, scale)
  }

  const handleSetup = useCallback((gl: WebGLRenderingContext) => {
    const ctx = new Expo2DContext(gl as unknown as number, undefined as unknown as Expo2dContextOptions)
    ctxRef.current = ctx
    ctx.translate(50, 200)
    const scale = 3
    ctx.scale(scale, scale)
  }, [])

  const update = (time: number): void => {
    frameValue.current += 1
    frameTimer.current = time
  }

  const draw = (): void => {
    const pX = frameValue.current * 1
    const pY = frameValue.current * 1
    // console.log('pX:', pX, frameTimer.current);
    const ctx = ctxRef.current as Expo2DContext
    // Init
    ctx.save()
    ctx.clearRect(0, 0, ctx.width, ctx.height)
    // Head
    ctx.fillStyle = 'grey'
    ctx.fillRect(pX + 20, pY + 40, 100, 100)
    // Teeth
    ctx.fillStyle = 'white'
    ctx.fillRect(pX + 30, pY + 100, 20, 30)
    ctx.fillRect(pX + 60, pY + 100, 20, 30)
    ctx.fillRect(pX + 90, pY + 100, 20, 30)
    // Eyes
    ctx.beginPath()
    ctx.arc(pX + 50, pY + 70, 18, 0, 2 * Math.PI)
    ctx.arc(pX + 90, pY + 70, 18, 0, 2 * Math.PI)
    ctx.fill()
    // Eye pupils
    ctx.fillStyle = 'dodgerblue'
    ctx.beginPath()
    ctx.arc(pX + 50, pY + 70, 8, 0, 2 * Math.PI)
    ctx.arc(pX + 90, pY + 70, 8, 0, 2 * Math.PI)
    ctx.fill()
    // Antenna
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(pX + 70, pY + 40)
    ctx.lineTo(pX + 70, pY + 30)
    ctx.arc(pX + 70, pY + 20, 10, 0.5 * Math.PI, 2.5 * Math.PI)
    ctx.stroke()
    // Send drawing commands to GPU for rendering
    ctx.restore()
    ctx.flush()
  }

  return (
    <GLView
      style={{ flex: 1 }}
      onContextCreate={handleSetup}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTouchPress}
      onResponderRelease={handleTouchRelease}
      onResponderMove={handleTouchMove}
    />
  )
}

export default GameCanvas
