<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form  label="top">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.login {
  height: 100%;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 580px;
    height: 434px;
    background: white;
    padding: 35px;
    box-sizing: border-box;
    border-radius: 10px;
    .my-btn{
        width: 100%;
    }
  }
}
</style>
