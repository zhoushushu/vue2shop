import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartData: []
  },
  getters: {
    totalPirce (state) {
      let temp = 0
      if (state.cartData.length) {
        for (let i = 0; i < state.cartData.length; i++) {
          temp += state.cartData[i].num * state.cartData[i].sellingPrice
        }
      }
      return temp * 100
    }
  },
  mutations: {
    addCart (state, payload) {
      const obj = {}
      obj.goodsId = payload.goodsId
      obj.sellingPrice = payload.sellingPrice
      obj.goodsIntro = payload.goodsIntro
      obj.goodsName = payload.goodsName
      obj.goodsCoverImg = payload.goodsCoverImg
      obj.num = 1
      state.cartData.push(obj)
    },
    addOneCart (state, payload) {
      state.cartData = []
      const obj = {}
      obj.goodsId = payload.goodsId
      obj.sellingPrice = payload.sellingPrice
      obj.goodsIntro = payload.goodsIntro
      obj.goodsName = payload.goodsName
      obj.goodsCoverImg = payload.goodsCoverImg
      obj.num = 1
      state.cartData.push(obj)
    },
    plusCart (state, payload) {
      state.cartData[payload].num++
    },
    minusCart (state, payload) {
      state.cartData[payload].num--
    },
    removeCart (state, payload) {
      state.cartData.splice(payload, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
