import request from '@/utils/requests'

// getSectionAndLesson 信息接口
export const getSectionAndLesson = (courseId) => {
    return request({
      method: 'GET',
      url: '/boss/course/section/getSectionAndLesson',
      params:{
          courseId
      }
    })
}

// 新增或更新章节 信息接口
export const saveOrUpdateSection = (data) => {
    return request({
      method: 'POST',
      url: '/boss/course/section/saveOrUpdateSection',
      data
    })
}

// 新增或更新课时 信息接口
export const saveOrUpdateLesson = (data) => {
    return request({
      method: 'POST',
      url: '/boss/course/lesson/saveOrUpdate',
      data
    })
}