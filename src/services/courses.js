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

// 通过课程Id获取课程信息
export const getCourseById = (courseId) => {
    return request({
      method: 'GET',
      url: '/boss/course/getCourseById',
      params:{
          courseId
      }
    })
}


// 保存或者更新课程信息接口
export const saveOrUpdateCourse = (data) => {
    return request({
      method: 'POST',
      url: '/boss/course/saveOrUpdateCourse',
      data
    })
  }


// 上传图片
export const uploadImg = (data,onUploadProgress) => {
    return request({
      method: 'POST',
      url: '/boss/course/upload',
      data,
      onUploadProgress
    })
}