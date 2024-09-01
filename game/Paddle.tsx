import React from 'react'
import { ImageSVG, Skia } from '@shopify/react-native-skia'

interface PaddleProps extends Position {
}

export const paddleWidth = 100
export const paddleHeight = 30

const svg = Skia.SVG.MakeFromString(
  `<svg width="${paddleWidth}" height="${paddleHeight}" viewBox="0 0 ${paddleWidth} ${paddleHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2779_426)">
<rect width="${paddleWidth}" height="${paddleHeight}" rx="8" fill="#758AAA"/>
<path d="M112.778 30H-13.3333L112.778 0V30Z" fill="black" fill-opacity="0.4"/>
<rect x="3" y="3" width="${paddleWidth - 6}" height="${paddleHeight - 6}" rx="6" fill="#9FBADC"/>
</g>
<defs>
<clipPath id="clip0_2779_426">
<rect width="${paddleWidth}" height="${paddleHeight}" rx="8" fill="white"/>
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
