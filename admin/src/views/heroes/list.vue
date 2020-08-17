<template>
    <div class="container">
        <div>
            <el-table stripe border :data="list" style="width: 100%">
                <el-table-column type="index" label="#" width="55"></el-table-column>
                <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
                <el-table-column label="英雄分类">
                    <template slot-scope="scope" v-if="scope.row.categories[0]">
                        <el-tag v-for="(i,index) in scope.row.categories" :key="index">{{ i.name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="头像">
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
    </div>
</template>

<script>
export default {
    name: "heroList",
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getHeroList()
    },
    methods: {
        //获取英雄列表
        getHeroList() {
            let url = "rest/heroes";

            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
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
                    if (res.data.status == 200) {
                        this.$msg('success', res.data.msg)
                        this.getHeroList()
                    }
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.el-tag{
    margin:3px;
}
</style>
