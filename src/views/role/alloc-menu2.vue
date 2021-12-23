<template>
  <div class="alloc-menu">
      <el-card>
          <el-tree
           ref="menu-tree"
           node-key="id"
           :data="menu"
           :props="defaultProps"
           show-checkbox
           default-expand-all
           :default-checked-keys="defaultKeys"
          >
          </el-tree>
          <div style="margin: 20px;">
            <el-button @click="$refs['menu-tree'].setCheckedKeys([])">清空</el-button>
            <el-button type="primary" @click="onSave">保存</el-button>
          </div>
      </el-card>

  </div>
</template>

<script>
import { getMenuNodeList, allocateRoleMenus, getRoleMenus } from '@/services/menu'
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menu: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      defaultKeys: []
    }
  },
  created () {
    this.loadMenus()
    this.loadRoleMenus()
  },
  methods: {
    getDefaultKeys (menus) {
      menus.forEach(menu => {
        if (menu.selected) {
          if (menu.subMenuList) {
            return this.getDefaultKeys(menu.subMenuList)
          } else {
            // this.defaultKeys.push(menu.id)
            this.defaultKeys = [...this.defaultKeys, menu.id]
          }
        }
      })
    },
    async loadRoleMenus () {
      console.log(this.roleId)
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        console.log(data.data)
        this.getDefaultKeys(data.data)
      }
    },
    async onSave () {
      const { data } = await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList: this.$refs['menu-tree'].getCheckedKeys()
      })
      if (data.code === '000000') {
        this.$message.success('ok')
        this.$router.push({
          name: 'role'
        })
      }
    },
    async loadMenus () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menu = data.data
      }
    }
  }
}
</script>

<style>

</style>
