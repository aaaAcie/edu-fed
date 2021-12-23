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

// 获取所有菜单并按层级展示  接口
export const getMenuNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

// 给角色分配菜单 接口
export const allocateRoleMenus = (data) => {
  return request({
    method: 'POST',
    url: '/boss/menu/allocateRoleMenus',
    data
  })
}

// 获取角色拥有的彩蛋列表 接口
// axios 会把 params 转换为 urlencoded 并以 ? 连接到 url 后面
export const getRoleMenus = (roleId) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getRoleMenus?roleId=${roleId}`,
    url: '/boss/menu/getRoleMenus',
    params: {
      roleId
    }
  })
}
