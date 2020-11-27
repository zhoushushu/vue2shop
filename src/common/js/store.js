import store from 'store2'

export default {
  get: key => {
    return store(`mshop_${key}`)
  },
  set: (key, data) => {
    store(`mshop_${key}`, data)
  },
  clear: key => {
    store.remove(`mshop_${key}`)
  },
  clearAll: () => {
    store.clearAll()
  }
}
