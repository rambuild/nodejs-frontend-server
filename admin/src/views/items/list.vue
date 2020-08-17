<template>
    <div class="container">
        <div>
            <el-table
                @selection-change="getCheckedItems"
                stripe
                border
                :data="list"
                style="width: 100%"
            >
                <el-table-column type="index" label="#" width="55"></el-table-column>
                <el-table-column prop="name" label="物品名称" width="200"></el-table-column>
                <el-table-column prop="icon" label="图标">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" class="width-55" />
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
    name: "itemList",
    data() {
        return {
            list: []
        };
    },
    created() {
        this.getItemsList();
    },
    methods: {
        //批量删除
        delMultiple() {
            this.$confirm("确认批量删除已选项吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let url = "rest/item/deleteMany";
                this.$.delete(url, { data: { ids: this.CheckedIds } }).then(res => {
                    res.data.code === 1 && this.getItemsList();
                });
            });
        },
        //获取已勾选项
        getCheckedItems(data) {
            this.CheckedIds = [];
            data.forEach(item => {
                this.CheckedIds.push(item._id);
            });
        },
        //获取物品列表
        getItemsList() {
            let url = `rest/items?page=${this.currentPage}`;
            this.$http.get(url).then(res => {
                let { status, data } = res.data;
                if (status === 200) {
                    this.list = data;
                }
            });
        },
        //编辑
        edit(id) {
            this.$router.push(`/items/create/${id}`);
        },
        //删除
        del(id) {
            this.$confirm("确认删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let url = `rest/items/${id}`;
                this.$http.delete(url).then(res => {
                    if (res.data.status === 200) {
                        this.$msg('success',res.data.msg)
                        this.getItemsList()
                    }
                });
            });
        },
        /**
         * 搜索
         * @param {string} name 物品名称
         */
        searchItem(name) {
            if (!name) {
                this.getItemsList();
                return;
            }

            let url = `rest/item/search?name=${name}`;
            this.$.get(url).then(res => {
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