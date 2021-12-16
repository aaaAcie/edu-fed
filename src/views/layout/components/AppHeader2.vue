<template>
  <div class="app-header">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
        <span class="el-dropdown-link">
            <el-avatar
            :size="30"
            :src= "userInfo.portrait || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            ></el-avatar>
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
            <el-dropdown-item
            @click.native="handleLogout"
            divided
            >退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo } from '@/services/user'

export default {
    name: 'AppHeader',
    created(){
        this.loadUserInfo()
        this.loadUserInfo()

    },
    data(){
        return {
            // 为了让模板绑定
            userInfo: {}
        }
    },
    methods: {
        async loadUserInfo (){
            const {data} = await getUserInfo()
            this.userInfo = data.content
        },
        handleLogout(){
            // 确认提示使⽤ $confirm()，确定触发 then()，取消触发 catch()
            this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$store.commit('setUser',null)
            this.$router.push('/login')
            this.$message({
                type: 'success',
                message: '退出成功!'
            })
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消退出'
            })        
            })

            // this.$store.commit('setUser',null)
            // this.$router.push('/login')
        }
    }
}
</script>

<style lang='scss' scoped>
    .app-header{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-dropdown-link {
        display: flex;
        align-items: center;
    }
</style>