import axios from 'axios'

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    handleLogin () {
      axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          const {data, meta} = res.data
          const {msg, status} = meta
          if (status === 200) {
            // 将凭证放到到本地存储（会在路由守卫那里使用）
            window.localStorage.setItem('token', data.token)

            // 跳转到首页
            this.$router.push('/')
          } else if (status === 400) {
            window.alert(msg)
          }
        })
    }
  }
}
