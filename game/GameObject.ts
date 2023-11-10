import Expo2DContext from 'expo-2d-context'

export default abstract class GameObject {
  ctx: Expo2DContext

  constructor (ctx: Expo2DContext) {
    this.ctx = ctx
  }

  setup (): void {}
  update (time: number): void {}
  draw (frameNr: number): void {}
}
