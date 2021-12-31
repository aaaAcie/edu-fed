<template>
  <div class="text-editor" ref="editor"></div>
</template>

<script>
import E from 'wangeditor'
import {uploadImg} from '@/services/courses'

export default {
    name: "TextEditor",
    props: {
        value: {
            type:String,
            default:''
        }
    },
    data () {
        return {
            editor: null,
            isLoaded: false
        }
    },
    mounted (){
        this.loadEditor()
    },
    methods:{
        loadEditor () {
            const editor = new E(this.$refs.editor)
            // 配置 onchange 函数之后，用户操作（鼠标点击、键盘打字等）导致的内容变化之后，会自动触发 onchange 函数执行。
            editor.config.onchange = value => {
                // console.log("change 之后最新的 html", val)
                this.$emit('input',value)
            }
            editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法
                const fd = new FormData()
                fd.append('file',resultFiles[0])
                const {data} = await uploadImg(fd)
                // 上传图片，返回结果，将图片插入到编辑器中
                if (data.code==="000000"){
                    insertImgFn(data.data.name)
                }
            }
            editor.create()
            // 设置初始内容
            console.log(this.value)
            editor.txt.html(this.value)
            this.editor = editor
        },
    },
    watch: {
        value () {
            if (!this.isLoaded){
                this.editor.txt.html(this.value)
                this.isLoaded = true
            }
        }
    }
}
</script>

<style>

</style>