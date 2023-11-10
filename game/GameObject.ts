import { GestureResponderEvent } from 'react-native'
import Expo2DContext from 'expo-2d-context'

export default abstract class GameObject {
  ctx: Expo2DContext

  constructor (ctx: Expo2DContext) {
    this.ctx = ctx
  }

  async setup (): Promise<void> {}
  update (time: number): void {}
  draw (frameNr: number): void {}

  handleTouchPress (event: GestureResponderEvent): void {}
  handleTouchRelease (event: GestureResponderEvent): void {}
  handleTouchMove (event: GestureResponderEvent): void {}
}
