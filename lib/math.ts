export type Vector2D = [
  number,
  number
]

export const getDistance = (point1: Vector2D, point2: Vector2D): number => Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2))
export const addVector = (point1: Vector2D, point2: Vector2D): Vector2D => ([point1[0] + point2[0], point1[1] + point2[1]])
export const subtractVector = (point1: Vector2D, point2: Vector2D): Vector2D => ([point1[0] - point2[0], point1[1] - point2[1]])
export const multiplyVector = (vector: Vector2D, multiplier: number): Vector2D => ([vector[0] * multiplier, vector[1] * multiplier])

export function areTwoRectanglesColliding (
  obj1x: number,
  obj1y: number,
  obj1width: number,
  obj1height: number,
  obj2x: number,
  obj2y: number,
  obj2width: number,
  obj2height: number
): boolean {
  return (
    obj1x < obj2x + obj2width &&
    obj1x + obj1width > obj2x &&
    obj1y < obj2y + obj2height &&
    obj1y + obj1height > obj2y
  )
}

export function areCircleAndRectangleColliding (
  circleCenterX: number,
  circleCenterY: number,
  circleRadius: number,
  rectLeftX: number,
  rectTopY: number,
  rectWidth: number,
  rectHeight: number
): boolean {
  const distX = Math.abs(circleCenterX - rectLeftX - rectWidth / 2)
  const distY = Math.abs(circleCenterY - rectTopY - rectHeight / 2)
  if (distX > (rectWidth / 2 + circleRadius)) return false
  if (distY > (rectHeight / 2 + circleRadius)) return false
  if (distX <= (rectWidth / 2)) return true
  if (distY <= (rectHeight / 2)) return true
  const dx = distX - rectWidth / 2
  const dy = distY - rectHeight / 2
  return (dx * dx + dy * dy <= (circleRadius * circleRadius))
}

/*
export const splitLine = (point1, point2, segmentLength) => {
  const distance = getDistance(point1, point2)
  const vector = getVector(point1, point2)
  const segmentCount = Math.floor(distance / segmentLength)
  const segmentVector = multiplyVector(vector, segmentLength / distance)
  const segments = [
    point1,
    ...fillArray(segmentCount, index => multiplyVector(segmentVector, index + 1)),
    point2
  ]
  return segments
}

export const xySpeed = (speed, rotationDegrees) => ({
  x: Math.sin(rotationDegrees / 180 * Math.PI) * speed,
  y: -Math.cos(rotationDegrees / 180 * Math.PI) * speed
})

export const getAngle = function (x, y) {
  const angle = Math.atan2(y, x) // radians
  const degrees = 180 * angle / Math.PI // degrees
  return (360 + Math.round(degrees)) % 360 // round number, avoid decimal fragments
}

export const findNewPoint = (x, y, angle, distance) => ({
  x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
  y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y)
})

export const applyAcceleration = (position, speed, acceleration) => {
  for (let dim = 0; dim < position.length; dim++) {
    speed[dim] += acceleration[dim]
    position[dim] += speed[dim]
  }
}

export const applyBounce = (position, speed, acceleration) => {
  if (position[Y] > 200) {
    speed[Y] = -speed[Y] * 0.9
    speed[ROTATION] = -speed[ROTATION] * 0.9
    position[ROTATION] = position[ROTATION] * 0.9
    position[Y] = 200
  }
}

export const applyBlackHole = (position, acceleration, holePosition = [150, 150], gravity = 0.01) => {
  for (let dim = 0; dim < position.length; dim++) {
    acceleration[dim] = (holePosition[dim] - position[dim]) * gravity
  }
}
*/
