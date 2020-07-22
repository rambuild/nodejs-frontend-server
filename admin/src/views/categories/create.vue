<template>
    <div>
        <div class="createCategories">
            <h2>{{this.id ? '编辑' : '新建'}}分类</h2>
            <el-form @submit.native.prevent='save'>
                <el-form-item label="上级分类" label-width="200px">
                    <el-select v-model="categories.parent" placeholder="请选择" clearable>
                        <el-option
                            v-for="i in parentsData"
                            :key="i._id"
                            :label="i.name"
                            :value="i._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称" label-width="200px">
                    <el-input v-model="categories.name"></el-input>
                </el-form-item>
                <el-form-item label-width="200px">
                    <el-button type="primary" native-type="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: {
                name: '',
                parent:null
            },
            parentsData: [],
        }
    },
    props: {
        id: {
            type: String
        }
    },
    methods: {
        async save() {
            if (this.categories.name.trim() != '') {
                if (this.id) {
                    const { data: res } = await this.$http.put(`/rest/categories/${this.id}`, this.categories)
                    // console.log(res)
                    this.$message.success({
                        message: "更新成功"
                    })
                    this.categories.name = ''
                } else {
                    const { data: res } = await this.$http.post('/rest/categories', this.categories)
                    console.log(res)
                    this.$message.success({
                        message: "创建成功"
                    })
                    this.categories.name = ''
                }
                this.$router.push('/categories/list')
            }
        },
        async getNameById() {
            let { data: res } = await this.$http.get(`/rest/categories/${this.id}`)
            // console.log("res:::::::::::", res)
            this.categories = res.data
        },
        async getParentsData() {
            let { data: res } = await this.$http.get("/rest/categories");
            this.parentsData = res.data
        }
    },
    mounted() {
        this.id && this.getNameById()  //表示有传入的ID才执行getNameById方法
        this.getParentsData()
    }
}
</script>

<style lang='scss' scoped>
</style>