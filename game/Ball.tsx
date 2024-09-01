import React from 'react'
import { SharedValue } from 'react-native-reanimated'

import ScaledSVG from '../components/ScaledSVG'

interface BallProps {
  x: SharedValue<number>
}

const Ball: React.FC<BallProps> = ({ x }) => {
  return (
    <ScaledSVG
      imageRequire={require('../assets/game/ball.svg')}
      x={x.value}
      y={200}
      width={100}
      height={100}
    />
  )
}

export default Ball
