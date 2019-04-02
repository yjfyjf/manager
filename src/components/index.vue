<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="my-herder">
      <el-col :span="4">
        <img src="../assets/logo.png" alt>
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
        <el-menu router default-active="users" class="el-menu-vertical-demo">
          <el-submenu :index="''+item.id" v-for="item in mentlist">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="it.path" class="el-icon-menu" v-for="it in item.children">
                {{it.authName}}
                </el-menu-item>
              
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
  data(){
    return {
      mentlist:[]
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem("token")) {
    } else {
      this.$message.error("不登录弄死你");
      this.$router.push("/login");
    }
  },
  // 发请求获取首页左侧权限列表0.
  async created() {
  let res = await  this.$axios.get("menus")
  console.log(res);
  // 赋值
  this.mentlist = res.data.data
  

  },
};
</script>

<style lang="scss">
.index-container {
  height: 100%;
  .container {
    display: flex;
    .aside {
      width: 200px;
      background-color: #ffffff;
    }
    .main {
      flex: 1;
      background: #e9eef3;
      padding-top: 0;
    }
  }
  .my-herder {
    height: 60px;
    width: 100%;
    background-color: #b3c0d1;
    display: flex;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
      line-height: 60px;
    }
    .btn {
      margin-top: 10px;
      margin-left: 0;
    }
  }
}
</style>
