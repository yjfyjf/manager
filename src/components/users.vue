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
        <el-button type="success" plain class="btn" @click="addFormVisible=true">添加用户</el-button>
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
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 点击新增弹框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addform" ref="addform" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑弹框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editform" ref="editform" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editform.username" disabled autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitedit('editform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击角色弹框 -->
    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <el-form ref="editform" :rules="addRules">
        <el-form-item label="当前用户" label-width="100px">{{userrole.username}}</el-form-item>

        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="userrole.role_name" placeholder="请选择">
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitrole('editform')">确 定</el-button>
      </div>
    </el-dialog>
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
      userlist: [],
      // 点击添加用户是否弹出框
      addFormVisible: false,
      // 点击编辑用户是否弹框
      editFormVisible: false,
      // 点击编辑用户是否弹框
      roleFormVisible: false,
      // 点击弹框的时候保存角色名
      userrole: {},
      // 角色下拉框的数据
      rolelist: {},
      // 弹出表单的数据
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 弹出编辑的表单
      editform: {
        username: "",
        email: "",
        mobile: ""
      },
      // 校验表框
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleEdit(index, row) {
      console.log(index); //索引
      console.log(row); //数据
      let res = await this.$axios.get(`users/${row.id}`);
      console.log(res);
      // 渲染数据
      this.editform = res.data.data;

      if (res.data.meta.status == 200) {
        // 弹框
        this.editFormVisible = true;
      }
    },
    // 搜索调用
    async search() {
      let res = await this.$axios.get("users", {
        // headers: { Authorization: window.sessionStorage.getItem("token") },
        params: this.sendData
      });
      // console.log(res);
      this.total = res.data.data.total;
      this.userlist = res.data.data.users;
    },
    // 调用接口修改用户状态
    statechange(row) {
      console.log(row);

      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    // 弹出表单的验证
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 发请求
          let res = await this.$axios.post("users", this.addform);
          console.log(res);
          // 点击添加后重新刷新列表
          if (res.data.meta.status == 201) {
            this.search();
          }
          // 把弹框隐藏
          this.addFormVisible = false;
        } else {
          // 错误  提示用户
          this.$message.error("dear 输的格式不对");
          return false;
        }
      });
    },
    // 修改用户提交
    async submitedit(formName) {
      // 发请求  带id过去
      let res = await this.$axios.put(`users/${this.editform.id}`, {
        // 邮箱
        email: this.editform.email,
        // 电话
        mobile: this.editform.mobile
      });
      // 如果成功  刷新页面
      if (res.data.meta.status === 200) {
        this.search();
      }
      // 弹框关闭
      this.editFormVisible = false;
    },
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
    async submitrole(formName) {
      // 发请求  带id过去
      let res = await this.$axios.put(`users/${this.userrole.id}`, {
        // role_name 点击前是角色名  点击后是id
        rid: this.userrole.role_name
      });
      // 如果成功执行下面代码
      if (res.data.meta.status === 200) {
        // 关闭弹窗
        this.roleFormVisible = false
        // 重新渲染页面
        this.search();
      }
      console.log(res);
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
