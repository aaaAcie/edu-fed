<template>
  <div class="role-list">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-form ref="form" :model="form">
                <el-form-item label="输入搜索" prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                    type="primary"
                    @click="onSubmit"
                    v-loading="isLoading"
                    >查询</el-button>
                    <el-button @click="onReset">重置</el-button>
                </el-form-item>
                </el-form>
            </div>
            <el-button @click="addRole">添加角色</el-button>
            <!-- 使用 Table 组件 -->
            <el-table
                :data="roles"
                style="width: 100%"
                v-loading="isLoading">
                <el-table-column
                prop="id"
                label="编号"
                width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="角色名称">
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
                    <div>
                        <el-button
                            type="text"
                            @click="$router.push({
                                name:'alloc-menu',
                                params: {
                                    roleId: scope.row.id
                                }
                            })"
                        >分配菜单</el-button>
                        <el-button
                            type="text"
                        >分配资源</el-button>
                    </div>
                    <div>
                        <el-button
                            type="text"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                    </div>
                </template>
                </el-table-column>
            </el-table>
            <!-- 添加角色的对话框结构 -->
            <el-dialog :title="isEdit ? '编辑角色':'添加角色'" :visible.sync="dialogFormVisible">
                <!-- 通过在父组件设置v-if 来进行子组件的销毁 -->
                <c-or-e
                    @success="handleSuccess"
                    @cancel="dialogFormVisible = false"
                    :is-edit="isEdit"
                    :role-id="roleId"
                    v-if="dialogFormVisible"
                >
                </c-or-e>
            </el-dialog>
        </el-card>
  </div>
</template>

<script>
import COrE from './CorE'
import { getRolePages, getDeleteResult } from '@/services/roles'
export default {
  name: 'RoleList',
  components: {
    COrE
  },
  data () {
    return {
      roles: [],
      form: {
        name: ''
      },
      isLoading: false,
      dialogFormVisible: false,
      isEdit: false,
      roleId: ''
    }
  },
  created () {
    this.loadRolePages()
  },
  methods: {
    addRole () {
      this.dialogFormVisible = true
      this.isEdit = false
    },
    handleSuccess () {
      this.dialogFormVisible = false
      this.loadRolePages()
    },
    handleDelete (row) {
      this.$confirm(`确认删除 ${row.name} 角色?`, '删除提示')
        .then(async () => {
          // 调用删除接口
          const { data } = await getDeleteResult(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadRolePages()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleEdit (row) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.roleId = row.id
    },
    // 查询
    onSubmit () {
      this.loadRolePages()
    },
    onReset () {
      this.$refs.form.resetFields()
      this.loadRolePages()
    },
    async loadRolePages () {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
      }
      // console.log(data)
      this.isLoading = false
    }
  },
  filters: {
    dateFormat (date) {
      date = new Date(date)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    }
  }
}
</script>

<style lang="scss" scoped></style>
