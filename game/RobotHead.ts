import GameObject from './GameObject'

export default class RobotHead extends GameObject {
  draw (frameNr: number): void {
    const pX = frameNr * 1
    const pY = frameNr * 1
    // Head
    this.ctx.fillStyle = 'grey'
    this.ctx.fillRect(pX + 20, pY + 40, 100, 100)
    // Teeth
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(pX + 30, pY + 100, 20, 30)
    this.ctx.fillRect(pX + 60, pY + 100, 20, 30)
    this.ctx.fillRect(pX + 90, pY + 100, 20, 30)
    // Eyes
    this.ctx.beginPath()
    this.ctx.arc(pX + 50, pY + 70, 18, 0, 2 * Math.PI)
    this.ctx.arc(pX + 90, pY + 70, 18, 0, 2 * Math.PI)
    this.ctx.fill()
    // Eye pupils
    this.ctx.fillStyle = 'dodgerblue'
    this.ctx.beginPath()
    this.ctx.arc(pX + 50, pY + 70, 8, 0, 2 * Math.PI)
    this.ctx.arc(pX + 90, pY + 70, 8, 0, 2 * Math.PI)
    this.ctx.fill()
    // Antenna
    this.ctx.strokeStyle = 'black'
    this.ctx.beginPath()
    this.ctx.moveTo(pX + 70, pY + 40)
    this.ctx.lineTo(pX + 70, pY + 30)
    this.ctx.arc(pX + 70, pY + 20, 10, 0.5 * Math.PI, 2.5 * Math.PI)
    this.ctx.stroke()
  }
}
