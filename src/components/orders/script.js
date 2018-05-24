import { regionData } from 'element-china-area-data'
console.log(regionData)

export default {
  created () {
    this.loadOrders()
  },
  data () {
    return {
      tableData: [],
      regionData, // 省市县三级数据
      region: []
    }
  },
  methods: {
    async loadOrders () {
      const res = await this.$http({
        url: '/orders',
        method: 'get',
        params: {
          pagenum: 1,
          pagesize: 5
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.tableData = data.goods
      }
    }
  }
}
