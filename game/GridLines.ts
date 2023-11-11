import GameObject, { GameUpdate } from './GameObject'

export const MARGIN = 120

export default class GridLines extends GameObject {
  draw (update: GameUpdate): void {
    this.ctx.strokeStyle = 'darkgray'
    this.ctx.lineWidth = 5
    this.ctx.beginPath()
    this.ctx.moveTo(MARGIN, MARGIN)
    this.ctx.lineTo(MARGIN, this.ctx.height - MARGIN) // Origo
    this.ctx.lineTo(this.ctx.width - MARGIN, this.ctx.height - MARGIN)
    this.ctx.stroke()
  }
}
