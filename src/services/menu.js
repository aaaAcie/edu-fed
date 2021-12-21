import request from '@/utils/requests'

// menu 信息接口
export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    url: `/boss/menu/getEditMenuInfo?id=${id}`
  })
}

// 提交 menu 接口
export const createOrUpdateMenu = (data) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data // 当前请求参数为 application/json，⽆需通过 qs 处理
  })
}

// 所有 menu 信息接口
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 删除 menu 的某 id 接口
export const deleteMenu = (id) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
