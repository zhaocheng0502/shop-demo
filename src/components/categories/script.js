export default {
  created () {
    this.loadCategories()
  },
  data () {
    return {
      tableData: [],
    }
  },
  methods: {
    async loadCategories () {
      const res = await this.$http({
        url: '/categories',
        method: 'get'
      })
      const { meta, data } = res.data
      if (meta.status === 200) {
        this.tableData = data
      }
    }
  }
}
