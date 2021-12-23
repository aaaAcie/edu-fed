<template>
  <div class="user-list">
      <el-card>
        <div slot="header">
            <el-form
                :inline="true"
                :model="filterParams"
                ref="filter-form">
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="filterParams.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" prop="rangeDate">
                    <el-date-picker
                        v-model="filterParams.rangeDate"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-button>查询</el-button>
            </el-form>
        </div>
        <el-table
            :data="users"
            style="width: 100%"
            v-loading="isLoading"
            >
            <el-table-column
                prop="id"
                label="用户ID"
                width="150">
            </el-table-column>
            <el-table-column
                prop="name"
                label="头像"
                width="100">
                <template slot-scope="scope">
                    <img width="30px" :src="scope.row.portrait || 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'">
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="注册时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.createTime | dateFormat }}</span>
                </template>
                <!-- 用户状态操作（服务端没有开放权限，只能演示） -->
            </el-table-column>
            <el-table-column
                prop="name"
                label="状态"
                width="80">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-value="ENABLE"
                        inactive-value="DISABLE"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="handleForbidUser(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        @click="handleSelectRole(scope.row)"
                    >分配角色</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="分配角色"
            :visible.sync="dialogVisible"
            width="40%">
            <el-select v-model="roleIdList" multiple placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAllocRole">确 定</el-button>
            </span>
        </el-dialog>
      </el-card>
  </div>
</template>

<script>
import { getUserPages } from '@/services/user'
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/roles'

export default {
  name: 'UserList',
  data () {
    return {
      users: [],
      filterParams: {
        currentPage: 1,
        pageSize: 100,
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        rangeDate: []
      },
      isLoading: false,
      form: {
        region: ''
      },
      dialogVisible: false,
      roleIdList: [],
      options: [],
      currentRoleId: ''
    }
  },
  created () {
    this.loadUserPages()
  },
  methods: {
    // 提交分配
    async handleAllocRole () {
      const { data } = await allocateUserRoles({
        userId: this.currentRoleId,
        roleIdList: this.roleIdList
      })
      if (data.code === '000000') {
        this.$message.success('分配角色成功')
        this.dialogVisible = false
      }
    },
    // 点击分配角色按钮
    async handleSelectRole (row) {
      this.currentRoleId = row.id
      const { data } = await getAllRoles()
      if (data.code === '000000') {
        this.options = data.data
      }

      this.handleSelected()
      this.dialogVisible = true
    },
    async handleSelected () {
      const { data } = await getUserRoles(this.currentRoleId)
      // 遍历得到的⻆⾊列表，将id组成数据替换给 roleIdList 即可
      this.roleIdList = data.data.map(item => item.id)
    },
    async loadUserPages () {
      const { data } = await getUserPages(this.filterParams)
      if (data.code === '000000') {
        this.users = data.data.records
      }
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

<style>

</style>
