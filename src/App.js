import React from 'react';
import './App.css';
import {addSubscription, globalState, subscribedIncrement} from './store'
import Counter from './Counter'

class App extends React.Component {
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
      <div className="App">
        <header className="App-header">
          <h2>Parent counter</h2>
          <p>{this.state.count}</p>
          <button onClick={this.increment}>increment</button>
          <Counter />
        </header>
      </div>
    );
  }
}

export default App;
