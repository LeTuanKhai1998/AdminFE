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
                    <base-button type="primary" @click.prevent="openNew" size="sm">Thêm mới</base-button>
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
                    <th>Tên quyền hạn</th>
                    <th>Quyền hạn</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </template>

                <template slot-scope="{row}">
                    <td>
                        {{getIndex(tableData.indexOf(row))}}
                    </td>
                    <td>
                        <span class="name mb-0 text-sm">{{row.name}}</span>
                    </td>
                    <td>
                        <div v-for="item in row.permissionTabs" :key="item.id">{{item.name}},</div>
                    </td>
                    <td>
                        {{row.description }}
                    </td>
                    <td >
                        <base-button class="edit" type="primary" @click.prevent="openDetail(row)"
                                     icon="fas fa-pencil-alt" size="sm">Sửa
                        </base-button>
                        <base-button class="remove" type="primary" @click.prevent="openDelete(row)"
                                     icon="fas fa-trash"
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
                            spellcheck="false"
                            label="Tên vai trò"
                            placeholder="điền tên vai trò"
                            input-classes="form-control-alternative"
                            v-model="selectedItem.name"
                />
                <base-input alternative="" label="Mô tả">
                    <textarea spellcheck="false" rows="4" class="form-control form-control-alternative"
                              placeholder="Viết vài điều về vai trò ..."
                              v-model="selectedItem.description">
                    </textarea>
                </base-input>
                <hr class="my-4">
                <div class="col-md-12">
                    <label class="form-control-label">Chọn quyền </label>
                    <multiselect
                            v-model="selectedItem.permissionTabs"
                            :options="permissions"
                            :multiple="true"
                            placeholder="Chọn và tìm kiếm quyền hạn"
                            label="name"
                            track-by="name"/>
                </div>
            </div>
            <template slot="footer">
                <base-button type="secondary" @click.prevent="isModal = false">Bỏ qua</base-button>
                <base-button type="primary" @click.prevent="updateUserRole">Lưu thay đổi</base-button>
            </template>
        </modal>
        <modal :show.sync="isDeleteModal">
            <template slot="header">
                <h3 class="modal-title">Xác nhận xóa</h3>
            </template>
            <div v-if="selectedItem">
                <h4 class="modal-title">Bạn chắc chắn muốn xóa phim "{{this.selectedItem.name}}" không?</h4>
                <h5 class="modal-title" style="color: red;margin-top: 5px">(Lưu ý xóa phim sẽ xóa luôn dữ liệu
                    người đó)</h5>
            </div>
            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="isDeleteModal = false">Bỏ qua</base-button>
                <base-button type="primary" @click.prevent="deleteUserRole">Xác nhận xóa</base-button>
            </template>
        </modal>

    </div>
</template>

<script>
    import MovieService from "../../services/MovieService";
    import NumConstant from "../../constant/NumConstant";
    import StringConstant from "../../constant/StringConstant";
    import Multiselect from 'vue-multiselect'

    export default {
        components: {
            Multiselect
        },
        name: "UserRole",
        props: {
            type: {
                type: String
            },
            title: String
        },
        data() {
            return {
                isModal: false,
                isDeleteModal: false,
                selectedItem: null,
                permissions:[],
                tableData: [],
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
            deleteUserRole() {
                MovieService.deleteUserRoleById(this.selectedItem.id)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Xóa diễn viên thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.prepation();
                        this.showToast()
                    });
                this.selectedItem = null;
                this.isDeleteModal = false;
            },
            updateUserRole() {
                const date = new Date(this.selectedItem.birthday)
                this.selectedItem.birthday = date;
                MovieService.UpdateUserRole(this.selectedItem)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Lưu thông tin thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.prepation();
                        this.showToast()
                    });
                this.isModal = false;
            },
            openDelete(row) {
                this.selectedItem = row;
                this.isModal = false;
                this.isDeleteModal = true;
            },
            openNew() {
                this.selectedItem = {
                    "id": 0,
                    "name": "",
                    "description": "",
                    "permissionTabs":[]
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
                if ((this.pagination.currentPage == 0 && this.tableData.length == 0) || this.pagination.currentPage != 0) {
                    MovieService.getAllUserRoles(this.pagination)
                        .then(response => {
                            this.tableData = response.data.data.data;
                            this.pagination.totalItemCount = response.data.data.total;
                        });
                }
                MovieService.getPermissionTab(this.pagination)
                    .then(response => {
                        this.permissions = response.data.data.data;
                    });

            }
        }
    }
</script>
<style>
</style>
