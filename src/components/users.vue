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
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" plain class="btn">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" label="序号" width="80" colspan="1"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="date" label="邮箱" width="280"></el-table-column>
      <el-table-column prop="address" label="电话" width="280"></el-table-column>
      <el-table-column prop="user" label="用户状态" width="80">
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="240">
        <el-button type="primary" plain icon="el-icon-edit"></el-button>
        <el-button type="danger" plain icon="el-icon-share"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          num: "1",
          name: "王小虎",
          date: "2016-05-02",
          address: "12345678900"
        },
        {
          num: "2",
          name: "王小虎",
          date: "2016-05-04",
          address: "12345678900"
        },
        {
          num: "3",
          name: "王小虎",
          date: "2016-05-01",
          address: "12345678900"
        },
        {
          num: "4",
          name: "王小虎",
          date: "2016-05-03",
          address: "12345678900"
        }
      ]
    };
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
