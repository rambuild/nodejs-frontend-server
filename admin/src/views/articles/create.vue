<template>
    <div class="container">
        <h1>{{id ? '编辑' : '新建'}}文章</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="所属分类">
                <el-select v-model="article.categories" multiple>
                    <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model.trim="article.title"></el-input>
            </el-form-item>
            <el-form-item label="正文">
                <!-- <tinymce v-model="article.body" :defaultContent="article.body" /> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
let article = {
    title: "",
    body: "",
    categories: []
};
let categories = [];


export default {
    name: "articleCreate",
    props: {
        id: {}
    },
    data() {
        return {
            //文章信息
            article,
            //文章分类
            categories
        };
    },
    created() {
        this.getCategories();
        this.init();
    },
    methods: {
        init() {
            if (this.id) {
                this.getInfo();
            } else {
                this.article = JSON.parse(JSON.stringify(article));
                this.categories = JSON.parse(JSON.stringify(categories))
            }
        },
        //获取文章信息
        getInfo() {
            let url = `rest/articles/${this.id}`;
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.article = data;
                }
            });
        },
        //获取文章分类
        getCategories() {
            let url = "rest/categories";
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.categories = res.data;
                }
            });
        },
        //保存文章
        save() {
            let { id, article } = this;
            let url = "rest/articles";
            let method;
            let data = article;

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
                if (res.data.status == 200) {
                    this.$message.success({
                        message: res.data.msg,
                        center: true,
                        duration: 1500
                    })
                    this.$router.push("/articles/list");
                }
            });
        }
    },
    watch: {
        $route: "init"
    }
};
</script>