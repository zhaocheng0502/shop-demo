import axios from 'axios'

export default {
  created () {
    // 1. 除了登陆接口，其它接口都需要 token 认证
    // 2. 我们要做的就是按照服务器接口的要求，把 token 放到请求头的 Authorization 字段中
    // 3. 对于接口中的查询字符串，我们可以通过 axios 请求的可选参数 params 来指定传递
    //    params 对象就类似于我们之前使用的 $.ajax 中的 data 选项
    //    params 对象最终会被转换为 key=value&key=value 的格式字符串然后以 ? 分隔拼接到请求地址后面发起请求
    //    这样做的好处就是不需要我们自己去 url 中拼 ?key=value&key=value
    // 服务器 API 除了登陆的接口是可以直接请求处理
    // 其它所有的接口都必须提供登陆成功交换到的 token 发送给服务器才可以
    // 我们这里服务器接口要求必须在请求头中通过一个名字为  Authorization 字段提供 token 令牌
    axios.get('http://localhost:8888/api/private/v1/users', {
      headers: { // headers 是 axios 的 API，固定的
        // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
        // Authorization 是服务器接口的要求，我们不能乱写
        // 也就是说如果接口要求在头里面放一个 a 值为 token
        // 则我们就要
        //    a: window.localStorage.getItem('token')
        Authorization: window.localStorage.getItem('token')
      },
      params: { // params 可以用来指定请求的查询字符串
        pagenum: 1, // 告诉接口服务器，我要获取第 1 页的数据
        pagesize: 5 // 告诉接口服务器，每页5条数据
      }
    })
      .then(res => {
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.tableData = data.users
        }
      })
  },
  data () {
    return {
      tableData: []
    }
  }
}
