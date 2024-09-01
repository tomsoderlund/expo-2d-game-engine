import React from 'react'
import { ImageSVG, useSVG } from '@shopify/react-native-skia'
import { SharedValue } from 'react-native-reanimated'

interface BallProps {
}

const svgRequire = require('../assets/game/ball.svg') // eslint-disable-line @typescript-eslint/no-var-requires

const Ball: React.FC<BallProps> = () => {
  const svg = useSVG(svgRequire)
  if (svg === null) {
    return null
  }
  return (
    <ImageSVG
      svg={svg}
      x={100}
      y={100}
      width={60}
      height={60}
    />
  )
}

export default Ball
