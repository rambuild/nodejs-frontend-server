<template>
    <div class="container">
        <h1>{{id ? '编辑' : '新建'}}管理员</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="用户名">
                <el-input v-model.trim="info.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    show-password
                    v-model.trim="info.password"
                    placeholder="密码不会以明文显示，如需修改，直接输入内容保存"
                ></el-input>
            </el-form-item>
            <!-- <el-form-item label="备注">
                <el-input v-model.trim="info.remark"></el-input>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "adminCreate",
    props: {
        id: { type: String }
    },
    data() {
        return {
            info: {
                username: "",
                password: "",
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.id) {
                this.getInfo();
            } else {
                this.info = JSON.parse(JSON.stringify(this.info));
            }
        },
        //获取管理员信息
        getInfo() {
            let url = `rest/AdminUser/${this.id}`;
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.info = res.data.data;
                }
            });
        },
        //保存信息
        save() {
            let { id, info } = this;
            let method;
            let url = "rest/AdminUser";
            let data = info;

            if (id) {
                method = "put";
                url = `${url}/${id}`;
            } else {
                method = "post";
            }
            this.$http({
                method,
                url,
                data
            }).then(res => {
                if (res.data.status == 200) {
                    this.$msg('success', res.data.msg)
                    this.$router.push("/admin_user/list");
                }
            });
        }
    },
    watch: {
        $route: "init"
    }
};
</script>