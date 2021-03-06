// 富文本编辑器相关资源
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  created () {
    this.loadCategories()
  },
  data () {
    return {
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        is_promote: false,
        pics: [
          // {
          //   "pic": "tmp_uploads/2fd6791f5aa96f5bf3e36a8af1e177dd.png"
          // }
        ],
        goods_introduce: ''
      },
      tabActiveName: 'first',
      defaultStepActive: 0,
      options: [],
      editorOption: {}, // 富文本编辑器配置对象
      fileList: [
        // {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        // {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      headers: {
        Authorization: window.localStorage.getItem('token')
      }
    }
  },
  methods: {
    /**
     * 加载商品分类
     */
    async loadCategories () {
      const res = await this.$http({
        url: '/categories',
        method: 'get',
        params: {
          type: 3
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.options = data
      }
    },

    /**
     * 添加商品
     */
    async handleAdd () {
      const res = await this.$http({
        url: '/goods',
        method: 'post',
        data: {
          ...this.form,
          goods_cat: this.form.goods_cat.join(',')
        }
      })

      const {meta, data} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加商品成功'
        })
        this.$router.push('/goods')
      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList)
    },

    handlePreview(file) {
      console.log(file)
    },

    handleUploadSuccess (response, file, fileList) {
      this.form.pics.push({
        pic: response.data.tmp_path
      })
    },

    onEditorBlur () {
      console.log('onEditorBlur')
    },

    onEditorFocus () {
      console.log('onEditorFocus')
    },

    onEditorReady () {
      console.log('onEditorReady')
    },

    handleNextStep (tabName, step) {
      this.tabActiveName = tabName
      this.defaultStepActive = step
    },

    handleTabClick (tab) {
      this.defaultStepActive = tab.index - 0
    }
  },
  components: {
    quillEditor
  }
}
