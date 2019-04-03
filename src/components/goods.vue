<template>
  <div class="user-container">
    <!-- 面包屑 my-bread是在全局定义的名字-->  
    <my-bread settitle="商品管理" threetitle="商品列表"></my-bread>
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
        <el-button type="success" plain class="btn" @click="addFormVisible=true">添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="400"></el-table-column>
      <el-table-column prop="email" label="商品价格" width="150"></el-table-column>
      <el-table-column prop="mobile" label="商品重量" width="100"></el-table-column>
      <el-table-column prop="mobile" label="创建时间" width="150"></el-table-column>
      <!-- 判断开关 -->
      <!-- <el-table-column prop="ms-state" label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch
            @change="statechange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column> -->

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
          
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @current-change="currentchange"
      @size-change="sizechange"
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
      // console.log(index); //索引
      // console.log(row); //数据
      // let res = await this.$axios.get(`users/${row.id}`);
      // console.log(res);
      // // 渲染数据
      // this.editform = res.data.data;

      // if (res.data.meta.status == 200) {
      //   // 弹框
      //   this.editFormVisible = true;
      // }
    },
    // 搜索调用
    async search() {
      let res = await this.$axios.get("goods")
      console.log(res);
      // this.total = res.data.data.total;
      // this.userlist = res.data.data.users;
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
    
 
    // 首页用户列表分页器
    currentchange(current){
      //直接调用data里面存的数据赋值
      this.sendData.pagenum = current
      // 重新加载页面
      this.search()
    },
    // 首页用户列表分页器
    sizechange(size){
      // 直接调用data里面存的数据赋值
      this.sendData.pagesize = size
      // 重新加载页面
      this.search()
    }
  },
  created() {
    this.search();
  }
};
</script>






<style lang="scss">

</style>
