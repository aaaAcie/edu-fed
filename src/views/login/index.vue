<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px" label-position="top" :rules="rules">
      <el-form-item label="账号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoginLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from '@/utils/requests'
// import qs from 'qs'
import {login} from '@/services/user'
  export default {
    name: 'loginIndex',
    data () {
      return {
        form: {
          phone: '18201288771',
          password: '111111'
        },
        rules: {
          phone: [
            {required: true, message:'请输入手机号',trigger:"blur"},
            {pattern: /^1\d{10}$/, message:'请输入正确的手机号',trigger:"blur"}
          ],
          password: [
            {required: true, message:'请输入密码',trigger:"blur"},
            {min: 6, max: 18, message:'请输入 6 - 18 位密码',trigger:"blur"}
          ]
        },
        isLoginLoading:false
      }
    },
    methods: {
      async onSubmit () {
        try {
          // 校验
          await this.$refs.form.validate()
          // 发送请求
          this.isLoginLoading = true
          const {data} = await login(this.form)
          this.isLoginLoading = false
          // 响应处理
          if (data.state===1){
            // 将用户信息存储在 Vuex 中
            this.$store.commit('setUser', data.content)
            
            this.$message.success('登录成功')
            this.$router.push(this.$route.query.redirect || '/')
          }else{
            this.$message.error('登录失败 ' + data.message)
          }
        } catch (err) {
          console.log(data.message)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  // 设置内部元素垂直水平居中
  align-items: center;
  justify-content: center;
  .el-form {
    background-color: #fff;
    padding: 20px;
    width: 300px;
    border-radius: 10px;
    .el-button {
      width: 100%;
    }
  }
  
}
</style>
