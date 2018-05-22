export default {
  created () {
    this.loadCategories()
  },
  data () {
    return {
      tableData: [],
      total: 0,
      loading: true,
      addCatDialog: false,
      addCatForm: {
        cat_name: '',
        cat_pid: []
      },
      options: []
    }
  },
  methods: {
    async loadCategories (page = 1) {
      this.loading = true
      const res = await this.$http({
        url: '/categories',
        method: 'get',
        params: {
          pagenum: page,
          pagesize: 5
        }
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.total = data.total
        this.tableData = data.result
        this.loading = false // 取消 loading 效果
      }
    },

    /**
     * 处理分页页码改变
     */
    handleCurrentChange (page) {
      this.loadCategories(page)
    },

    /**
     * 处理显示添加分类对话框
     */
    async handleShowAddCat () {
      const res = await this.$http({
        url: '/categories',
        method: 'get',
        params: {
          type: 2 // 只加载二级分类列表数据
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.options = data
        this.addCatDialog = true // 显示弹框
      }
    },

    /**
     * 处理添加分类
     */
    async handleAddCat () {
      const {cat_name, cat_pid} = this.addCatForm

      const res = await this.$http({
        url: '/categories',
        method: 'post',
        data: {
          cat_pid: cat_pid[cat_pid.length - 1],
          cat_name,
          cat_level: cat_pid.length
        }
      })
      const {data, meta} = res.data
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加分类成功'
        })
        this.loadCategories() // 重新加载列表数据
        this.addCatDialog = false // 隐藏对话框
      }
    }
  }
}
