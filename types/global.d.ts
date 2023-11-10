import 'expo-2d-context'

declare module 'expo-2d-context' {
  interface Expo2DContext {
    createImageData(width: number, height: number): ImageData
    putImageData(imagedata: ImageData, dx: number, dy: number): void
  }
}
