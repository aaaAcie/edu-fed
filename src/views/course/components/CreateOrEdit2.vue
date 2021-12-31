<template>
  <div class="create-or-edit">
        <el-page-header
            @back="$router.push({
                name: 'course'
            })"
            :content='isEdit ? `${courseInfo.courseName}` : "新增课程"'
            style="margin-bottom:20px"
        ></el-page-header>
        <el-card>
            <div slot="header">
                <el-steps :active="activeStep" finish-status="success" simple>
                    <el-step
                        v-for="(item,i) in steps"
                        :key="item.id"
                        :title="item.title"
                        :icon="item.icon"
                        @click.native="activeStep = i"
                    ></el-step>
                </el-steps>
            </div>
            <el-form label-position="right" label-width="80px" :model="courseInfo"  style="margin-top:20px;">
                <div v-show="activeStep === 0">
                    <el-form-item label="课程名称" :rules="[{ required: true, message: '不能为空', trigger: 'blur'}]">
                        <el-input v-model="courseInfo.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="课程简介">
                        <el-input v-model="courseInfo.brief"></el-input>
                    </el-form-item>
                    <el-form-item label="课程概述">
                        <el-input
                            v-model="courseInfo.previewFirstField"
                            placeholder="概述1"
                            style="width: 49%;min-width: 300px; margin-right: 15px;"
                        >
                            <template slot="append">{{ courseInfo.previewFirstField.length }}/20</template>
                        </el-input>
                        <el-input
                            v-model="courseInfo.previewSecondField"
                            placeholder="概述2"
                            style="width: 49%;min-width: 300px;"
                        >
                            <template slot="append">{{ courseInfo.previewSecondField.length }}/20</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="讲师姓名">
                        <el-input v-model="courseInfo.teacherDTO.teacherName"></el-input>
                    </el-form-item>
                    <el-form-item label="讲师简介">
                        <el-input v-model="courseInfo.teacherDTO.description"></el-input>
                    </el-form-item>
                    <el-form-item label="课程排序">
                        <!-- <el-input v-model="courseInfo.sortNum"></el-input> -->
                        <el-input-number v-model="courseInfo.sortNum" label="课程排序"></el-input-number>
                    </el-form-item>
                </div>
                <div v-show="activeStep === 1">
                    <el-form-item label="课程封面">
                        <!-- <el-input v-model="courseInfo.courseListImg"></el-input> -->
                        <course-image v-model="courseInfo.courseListImg"></course-image>
                        
                    </el-form-item>
                    <el-form-item label="解锁封面">
                        <!-- <el-input v-model="courseInfo.courseImgUrl"></el-input> -->
                        <course-image v-model="courseInfo.courseImgUrl"></course-image>
                    </el-form-item>
                </div>
                <!--  销售信息 -->
                <div v-show="activeStep === 2">
                    <el-form-item label="售卖价格" :rules="[{ required: true, message: '不能为空', trigger: 'blur'}]">
                        <el-input v-model="courseInfo.price" type="number" :min="0">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品原价">
                        <el-input v-model="courseInfo.discounts" type="number" :min="0">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="销量" type="number" :min="0">
                        <el-input v-model="courseInfo.sales">
                            <template slot="append">单</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="活动标签">
                        <el-input v-model="courseInfo.discountsTag"></el-input>
                    </el-form-item>
                </div>
                <!-- 秒杀活动 -->
                <div v-show="activeStep === 3">
                    <el-form-item label="限时秒杀开关" label-width="120px">
                        <el-switch
                            v-model="courseInfo.activityCourse"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </el-form-item>
                    <template v-if="courseInfo.activityCourse">
                        <el-form-item label="开始时间">
                            <el-date-picker
                                v-model="courseInfo.activityCourseDTO.beginTime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="结束时间">
                            <el-date-picker
                                v-model="courseInfo.activityCourseDTO.endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="秒杀价">
                            <el-input
                                v-model="courseInfo.activityCourseDTO.amount"
                                type="number"
                                :min="0"
                            >
                                <template slot="append">元</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="库存">
                            <el-input
                                v-model="courseInfo.activityCourseDTO.stock"
                                type="number"
                                :min="0"
                            >
                                <template slot="append">个</template>
                            </el-input>
                        </el-form-item>
                    </template>
                </div>
                <!-- 课程详情 -->
                <div v-show="activeStep === 4">
                    <el-form-item label="课程详情">
                        <!-- <text-editor v-model="courseInfo.courseDescriptionMarkDown"></text-editor> -->
                        <!-- <el-input type="textarea" v-model="courseInfo.courseDescriptionMarkDown"></el-input> -->
                        <!-- <div ref="editor"></div> -->
                        <text-editor v-model="courseInfo.courseDescriptionMarkDown"></text-editor>
                    </el-form-item>
                    <el-form-item label="是否上架">
                        <el-switch
                            v-model="courseInfo.status"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            ></el-switch>
                    </el-form-item>
                    <!-- 最后步骤中设置保存按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存并提交</el-button>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button
                        v-if="activeStep !== steps.length - 1"
                        @click="activeStep++" 
                        >下⼀步
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
  </div>
