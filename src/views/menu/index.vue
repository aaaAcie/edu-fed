<template>
  <div class="menu">
    menu
  </div>
</template>

<script>
// import { getAllMenus, deleteMenu } from '@/services/menu'
export default {
  name: 'MenuIndex',
  // data () {
  //   return {
  //     tableData: []
  //   }
  // },
  // created () {
  //   this.loadAllMenus()
  // },
  // methods: {
  //   handleEdit (rowData) {
  //     // 设置跳转
  //     this.$router.push({
  //       name: 'menu-edit',
  //       params: {
  //         id: rowData.id
  //       }
  //     })
  //   },
  //   handleDelete (rowData) {
  //     // 删除的确认提示
  //     this.$confirm('确认删除吗？', '删除提示')
  //       .then(async () => {
  //         // 发送删除请求
  //         const { data } = await deleteMenu(rowData.id)
  //         if (data.code === '000000') {
  //           this.$message.success('删除成功')
  //           // 更新数据列表
  //           this.loadAllMenus()
  //         }
  //       })
  //       .catch(() => {
  //         this.$message.info('已取消删除')
  //       })
  //   },
  //   // 获取所有菜单信息
  //   async loadAllMenus () {
  //     const { data } = await getAllMenus()
  //     if (data.code === '000000') {
  //       this.tableData = data.data
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
