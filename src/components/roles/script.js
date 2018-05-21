export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('/roles')
      if (res.data.meta.status === 200) {
        console.log(res.data)
        this.tableData = res.data.data
      }
    }
  }
}
