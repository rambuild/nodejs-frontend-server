<template>
    <div class="container">
        <div>
            <el-table stripe border :data="list" style="width: 100%">
                <el-table-column type="index" label="#" width="80"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column label="操作" width="350px">
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
        <!-- <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :pageSize="10"
            :current-page.sync="currentPage"
            @current-change="getAdmin"
        ></el-pagination>-->
    </div>
</template>

<script>
export default {
    name: "adminList",
    data() {
        return {
            //管理员列表
            list: []
        };
    },
    created() {
        this.getAdmin();
    },
    methods: {
        //获取管理员列表
        getAdmin() {
            let url = "rest/AdminUser";
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.list = res.data.data;
                }
            });
        },
        //编辑
        edit(id) {
            this.$router.push(`/admin_user/create/${id}`);
        },
        //删除
        del(id) {
            this.$confirm("确认删除吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let url = `rest/admin_user/${id}`;
                this.$http.delete(url).then(res => {
                    if (res.data.status == 200) {
                        this.$msg('success',res.data.msg)
                        this.getAdmin()
                    }
                });
            });
        },
        /**
         * 搜索
         * @param {string} name 管理员姓名
         */
        searchAdmin(name) {
            if (!name) {
                this.getAdmin();
                return;
            }

            let url = `rest/admin/search?name=${name}`;
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