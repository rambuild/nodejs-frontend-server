<template>
    <div>
        <el-container style="height: 100vh">
            <el-aside class="position-re">
                <!-- 侧边栏标题 -->
                <router-link
                    to="/"
                    tag="div"
                    class="width-230 flex jc-center ai-center height-50 text-white bg-02a1e9 sidebar-title-wrapper"
                >
                    <h1 class="sidebar-title">后台管理界面</h1>
                </router-link>

                <el-scrollbar wrap-class="scrollbar-wrapper">
                    <el-menu
                        router
                        :default-active="$route.path"
                        background-color="#263238"
                        text-color="#8a979e"
                        active-text-color="#fff"
                        class="height-100p"
                        unique-opened
                    >
                        <el-submenu
                            v-for="(submenu, index) in menu"
                            :index="String(++index)"
                            :key="index"
                        >
                            <template slot="title">
                                <i :class="submenu.icon"></i>
                                {{submenu.title}}
                            </template>
                            <el-menu-item
                                v-for="(item, index) in submenu.itemsGroup"
                                :index="item.path"
                                :key="index"
                            >{{item.itemName}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>

            <el-container>
                <el-header>
                    <el-button type="danger" @click="logout" size="small">退出</el-button>
                </el-header>

                <el-main>
                    <router-view :key="$route.path"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            //侧边栏菜单
            menu: [
                {
                    title: "分类管理",
                    icon: "el-icon-takeaway-box",
                    itemsGroup: [
                        {
                            itemName: "新建分类",
                            path: "/categories/create"
                        },
                        {
                            itemName: "分类列表",
                            path: "/categories/list"
                        }
                    ]
                },
                {
                    title: "物品管理",
                    icon: "el-icon-box",
                    itemsGroup: [
                        {
                            itemName: "新建物品",
                            path: "/items/create"
                        },
                        {
                            itemName: "物品列表",
                            path: "/items/list"
                        }
                    ]
                },
                {
                    title: "铭文管理",
                    icon: "el-icon-trophy-1",
                    itemsGroup: [
                        {
                            itemName: "新建铭文",
                            path: "/"
                        },
                        {
                            itemName: "铭文列表",
                            path: "/"
                        }
                    ]
                },
                {
                    title: "英雄管理",
                    icon: "el-icon-attract",
                    itemsGroup: [
                        {
                            itemName: "新建英雄",
                            path: "/heroes/create"
                        },
                        {
                            itemName: "英雄列表",
                            path: "/heroes/list"
                        }
                    ]
                },
                {
                    title: "文章管理",
                    icon: "el-icon-document",
                    itemsGroup: [
                        {
                            itemName: "新建文章",
                            path: "/articles/create"
                        },
                        {
                            itemName: "文章列表",
                            path: "/articles/list"
                        }
                    ]
                },
                {
                    title: "轮播图管理",
                    icon: "el-icon-picture-outline-round",
                    itemsGroup: [
                        {
                            itemName: "添加轮播图",
                            path: "/carousel/create"
                        },
                        {
                            itemName: "轮播图列表",
                            path: "/carousel/list"
                        }
                    ]
                },
                {
                    title: "管理员管理",
                    icon: "el-icon-user",
                    itemsGroup: [
                        {
                            itemName: "新建管理员",
                            path: "/admin_user/create"
                        },
                        {
                            itemName: "管理员列表",
                            path: "/admin_user/list"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        // 退出账号
        logout() {
            this.$confirm("确定退出吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                sessionStorage.clear();
                this.$router.push("/login");
            }).catch(_ => { })
        }
    }
};
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #fff;
    color: #333;
    height: 50px !important;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .logout {
        padding-right: 10px;
        color: #606266;
        cursor: pointer;
        font-size: 14px;
    }
}

.el-aside {
    color: #333;
    margin-top: 50px;
    .sidebar-title-wrapper {
        position: fixed;
        top: 0;
        cursor: pointer;
        .sidebar-title {
            font-size: 18px;
        }
    }
}
</style>