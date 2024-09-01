import React from 'react'
import { ImageSVG, useSVG } from '@shopify/react-native-skia'

interface BallProps extends Position {
}

export const ballSize = 60

const svgRequire = require('../assets/game/ball.svg') // eslint-disable-line @typescript-eslint/no-var-requires

const Ball: React.FC<BallProps> = ({ x, y }) => {
  const svg = useSVG(svgRequire)
  if (svg === null) {
    return null
  }
  return (
    <ImageSVG
      svg={svg}
      x={x}
      y={y}
      width={ballSize}
      height={ballSize}
    />
  )
}

export default Ball
