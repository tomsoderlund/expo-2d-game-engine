import GameObject, { GameObjectPosition, GameUpdate, GameEvent } from './GameObject'
import Sound from './media/Sound'
import { MARGIN } from './GridLines'
import { Vector2D, addVector, multiplyVector } from '../lib/math'

const BALL_RADIUS = 100
const DAMPER = 0.95

export default class Ball extends GameObjectPosition {
  dragVector: Vector2D | null
  bounceSound?: Sound
  bounceHardSound?: Sound

  constructor (parent: GameObject) {
    super(parent)
    this.dragVector = null
  }

  async setup (): Promise<void> {
    this.bounceSound = new Sound(require('../assets/sounds/bounce.mp3')) // eslint-disable-line @typescript-eslint/no-var-requires
    this.bounceHardSound = new Sound(require('../assets/sounds/bounce2.mp3')) // eslint-disable-line @typescript-eslint/no-var-requires
    this.position = [this.ctx.width / 2, 0]
    this.acceleration = [0, 1]
  }

  update (update: GameUpdate): void {
    super.update(update)
    // Floor
    if (this.position[1] > (this.ctx.height - MARGIN - BALL_RADIUS)) {
      this.position[1] = (this.ctx.height - MARGIN - BALL_RADIUS - 5)
      this.speed[1] = -this.speed[1] * DAMPER
      this.bounceHardSound?.play()
    }
    // Walls
    if (
      this.position[0] > (this.ctx.width - MARGIN - BALL_RADIUS) ||
      this.position[0] < (MARGIN + BALL_RADIUS)
    ) {
      this.position[0] += (this.position[0] < (MARGIN + BALL_RADIUS) ? 5 : -5)
      this.speed[0] = -this.speed[0] * DAMPER
      this.bounceSound?.play()
    }
  }

  draw (update: GameUpdate): void {
    // Ball
    this.ctx.fillStyle = 'orange'
    this.ctx.beginPath()
    this.ctx.arc(this.position[0], this.position[1], BALL_RADIUS, 0, 2 * Math.PI)
    this.ctx.fill()
    // Shine
    this.ctx.fillStyle = '#ffd5af'
    this.ctx.beginPath()
    this.ctx.arc(this.position[0] - 40, this.position[1] - 40, BALL_RADIUS / 5, 0, 2 * Math.PI)
    this.ctx.fill()
    // Drag vector
    if (this.dragVector !== null) {
      const startPosition = addVector(this.position, this.dragVector)
      this.ctx.strokeStyle = 'tomato'
      this.ctx.lineWidth = 15
      this.ctx.beginPath()
      this.ctx.moveTo(startPosition[0], startPosition[1])
      this.ctx.lineTo(this.position[0], this.position[1])
      this.ctx.stroke()
    }
  }

  handleEvent (event: GameEvent): void {
    switch (event.type) {
      case 'TouchDragMove':
        this.dragVector = event.payload?.vector
        break
      case 'TouchDragRelease':
        this.speed = addVector(this.speed, multiplyVector(event.payload?.vector, 0.07))
        this.dragVector = null
        this.bounceSound?.play()
        break
    }
  }
}
