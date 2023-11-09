import React from 'react'
import { GestureResponderEvent } from 'react-native'
import { GLView } from 'expo-gl'
import Expo2DContext, { Expo2dContextOptions } from 'expo-2d-context'

export default class App extends React.Component {
  ctx?: Expo2DContext

  constructor (props: any) {
    super(props)
    this.ctx = undefined
  }

  render (): React.ReactElement {
    return (
      <GLView
        style={{ flex: 1 }}
        onContextCreate={this.handleSetup}
        onStartShouldSetResponder={() => true}
        onResponderGrant={this.handleTouchPress}
        onResponderRelease={this.handleTouchRelease}
        onResponderMove={this.handleTouchMove}
      />
    )
  }

  handleTouchPress = (e: GestureResponderEvent): void => {
    console.log('handleTouchPress', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  handleTouchRelease = (e: GestureResponderEvent): void => {
    console.log('handleTouchRelease', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  handleTouchMove = (e: GestureResponderEvent): void => {
    console.log('handleTouchMove', e.nativeEvent.locationX, e.nativeEvent.locationY)
  }

  handleSetup = (gl: WebGLRenderingContext): void => {
    this.ctx = new Expo2DContext(gl as unknown as number, undefined as unknown as Expo2dContextOptions)
    this.draw()
  }

  draw = (): void => {
    if (this.ctx === undefined) return
    this.ctx.translate(50, 200)
    this.ctx.scale(4, 4)
    // Head
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(20, 40, 100, 100)
    // Teeth
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(30, 100, 20, 30)
    this.ctx.fillRect(60, 100, 20, 30)
    this.ctx.fillRect(90, 100, 20, 30)
    // Eyes
    this.ctx.beginPath()
    this.ctx.arc(50, 70, 18, 0, 2 * Math.PI)
    this.ctx.arc(90, 70, 18, 0, 2 * Math.PI)
    this.ctx.fill()
    // Eye pupils
    this.ctx.fillStyle = 'dodgerblue'
    this.ctx.beginPath()
    this.ctx.arc(50, 70, 8, 0, 2 * Math.PI)
    this.ctx.arc(90, 70, 8, 0, 2 * Math.PI)
    this.ctx.fill()
    // Antenna
    this.ctx.strokeStyle = 'black'
    this.ctx.beginPath()
    this.ctx.moveTo(70, 40)
    this.ctx.lineTo(70, 30)
    this.ctx.arc(70, 20, 10, 0.5 * Math.PI, 2.5 * Math.PI)
    this.ctx.stroke()
    this.ctx.flush()
  }
}
