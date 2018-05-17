import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleLogin () {
      // ['form'] 中的 form 就是 el-form 标签 ref 属性值
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return
        }
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
          .then(res => {
            const {data, meta} = res.data
            const {msg, status} = meta
            if (status === 200) {
              // 将凭证放到到本地存储（会在路由守卫那里使用）
              window.localStorage.setItem('token', data.token)

              // 跳转到首页
              this.$router.push('/')

              this.$message({
                message: '登陆成功',
                type: 'success'
              })
            } else if (status === 400) {
              this.$message.error(msg)
            }
          })
      })
    }
  }
}
