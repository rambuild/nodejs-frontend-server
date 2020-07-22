<template>
    <div>
        <h2>分类列表</h2>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="260"></el-table-column>
            <el-table-column prop="parent.name" label="上级名称" width="260"></el-table-column>
            <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        @click="$router.push(`/categories/create/${scope.row._id}`)"
                        size="small"
                    >编辑</el-button>
                    <el-button type="danger" @click="remove(scope)" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        async getList() {
            let { data: res } = await this.$http.get("/rest/categories");
            this.items = res.data;
        },
        remove(scope) {
            this.$confirm(`确定删除:${scope.row.name}？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(async () => {
                    let id = scope.row._id;
                    let { data: res } = await this.$http.delete(`/rest/categories/${id}`);
                    if (res.status == 200) {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.getList()
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    },
    created() {
        this.getList();
    }
};
</script>

<style lang='scss' scoped>
</style>