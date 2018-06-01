<template>
<div>
  <p>vuex-demo component</p>
  <h2>{{ count }}</h2>
</div>
</template>

<script>
// 我们可以直接在组件中通过 this.$store 来访问 Vuex 容器中的数据
export default {
  created () {
    this.$store.dispatch('getUsers')
  },
  data () {
    return {}
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style>
</style>
