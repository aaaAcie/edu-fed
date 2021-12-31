<template>
  <div class="course-section">
        <el-page-header
            @back="$router.push({
                name: 'course'
            })"
            :content='`${courseId}`'
            style="margin-bottom:20px"
        ></el-page-header>
        <el-card>
            <el-tree
                v-loading="isLoading"
                :data="sections"
                :props="defaultProps"
                draggable
                :allow-drop="handleDrop"
                @node-drop="handleNodeDrop"
            >
                <div class="inner" slot-scope="{node,data}">
                    <span>{{node.label}}</span>
                    <!-- section -->
                    <span v-if="data.sectionName" class="actions">
                        <el-button>编辑</el-button>
                        <el-button>添加课时</el-button>
                        <el-button>状态</el-button>
                    </span>
                    <!-- lesson -->
                    <span v-else class="actions">
                        <el-button>编辑</el-button>
                        <el-button @click="$router.push({
                            name: 'course-video',
                            params: {
                                courseId
                            },
                            query: {
                                lessonId: data.id
                            }
                        })">上传视频</el-button>
                        <el-button>状态</el-button>
                    </span>
                </div>
            </el-tree>
        </el-card>
  </div>
</template>

<script>
import {getSectionAndLesson,saveOrUpdateSection,saveOrUpdateLesson} from '@/services/course-section'
export default {
    name: "CourseSection",
    props: {
        courseId: {
            type: [String, Number],
            required: true
        }
    },
    data() {
      return {
        sections: [],
        defaultProps: {
          children: 'lessonDTOS',
          label (data) {
              return data.sectionName || data.theme 
          }
        },
        isLoading: false
      }
    },
    created(){
        this.loadSectionAndLesson()
    },
    methods:{
        // 拖拽成功完成时触发的事件
        // 被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
        async handleNodeDrop(draggingNode, dropNode, type, event){
            this.isLoading = true
            // console.log('draggingNode  ',draggingNode)
            // console.log('dropNode  ',dropNode)
            // console.log('type  ',type)
            // dropNode.parent.childNodes 里有我们需要的东西。
            try {
                Promise.all(dropNode.parent.childNodes.map((item,index) => {
                    // 有 sectionId 就是 lesson
                    if(item.data.sectionId){
                        return saveOrUpdateLesson({
                            id: item.data.id,
                            // 按现在的索引顺序给当前级别列表设置排序序号
                            orderNum: index
                        })
                    } else {
                        return saveOrUpdateSection({
                            id: item.data.id,
                            // 按现在的索引顺序给当前级别列表设置排序序号
                            orderNum: index
                        })
                    }
                }))
                this.$message.success('数据更新成功')
            } catch (error) {
                this.$message.error('数据更新失败', error)
            }
            this.isLoading = false
        },
        handleDrop(draggingNode, dropNode, type){
            return type!=='inner' && draggingNode.data.sectionId === dropNode.data.sectionId
        },
        async loadSectionAndLesson(){
            const {data} = await getSectionAndLesson(this.courseId)
            if(data.code==="000000"){
                this.sections = data.data
                // console.log(this.sections)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.inner {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border-bottom: 1px solid#ebeef5;
}
::v-deep .el-tree-node__content {
    height: auto;

}

</style>