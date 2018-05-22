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
      addCatForm: {},
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
    }
  }
}
