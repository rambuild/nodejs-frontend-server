<template>
    <div class="main">
        <div class="extends bg-gray3 d-flex text-white">
            <div class="logo-wrapper d-flex ai-center flex-1 px-3 py-2">
                <img src="../assets/images/logo.png" height="30" alt class="br-sm" />
                <div class="pl-3">
                    <div>王者荣耀</div>
                    <div class="fs-sm text-gray9">团队成就更多</div>
                </div>
            </div>
            <div class="downloadBtn d-flex ai-center pr-3">
                <button class="bg-primary btn px-2 py-1" @click="download">点击下载</button>
            </div>
        </div>
        <div class="bg-primary">
            <div class="nav d-flex jc-around inverse">
                <div class="nav-item active">
                    <router-link tag='div' to='/index' class="nav-link">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag='div' to='/index' class="nav-link">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link tag='div' to='/index' class="nav-link">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            model: {

            }
        }
    },
    methods: {
        download() {
            console.log('aaa')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
</style>
