<template>
    <div class="container">
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="名称">
                <el-input v-model.trim="info.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:3000/api/admin/uploads"
                    :on-success="res=>{info.icon = res.url}"
                    :show-file-list="false"
                >
                    <img v-if="info.icon" :src="info.icon" class="icon" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
let info = {
    name: "",
    icon: ""
};

export default {
    name: "itemCreate",
    props: {
        id: { type: String }
    },
    data() {
        return {
            info: {}
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
                this.info = JSON.parse(JSON.stringify(info));
            }
        },
        //获取物品信息
        getInfo() {
            this.$http.get(`rest/items/${this.id}`).then(res => {
                let { code, data } = res.data;
                if (code === 1) {
                    this.info = data;
                }
            });
        },
        //保存信息
        save() {
            let { id, info } = this;
            let url = "rest/items";
            let method;
            let data = info;
            if (id) {
                url = `${url}/${id}`;
                method = "put";
            } else {
                method = "post";
            }
            this.$http({
                url,
                method,
                data
            }).then(res => {
                if (res.data.status === 200) {
                    this.$message.success({
                        message: res.data.msg,
                        duration: 1500,
                        center: true
                    })
                    this.$router.push("/items/list");
                }
            });
        }
    },
    watch: {
        $route: "init"
    }
};
</script>