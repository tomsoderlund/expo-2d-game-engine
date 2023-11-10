import { Audio } from 'expo-av'

export default class Sound {
  sound = new Audio.Sound()

  constructor (fileRequire: any) {
    void this.sound.loadAsync(fileRequire)
    // You can use the `onPlaybackStatusUpdate` to check when the sound has finished playing
    this.sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish === true) {
        void this.sound.setPositionAsync(0) // Reset to start
      }
    })
  }

  play (): void {
    void this.sound.playAsync()
  }
}
