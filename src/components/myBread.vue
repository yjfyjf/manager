<template>
<!-- 面包屑 -->
     <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- 动态赋值 -->
      <el-breadcrumb-item>{{settitle}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    // 关联上面的
    props:['settitle','threetitle']
}
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
