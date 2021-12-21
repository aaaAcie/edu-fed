<template>
  <div class="resource-list">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- 使用 Form 行内表单组件 -->
            <!-- reset指南: 1.绑定ref 2.通过prop绑定model里面的属性（未设置 prop 的表单项不受重置影响）-->
            <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
                <el-form-item label="资源名称" prop="name">
                    <el-input v-model="form.name" placeholder="资源名称" clearable></el-input>
                </el-form-item>
                <el-form-item label="资源路径" prop="url">
                    <el-input v-model="form.url" placeholder="资源路径" clearable></el-input>
                </el-form-item>
                <el-form-item label="资源分类" prop="categoryId">
                    <el-select
                        v-model="form.categoryId"
                        placeholder="资源分类"
                        clearable
                    >
                        <el-option
                            v-for="item in categories"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm">重置</el-button>
                    <el-button type="primary" @click="onSubmit" :disabled="isLoading">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 使用 Table 组件 -->
        <el-table
            :data="resources"
            style="width: 100%"
            v-loading="isLoading">
            <el-table-column
            prop="id"
            label="编号"
            width="100">
            </el-table-column>
            <el-table-column
            prop="name"
            label="资源名称">
            </el-table-column>
            <el-table-column
            prop="url"
            label="资源路径">
            </el-table-column>
            <el-table-column
            prop="description"
            label="描述">
            </el-table-column>
            <!-- 设置过滤器需要使用作用域插槽获取数据 -->
            <el-table-column
            label="添加时间">
            <template slot-scope="scope">
                <span>{{ scope.row.createdTime | dateFormat }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.row)"
                >编辑</el-button>
                <el-button
                size="mini"
                @click="handleDelete(scope.row)"
                type="danger"
                >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 使用 pagination 组件 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current"
            :page-sizes="[5, 10, 20]"
            :page-size="form.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            :disabled="isLoading">
        </el-pagination>
      </el-card>
  </div>
</template>

<script>
import { getResourcePages, getCategory } from '@/services/resources'
export default {
  name: 'ResourceList',
  data () {
    return {
      resources: [],
      form: {
        current: 1,
        size: 10,
        // query
        name: '',
        categoryId: '',
        url: ''
      },
      total: 50,
      categories: [],
      isLoading: false
    }
  },
  created () {
    this.loadResources()
    this.loadCategory()
  },
  methods: {
    resetForm () {
      this.$refs.form.resetFields()
    },
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    async loadCategory () {
      const { data } = await getCategory()
      if (data.code === '000000') {
        this.categories = data.data
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.form.current = val
      this.loadResources()
    },
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    handleEdit (row) {

    },
    handleDelete (row) {

    }
  },
  filters: {
    dateFormat (date) {
      date = new Date(date)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}
            ${date.getDay()}:${date.getMinutes()}
            `
    }
  }
}
</script>

<style lang="scss" scoped></style>
