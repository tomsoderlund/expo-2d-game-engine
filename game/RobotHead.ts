import { GestureResponderEvent } from 'react-native'
import { ImageData } from 'expo-2d-context'

import GameObject, { GameUpdate } from './GameObject'
import Sound from './media/Sound'

export default class RobotHead extends GameObject {
  imageData?: ImageData
  laserSound?: Sound

  async setup (): Promise<void> {
    this.laserSound = new Sound(require('../assets/sounds/laser.mp3')) // eslint-disable-line @typescript-eslint/no-var-requires
    // ImageData (pixels)
    this.imageData = this.ctx.createImageData(100, 100)
    // Iterate through every pixel
    for (let i = 0; i < this.imageData.data.length; i += 4) {
      const n = Math.round(i / 40000 * 100)
      this.imageData.data[i + 0] = 50 + n // R value
      this.imageData.data[i + 1] = 0 // G value
      this.imageData.data[i + 2] = 150 - n // B value
      this.imageData.data[i + 3] = 255 // Alpha value
    }
  }

  update (update: GameUpdate): void {
  }

  draw (update: GameUpdate): void {
    const pX = update.frameNumber * 1
    const pY = update.frameNumber * 1
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

    if (this.imageData !== null) this.ctx.putImageData(this.imageData, 100, 100)
  }

  handleTouchPress (event: GestureResponderEvent): void {
    this.laserSound?.play()
  }
}
