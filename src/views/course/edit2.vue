<template>
    <create-or-edit :course-id="courseId" :is-edit="true"></create-or-edit>
</template>

<script>
import CreateOrEdit from './components/CreateOrEdit2'
export default {
    name:"CourseEdit",
    components: {
        CreateOrEdit
    },
    // 接收路由传来的动态参数
    props: {
        courseId: {
            type: [String, Number],
            required: true
        },
    },
    data () {
        return {

        }
    }
}
</script>

<style>

</style>