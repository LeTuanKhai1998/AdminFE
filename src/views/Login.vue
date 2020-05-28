<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!--                <div class="card-header bg-transparent pb-5">-->
                <!--                    <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>-->
                <!--                    <div class="btn-wrapper text-center">-->
                <!--                        <a href="#" class="btn btn-neutral btn-icon">-->
                <!--                            <span class="btn-inner&#45;&#45;icon"><img src="img/icons/common/github.svg"></span>-->
                <!--                            <span class="btn-inner&#45;&#45;text">Github</span>-->
                <!--                        </a>-->
                <!--                        <a href="#" class="btn btn-neutral btn-icon">-->
                <!--                            <span class="btn-inner&#45;&#45;icon"><img src="img/icons/common/google.svg"></span>-->
                <!--                            <span class="btn-inner&#45;&#45;text">Google</span>-->
                <!--                        </a>-->
                <!--                    </div>-->
                <!--                </div>-->
                <div class="card-body px-lg-5 py-lg-5">
                    <div class="text-center text-muted mb-4">
                        <h2>Đăng nhập vào hệ thống</h2>
                    </div>
                    <form role="form">
                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Nhập tên đăng nhập"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.username">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <!--                        <base-checkbox class="custom-control-alternative">-->
                        <!--                            <span class="text-muted">Remember me</span>-->
                        <!--                        </base-checkbox>-->
                        <div class="text-center">
                            <base-button v-on:click="callLogin" type="primary" variant="success" class="my-4">Đăng
                                nhập
                            </base-button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light"><small>Quên mật khẩu?</small></a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/register" class="text-light"><small>Tạo tài khoản mới</small></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import StringConstant from "../constant/StringConstant";

    export default {
        name: 'login',
        data() {
            return {
                loginSuccess: false,
                loginError: false,
                error: false,
                model: {
                    username: '',
                    password: ''
                },
                formToast: {
                    message: '',
                    type: '',
                    position: StringConstant.BottomToast,
                },
            }
        },
        watch:{

        },
        created() {

        },
        methods: {
            showToast() {
                this.$toast.open(this.formToast)
            },
            setDataToast(message, type) {
                this.formToast.message = message
                this.formToast.type = type
            },
            callLogin() {
                // eslint-disable-next-line no-console
                console.log(this.model);
                this.$store.dispatch('login', {user: this.model})
                    .then(() => this.$router.push('/'))
                    .catch(error => {
                        this.setDataToast("Đăng nhập không thành công, vui lòng kiểm tra lại thông tin!", StringConstant.TypeToastError)
                        this.showToast();
                        this.error.push(error)
                    })
            }
        }
    }
</script>
<style>
</style>
