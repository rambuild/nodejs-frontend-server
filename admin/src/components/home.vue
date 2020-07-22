<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                    router
                    :default-openeds="defaultOpen"
                    unique-opened
                    :default-active="$route.path"
                >
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>内容管理
                        </template>
                        <el-menu-item-group>
                            <template slot="title">物品</template>
                            <el-menu-item index="/items/create">新建物品</el-menu-item>
                            <el-menu-item index="/items/list">物品列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">英雄</template>
                            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
                            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">文章</template>
                            <el-menu-item index="/articles/create">新建文章</el-menu-item>
                            <el-menu-item index="/articles/list">文章列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-setting"></i>系统设置
                        </template>
                        <el-menu-item-group>
                            <template slot="title">分类</template>
                            <el-menu-item index="/categories/create">新建分类</el-menu-item>
                            <el-menu-item index="/categories/list">分类列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">管理员</template>
                            <el-menu-item index="/admin_user/create">新建管理员</el-menu-item>
                            <el-menu-item index="/admin_user/list">管理员列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header style="text-align: right; font-size: 12px">                    
                        <span>{{curUser}}</span>
                        <el-button
                            type="danger"
                            @click="cancellation"
                            size="mini"
                            class="cancellationBtn"
                        >注销</el-button>
                </el-header>

                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultOpen: ['1'],
            curUser: ''
        }
    },
    methods: {
        cancellation() {
            this.$confirm('确定注销？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sessionStorage.clear()
                this.$router.push('/login')
            }).catch(() => {
                return
            });
        }
    },
    mounted() {
        this.curUser = sessionStorage.getItem('user')
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cancellationBtn {
    margin-left: 10px;
}
</style>
