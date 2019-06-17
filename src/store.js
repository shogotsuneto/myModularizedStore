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