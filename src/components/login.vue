<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form
        label="top"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <!-- 用prop 绑定在用户名上 -->
        <el-form-item label="用户名" prop="username">
          <!-- 双向数据绑定 -->
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 用prop 绑定在密码 -->
        <el-form-item label="密码" prop="password">
          <!-- 双向数据绑定 -->
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  // data以函数的形式
  data() {
    return {
      //   返回的是一个对象
      loginForm: {
        // 用户名
        username: "",
        //   密码
        password: ""
      },
      // 设置提示消息以及长度设置
      rules: {
        // 用户名
        username: [
          //  required: true  必填项
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        //   密码
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  }
};
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
    .my-btn {
      width: 100%;
    }
  }
}
</style>
