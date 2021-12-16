import axios from 'axios'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
const request = axios.create({
    timeout: 5000
    // baseURL:
})

function getBaseURL (url){
    if (url.startsWith('/boss')) {
        return 'http://eduboss.lagou.com'
    } else {
        return 'http://edufront.lagou.com'
    }
}

function redirectLogin (){
    router.push({
        name: 'login',
        query: {
            // router.currentRoute ⽤于获取当前路由对应的路由信息对象
            redirect: router.currentRoute.fullPath
        }
    })
}

// 设置请求拦截器
request.interceptors.request.use(function (config) {
    config.baseURL = getBaseURL(config.url)
    const { user } = store.state
    if (user && user.access_token){
        config.headers.Authorization = user.access_token
    }
    return config
})

let isRefreshing = false
let rqs = []
// 设置响应拦截器
request.interceptors.response.use(function (response) {
    // 状态码为 2xx 都会进⼊这⾥
    console.log('请求响应成功了：', response)
    return response
}, function (error) {
    // 超出 2xx 都会进⼊这⾥
    if (error.response){
        // 1. 保存状态码
        const {status} = error.response
        // 2. 判断
        let errorMessage = ''
        errorMessage = '请求参数错误'
        if (status === 400) {
            errorMessage = '请求参数错误'
        } else if (status === 401) {
            // token ⽆效
            // 1. without token
            if (!store.state.user){
                // redirect
                redirectLogin()
                return Promise.reject(error)
            }else{
                // 2. wrong token (exsiting refresh_token)
                    // 发送刷新请求前判断 isRefreshing 是否存在其他已发送的刷新请求
                    // 1 如果有，则将当前请求挂起，等到 Token 刷新完毕再重发，这⾥先设置为 return
                if (isRefreshing){
                    return rqs.push(() => {
                        request(error.config)
                    })
                }
                    // 2 如果没有，则更新 isRefreshing 并发送请求，继续执⾏后续操作
                isRefreshing = true

                return request({
                    method:'POST',
                    url: '/front/user/refresh_token',
                    data: qs.stringify({
                        refreshtoken: store.state.user.refresh_token
                    })
                }).then(res => {
                    if (res.data.state!==1){
                        store.commit('setUser',null)
                        redirectLogin()
                    }else{
                        store.commit('setUser',res.data.content)
                        rqs.forEach(callback => callback()) // Token 刷新成功后，将 requests 中的请求重新发送
                        rqs = []
                        // 这时再对之前报 401 的接⼝重新请求，同时 return
                            // - error.config 是之前失败的请求的配置信息
                            // - request() 内部已经将原请求的所有功能包含了，⽆需接收结果返回。
                        return request(error.config)
                    }}).catch( () => {
                        // 这⾥⽤于处理 HTTP 报错的情况（我们的服务器使⽤的为响应⾃定义状态 -1来标识失败）
                        // - 此处的操作与 then() 中失败的处理⽅式相同
                        // - 由于不需要使⽤ catch 参数中的错误信息 err，所以没有接收
                        store.commit('setUser', null)
                        redirectLogin()
                        return Promise.reject(error)
                    }).finally(() => {
                        // 3 请求完毕，⽆论成功失败，设置 isRefreshing 为 false
                        isRefreshing = false
                    })
            }

        } else if (status === 403) {
            errorMessage = '没有权限，请联系管理员'
        } else if (status === 404) {
            errorMessage = '请求资源不存在'
        } else if (status >= 500) {
            errorMessage = '服务端错误，请联系管理员'
        }
        Message.error(errorMessage)
    } else if (error.request) {
    // 请求发送成功，但没有收到响应
        Message.error('请求超时，请重试')
    } else {
    // 在设置请求时发⽣了⼀些失去，触发了错误（未知型错误）
        Message.error(`请求失败${error.message}`)
    }
    // console.dir(error)
    return Promise.reject(error)
})



export default request

// 组件使用
// import request from '@/utils/requests'
// request({
//   method: 'GET',
//   url: '/front/ad/getAdList'
// }).then(res =>{
//   console.log(res)
// })