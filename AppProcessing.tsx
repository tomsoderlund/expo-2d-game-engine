import React from 'react'
import { ProcessingView } from 'expo-processing'

// import HaromSketch from './sketches/HaromSketch'
import Touch from './sketches/Touch'

export default class App extends React.Component {
  _sketch = (p: Processing): void => {
    const theSketch = new Touch(p)
    p.setup = theSketch.setup.bind(theSketch)
    p.draw = theSketch.draw.bind(theSketch)

    p.touchStart = () => console.log('touchStart')
    p.keyPressed = () => console.log('keyPressed')
    p.keyReleased = () => console.log('keyReleased')
    p.keyTyped = () => console.log('keyTyped')
    p.mousePressed = () => console.log('mousePressed')
    p.mouseReleased = () => console.log('mouseReleased')
    p.mouseClicked = () => console.log('mouseClicked')
    p.mouseDragged = () => console.log('mouseDragged')
    p.mouseMoved = () => console.log('mouseMoved')
  }

  render (): React.ReactElement {
    return (
      <ProcessingView
        style={{ flex: 1 }}
        sketch={this._sketch}
      />
    )
  }
}
