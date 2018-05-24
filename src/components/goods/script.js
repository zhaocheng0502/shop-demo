export default {
  created () {
    this.loadGoods()
  },
  data () {
    return {
      tableData: [],
      total: 0,
      loading: true,
      pageSize: 10,
      currentPage: 1
    }
  },
  methods: {
    async loadGoods (page = 1) {
      this.loading = true
      const res = await this.$http({
        url: '/goods',
        method: 'get',
        params: {
          pagenum: page,
          pagesize: this.pageSize
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.tableData = data.goods
        this.total = data.total
        this.loading = false
      }
    },

    handleCurrentChange (page) {
      this.loadGoods(page)
    },

    /**
     * 切换改变每页大小处理
     */
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadGoods(1)
      // 在改变每页大小之后，数据回到了第1页
      // 分页组件的页码也应该回到第1页
      this.currentPage = 1
    }
  }
}
