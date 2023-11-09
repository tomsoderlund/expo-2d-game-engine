export default class Touch implements Sketch {
  p: Processing

  constructor (p: Processing) {
    this.p = p
  }

  setup (): void {
    this.p.strokeWeight(7)
  }

  draw (): void {
    this.p.background(230)
    this.p.line(0, 0, this.p.width, this.p.height)
  }

  mousePressed (): void {
    console.log('mousePressed', this.p.mouseX, this.p.mouseY)
  }
}
