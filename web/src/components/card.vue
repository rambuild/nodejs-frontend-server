<template>
    <div class="card bg-white px-4 my-3">
        <div class="card-header d-flex py-3 text-gray3">
            <i class="iconfont" :class="`icon-${icon}`"></i>
            <div class="fs-lg flex-1 px-2">{{title}}</div>
            <i class="iconfont icon-menu1"></i>
        </div>
        <div class="card-body pt-2">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: { type: String, required: true },
        icon: { type: String, required: true }
    }
}
</script>

<style lang='scss' scoped>
.card {
    border-bottom: 1px solid #d4d9de;
    .card-header {
        border-bottom: 1px solid #d4d9de;
    }
}
</style>