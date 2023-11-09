import React, { useRef, useCallback } from 'react'
import { GestureResponderEvent } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

const App = (): React.ReactElement => {
  const ctxRef = useRef<Expo2DContext | null>(null)

  const handleTouchPress = (e: GestureResponderEvent): void => {
    console.log('handleTouchPress', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  const handleTouchRelease = (e: GestureResponderEvent): void => {
    console.log('handleTouchRelease', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  const handleTouchMove = (e: GestureResponderEvent): void => {
    console.log('handleTouchMove', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  const handleSetup = useCallback((gl: WebGLRenderingContext) => {
    const ctx = new Expo2DContext(gl as unknown as number, undefined as unknown as Expo2dContextOptions)
    ctxRef.current = ctx
    draw(ctx)
  }, [])

  const draw = (ctx: Expo2DContext): void => {
    ctx.translate(50, 200)
    ctx.scale(4, 4)
    // Head
    ctx.fillStyle = 'grey'
    ctx.fillRect(20, 40, 100, 100)
    // Teeth
    ctx.fillStyle = 'white'
    ctx.fillRect(30, 100, 20, 30)
    ctx.fillRect(60, 100, 20, 30)
    ctx.fillRect(90, 100, 20, 30)
    // Eyes
    ctx.beginPath()
    ctx.arc(50, 70, 18, 0, 2 * Math.PI)
    ctx.arc(90, 70, 18, 0, 2 * Math.PI)
    ctx.fill()
    // Eye pupils
    ctx.fillStyle = 'dodgerblue'
    ctx.beginPath()
    ctx.arc(50, 70, 8, 0, 2 * Math.PI)
    ctx.arc(90, 70, 8, 0, 2 * Math.PI)
    ctx.fill()
    // Antenna
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(70, 40)
    ctx.lineTo(70, 30)
    ctx.arc(70, 20, 10, 0.5 * Math.PI, 2.5 * Math.PI)
    ctx.stroke()

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

export default App
