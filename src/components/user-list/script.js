import axios from 'axios'

export default {
  created () {
    // 页码第一次加载，显示第1页数据
    this.loadUsersByPage(1)
  },
  data () {
    return {
      tableData: [],
      total: 0,
      searchText: '',
      dialogFormVisible: false,
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    handleCurrentChange (page) {
      // 在页码改变的时候，请求加载该页码对应的数据
      this.loadUsersByPage(page)
    },

    loadUsersByPage (page) {
      // 1. 除了登陆接口，其它接口都需要 token 认证
      // 2. 我们要做的就是按照服务器接口的要求，把 token 放到请求头的 Authorization 字段中
      // 3. 对于接口中的查询字符串，我们可以通过 axios 请求的可选参数 params 来指定传递
      //    params 对象就类似于我们之前使用的 $.ajax 中的 data 选项
      //    params 对象最终会被转换为 key=value&key=value 的格式字符串然后以 ? 分隔拼接到请求地址后面发起请求
      //    这样做的好处就是不需要我们自己去 url 中拼 ?key=value&key=value
      // 服务器 API 除了登陆的接口是可以直接请求处理
      // 其它所有的接口都必须提供登陆成功交换到的 token 发送给服务器才可以
      // 我们这里服务器接口要求必须在请求头中通过一个名字为  Authorization 字段提供 token 令牌
      // axios.get('http://localhost:8888/api/private/v1/users', {
      //   headers: { // headers 是 axios 的 API，固定的
      //     // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      //     // Authorization 是服务器接口的要求，我们不能乱写
      //     // 也就是说如果接口要求在头里面放一个 a 值为 token
      //     // 则我们就要
      //     //    a: window.localStorage.getItem('token')
      //     Authorization: window.localStorage.getItem('token')
      //   },
      //   // 请求用户列表接口支持分页
      //   // pagenum 第几页
      //   // pagesize 每页多大
      //   //
      //   params: { // params 可以用来指定请求的查询字符串
      //     pagenum: 1, // 告诉接口服务器，我要获取第 1 页的数据
      //     pagesize: 2 // 告诉接口服务器，每页5条数据
      //   }
      // })
      //   .then(res => {
      //     const {data, meta} = res.data
      //     if (meta.status === 200) {
      //       this.tableData = data.users
      //       this.total = data.total
      //     }
      //   })
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: {
          Authorization: window.localStorage.getItem('token')
        },
        params: {
          pagenum: page,
          pagesize: 2,
          query: this.searchText  // query 参数可选，用来指定查询的筛选条件，这里的筛选条件是用户名
        }
      }).then(res => {
          const {data, meta} = res.data
          if (meta.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    },

    /**
     * 处理搜索
     */
    handleSearch () {
      // 点击搜索，调用请求方法加载数据列表
      // 请求方法中会去根据输入框中的内容进行搜索
      this.loadUsersByPage(1)
    }
  }
}
