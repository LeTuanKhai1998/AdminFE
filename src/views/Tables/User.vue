<template>
    <div class="card shadow" style="margin-top: 100px"
         :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
             :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                        {{title}}
                    </h3>
                </div>
                <div class="col text-right">
                    <base-button type="primary" @click.prevent="openNew()" size="sm">Thêm mới</base-button>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <base-table class="table align-items-center table-flush"
                        :class="type === 'dark' ? 'table-dark': ''"
                        :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                        tbody-classes="list"
                        :data="tableData">
                <template slot="columns">
                    <th>STT</th>
                    <th>Tên tài khoản</th>
                    <th>Tên người dùng</th>
                    <th>Email</th>
                    <th>Quốc gia</th>
                    <th>Quyền hạn</th>
                    <th>Thao tác</th>
                </template>

                <template slot-scope="{row}">
                    <td>
                        {{getIndex(tableData.indexOf(row))}}
                    </td>
                    <td>
                        <span class="name mb-0 text-sm">{{row.username}}</span>
                    </td>
                    <td>
                        <span class="name mb-0 text-sm">{{row.lastname | concatStr(row.firstname)}}</span>
                    </td>
                    <td>
                        <span class="name mb-0 text-sm">{{row.email}}</span>
                    </td>
                    <td>
                        {{row.country.name}}
                    </td>
                    <td>
                        {{row.role.name}}
                    </td>

                    <td>
                        <base-button class="edit" type="primary" @click.prevent="openDetail(row)"
                                     icon="fas fa-pencil-alt" size="sm">Sửa
                        </base-button>
                        <base-button class="remove" type="primary" @click.prevent="openDelete(row)" icon="fas fa-trash"
                                     size="sm">Xóa
                        </base-button>
                    </td>


                </template>

            </base-table>
        </div>

        <div class="card-footer d-flex justify-content-end"
             :class="type === 'dark' ? 'bg-transparent': ''">
            <base-pagination :value="pagination.currentPage" :per-page="pagination.itemsPerPage"
                             :total="pagination.totalItemCount" v-on:input="loadPage"></base-pagination>
        </div>
        <modal :show.sync="isModal">
            <template slot="header">
                <h3 class="modal-title" id="exampleModalLabel">Thông tin chi tiết</h3>
            </template>
            <div v-if="selectedItem">
                <base-input alternative=""
                            required
                            spellcheck="false"
                            label="Tài khoản"
                            placeholder="điền tài khoản"
                            input-classes="form-control-alternative"
                            v-model="selectedItem.username"
                />
                <base-input alternative=""
                            type="password"
                            v-if="this.selectedItem.id == 0"
                            required
                            spellcheck="false"
                            label="Mật khẩu"
                            placeholder="điền mật khẩu"
                            input-classes="form-control-alternative"
                            v-model="password"
                />
                <base-input alternative=""
                            required
                            spellcheck="false"
                            label="Họ và tên đệm"
                            placeholder="điền họ và tên đệm"
                            input-classes="form-control-alternative"
                            v-model="selectedItem.lastname"
                />
                <base-input alternative=""
                            required
                            spellcheck="false"
                            label="Tên người dùng"
                            placeholder="điền tên"
                            input-classes="form-control-alternative"
                            v-model="selectedItem.firstname"
                />
                <base-input alternative=""
                            type="text"
                            spellcheck="false"
                            label="Email"
                            placeholder="điền email"
                            input-classes="form-control-alternative"
                            v-model="selectedItem.email"
                />
                <div style="margin-top: 20px">
                    <label class="form-control-label">Quốc gia</label>
                    <multiselect
                            v-model="selectedItem.country"
                            :options="countrys"
                            :searchable="true"
                            :close-on-select="true"
                            :allow-empty="false"
                            placeholder="Chọn quốc gia"
                            label="name"
                            track-by="name"/>
                </div>
                <div style="margin-top: 20px">
                    <label class="form-control-label">Quyền hạn</label>
                    <multiselect
                            v-model="selectedItem.role"
                            :options="roles"
                            :searchable="true"
                            :close-on-select="true"
                            :allow-empty="false"
                            placeholder="Chọn quốc gia"
                            label="name"
                            track-by="name"/>
                </div>
                <div style="margin-top: 20px">
                    <label class="form-control-label">Ảnh đại diện</label>
                    <div class="row justify-content-center">
                        <img v-if="selectedItem.avatar" v-lazy="selectedItem.avatar.url"
                             :alt="selectedItem.avatar.alt"
                             class="rounded-circle avatarEdit">
                        <!--                        <base-button size="sm" type="info" class="mr-4 btnEditAvtar">Chọn ảnh</base-button>-->
                    </div>
                </div>
            </div>
            <div class="upload-btn-wrapper center">
                <button class="btn btn-info" style="font-size: small;">Chọn hình</button>
                <input accept="image/*" type="file" name="myfile" style="cursor: pointer"
                       @change="onFileSelected"
                       id="file-input"/>
            </div>

            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="isModal = false">Bỏ qua</base-button>
                <base-button type="primary" @click.prevent="updateUser">Lưu thay đổi</base-button>
            </template>
        </modal>
        <modal :show.sync="isDeleteModal">
            <template slot="header">
                <h3 class="modal-title">Xác nhận xóa</h3>
            </template>
            <div v-if="selectedItem">
                <h4 class="modal-title">Bạn chắc chắn muốn xóa người dùng "{{this.selectedItem.username}}" không?</h4>
                <h5 class="modal-title" style="color: red;margin-top: 5px">(Lưu ý xóa người dũng sẽ xóa luôn dữ liệu
                    người đó)</h5>
            </div>
            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="isDeleteModal = false">Bỏ qua</base-button>
                <base-button type="primary" @click.prevent="deleteUser">Xác nhận xóa</base-button>
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
    import MovieService from "../../services/MovieService";
    import NumConstant from "../../constant/NumConstant";
    import Multiselect from 'vue-multiselect'
    import getUrl from "../../common/getUrl";
    import StringConstant from "../../constant/StringConstant";
    import firebase from "firebase";

    export default {
        components: {
            Multiselect
        },
        name: "User",
        props: {
            type: {
                type: String
            },
            title: String
        },
        data() {
            return {
                uploadValue: 0,
                isUploadImage: false,
                selectedImage: null,
                password: '',
                message: '',
                selectedItem: null,
                isModal: false,
                isDeleteModal: false,
                tableData: [],
                roles: [],
                countrys: [],
                pagination: {
                    currentPage: 1,
                    itemsPerPage: NumConstant.MoviePerPage,
                    sort: "id",
                    sortOrder: false,
                    totalItemCount: 0
                },
                formToast: {
                    message: '',
                    type: '',
                    position: StringConstant.BottomToast,
                },
            }
        },
        watch: {
            isUploadImage(val) {
                if (val == 100) {
                    this.uploadValue = 0;
                }
            },
            isModal(val) {
                if (val == false) {
                    this.prepation();
                }
            }
        },
        filters: {
            concatStr: function (lastname, firstname) {
                return lastname.concat(' ', firstname)
            },
        },
        created() {
            if (!this.type) {
                this.type = 'dark'
            }
            this.prepation();
        },
        methods: {
            showToast() {
                this.$toast.open(this.formToast)
            },
            setDataToast(message, type) {
                this.formToast.message = message
                this.formToast.type = type
            },
            onFileSelected(event) {
                this.selectedImage = event.target.files[0];
                this.selectedItem.avatar.url = URL.createObjectURL(this.selectedImage);
            },
            deleteUser() {
                MovieService.deleteUserById(this.selectedItem.id)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Xóa người dùng thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.prepation();
                        this.showToast()
                    });
                this.selectedItem = null;
                this.isDeleteModal = false;
            },
            updateUserDetail() {
                // eslint-disable-next-line no-console
                console.log("selectedItem", this.selectedItem)
                MovieService.updateUser(this.selectedItem)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Lưu thông tin thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.isUploadImage = false;
                        this.selectedItem = null;
                        this.prepation();
                        this.showToast()
                    });

            },
            updateUser() {
                this.selectedItem.avatar.alt = this.selectedItem.username;
                this.selectedItem.password = this.password;

                if (this.selectedImage) {
                    this.isModal = false;
                    this.isUploadImage = true;
                    this.uploadImage(this.selectedItem.username, this.selectedImage)
                } else {
                    this.updateUserDetail();
                    this.isModal = false;
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
                            this.selectedItem.avatar.url = url;
                            this.selectedItem.avatar.alt = name;
                            // eslint-disable-next-line no-console
                            console.log(this.selectedItem.avatar)
                            // eslint-disable-next-line no-console
                            console.log("url", url)
                            this.updateUserDetail();
                        });
                    }
                )
            },
            getImgUrl(val) {
                return getUrl.getImgUrl(val, 0)
            },
            openDelete(row) {
                this.selectedItem = row;
                this.isModal = false;
                this.isDeleteModal = true;
            },
            openNew() {
                this.selectedItem = {
                    "id": 0,
                    "username": "",
                    "password": "",
                    "firstname": "",
                    "lastname": "",
                    "email": "",
                    "country": null,
                    "avatar": {
                        "id": 0,
                        "url": "https://firebasestorage.googleapis.com/v0/b/movie-online-7f8ea.appspot.com/o/users%2Fempty.jpg?alt=media&token=4ce86095-0f1e-4455-aa0c-b62ddfa7bac2",
                        "alt": ""
                    },
                    "role": null
                };
                this.isModal = true;
                this.isDeleteModal = false;
            },
            openDetail(row) {
                this.isModal = true;
                this.selectedItem = row;
            },
            getIndex(index) {
                return (index + 1) + (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
            },
            loadPage(pageIndex) {
                this.pagination.currentPage = pageIndex;
                this.prepation();
            },
            prepation() {
                if (this.roles.length == 0) {
                    MovieService.getUserRoles()
                        .then(respose => {
                            this.roles = respose.data.data.data;
                        });
                }
                if (this.countrys.length == 0) {
                    MovieService.getCountrys()
                        .then(respose => {
                            this.countrys = respose.data.data.data;
                        });
                }
                if ((this.pagination.currentPage == 0 && this.tableData.length == 0) || this.pagination.currentPage != 0) {
                    MovieService.getAllUser(this.pagination)
                        .then(response => {
                            this.tableData = response.data.data.data;
                            this.pagination.totalItemCount = response.data.data.total;
                        });
                }
            }
        }
    }
</script>
<style>

    .upload-btn-wrapper {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .upload-btn-wrapper input[type=file] {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    .row {
        margin-bottom: 20px;
        position: relative;
        width: 100%;
    }

    .avatarEdit {
        width: 256px;
        height: 256px;
        object-fit: cover;
        border-radius: 50%;
    }

    .row .btnEditAvtar {
        background-color: #5e72e4;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        color: white;
        font-size: small;
        padding: 6px 12px;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        text-align: center;
    }

    .row .btnEditAvtar:hover {
        background-color: black;
    }

    .remove {
        margin: 5px;
        color: red;
    }

    .remove:hover {
        color: #f5365c;
    }

    .edit {
        margin: 5px;
        color: orange;
    }

    .edit:hover {
        color: rgba(255, 183, 81, 0.84);
    }

    .new {
        margin: 5px;
        color: green;
    }

    .new:hover {
        color: #3aaf85;
    }

</style>
