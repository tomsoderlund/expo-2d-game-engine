import React from 'react'
import { useWindowDimensions } from 'react-native'
import { ImageSVG, Skia } from '@shopify/react-native-skia'
import { SharedValue } from 'react-native-reanimated'

interface PaddleProps {
  x: SharedValue<number>
}

export const paddleWidth = 180
const paddleHeight = 30

const svg = Skia.SVG.MakeFromString(
  `<svg width="180" height="30" viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="180" height="30" rx="8" fill="#797979"/>
</svg>`
)

const Paddle: React.FC<PaddleProps> = ({ x }) => {
  const windowDimensions = useWindowDimensions()
  return (
    <ImageSVG
      svg={svg}
      x={x}
      y={windowDimensions.height - 120}
      width={paddleWidth}
      height={paddleHeight}
    />
  )
}

export default Paddle
