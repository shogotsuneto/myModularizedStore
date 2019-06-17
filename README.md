## 手順メモ

```
create-react-app mystore
cd mystore
```

store.js
```js
export let globalState = { count: 1 }
export const increment = () => {
  globalState = { count: globalState.count + 1 }
}
```

App.js
```js
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
```

Counter.js
```js
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
```

ポイント：
- export される値が変更されたら、その変更はimport先のファイルをまたいで維持される
  - 調べると binding がエクスポートされるとか書かれてるがよくわからない
  - その具体例と思われるシングルインスタンスのエクスポートと関連づけた方が理解しやすい
- propsに渡してる訳ではないので、再描画されない場合がある
  - 子での変更は親に反映されない
  - propsに渡せば良い？

App.jsを以下のようにしたがダメだった。

```js
export default () => <App {...store} />;
```

child count には変更が反映されるが、parent count には反映されない（1のまま）。
結局storeのほうのincrementにコールバックをぶら下げサブスクるのが良いのだろう。

```js
const subscriptions = []
export const addSubscription = (callback) => {
  subscriptions.push(callback)
}
export let globalState = { count: 1 }
export const increment = () => {
  globalState = { count: globalState.count + 1 }
}
export const subscribedIncrement = () => {
  globalState = { count: globalState.count + 1 }
  subscriptions.forEach(callback => callback(globalState))
}
```

結論：
- Reduxで良い。
- 親のボタンクリックで親は再描画されないのに子が再描画される謎。

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
