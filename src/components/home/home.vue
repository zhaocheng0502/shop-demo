<template>
<el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="4">
        <img src="./logo.png" alt="黑马程序员">
      </el-col>
      <el-col :span="14">电商后台管理系统</el-col>
      <el-col :span="2">{{ count }}</el-col>
      <el-col :span="4">
        <a @click.prevent="handleLogout" href="#">退出</a>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <el-menu
        default-active="2"
        class="nav-menu"
        :router="true"
        :unique-opened="true"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu
          v-for="level1 in menus"
          :index="level1.path"
          :key="level1.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ level1.authName }}</span>
          </template>
          <el-menu-item
            :index="'/' + level2.path"
            v-for="level2 in level1.children"
            :key="level2.id">{{ level2.authName }}</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/roles">角色列表</el-menu-item>
          <el-menu-item index="/rights">权限列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="3-1">商品列表</el-menu-item>
          <el-menu-item index="3-2">分类参数</el-menu-item>
          <el-menu-item index="3-3">商品分类</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="4-1">订单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item index="5-1">数据报表</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view />
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  created () {
    this.loadMenus()
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    /**
     *
     */
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },

    /**
     *
     */
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    /**
     * 用户退出
     */
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 用户点击 确定 执行这里
        // 1. 删除本地存储中的 token，也就是清除登陆状态
        window.localStorage.removeItem('token')

        // 2. 跳转到 /login
        this.$router.push('/login')

        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => { // 用户点击 取消 执行这里
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },

    /**
     * 加载左侧菜单权限列表
     */
    async loadMenus () {
      const res = await this.$http({
        url: '/menus',
        method: 'get'
      })
      const {meta, data} = res.data
      if (meta.status === 200) {
        this.menus = data
      }
    }
  },

  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
</script>

<style>
.header {
  line-height: 60px;
  background-color: #b3c1cd;
}

.container, .aside, .main, .aside .nav-menu {
  height: 100%;
}

.aside {
  background-color: #d4dfe4;
}

.main {
  background-color: #eaeef1;
}
</style>
