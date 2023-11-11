import GameObject from './GameObject'

export default class Ball extends GameObject {
  draw (frameNr: number): void {
    const pX = frameNr * 1
    const pY = frameNr * 1
    // Eye pupils
    this.ctx.fillStyle = 'orange'
    this.ctx.beginPath()
    this.ctx.arc(pX + 50, pY + 70, 100, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
