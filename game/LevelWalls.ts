import GameObject, { GameUpdate } from './GameObject'

export const MARGIN = 80

export default class LevelWalls extends GameObject {
  draw (update: GameUpdate): void {
    this.ctx.strokeStyle = 'darkgray'
    this.ctx.lineWidth = 5
    this.ctx.beginPath()
    // Y axis (Left wall)
    this.ctx.moveTo(MARGIN, MARGIN)
    this.ctx.lineTo(MARGIN, this.ctx.height - MARGIN) // Origo
    // X axis (Floor)
    this.ctx.lineTo(this.ctx.width - MARGIN, this.ctx.height - MARGIN)
    // Y axis (Right wall)
    this.ctx.lineTo(this.ctx.width - MARGIN, MARGIN)
    this.ctx.stroke()
  }
}
