<template>
  <div class="user-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          v-model="sendData.query"
          class="input-with-select"
          @keyup.native.enter="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain class="btn">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="280"></el-table-column>
      <!-- 判断开关 -->
      <el-table-column prop="ms-state" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            @change="statechange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleEdit(scope.$index,scope.row)"
          ></el-button>
          <el-button size="medium" type="danger" plain icon="el-icon-delete"></el-button>
          <el-button size="medium" type="warning" plain icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 总条数
      total: 0,
      sendData: {
        query: "",
        pagesize: 10,
        pagenum: 1
      },
      // 用户数组
      userlist: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    // 搜索调用
    async search() {
      let res = await this.$axios.get("users", {
        // headers: { Authorization: window.sessionStorage.getItem("token") },
        params: this.sendData
      });
      console.log(res);
      this.total = res.data.data.total;
      this.userlist = res.data.data.users;
    },
    // 调用接口修改用户状
    statechange(row) {
      console.log(row);

      this.$axios.put(`users/${row.id}/state/${row.msg_state}`);
    }
  },

  created() {
    this.search();
  }
};
</script>

<style lang="scss">
.user-container {
  background-color: #e9eef3;
  padding: 0;
  .bread {
    height: 45px;
    background: #d3dce6;
    line-height: 45px;
    padding-left: 10px;
  }
  .btn {
    margin-left: 10px;
  }
}
</style>
