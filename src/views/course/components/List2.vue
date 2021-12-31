<template>
  <div class="course-list">
      <el-card>
          <div slot="header">
            <span>数据筛选</span>
          </div>
          <el-form
            :inline="true"
            ref="form"
            label-position="left"
            :model="filterParams"
            >
            <el-form-item label="课程名称：" prop="courseName">
                <el-input v-model="filterParams.courseName"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-select v-model="filterParams.status">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="上架" value="1"></el-option>
                    <el-option label="下架" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    :disabled="isLoading"
                    @click="handleReset"
                >重置</el-button>
                <el-button
                    type="primary"
                    :disabled="isLoading"
                    @click="handleFilter"
                >查询</el-button>
            </el-form-item>
            <el-form-item style="float: right">
                <el-button
                    type="primary"
                    @click="$router.push({
                        name: 'course-create'
                    })"
                >+ 添加课程</el-button>
            </el-form-item>
          </el-form>
            <el-table
                :data="courses"
                v-loading="isLoading"
                style="width: 100%; margin-bottom: 20px"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="courseName"
                    label="课程名称"
                    width="230">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="价格">
                </el-table-column>
                <el-table-column
                    prop="sortNum"
                    label="排序">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="上架状态">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            :disabled="scope.row.isStatusLoading"
                            @change="onStateChange(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="操作"
                    width="200"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                        @click="$router.push({
                            name: 'course-edit',
                            params: {
                                courseId: scope.row.id
                            }
                        })"
                        >编辑</el-button>
                        <el-button
                            @click="$router.push({
                                name: 'course-section',
                                params: {
                                    courseId: scope.row.id
                                }
                            })"
                        >内容管理</el-button>
                        <el-button
                            @click="test(scope.row)"
                        >test row</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="filterParams.currentPage"
                :page-sizes="[10, 15, 20]"
                :page-size="filterParams.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getQueryCourses, changeState } from '@/services/courses'
export default {
  name: 'CourseList',
  data () {
    return {
      filterParams: {
        currentPage: 1,
        pageSize: 10,
        courseName: '',
        status: ''
      },
      totalCount: 0,
      isLoading: false,
      courses: []
    }
  },
  created () {
    this.loadQueryCourses()
  },
  methods: {
    test(row){
        console.log(row)
    },
    async onStateChange (row) {
      const { data } = await changeState({
        courseId: row.id,
        status: row.status
      })
      if (data.code === '000000') {
        this.$message.success(`${row.status === 1 ? '上架成功' : '下架成功'}`)
      }
    },
    handleReset () {
      this.$refs.form.resetFields()
      this.filterParams.currentPage = 1
      this.loadQueryCourses()
    },
    handleFilter () {
      this.loadQueryCourses()
    },
    // 每页 val 条
    handleSizeChange (val) {
      this.filterParams.pageSize = val
      this.filterParams.currentPage = 1
      this.loadQueryCourses()
    },
    // 当前页: val
    handleCurrentChange (val) {
      this.filterParams.currentPage = val
      this.loadQueryCourses()
    },
    async loadQueryCourses () {
      this.isLoading = true
      const { data } = await getQueryCourses(this.filterParams)
      if (data.code === '000000') {
        this.courses = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    }
  }
}
</script>

<style>

</style>
