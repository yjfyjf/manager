<template>
  <div class="user-container">
    <!-- 面包屑 my-bread是在全局定义的名字-->  
    <my-bread settitle="权限管理" threetitle="角色列表"></my-bread>
    <!-- 输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button type="default" plain  @click="addFormVisible=true">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column width="50"></el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="280"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="280"></el-table-column>

      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="handleEdit(scope.$index,scope.row)"
          ></el-button>
          <el-button
            @click="delOne(scope.row)"
            size="medium"
            type="danger"
            plain
            icon="el-icon-delete"
          ></el-button>
          <el-button
            size="medium"
            @click="showrole(scope.row)"
            type="warning"
            plain
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // 角色的数组
      userlist:[]
    }
  },
  methods: {
    async handleEdit(index, row) {
      // console.log(index); //索引
      // console.log(row); //数据
      // let res = await this.$axios.get("roles");
      // console.log(res);
      // 渲染数据
      // this.editform = res.data.data;

      // if (res.data.meta.status == 200) {
      //   // 弹框
      //   // this.editFormVisible = true;
      // }
    },
    // 搜索调用
    async search() {
      let res = await this.$axios.get("roles")
      console.log(res);
      // this.total = res.data.data.total;
      // this.userlist = res.data.rowKey.data;
    },
    // 调用接口修改用户状态
    // statechange(row) {
    //   console.log(row);

    //   this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    // },
    // // 弹出表单的验证
    // submitAdd(formName) {
    //   this.$refs[formName].validate(async valid => {
    //     if (valid) {
    //       // 发请求
    //       let res = await this.$axios.post("users", this.addform);
    //       console.log(res);
    //       // 点击添加后重新刷新列表
    //       if (res.data.meta.status == 201) {
    //         this.search();
    //       }
    //       // 把弹框隐藏
    //       this.addFormVisible = false;
    //     } else {
    //       // 错误  提示用户
    //       this.$message.error("dear 输的格式不对");
    //       return false;
    //     }
    //   });
    // },
    // 修改用户提交
    // async submitedit(formName) {
    //   // 发请求  带id过去
    //   let res = await this.$axios.put(`users/${this.editform.id}`, {
    //     // 邮箱
    //     email: this.editform.email,
    //     // 电话
    //     mobile: this.editform.mobile
    //   });
    //   // 如果成功  刷新页面
    //   if (res.data.meta.status === 200) {
    //     this.search();
    //   }
    //   // 弹框关闭
    //   this.editFormVisible = false;
    // },
    // 删除用户
    delOne(row) {
      this.$confirm("确定删除吗  老弟, 想清楚?", "提示", {
        confirmButtonText: "不删你删谁",
        cancelButtonText: "那就等等",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你真好"
          });
        });
    },
    // 点击√ 角色弹框
    async showrole(row) {
      console.log(row);
      // 保存角色名
      this.userrole = row;
      let res = await this.$axios.get("roles");
      console.log(res);
      // 赋值
      this.rolelist = res.data.data;
      // 弹出框
      this.roleFormVisible = true;
    },
    // 点击确定重新获取数据
    // async submitrole(formName) {
    //   // 发请求  带id过去
    //   let res = await this.$axios.put(`users/${this.userrole.id}`, {
    //     // role_name 点击前是角色名  点击后是id
    //     rid: this.userrole.role_name
    //   });
    //   // 如果成功执行下面代码
    //   if (res.data.meta.status === 200) {
    //     // 关闭弹窗
    //     this.roleFormVisible = false
    //     // 重新渲染页面
    //     this.search();
    //   }
    //   console.log(res);
    // },
    // 首页用户列表分页器
    // currentchange(current){
    //   //直接调用data里面存的数据赋值
    //   this.sendData.pagenum = current
    //   // 重新加载页面
    //   this.search()
    // },
    // // 首页用户列表分页器
    // sizechange(size){
    //   // 直接调用data里面存的数据赋值
    //   this.sendData.pagesize = size
    //   // 重新加载页面
    //   this.search()
    // }
  },
  created() {
    this.search();
  }
};
</script>






<style>

</style>
