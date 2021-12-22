<template>
  <div class="c-or-e">
    <el-form :model="form">
        <el-form-item label="角色名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
            <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRoleSaveOrUpdate, getRoleById } from '@/services/roles'
export default {
  name: 'COrE',
  // ⼦组件接收状态
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    roleId: {
      type: [Number, String]
    }
  },
  created () {
    if (this.isEdit) {
      this.loadRoleById()
    }
  },
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    async loadRoleById () {
      const { data } = await getRoleById(this.roleId)
      if (data.code === '000000') {
        this.form = data.data
      }
    },
    onCancel () {
      this.$emit('cancel')
      this.form = {}
    },
    async onSubmit () {
      const { data } = await getRoleSaveOrUpdate(this.form)
      // console.log(data)
      if (data.code === '000000') {
        this.$emit('success')
        this.$message.success('提交成功!')
        this.form = {}
      }
    }
  }
}
</script>

<style>

</style>
