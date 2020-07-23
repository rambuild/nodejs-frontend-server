<template>
    <div>
        <h2>分类列表</h2>
        <el-table :data="items" style="width: 100%">
            <el-table-column prop="_id" label="ID" width="260"></el-table-column>
            <el-table-column prop="name" label="分类名称" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope='scope'>
                    <el-button type="primary" @click="$router.push(`/categories/create/${scope.row._id}`)">编辑</el-button>
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
            let { data: res } = await this.$http.get('/api/admin/categories/list')
            this.items = res.data
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang='scss' scoped>
</style>