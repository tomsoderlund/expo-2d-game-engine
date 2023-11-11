import { GameObjectPosition } from './GameObject'
import { MARGIN } from './GridLines'

const BALL_RADIUS = 100

export default class Ball extends GameObjectPosition {
  async setup (): Promise<void> {
    this.position = [this.ctx.width / 2, 0]
    this.acceleration = [0, 1]
  }

  update (time: number): void {
    super.update(time)
    if (this.position[1] > (this.ctx.height - MARGIN - BALL_RADIUS)) {
      this.position[1] = (this.ctx.height - MARGIN - BALL_RADIUS - 5)
      this.speed[1] = -this.speed[1]
    }
  }

  draw (frameNr: number): void {
    this.ctx.fillStyle = 'orange'
    this.ctx.beginPath()
    this.ctx.arc(this.position[0], this.position[1], BALL_RADIUS, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
