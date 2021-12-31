<template>
  <div class="course-image">
      <el-progress
        v-if="isLoading"
        type="circle"
        :percentage="precentage"
        :width="178"
        :status="precentage===100 ? 'success':'undefined'"
      ></el-progress>
      <el-upload
        v-else
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handleUpload">
            <img v-if="value" :src="value" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
  </div>
</template>

<script>
import {uploadImg} from '@/services/courses'

export default {
    name:"CourseImage",
    props:{
        value:{
            type: String
        }
    },
    data () {
        return {
            isLoading:false,
            precentage:0
        }
    },
    methods: {
        async handleUpload (options) {
            this.isLoading = true
            // console.log(options)
            const fd = new FormData()
            fd.append('file',options.file)
            const {data} = await uploadImg(fd,event =>{
                this.precentage = Math.floor(event.loaded/event.total*100)
            })
            if(data.code==="000000"){
                this.$emit('input',data.data.name)
                this.$message.success('上传成功')
                this.precentage = 0
            }
            this.isLoading = false
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!')
            // }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            // return isJPG && isLt2M;
            return isLt2M

        },
    }
}
</script>

<style lang="scss" scoped>
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>