import React from 'react'
import { ImageSVG, Skia } from '@shopify/react-native-skia'

interface PaddleProps extends Position {
}

export const paddleWidth = 180
const paddleHeight = 30

const svg = Skia.SVG.MakeFromString(
  `<svg width="180" height="30" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="180" height="30" rx="8" fill="#797979"/>
</svg>`
)

const Paddle: React.FC<PaddleProps> = ({ x, y }) => {
  return (
    <ImageSVG
      svg={svg}
      x={x}
      y={y}
      width={paddleWidth}
      height={paddleHeight}
    />
  )
}

export default Paddle
