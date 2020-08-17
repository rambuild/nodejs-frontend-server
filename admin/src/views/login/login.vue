<template>
    <div class="login-container">
        <div class="login text-white">
            <h3 class="title flex jc-center">王者荣耀移动端后台</h3>
            <el-input v-model.trim="info.username" placeholder="账号" />
            <el-input
                show-password
                v-model.trim="info.password"
                placeholder="密码"
                @keyup.enter.native="login"
            />

            <div class="login-btn">
                <el-button
                    type="primary"
                    class="width-100p"
                    @click.native.prevent="login"
                >登录</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            info: {
                username: "admin",
                password: "123456"
            },
            loading: false
        };
    },
    methods: {
        //登录
        login() {
            this.loading = true;
            this.$http.post("login", this.info).then(res => {
                this.loading = false;
                const { status, token } = res.data;
                console.log(res.data)
                if (status === 200) {
                    sessionStorage.token = token;
                    this.$router.push("/");
                    this.$msg('success',res.data.msg)
                } else{
                    //账号不存在
                    this.$msg('error',res.data.msg)
                }
            })
        }
    }
};
</script>

<style lang="scss">
.login-container {
    background-color: #2d3a4b;
    min-height: 100vh;
    .login {
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;

        .title {
            font-size: 26px;
            color: #eee;
        }

        .login-btn {
            margin-top: 30px;
        }
    }
}
</style>

<style lang="scss">
$bg: #283443;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

.login-container {
    .login {
        .el-input {
            display: inline-block;
            height: 47px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 22px;
            width: 100%;

            input {
                background: transparent;
                border: 0;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: #fff;
                height: 47px;
                //鼠标光标颜色
                caret-color: $cursor;

                //input框自动填充时的背景颜色
                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }
        .el-button {
            border-radius: 0;
        }
    }
}
</style>