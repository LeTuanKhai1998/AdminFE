<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Xin chào {{model.lastname | concatStr(model.firstname)}}</h1>
                        <p class="text-white mt-0 mb-5">{{model.description}}</p>
                        <a href="#!" @click.prevent="isUpdatePassword = true" class="btn btn-info">Cật nhật mật khẩu</a>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img v-if="model.avatar" v-lazy="model.avatar.url"
                                             :alt="model.avatar.alt"
                                             class="rounded-circle avatarProfile">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <div class="upload-btn-wrapper">
                                    <base-button size="sm" type="info" class="mr-4">Đổi hình</base-button>
                                    <input accept="image/*" type="file" name="myfile" style="cursor: pointer"
                                           @change="onFileSelectedImage"
                                           id="file-input-image"/>
                                </div>
                                <!--                                <base-button size="sm" type="info" class="mr-4">Đổi hình</base-button>-->
                                <!--                                <base-button size="sm" type="default" class="float-right">Xóa hình</base-button>-->
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <!--                                            <span class="heading">22</span>-->
                                            <!--                                            <span class="description">Friends</span>-->
                                        </div>
                                        <div>
                                            <!--                                            <span class="heading">10</span>-->
                                            <!--                                            <span class="description">Photos</span>-->
                                        </div>
                                        <!--                                        <div>-->
                                        <!--&lt;!&ndash;                                            <span class="heading">89</span>&ndash;&gt;-->
                                        <!--&lt;!&ndash;                                            <span class="description">Comments</span>&ndash;&gt;-->
                                        <!--                                        </div>-->
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    {{model.lastname | concatStr(model.firstname)}}<span
                                        class="font-weight-light"></span>
                                </h3>
                                <!--                                <div class="h5 font-weight-300">-->
                                <!--                                    <i class="ni location_pin mr-2"></i>Bucharest, Romania-->
                                <!--                                </div>-->
                                <!--                                <div class="h5 mt-4">-->
                                <!--                                    <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer-->
                                <!--                                </div>-->
                                <!--                                <div>-->
                                <!--                                    <i class="ni education_hat mr-2"></i>University of Computer Science-->
                                <!--                                </div>-->
                                <!--                                <hr class="my-4"/>-->
                                <!--                                <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes,-->
                                <!--                                    performs and records all of his own music.</p>-->
                                <!--                                <a href="#">Show more</a>-->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Tài khoản của tôi</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" @click.prevent="updateUser" class="btn btn-sm btn-primary">Lưu thông
                                        tin</a>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Thông tin người dùng</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Tài khản"
                                                        placeholder="nhập tài khoản"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.username"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="địa chỉ Email"
                                                        placeholder="tuankhai@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Tên"
                                                        placeholder="Nhập tên"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.firstname"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Họ và tên đệm"
                                                        placeholder="Nhập họ và tên đệm"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.lastname"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
                                <!-- Address -->
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <label class="form-control-label">Quốc gia</label>
                                            <multiselect
                                                    style="margin-bottom: 20px"
                                                    v-model="model.country"
                                                    :options="countrys"
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    :allow-empty="false"
                                                    placeholder="Chọn quốc gia"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label">Quyền hạn</label>
                                            <multiselect
                                                    v-model="model.role"
                                                    :options="roles"
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    :allow-empty="false"
                                                    placeholder="Chọn quyền hạn"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
                                <!-- Description -->
                                <h6 class="heading-small text-muted mb-4">Về bản thân</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="Vài điều muốn nói">
                                            <textarea spellcheck="false" v-model="model.description" rows="4"
                                                      class="form-control form-control-alternative"
                                                      placeholder="Viết vài điều về phim ..."></textarea>
                                        </base-input>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
        <modal :show.sync="isUpdatePassword">
            <template slot="header">
                <h3 class="modal-title">Cật nhật mật khẩu</h3>
            </template>
            <div>
                <base-input alternative=""
                            type="password"
                            label="Mật khẩu mới"
                            placeholder="Nhập mật khẩu mới"
                            input-classes="form-control-alternative"
                            v-model="password"
                />
                <base-input alternative=""
                            type="password"
                            label="Nhập lại mật khẩu"
                            placeholder="Nhập lại mật khẩu"
                            input-classes="form-control-alternative"
                            v-model="passwordConfrim"
                />
            </div>
            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="updateUserPassword">Cật nhật</base-button>
                <!--                <base-button type="primary" @click.prevent="deleteActor">Xác nhận xóa</base-button>-->
            </template>
        </modal>
        <modal :show.sync="isUploadImage">
            <template slot="header">
                <h3 class="modal-title">Lưu thông tin</h3>
            </template>
            <div>
                <base-progress type="success" :height="8" :value="uploadValue"
                               label="Đang tải ảnh lên..."></base-progress>
                <h5 v-if="uploadValue==100" class="modal-title" style="color: green;margin-top: 5px">Đã tải ảnh thành
                    công!</h5>
            </div>
            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="updateUserDetail">OK</base-button>
                <!--                <base-button type="primary" @click.prevent="deleteActor">Xác nhận xóa</base-button>-->
            </template>
        </modal>
    </div>
