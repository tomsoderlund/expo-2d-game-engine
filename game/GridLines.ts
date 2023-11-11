import GameObject from './GameObject'

const MARGIN = 120

export default class GridLines extends GameObject {
  draw (frameNr: number): void {
    // Antenna
    this.ctx.strokeStyle = 'darkgray'
    this.ctx.lineWidth = 5
    this.ctx.beginPath()
    this.ctx.moveTo(MARGIN, MARGIN)
    this.ctx.lineTo(MARGIN, this.ctx.height - MARGIN) // Origo
    this.ctx.lineTo(this.ctx.width - MARGIN, this.ctx.height - MARGIN)
    this.ctx.stroke()
    // Eye pupils
    this.ctx.fillStyle = 'tomato'
    this.ctx.beginPath()
    this.ctx.arc(MARGIN, this.ctx.height - MARGIN, 20, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
