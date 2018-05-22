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
      },
      currentRighting: null, // 存储正在被授权的角色
      defaultChecked: []
    }
  },
  methods: {
    /**
     * 加载角色列表
     */
    async loadRoles () {
      const res = await this.$http.get('/roles')
      if (res.data.meta.status === 200) {
        this.tableData = res.data.data
      }
    },

    /**
     * 显示角色授权对话框
     */
    async showRightDialog (role) {
      this.currentRighting = role
      const tmp = []
      role.children.forEach(level1 => {
        level1.children.forEach(level2 => {
          level2.children.forEach(level3 => {
            tmp.push(level3.id)
          })
        })
      })

      this.defaultChecked = tmp

      const res = await this.$http('/rights/tree')
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.treeData = data
        this.rightDialogVisible = true
      }
    },

    /**
     * 编辑权限
     */
    async handleEditRight () {
      // 1. 获取到树控件中所有选中的树节点
      let checkedNodes = this.$refs['rightTree'].getCheckedNodes()

      // 1.1 将半选的节点也拿过来
      checkedNodes = checkedNodes.concat(this.$refs['rightTree'].getHalfCheckedNodes())

      // 2. 遍历所有选中的树节点，统计选中节点的 id
      const tmp = []
      checkedNodes.forEach(item => {
        tmp.push(item.id)
      })

      // 3. 发请求，执行更新权限操作
      const res = await this.$http({
        url: `/roles/${this.currentRighting.id}/rights`,
        method: 'post',
        data: {
          rids: tmp.join(',')
        }
      })

      // 4. 请求响应处理
      const {meta} = res.data
      if (meta.status === 200) {
        this.rightDialogVisible = false // 关闭对话框
        this.loadRoles() // 重新加载角色列表数据
        this.$message({
          type: 'success',
          message: '角色权限更新成功'
        })
      }
    },

    /**
     * 删除角色指定权限
     */
    async handleDeleteRight (role, right) {
      console.log('handleDeleteRight: ', role.id, right.id)
      const res = await this.$http({
        url: `/roles/${role.id}/rights/${right.id}`,
        method: 'delete'
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        // 删除角色成功之后，服务器把该角色最新的权限列表返回给我们了
        role.children = data
      }
    }
  }
}
