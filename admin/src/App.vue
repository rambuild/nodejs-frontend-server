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
</style>
