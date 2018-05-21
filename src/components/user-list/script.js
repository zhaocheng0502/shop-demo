export default {
  created () {
    // 页码第一次加载，显示第1页数据
    this.loadUsersByPage(1)
  },

  data () {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      searchText: '',
      dialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '密码为 3 - 16 位长度', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      },
      editDialogForm: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      }
    }
  },

  methods: {
    /**
     * 页码改变加载对应页码数据
     */
    handleCurrentChange (page) {
      this.currentPage = page // 页码改变的时候，修改 data 中的数据
      // 在页码改变的时候，请求加载该页码对应的数据
      this.loadUsersByPage(page)
    },

    /**
     * async 方式请求数据
     */
    async loadUsersByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: 2,
          query: this.searchText  // query 参数可选，用来指定查询的筛选条件，这里的筛选条件是用户名
        }
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.tableData = data.users
        this.total = data.total
      }
    },

    /**
     * 处理搜索
     */
    handleSearch () {
      // 点击搜索，调用请求方法加载数据列表
      // 请求方法中会去根据输入框中的内容进行搜索
      this.loadUsersByPage(1)
    },

    /**
     * 添加用户
     */
    async handleAddUser () {
      const res = await this.$http({
        method: 'post',
        url: '/users',
        data: this.addUserForm
      })

      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加用户成功'
        })

        // 关闭对话框
        this.dialogFormVisible = false

        // 清空表单
        this.$refs['form'].resetFields()
      }
    },

    /**
     * 处理改变用户状态
     */
    async handleChangeState (item) {
      const res = await this.$http({
        url: `/users/${item.id}/state/${item.mg_state}`,
        method: 'put'
      })

      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${item.mg_state ? '启用' : '禁用'}成功`
        })
      }
    },

    /**
     * 删除用户
     */
    handleDeleteUser (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // 用户点击 确定 执行这里
        const res = await this.$http({
          url: `/users/${item.id}`,
          method: 'delete'
        })

        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 更新当前页的列表数据
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => { // 用户点击 取消 执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },

    /**
     * 编辑用户
     */
    async handleEditUser () {
      const {id, email, mobile} = this.editUserForm
      const res = await this.$http({
        url: `/users/${id}`,
        method: 'put',
        data: {
          email,
          mobile
        }
      })

      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.editDialogForm = false // 隐藏编辑对话框
        this.loadUsersByPage(this.currentPage) // 更新当前页码列表数据
      }
    },

    /**
     * 显示编辑用户对话框
     */
    async handleShowEditUser (item) {
      const res = await this.$http({
        url: `/users/${item.id}`,
        method: 'get'
      })

      if (res.data.meta.status === 200) {
        this.editUserForm = res.data.data
        this.editDialogForm = true
      }
    }
  }
}
