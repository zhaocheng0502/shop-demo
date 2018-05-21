export default {
  created () {
    this.loadRights()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRights () {
      const res = await this.$http.get('/rights/list')
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
    }
  }
}
