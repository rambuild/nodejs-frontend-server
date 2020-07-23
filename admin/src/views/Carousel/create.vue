<template>
    <div class="container">
        <div class="carousel-container">
            <h1>{{id ? '编辑' : '新建'}}轮播图</h1>
            <el-form label-width="120px" @submit.native.prevent="save">
                <el-form-item label="跳转链接">
                    <el-input v-model.trim="carousel.path"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-upload
                        class="avatar-uploader carousel"
                        :action="uploadUrl"
                        :headers="getAuthorization()"
                        :on-success="uploadSuccess"
                        :show-file-list="false"
                    >
                        <img
                            v-if="carousel.imgUrl"
                            :src="carousel.imgUrl"
                            class="width-100p height-100p"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "carouselCreate",
    props: {
        id: { type: String }
    },
    data() {
        return {
            carousel: {
                path: "",
                imgUrl: ""
            }
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            if (this.id) {
                this.getCarousel();
            } else {
                this.carousel = JSON.parse(JSON.stringify(this.carousel))
            }
        },
        //获取首页轮播图信息
        getCarousel() {
            let url = `rest/carousel/${this.id}`;
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.carousel = res.data.data;
                }
            });
        },
        //保存
        save() {
            let { id, carousel } = this;
            let url = "rest/carousel";
            let method;
            let data = carousel;

            if (id) {
                url = `${url}/${id}`;
                method = "put";
            } else {
                method = "post";
            }

            this.$http({
                method,
                url,
                data
            }).then(res => {
                if (res.data.status == 200) {
                    this.$message.success({
                        message: res.data.msg,
                        center: true,
                        duration: 1500
                    })
                    this.$router.push("/carousel/list")
                }
            });
        },
        //图片上传完成
        uploadSuccess(res) {
            let { code, data } = res;

            if (code === 1) {
                this.carousel.imgUrl = data;
            }
        }
    },
    watch: {
        $route: "init"
    }
};
</script>

<style lang="scss">
.carousel-container {
    .avatar-uploader .el-upload {
        width: 350px;
        height: 200px;
        border-radius: 0;
    }
    .avatar-uploader .el-upload:hover {
        width: 350px;
        height: 200px;
    }
    .avatar-uploader-icon {
        line-height: 200px;
    }

    .icon {
        width: 350px;
        height: 200px;
        width: 100%;
    }
}
</style>