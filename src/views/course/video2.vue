<template>
  <div class="course-video">
      <el-card>
          <div slot="header">
            课程相关信息
          </div>
          <el-form label-position="right" label-width="80px" :model="formLabelAlign">
            <el-form-item label="课程">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="课时">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="视频上传">
                <input ref="video-upload" type="file">
            </el-form-item>
            <el-form-item label="封面上传">
                <input ref="image-upload" type="file">
            </el-form-item>
            <el-button type="primary" @click="handleUpload">开始上传</el-button>
            <el-button @click="$router.push({
                name: 'course-section',
                params: {
                    courseId
                }
            })">返回</el-button>
            <el-form-item>
                <p v-if="uploadPercent !== 0">视频上传中：{{ uploadPercent }}%</p>
                <p v-if="isUploadSuccess">视频转码中：{{ isTranscodeSuccess ? '完成' : '正在转码，请稍后...' }} </p>
            </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import {
    aliyunImageUploadAddressAndAuth,
    aliyunVideoUploadAddressAndAuth,
    aliyunVideoTranscode,
    getAliyunTranscodePercent
} from '@/services/aliyun-upload'
export default {
    name: 'CourseVideo',
    props: {
        courseId: {
            type: [String,Number],
            required: true
        }
    },
    data (){
        return {
            formLabelAlign:{},
            uploader:null,
            imageURL: '',
            videoId: null,
            uploadPercent: 0,
            isUploadSuccess: false,
            isTranscodeSuccess: false
        }
    },
    created(){
        this.loadUpload()
    },
    methods: {
        handleUpload(){
            this.isTranscodeSuccess = false
            this.isUploadSuccess = false
            this.uploadPercent = 0
            // console.log(this.$refs['video-upload'])
            const videoFile = this.$refs['video-upload'].files[0]
            const imageFile = this.$refs['image-upload'].files[0]
            const uploader = this.uploader
            // 开始上传
            uploader.addFile(imageFile)
            uploader.addFile(videoFile)
            uploader.startUpload()
        },
        loadUpload(){
            this.uploader = new window.AliyunUpload.Vod({
                //userID，必填，只需有值即可。
                userId:"1618139964448548",
                //上传到视频点播的地域，默认值为'cn-shanghai'，
                //eu-central-1，ap-southeast-1
                region:"",
                //分片大小默认1 MB，不能小于100 KB，此参数单位默认为 B
                partSize: 1048576,
                //并行上传分片个数，默认5
                parallel: 5,
                //网络原因失败时，重新上传次数，默认为3
                retryCount: 3,
                //网络原因失败时，重新上传间隔时间，默认为2秒
                retryDuration: 2,
                //开始上传
                onUploadstarted: async (uploadInfo) => {
                    let uploadAddressAndAuth = null
                    if(uploadInfo.isImage){
                        const {data} = await aliyunImageUploadAddressAndAuth()
                        if(data.code==='000000'){
                            // 上传凭证
                            uploadAddressAndAuth = data.data
                            this.imageURL = uploadAddressAndAuth.imageURL
                        }
                    }else{
                        const {data} = await aliyunVideoUploadAddressAndAuth({
                            fileName: uploadInfo.file.name,
                            imageUrl: this.imageURL
                        })
                        if(data.code==='000000'){
                            uploadAddressAndAuth = data.data
                            this.imageURL = uploadAddressAndAuth.imageURL
                            this.videoId = data.data.videoId
                        }
                    }
                    // 设置凭证
                    this.uploader.setUploadAuthAndAddress(
                        uploadInfo,
                        uploadAddressAndAuth.uploadAuth,
                        uploadAddressAndAuth.uploadAddress,
                        uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
                    )
                },
                //文件上传成功
                'onUploadSucceed': function (uploadInfo) {
                },
                //文件上传失败
                'onUploadFailed': function (uploadInfo, code, message) {
                },
                //文件上传进度，单位：字节
                'onUploadProgress': (uploadInfo, totalSize, loadedPercent) => {
                    // 只对视频上传进度进⾏监测即可
                    if (!uploadInfo.isImage) {
                        this.uploadPercent = Math.floor(loadedPercent * 100)
                    }
                },
                //上传凭证或STS token超时
                'onUploadTokenExpired': function (uploadInfo) {
                },
                //全部文件上传结束
                'onUploadEnd': async (uploadInfo) => {
                    this.isUploadSuccess = true
                    // console.log(this.$route.query.lessonId, this.imageURL,this.$refs['video-upload'].files[0].name,this.videoId)
                    const { data } = await aliyunVideoTranscode({
                        lessonId: this.$route.query.lessonId,
                        coverImageUrl: this.imageURL,
                        fileName: this.$refs['video-upload'].files[0].name,
                        fileId: this.videoId
                    })
                    console.log(data)
                    if (data.code === '000000') {
                        // 转码开始后，需要轮询转码进度
                        this.isTranscodeSuccess = true
                        const timer = setInterval(async () => {
                            const { data } = getAliyunTranscodePercent(this.$route.query.lessonId)
                            if (data === 100) {
                                // 当上传进度为 100，停⽌定时器，并进⾏提示
                                clearInterval(timer)
                                this.$message.success('转码成功')
                            }
                        }, 1000)
                    }
                }
            })
        }
    }
}
</script>

<style>

</style>