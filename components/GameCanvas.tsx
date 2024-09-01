import React from 'react'
import { Canvas, Fill } from '@shopify/react-native-skia'

interface GameCanvasProps {
  children?: React.ReactNode
  backgroundColor?: string
}

const GameCanvas: React.FC<GameCanvasProps> = ({ children, backgroundColor = 'white' }): React.ReactElement => {
  // const ref = useCanvasRef()
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color={backgroundColor} />
      {children}
    </Canvas>
  )
}

export default GameCanvas
