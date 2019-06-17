import React from 'react'
import { addSubscription, globalState, subscribedIncrement } from './store'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: globalState.count }
    addSubscription(this.onGlobalStateChange)
  }

  increment = () => {
    subscribedIncrement()
    this.setState({ count: globalState.count })
  }

  onGlobalStateChange = (globalState) => {
    this.setState(globalState)
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