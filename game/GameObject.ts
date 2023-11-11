import { GestureResponderEvent } from 'react-native'
import Expo2DContext from 'expo-2d-context'

export default abstract class GameObject {
  type: string
  ctx: Expo2DContext

  constructor (ctx: Expo2DContext) {
    this.type = 'GameObject'
    this.ctx = ctx
  }

  async setup (): Promise<void> {}
  update (time: number): void {}
  draw (frameNr: number): void {}

  handleTouchPress (event: GestureResponderEvent): void {}
  handleTouchRelease (event: GestureResponderEvent): void {}
  handleTouchMove (event: GestureResponderEvent): void {}
}

export abstract class GameObjectPosition extends GameObject {
  position: [number, number]
  speed: [number, number]
  acceleration: [number, number]

  constructor (ctx: Expo2DContext) {
    super(ctx)
    this.position = [0, 0]
    this.speed = [0, 0]
    this.acceleration = [0, 0]
  }

  update (time: number): void {
    this.speed[0] += this.acceleration[0]
    this.speed[1] += this.acceleration[1]
    this.position[0] += this.speed[0]
    this.position[1] += this.speed[1]
  }
}
