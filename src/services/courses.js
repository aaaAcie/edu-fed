import request from '@/utils/requests'

// 查询课程 信息接口
export const getQueryCourses = (data) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

// 课程上下架 信息接口
export const changeState = (params) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params
  })
}
