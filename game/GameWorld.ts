import GameObject, { GameUpdate, TouchPosition } from './GameObject'
import GridLines from './GridLines'
import Ball from './Ball'
import TouchDragRelease from './input/TouchDragRelease'

export default class GameWorld extends GameObject {
  gameObjects: GameObject[] = []

  async setup (): Promise<void> {
    // ctx.translate(100, -100)
    // const scale = 3
    // ctx.scale(scale, scale)
    this.gameObjects.push(new GridLines(this.ctx))
    this.gameObjects.push(new Ball(this.ctx))
    this.gameObjects.push(new TouchDragRelease(this.ctx))
    await Promise.all(this.gameObjects.map(async gameObject => await gameObject.setup()))
  }

  update (update: GameUpdate): void {
    this.gameObjects.forEach((gameObject) => gameObject.update(update))
  }

  draw (update: GameUpdate): void {
    // Init
    this.resetTransforms()
    this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height)
    this.gameObjects.forEach((gameObject) => {
      this.ctx.save()
      gameObject.draw(update)
      this.ctx.restore()
    })
    // Send drawing commands to GPU for rendering
    this.ctx.flush()
  }

  resetTransforms (): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  handleTouchPress (position: TouchPosition): void {
    this.gameObjects.forEach((gameObject) => { gameObject.handleTouchPress(position) })
  }

  handleTouchRelease (position: TouchPosition): void {
    this.gameObjects.forEach((gameObject) => { gameObject.handleTouchRelease(position) })
  }

  handleTouchMove (position: TouchPosition): void {
    this.gameObjects.forEach((gameObject) => { gameObject.handleTouchMove(position) })
  }
}
