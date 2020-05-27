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
                    <th>Tên phim</th>
                    <th>Thê loại</th>
                    <th>Quốc gia</th>
                    <th>Năm phát hành</th>
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
                        <div v-for="item in row.genres" :key="item.id">{{item.name}},</div>
                    </td>
                    <td>
                        {{row.country.name}}
                    </td>
                    <td>
                        {{row.release_year}}
                    </td>
                    <td>
                        {{row.description | subStr}}
                    </td>

                    <td class="text-right">
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
                <base-button type="primary" @click.prevent="deleteMovie">Xác nhận xóa</base-button>
            </template>
        </modal>

    </div>
</template>
<script>
    import MovieService from "../../services/MovieService";
    import NumConstant from "../../constant/NumConstant";
    import StringConstant from "../../constant/StringConstant";

    export default {
        name: 'projects-table',
        props: {
            type: {
                type: String
            },
            title: String
        },
        data() {
            return {
                tableData: [],
                isDeleteModal: false,
                selectedItem: null,
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
        filters: {
            subStr: function (string) {
                if (string != null && string.localeCompare("") != 0) {
                    return string.substring(0, 25) + '...';
                }
            },
        },
        methods: {
            showToast() {
                this.$toast.open(this.formToast)
            },
            setDataToast(message, type) {
                this.formToast.message = message
                this.formToast.type = type
            },
            deleteMovie() {
                MovieService.deleteMovieById(this.selectedItem.id)
                    .then(response => {
                        this.message = response.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Xóa phim thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.prepation();
                        this.showToast()
                    });
                this.selectedItem = null;
                this.isDeleteModal = false;
            },
            openDelete(row) {
                this.selectedItem = row;
                this.isDeleteModal = true;
            },
            openDetail(row) {
                this.selectedItem = row;
                this.$router.push({name: 'movies-detail', params: {slug: this.selectedItem.slug}})

            },
            openNew() {
                this.$router.push({name: 'movies-detail', params: {slug: "new"}})
            },
            getIndex(index) {
                return (index + 1) + (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
            },
            loadPage(pageIndex) {
                this.pagination.currentPage = pageIndex;
                this.prepation();
            },
            prepation() {
                MovieService.getMovies(this.pagination)
                    .then(response => {
                        this.tableData = response.data.data.data;
                        this.pagination.totalItemCount = response.data.data.total;
                    });
            }
        }
    }
</script>
<style>

</style>
