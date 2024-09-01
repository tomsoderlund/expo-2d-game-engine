import { useEffect, useRef } from 'react'
import { Audio, AVPlaybackSource } from 'expo-av'

type SoundReturnProps = () => Promise<void>

/**
  import useSound from './hooks/useSound'

  const playBounceSound = useSound(require('../assets/sounds/bounce.mp3'))
*/
export default function useSound (soundRequire: AVPlaybackSource): SoundReturnProps {
  const soundRef = useRef<Audio.Sound | null>(null)

  useEffect(() => {
    const loadSound = async (): Promise<void> => {
      const { sound } = await Audio.Sound.createAsync(soundRequire)
      soundRef.current = sound
    }

    void loadSound()

    return () => {
      if (soundRef.current != null) {
        void soundRef.current.unloadAsync()
      }
    }
  }, [])

  const playSound = async (): Promise<void> => {
    if (soundRef.current != null) {
      await soundRef.current.replayAsync()
    }
  }

  return playSound
}
