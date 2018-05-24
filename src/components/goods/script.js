export default {
  created () {
    this.loadGoods()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadGoods () {
      const res = await this.$http({
        url: '/goods',
        method: 'get',
        params: {
          pagenum: 1,
          pagesize: 5
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.tableData = data.goods
      }
    }
  }
}
