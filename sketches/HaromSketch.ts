export default class HaromSketch implements Sketch {
  p: Processing

  constructor (p: Processing) {
    this.p = p
  }

  setup (): void {
    this.p.strokeWeight(7)
  }

  draw (): void {
    this.p.background(240)
    this.harom(
      this.p.width - 142,
      this.p.height - 142,
      142,
      this.p.height - 142,
      6,
      (this.p.sin((0.0005 * Date.now()) % (2 * this.p.PI)) as number + 1) / 2
    )
  }

  harom (ax: number, ay: number, bx: number, by: number, level: number, ratio: number): void {
    if (level <= 0) {
      return
    }

    const vx = bx - ax
    const vy = by - ay
    const nx = this.p.cos(this.p.PI / 3) * vx - this.p.sin(this.p.PI / 3) * vy
    const ny = this.p.sin(this.p.PI / 3) * vx + this.p.cos(this.p.PI / 3) * vy
    const cx = ax + nx
    const cy = ay + ny
    this.p.line(ax, ay, bx, by)
    this.p.line(ax, ay, cx, cy)
    this.p.line(cx, cy, bx, by)

    this.harom(
      ax * ratio + cx * (1 - ratio),
      ay * ratio + cy * (1 - ratio),
      ax * (1 - ratio) + bx * ratio,
      ay * (1 - ratio) + by * ratio,
      level - 1,
      ratio
    )
  }
}
