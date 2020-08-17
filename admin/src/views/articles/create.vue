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
                <vue-editor
                    id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="article.body"
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "articleCreate",
    props: {
        id: {}
    },
    data() {
        return {
            // 文章信息
            article: {
                title: "",
                body: "",
                categories: []
            },
            // 文章分类
            categories: [],
            htmlForEditor: ''
        };
    },
    created() {
        this.getCategories();
        this.init();
    },
    methods: {
        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
            var formData = new FormData();
            formData.append("file", file);

            let { data: res } = await this.$http({
                url: "http://localhost:3000/api/admin/uploads",
                method: "POST",
                data: formData
            })
            console.log(res)
            if (res.status == 200) {
                Editor.insertEmbed(cursorLocation, "image", res.url)
                resetUploader()
            }
            // .then(result => {
            //     let url = result.data.url; // Get url from response
            //     Editor.insertEmbed(cursorLocation, "image", url);
            //     resetUploader();
            // })
            // .catch(err => {
            //     console.log(err);
            // });
        },
        init() {
            if (this.id) {
                this.getInfo();
            } else {
                this.article = JSON.parse(JSON.stringify(this.article));
                this.categories = JSON.parse(JSON.stringify(this.categories))
            }
        },
        //根据id获取文章信息
        getInfo() {
            let url = `rest/articles/${this.id}`;
            this.$http.get(url).then(res => {
                console.log(res)
                if (res.data.status == 200) {
                    this.article = res.data.data;
                }
            });
        },
        //获取文章分类
        getCategories() {
            let url = "rest/categories?selCat=文章分类";
            this.$http.get(url).then(res => {
                if (res.data.status == 200) {
                    this.categories = res.data.data;
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
                    this.$msg('success', res.data.msg)
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