export default {
  created () {
    this.loadRoles()
  },
  data () {
    return {
      tableData: [],
      rightDialogVisible: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async loadRoles () {
      const res = await this.$http.get('/roles')
      if (res.data.meta.status === 200) {
        console.log(res.data)
        this.tableData = res.data.data
      }
    },

    /**
     * 显示角色授权对话框
     */

    async showRightDialog () {
      const res = await this.$http('/rights/tree')
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.treeData = data
        this.rightDialogVisible = true
      }
    }
  }
}
