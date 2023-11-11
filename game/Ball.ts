import { GameObjectPosition, GameUpdate, GameEvent } from './GameObject'
import { MARGIN } from './GridLines'
import { addVector, multiplyVector } from '../lib/math'

const BALL_RADIUS = 100
const DAMPER = 0.95

export default class Ball extends GameObjectPosition {
  async setup (): Promise<void> {
    this.position = [this.ctx.width / 2, 0]
    this.acceleration = [0, 1]
  }

  update (update: GameUpdate): void {
    super.update(update)
    // Floor
    if (this.position[1] > (this.ctx.height - MARGIN - BALL_RADIUS)) {
      this.position[1] = (this.ctx.height - MARGIN - BALL_RADIUS - 5)
      this.speed[1] = -this.speed[1] * DAMPER
    }
    // Walls
    if (
      this.position[0] > (this.ctx.width - MARGIN - BALL_RADIUS) ||
      this.position[0] < (MARGIN + BALL_RADIUS)
    ) {
      this.speed[0] = -this.speed[0] * DAMPER
    }
  }

  draw (update: GameUpdate): void {
    this.ctx.fillStyle = 'orange'
    this.ctx.beginPath()
    this.ctx.arc(this.position[0], this.position[1], BALL_RADIUS, 0, 2 * Math.PI)
    this.ctx.fill()
  }

  handleEvent (event: GameEvent): void {
    const forceVector = multiplyVector(event.payload?.vector, 0.07)
    this.speed = addVector(this.speed, forceVector)
  }
}
