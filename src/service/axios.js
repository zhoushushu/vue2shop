import axios from 'axios'
import { Toast } from 'vant'
import store from '../common/js/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASEAPI,
  timeout: 60000
})

service.all = axios.all
service.spread = axios.spread

// 请求前拦截
let loading = null
service.interceptors.request.use(
  config => {
    loading = Toast.loading({
      duration: 0,
      message: '加载中...',
      forbidClick: true
    })
    const token = store.get('token')
    if (token || token !== '') {
      config.headers.common.token = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 请求响应后关闭加载框
    if (loading) {
      loading.clear()
    }
    return response
  },
  error => {
    // 请求响应后关闭加载框
    if (loading) {
      loading.clear()
    }
    // 断网 或者 请求超时 状态
    if (!error.response) {
      // 请求超时状态
      if (error.message.includes('timeout')) {
        error.message = '超时了，请检查网络是否连接正常'
        return Promise.reject(error.message)
      } else {
        error.message = '服务器出错了，请联系网站管理员'
        return Promise.reject(error.message)
      }
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '用户名或者密码错误，请重试'
          break
        case 401:
          // 401：未登录
          error.message = '未授权，请重新登录'
          break
        case 403:
          // 登录信息过期，请重新登录
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      error.message = '连接到服务器失败'
    }
    return Promise.reject(error.message)
  }
)

export default service
