export default {
  created () {
    this.loadCategories()
  },
  data () {
    return {
      form: {
        goods_name: '',
        goods_cat: [],
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        is_promote: false
      },
      options: []
    }
  },
  methods: {
    async loadCategories () {
      const res = await this.$http({
        url: '/categories',
        method: 'get',
        params: {
          type: 3 // 只加载二级分类列表数据
        }
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.options = data
      }
    },

    async handleAdd () {
      const res = await this.$http({
        url: '/goods',
        method: 'post',
        data: {
          ...this.form,
          goods_cat: this.form.goods_cat.join(',')
        }
      })

      console.log(res.data)
    }
  }
}