</template>
<script>

    import MovieService from "../services/MovieService";
    import Multiselect from 'vue-multiselect'
    import StringConstant from "../constant/StringConstant";
    import firebase from "firebase";

    export default {
        components: {
            Multiselect
        },
        name: 'user-profile',
        data() {
            return {
                password: '',
                passwordConfrim: '',
                isUpdatePassword: false,
                uploadValue: 0,
                isUploadImage: false,
                selectedImage: null,
                countrys: [],
                formUpdatePassword: null,
                roles: [],
                model: {
                    "id": 0,
                    "username": "",
                    "firstname": "",
                    "lastname": "",
                    "email": "",
                    "country": null,
                    "description": "",
                    "avatar": {
                        "id": 0,
                        "url": "",
                        "alt": ""
                    },
                    "role": {
                        "id": 0,
                        "name": "",
                        "description": "",
                        "permissionTabs": []
                    }
                },
                formToast: {
                    message: '',
                    type: '',
                    position: StringConstant.BottomToast,
                },
            }
        },
        created() {
            this.prepation()
        },
        filters: {
            concatStr: function (lastname, firstname) {
                return lastname.concat(' ', firstname)
            },
        },
        computed: {},
        methods: {
            showToast() {
                this.$toast.open(this.formToast)
            },
            setDataToast(message, type) {
                this.formToast.message = message
                this.formToast.type = type
            },
            setForm() {
                this.formUpdatePassword = {
                    "newPassword": this.password,
                    "username": this.model.username
                }
            },
            updateUserPassword() {
                // eslint-disable-next-line no-empty
                if (this.password.localeCompare(this.passwordConfrim) == 0) {
                    this.setForm();
                    MovieService.updateUserPassword(this.formUpdatePassword)
                        .then(respose => {
                            this.message = respose.data.data.data;
                            if (this.message.localeCompare("successful") == 0) {
                                this.setDataToast("Cật nhật mật khẩu thành công!", StringConstant.TypeToastSuccess)
                            } else {
                                this.setDataToast("Thao tác không thành công, xin thử lại sau!", StringConstant.TypeToastError)
                            }
                            this.isUpdatePassword = false
                            this.showToast()
                        });
                } else {
                    this.passwordConfrim = "";
                    this.setDataToast("Nhập lại mật khẩu không khớp, xin kiểm tra lại", StringConstant.TypeToastError)
                }
                this.showToast()
            },
            onFileSelectedImage(event) {
                this.selectedImage = event.target.files[0];
                this.model.avatar.url = URL.createObjectURL(this.selectedImage);
            },
            updateUserDetail() {
                // eslint-disable-next-line no-console
                MovieService.updateUser(this.model)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Lưu thông tin thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.isUploadImage = false;
                        this.prepation();
                        this.showToast()
                    });

            },
            updateUser() {
                this.model.avatar.alt = this.model.username;
                // this.selectedItem.password = this.password;

                if (this.selectedImage) {
                    this.isUploadImage = true;
                    this.uploadImage(this.model.username, this.selectedImage)
                } else {
                    this.updateUserDetail();
                }
            },
            uploadImage(name, selectedImage) {
                // let data = new FormData();
                // data.append('file', this.selectedImage, 'my-picture');
                const storageRef = firebase.storage().ref(`/users/${name}.jpg`).put(selectedImage);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    }, error => {
                        // eslint-disable-next-line no-console
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.model.avatar.url = url;
                            this.model.avatar.alt = name;
                            // eslint-disable-next-line no-console
                            console.log(this.model.avatar)
                            // eslint-disable-next-line no-console
                            console.log("url", url)
                            this.updateUserDetail();
                        });
                    }
                )
            },
            prepation() {
                if (this.$store.getters.getUserName) {
                    MovieService.getUserByUserName(this.$store.getters.getUserName)
                        .then(response => {
                            this.model = response.data.data.data;
                        });
                }
                if (this.countrys.length == 0) {
                    MovieService.getCountrys()
                        .then(respose => {
                            this.countrys = respose.data.data.data;
                        });
                }
                if (this.roles.length == 0) {
                    MovieService.getUserRoles()
                        .then(respose => {
                            this.roles = respose.data.data.data;
                        });
                }
            }
        }
    }
    ;
</script>
<style>
    /*.avatarProfile {*/
    /*    width: 180px;*/
    /*    height: 180px;*/
    /*    object-fit: cover;*/
    /*    border-radius: 50%;*/
    /*}*/
</style>
