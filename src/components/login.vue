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
          <!-- 双向数据绑定 因为是在对象里面的  所以用点语法点进去-->
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 用prop 绑定在密码 -->
        <el-form-item label="密码" prop="password">
          <!-- 双向数据绑定 因为是在对象里面的  所以用点语法点进去-->
          <el-input v-model="loginForm.password" @keyup.native.enter="submit('loginForm')"></el-input>
        </el-form-item>
        <el-form-item>
            <!-- 绑定提交按钮 前面是下面的方法名(实参) -->
          <el-button type="primary"  @click="submit('loginForm')">登录</el-button>
          <!-- 绑定重置按钮 前面是下面的方法名(实参) -->
          <el-button type="success"  @click="resetForm('loginForm')">重置</el-button>
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
  },
//   方法
  methods: {
    //   提交按钮 方法(形参)
      submit(formName) {
        //   validate是验证的方法
        // 调接口验证用户名和密码
        this.$refs[formName].validate(async valid => {
          if (valid) {
            // 成功 用promise 的方法
          let res = await this.$axios.post('login',this.loginForm)
          console.log(res);
          if (res.data.meta.status === 400) {
            // 失败
            this.$message.error(res.data.meta.msg)
          }else if(res.data.meta.status === 200){
            // 成功
            this.$message.success(res.data.meta.msg)
            // 用token 保持会话记录
            window.sessionStorage.setItem('token',res.data.meta.msg)
            // 跳转到首页
            this.$router.push('/')
          }else{
            this.$message.error('数据格式错误,请根据提示修改')
          }
          
          } else {
            //   失败就提示用户
            this.$message.error('数据格式错误,请按照规则填写')
            return false;
          }
        });
      },
    //   重置按钮 方法(形参)
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
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
    // .my-btn {
    //   width: 100%;
    // }
  }
}
</style>
