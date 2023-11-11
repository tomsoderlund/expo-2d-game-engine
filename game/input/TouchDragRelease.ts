import GameObject, { GameObjectPosition, GameUpdate, TouchPosition } from '../GameObject'
import { Vector2D, getDistance, subtractVector } from '../../lib/math'

export default class TouchDragRelease extends GameObjectPosition {
  isPressed: boolean
  startPosition: Vector2D

  constructor (parent: GameObject) {
    super(parent)
    this.isPressed = false
    this.startPosition = [0, 0]
  }

  // draw (update: GameUpdate): void {
  //   if (this.isPressed) {
  //     this.ctx.strokeStyle = 'tomato'
  //     this.ctx.lineWidth = 15
  //     this.ctx.beginPath()
  //     this.ctx.moveTo(this.startPosition[0], this.startPosition[1])
  //     this.ctx.lineTo(this.position[0], this.position[1])
  //     this.ctx.stroke()
  //   }
  // }

  handleTouchPress (position: TouchPosition): void {
    this.isPressed = true
    this.startPosition = position
    this.position = position
  }

  handleTouchRelease (position: TouchPosition): void {
    this.isPressed = false
    this.position = position
    this.broadcastEvent({
      type: 'TouchDragRelease',
      payload: {
        vector: subtractVector(this.startPosition, this.position),
        power: getDistance(this.position, this.startPosition)
      }
    })
  }

  handleTouchMove (position: TouchPosition): void {
    this.position = position
    this.broadcastEvent({
      type: 'TouchDragMove',
      payload: {
        vector: subtractVector(this.position, this.startPosition)
      }
    })
  }
}
