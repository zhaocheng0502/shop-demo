<template>
<el-container class="container">
  <el-header class="header">Header</el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
.header {
  background-color: #b3c1cd;
}

.container, .aside, .main {
  height: 100%;
}

.aside {
  background-color: #d4dfe4;
}

.main {
  background-color: #eaeef1;
}
</style>
