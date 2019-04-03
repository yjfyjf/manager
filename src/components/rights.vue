<template>
  <div class="user-container">
    <!-- 面包屑 my-bread是在全局定义的名字-->  
    <my-bread settitle="权限管理" threetitle="权限列表"></my-bread>
    
    <!-- 表格 -->
    <el-table :data="rightlist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="300"></el-table-column>
      <el-table-column prop="path" label="路径" width="300"></el-table-column>
      <el-table-column prop="level" label="层级" width="300">
       <template slot-scope="scope">
         <span v-if="scope.row.level==='0'">一级</span>
         <span v-if="scope.row.level==='1'">二级</span>
         <span v-if="scope.row.level==='2'">三级</span>
       </template>
      </el-table-column>
    </el-table>
  
  </div>
</template>

<script>
export default {
  name:'rights',
  data() {
    return {
      rightlist:[]
    };
  },

    // 搜索调用
    async created() {
      let res = await this.$axios.get("rights/list")
        console.log(res);
      this.rightlist = res.data.data;
    }
  }



</script>






<style>

</style>
