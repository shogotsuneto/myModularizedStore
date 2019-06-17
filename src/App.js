import React from 'react';
import './App.css';
import * as store from './store'
import Counter from './Counter'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: props.globalState.count }
  }

  increment = () => {
    this.props.increment()
    this.setState({ count: this.props.globalState.count })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Parent counter</h2>
          <p>{this.props.globalState.count}</p>
          <button onClick={this.increment}>increment</button>
          <Counter />
        </header>
      </div>
    );
  }
}

export default () => <App {...store} />;
