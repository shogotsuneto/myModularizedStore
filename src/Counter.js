import React from 'react'
import { globalState, increment } from './store'

class Counter extends React.Component {
  state = { count: globalState.count }

  increment = () => {
    increment()
    this.setState({ count: globalState.count })
  }

  render() {
    return (
      <div>
        <h2>Child counter</h2>
        <p>{globalState.count}</p>
        <button onClick={this.increment}>increment</button>
      </div>
    )
  }
}

export default Counter