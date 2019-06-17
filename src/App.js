import React from 'react';
import './App.css';
import { globalState, increment } from './store'
import Counter from './Counter'

class App extends React.Component {
  state = { count: globalState.count }

  increment = () => {
    increment()
    this.setState({ count: globalState.count })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Parent counter</h2>
          <p>{globalState.count}</p>
          <button onClick={this.increment}>increment</button>
          <Counter />
        </header>
      </div>
    );
  }
}

export default App;
