import React from 'react'
import { ImageSVG, Skia } from '@shopify/react-native-skia'

interface PaddleProps extends Position {
}

export const paddleWidth = 180
export const paddleHeight = 30

const svg = Skia.SVG.MakeFromString(
  `<svg width="180" height="30" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2779_426)">
<rect width="180" height="30" rx="8" fill="#909090"/>
<path d="M203 30H-24L203 0V30Z" fill="black" fill-opacity="0.4"/>
<rect x="3" y="3" width="174" height="24" rx="6" fill="#B2B2B2"/>
</g>
<defs>
<clipPath id="clip0_2779_426">
<rect width="180" height="30" rx="8" fill="white"/>
</clipPath>
</defs>
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
