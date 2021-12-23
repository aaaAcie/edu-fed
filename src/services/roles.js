import request from '@/utils/requests'

// 资源展示 信息接口
export const getRolePages = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

// 删除 接口
export const getDeleteResult = (id) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

// 更新角色 信息接口
export const getRoleSaveOrUpdate = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 获取⻆⾊
export const getRoleById = id => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

// 获取所有⻆⾊
export const getAllRoles = id => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 给⽤户分配⻆⾊ 信息接口
export const allocateUserRoles = (data) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

// 查询⽤户⻆⾊
export const getUserRoles = userId => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${userId}`
  })
}
