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

<style>
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
#admin{
    width: 100%;
    height: 100%;
}
.el-table thead th,
.el-table tbody td {
    text-align: center !important;
}
</style>
