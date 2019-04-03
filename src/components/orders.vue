<template>
  <div class="user-container">
    <!-- 面包屑 my-bread是在全局定义的名字-->
    <my-bread settitle="订单管理" threetitle="订单列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="orderlist" style="width: 100%" border>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="300"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
      <el-table-column label="是否付款" width="100">
        <!-- 已付款&未付款需要用if语句判断一下在赋值 -->
        <template slot-scope="scope">
          <!-- <el-button type="danger" plain>未付款</el-button> -->
          <el-button type="danger" v-if="scope.row.order_pay ==='0'">未付款</el-button>
          <el-button v-else type="success">已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="150"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="200">
        <template slot-scope="scope">{{scope.row.create_time | fromTime('YYYY-MM-DD HH:mm:ss')}}</template>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="primary"
            plain
            icon="el-icon-edit"
            @click="dialogFormVisible=true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      :current="sendData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="省市区/县" >
          <!-- 级联选择器 -->
          <!-- <el-cascader :options="options" v-model="selectedOptions"></el-cascader> -->
          <!-- v-distpicker实现 -->
          <v-distpicker></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="add"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入省市联动数据
import options from '../assets/city_data2017_element.js'

import VDistpicker from 'v-distpicker'


export default {
  // 本地注册组件
  components: { VDistpicker },
  data() {
    return {
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      // 渲染的数据
      options,
      // 省市联动绑定的数据
      selectedOptions:[],
      // 是否弹框
      dialogFormVisible: false,
      // 总条数
      total: 0,
      // 订单列表
      orderlist: [],
      // 绑定空对象  要不然详细信息哪里输不了字
      add:''
    };
  },
  methods: {
    async getOrders() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });

      console.log(res);
      // 列表的数据
      this.orderlist = res.data.data.goods;
      // 总条数
      this.total = res.data.data.total;
    },
    // 页容量
    sizeChange(size) {
      this.sendData.pagesize = size;
      // 赋值后重新获取数据
      this.getOrders();
    },
    // 页码
    currentChange(current) {
      this.sendData.pagenum = current;
      // 赋值都重新获取数据
      this.getOrders();
    }
  },
  created() {
    this.getOrders();
  }
};
</script>






<style lang="scss">
.user-container {
  .btn {
    text-align: center;
  }
}
</style>
