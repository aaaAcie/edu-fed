import request from '@/utils/requests'
import qs from 'qs'

export const login = data => {
  return request({
    method: 'POST',
    // headers: { 'content-type': 'application/x-www-form-urlencoded'},
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 用户基本信息借口
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 分页查询用户信息
export const getUserPages = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
