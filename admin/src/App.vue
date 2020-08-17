<template>
    <div id="admin">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'admin'
}
</script>

<style lang='scss'>
html,
body {
    margin: 0;
    padding: 0;
}
.el-table {
    /deep/ th,
    /deep/ td {
        text-align: center !important;
    }
}
.el-aside {
    .el-scrollbar {
        border: none;
        width: 230px;
        .el-scrollbar__wrap {
            overflow: hidden;
            .el-scrollbar__view {
                height: 100%;
            }
        }
    }
}
</style>
