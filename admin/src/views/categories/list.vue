<template>
    <div>
        <h2>分类列表</h2>
        <el-table :data="items" style="width: 100%">
            <el-table-column type="index" label="#" width="100"></el-table-column>
            <el-table-column prop="_id" label="ID" width="260"></el-table-column>
            <el-table-column label="上级分类" width="180">
                <template slot-scope="scope">
                    <p>{{scope.row.parent?scope.row.parent.name:''}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        @click="$router.push(`/categories/create/${scope.row._id}`)"
                    >编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(scope)">删除</el-button>
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
        }
    },
    methods: {
        async getList() {
            let { data: res } = await this.$http.get('/rest/categories')
            this.items = res.data
        },
        del(scope) {
            this.$confirm("确认删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async _ => {
                let { data: res } = await this.$http.delete(`/rest/categories/${scope.row._id}`)
                if (res.status == 200) {
                    this.$message.success({
                        message: res.msg,
                        center: true,
                        duration: 1500
                    })
                    this.getList()
                }
            }).catch(e=>{})

        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang='scss' scoped>
</style>