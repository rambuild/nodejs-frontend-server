<template>
  <div class="container">
    <div>
      <div class="flex jc-end">
        <div class="flex jc-end">
          <el-col :span="12" class="mr-d2">
            <el-input
              @keyup.native.enter="searchHero(searchName)"
              placeholder="英雄名称"
              clearable
              v-model.trim="searchName"
            ></el-input>
          </el-col>
          <el-button type="primary" icon="el-icon-search" @click="searchHero(searchName)">搜索</el-button>
        </div>
      </div>
      <el-table stripe border :data="list" style="width: 100%">
        <el-table-column type="index" label="#" width="55"></el-table-column>
        <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
        <el-table-column prop="icon" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width:50px" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="350px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="edit(scope.row._id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row._id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :pageSize="10"
      :current-page.sync="currentPage"
      @current-change="getHeroList"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "heroList",
  data() {
    return {
      list: [],
      // 总条数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 搜索内容
      searchName: ""
    };
  },
  created() {
    this.getHeroList();
  },
  methods: {
    //获取英雄列表
    getHeroList() {
      let url = "rest/heroes";

      this.$http.get(url).then(res => {
        if(res.data.status == 200){
          this.list = res.data.data
        }
      });
    },
    //编辑
    edit(id) {
      this.$router.push(`/heroes/create/${id}`);
    },
    //删除
    del(id) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let url = `rest/heroes/${id}`;
        this.$http.delete(url).then(res => {
          console.log(res.data)
          if(res.data.status == 200){
            this.$message.success({
              message:res.data.msg,
              center:true,
              duration:1500
            })
            this.getHeroList()
          }
        });
      });
    },
    /**
     * 搜索
     * @param {string} name 铭文名称
     */
    searchHero(name) {
      if (!name) {
        this.getHeroList();
        return;
      }

      let url = `rest/hero/search?name=${name}`;
      this.$http.get(url).then(res => {
        let { code, data, total } = res.data;
        if (code === 1) {
          this.total = total;
          this.list = data;
        }
      });
    }
  }
};
</script>
