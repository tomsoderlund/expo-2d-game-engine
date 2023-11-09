import React from 'react'
import { ProcessingView } from 'expo-processing'

import HaromSketch from './sketches/HaromSketch'

export default class App extends React.Component {
  _sketch = (p: any): void => {
    const theSketch = new HaromSketch(p)
    p.setup = theSketch.setup.bind(theSketch)
    p.draw = theSketch.draw.bind(theSketch)
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
