import BMap from 'BMap'

export default {
  created () {},
  data () {
    return {
      map: null
    }
  },
  methods: {},
  // mounted 类似于 created
  // 组件渲染完毕会自动调用该方法
  // 如果需要操作 DOM ， 则必须写到该函数中
  mounted () {
    // const map = new BMap.Map("bdmap-container")
    this.map = new BMap.Map("bdmap-container")

    // 创建地图实例
    const point = new BMap.Point(116.404, 39.915)

    // 创建点坐标
    this.map.centerAndZoom(point, 15)

    // window.setTimeout(function(){
    //     map.panTo(new BMap.Point(116.409, 39.918));
    // }, 2000);
  },

  methods: {
    handleMove () {
      this.map.panTo(new BMap.Point(116.409, 39.918));
    }
  }
}
