export let globalState = { count: 1 }
export const increment = () => {
  globalState = { count: globalState.count + 1 }
}