</template>

<script>
import {getCourseById,saveOrUpdateCourse} from '@/services/courses'
import CourseImage from './CourseImage2'
import TextEditor from '@/components/TextEditor'

export default {
    name: "CreateOrEdit",
    components: {
        // TextEditor
        CourseImage,
        TextEditor
    },
    props:{
        isEdit: {
            type: Boolean,
            default:false
        },
        courseId: {
            type: [String, Number],
            default:''
        }
    },
    created(){
        if(this.isEdit){
            this.loadGetCourse()
            console.log('loading....')
        }
    },
    data () {
        return {
            courseInfo: {
                courseName:'',
                brief:'',
                teacherName:'',
                description: '',
                previewFirstField: '',
                previewSecondField:'',
                courseListImg: '',
                courseImgUrl: '',
                sortNum: '',
                teacherDTO: {
                    // id: 0,
                    // courseId: 0,
                    // 讲师名称
                    teacherName: '',
                    teacherHeadPicUrl: '',
                    position: '',
                    // 讲师介绍
                    description: ''
                    },
                status:0,
                // 课程详情内容
                courseDescriptionMarkDown: '',
                // 商品原价
                price: 0,
                // 售卖价格
                discounts: 0,
                // 活动标签
                discountsTag: '',
                // 销量
                sales: 0,
                // 参与秒杀活动的课程
                activityCourse: false,
                activityCourseDTO: {
                    // id: 0,
                    // courseId: 0,
                    // 秒杀活动开始时间
                    beginTime: '',
                    // 结束时间
                    endTime: '',
                    // 秒杀活动价格
                    amount: 0,
                    // 秒杀库存
                    stock: 0
                }
            },
            activeStep:0,
            steps: [
                { id: 1, title: '基本信息', icon: 'el-icon-edit' },
                { id: 2, title: '课程封面', icon: 'el-icon-upload' },
                { id: 3, title: '销售信息', icon: 'el-icon-picture' },
                { id: 4, title: '秒杀信息', icon: 'el-icon-picture' },
                { id: 5, title: '课程详情', icon: 'el-icon-picture' }
            ],
            imageUrl:""
        }
    },
    methods: {
        async onSubmit(){
            const {data} = await saveOrUpdateCourse(this.courseInfo)
            if(data.code==="000000"){
                // this.$message.success('提交成功')
                this.$router.push('/course')
                this.$message.success(`${this.isEdit ? '编辑' : '添加'}课程成功`)
                // this.$router.push({name: 'course'})
            }
        },
        async loadGetCourse(){
            const {data} = await getCourseById(this.courseId)
            console.log(data)
            if(data.code==="000000"){
                if (!data.data.activityCourse){
                    data.data.activityCourseDTO = {
                        beginTime: '',
                        // 结束时间
                        endTime: '',
                        // 秒杀活动价格
                        amount: 0,
                        // 秒杀库存
                        stock: 0
                    }
                }
                this.courseInfo = data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-step {
    cursor: pointer
}
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