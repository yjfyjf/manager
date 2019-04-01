<template>
  <el-container class="index-container">
      <!-- 头部 -->
    <el-header class="my-herder">
        <el-col :span="4">
        <img src="../assets/logo.png" alt="">
        </el-col>
        <el-col :span="18">
        <h2>皇家后台管理系统</h2>
        </el-col>
        <el-col :span="2">
        <el-button type="success" class="btn" @click="logout">退出</el-button>
        </el-col>
    </el-header>
    <el-container class="container">
        <!-- 左边 -->
      <el-aside width="200px" class="aside">
          <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <router-link to="users">
          <el-menu-item index="1-2" class="el-icon-menu">用户列表</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
     
    </el-menu>
      </el-aside>
      <!-- 右边 -->
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout(){
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem('token')) {
      
    }else{
      this.$message.error("不登录弄死你")
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="scss">
.index-container {
    height: 100%;
    // display: flex;
    .container{
        display: flex;
        .aside{
            width: 200px;
            background-color: #ffffff;
        }
        .main{
            flex: 1;
            background: #e9eef3;
            padding-top:0;
        }
    }
    .my-herder{
        height: 60px;
        width: 100%;
        background-color: #b3c0d1;
        display: flex;
        h2{
            margin: 0;
            padding: 0;
            text-align: center;
            line-height: 60px;
        }
        .btn{
            margin-top: 10px;
        }
    }
}
</style>
