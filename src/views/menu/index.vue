<template>
  <div class="menu">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button @click="$router.push({name:'menu-create'})">添加菜单</el-button>
        </div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="编号"
              width="90">
            </el-table-column>
            <el-table-column
              prop="name"
              label="菜单名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="level"
              label="菜单级数"
              width="180">
            </el-table-column>
            <el-table-column
              prop="icon"
              label="前端图标">
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="排序">
            </el-table-column>

            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
import { getAllMenus, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    handleEdit (row) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    handleDelete (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
        // confirmButtonText: '确定',
        // cancelButtonText: '取消',
        // type: 'warning'
      }).then(async () => {
        // 调用删除接口
        const { data } = await deleteMenu(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus()
        }
      }).catch(() => {
        this.$message.info('已取消删除')
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    async loadAllMenus () {
      const { data } = await getAllMenus()
      // console.log(data)
      if (data.code === '000000') {
        this.tableData = data.data
      }
    }
  }

}
</script>

<style lang="scss" scoped></style>
