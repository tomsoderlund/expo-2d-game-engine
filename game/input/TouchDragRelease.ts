import Expo2DContext from 'expo-2d-context'

import { GameObjectPosition, GameUpdate, TouchPosition } from '../GameObject'

export default class TouchDragRelease extends GameObjectPosition {
  isPressed: boolean
  startPosition: [number, number]

  constructor (ctx: Expo2DContext) {
    super(ctx)
    this.isPressed = false
    this.startPosition = [0, 0]
  }

  draw (update: GameUpdate): void {
    if (this.isPressed) {
      this.ctx.strokeStyle = 'tomato'
      this.ctx.lineWidth = 15
      this.ctx.beginPath()
      this.ctx.moveTo(this.startPosition[0], this.startPosition[1])
      this.ctx.lineTo(this.position[0], this.position[1])
      this.ctx.stroke()
    }
  }

  handleTouchPress (position: TouchPosition): void {
    this.isPressed = true
    this.startPosition = position
    this.position = position
  }

  handleTouchRelease (position: TouchPosition): void {
    this.isPressed = false
    this.position = position
  }

  handleTouchMove (position: TouchPosition): void {
    this.position = position
  }
}
