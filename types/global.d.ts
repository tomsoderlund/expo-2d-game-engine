// import { SharedValue } from 'react-native-reanimated'

interface Position {
  x: SharedValue<number>
  y: SharedValue<number>
}

interface Velocity {
  x: SharedValue<number>
  y: SharedValue<number>
}

interface Size {
  width: SharedValue<number>
  height: SharedValue<number>
}
