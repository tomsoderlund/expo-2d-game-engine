import React from 'react'
import { ImageSVG, useSVG, rect, fitbox, Group } from '@shopify/react-native-skia'

interface ScaledSVGProps {
  imageRequire: string
  x?: number
  y?: number
  width?: number
  height?: number
}

const ScaledSVG: React.FC<ScaledSVGProps> = ({ imageRequire, x = 0, y = 0, width = 100, height = 100 }) => {
  // const svg = Skia.SVG.MakeFromString(imageRequire)
  const svg = useSVG(imageRequire)

  if (svg === null) {
    return null
  }

  // Define the source rect based on the original SVG dimensions
  const src = rect(0, 0, svg.width(), svg.height())

  // Define the destination rect based on the provided width and height
  const dst = rect(0, 0, width, height)
  const sizeTransform = fitbox('contain', src, dst)
  const scaleX = sizeTransform[2].scaleX
  const translateX = x / scaleX
  const translateY = y / scaleX

  return (
    <Group transform={[...sizeTransform, { translateX, translateY }]}>
      <ImageSVG svg={svg} width={width} height={height} />
    </Group>
  )
}

export default ScaledSVG
