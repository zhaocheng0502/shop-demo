export default {
  created () {
    this.loadGoods()
  },
  data () {
    return {
      tableData: [],
      total: 0,
      loading: true
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
          pagesize: 5
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
    }
  }
}
