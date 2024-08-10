import Expo2DContext from 'expo-2d-context'

import GameWorld from './GameWorld'

export interface GameUpdate {
  deltaTime: number
  frameNumber: number
}

export interface GameEvent {
  type: string
  payload?: Record<string, any>
}

export type TouchPosition = [
  number,
  number
]

export default abstract class GameObject {
  type: string
  parent: GameObject | null = null
  world: GameWorld
  ctx: Expo2DContext

  constructor (parent: GameObject | null) {
    this.type = 'GameObject'
    this.parent = parent
    this.world = parent?.world ?? parent as GameWorld
    this.ctx = parent?.ctx as Expo2DContext
  }

  async setup (): Promise<void> {}
  update (update: GameUpdate): void {}
  draw (update: GameUpdate): void {}

  handleTouchPress (position: TouchPosition): void {}
  handleTouchRelease (position: TouchPosition): void {}
  handleTouchMove (position: TouchPosition): void {}

  broadcastEvent (event: GameEvent): void {
    this.world?.handleEvent(event)
  }

  handleEvent (event: GameEvent): void {}
}

export abstract class GameObjectWithPosition extends GameObject {
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
