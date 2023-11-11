import Expo2DContext from 'expo-2d-context'

export interface GameUpdate {
  deltaTime: number
  frameNumber: number
}

export type TouchPosition = [
  number,
  number
]

export default abstract class GameObject {
  type: string
  parent: GameObject | null = null
  ctx: Expo2DContext

  constructor (parent: GameObject | null) {
    this.type = 'GameObject'
    this.parent = parent
    this.ctx = parent?.ctx as Expo2DContext
  }

  async setup (): Promise<void> {}
  update (update: GameUpdate): void {}
  draw (update: GameUpdate): void {}

  handleTouchPress (position: TouchPosition): void {}
  handleTouchRelease (position: TouchPosition): void {}
  handleTouchMove (position: TouchPosition): void {}
}

export abstract class GameObjectPosition extends GameObject {
  position: [number, number]
  speed: [number, number]
  acceleration: [number, number]

  constructor (parent: GameObject) {
    super(parent)
    this.position = [0, 0]
    this.speed = [0, 0]
    this.acceleration = [0, 0]
  }

  update (update: GameUpdate): void {
    this.speed[0] += this.acceleration[0]
    this.speed[1] += this.acceleration[1]
    this.position[0] += this.speed[0]
    this.position[1] += this.speed[1]
  }
}
