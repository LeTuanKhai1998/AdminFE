<template>
    <div v-if="model">
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center background"
                     :style="{'backgroundImage': 'url('+getImgUrl(model.banner.url)+')'}">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <router-link v-if="$routerHistory.hasPrevious()" :to="{ path: $routerHistory.previous().path }">
                            <a href="#!" class="btn btn-info"
                               style="background-color: #333333;border-color: #ffffff;min-width: 120px">Trở lại</a>
                        </router-link>
                        <h1 class="display-2 text-white"></h1>
                        <p class="text-white mt-0 mb-5"></p>
                        <div class="upload-btn-wrapper">
                            <button class="btn btn-info" style="font-size: medium;min-width: 120px;">Đổi hình</button>
                            <input accept="image/*" type="file" name="myfile" style="cursor: pointer"
                                   @change="uploadImage($event)"
                                   id="file-input"/>
                        </div>
                        <!--                        <input class="btn" type="file" accept="image/*" @change="uploadImage($event)" id="file-input">-->
                        <!--                        <a href="#!" class="btn btn-info" style="font-size: medium;min-width: 120px">Đổi hình</a>-->
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
                                        <img :src="getImgUrl(model.image.url)" :alt="model.image.alt"
                                             class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <base-button size="sm" type="info" class="mr-4">Đổi hình</base-button>
                                <!--                                <base-button size="sm" type="default" class="float-right">Xóa hình</base-button>-->
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div style="margin-top: 80px!important;"
                                         class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading">{{model.num_view}}</span>
                                            <span class="description">Lượt xem</span>
                                        </div>
                                        <div>
                                            <span class="heading">{{model.rate}}</span>
                                            <span class="description">Điểm đánh giá</span>
                                        </div>
                                        <div>
                                            <span class="heading">{{model.num_rate}}</span>
                                            <span class="description">Số người đánh giá</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!--                            <div class="text-center">-->
                            <!--                                <h3>-->
                            <!--                                    Jessica Jones<span class="font-weight-light">, 27</span>-->
                            <!--                                </h3>-->
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
                            <!--                            </div>-->
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Thông tin phim</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" @click.prevent="updateMovie"
                                       style="background-color: #2dce89;border-color: #2dce89;font-size: small"
                                       class="btn btn-sm btn-primary">Lưu</a>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        spellcheck="false"
                                                        label="Tên phim"
                                                        placeholder="Tên phim"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.name"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label">Năm phát hành</label>
                                            <multiselect v-model="model.release_year"
                                                         :options="years"
                                                         :searchable="false"
                                                         :close-on-select="true"
                                                         placeholder="Chọn năm"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Thời lượng"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.run_time"/>
                                        </div>
                                        <div class="col-lg-6">
                                            <label class="form-control-label">Quốc gia</label>
                                            <multiselect
                                                    v-model="model.country"
                                                    :options="countrys"
                                                    :searchable="true"
                                                    :close-on-select="true"
                                                    :allow-empty="false"
                                                    placeholder="Chọn quốc gia"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-control-label">Thể loại</label>
                                            <multiselect
                                                    v-model="model.genres"
                                                    :options="genres"
                                                    :multiple="true"
                                                    placeholder="Chọn và tìm kiếm thể loại"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4"/>
                                <!-- Address -->
                                <h6 class="heading-small text-muted mb-4">Đạo diễn, diễn viên</h6>

                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-control-label">Diễn viên</label>
                                            <multiselect
                                                    v-model="model.actors"
                                                    :options="actors"
                                                    :multiple="true"
                                                    placeholder="Chọn và tìm kiếm điễn viên"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label class="form-control-label">Đạo diễn</label>
                                            <multiselect
                                                    v-model="model.directors"
                                                    :options="directors"
                                                    :multiple="true"
                                                    placeholder="Chọn và tìm kiếm đạo diễn"
                                                    label="name"
                                                    track-by="name"/>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4"/>
                                <!-- Description -->
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="Mô tả">
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
    </div>
</template>
<script>
    import MovieService from "../services/MovieService";
    import getUrl from "../common/getUrl";
    import StringConstant from "../constant/StringConstant";
    import Multiselect from 'vue-multiselect'
    import getArrYear from "../common/getArrYear";
    import firebase from 'firebase'
    import stringUtil from "../utils/stringUtil";

    export default {
        components: {
            Multiselect
        },
        name: 'movie-deatil',
        props: {
            slug: String
        },
        data() {
            return {
                member: {
                    name: "Jakz",
                    coverImage: "<https://vuejs.org/images/logo.png>"
                },
                years: [],
                countrySelected: null,
                countrys: [],
                genres: [],
                actors: [],
                directors: [],
                model: null,
                message: '',
                form: null,
                formToast: {
                    message: '',
                    type: '',
                    position: StringConstant.BottomToast,
                },
            }
        },
        created() {
            this.years = getArrYear.getArYear(1970);
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
            setDataForm() {
                this.form = {
                    movie: this.model,
                    updateActor: true,
                    updateBanner: true,
                    updateDirector: true,
                    updateGenre: true,
                    updateImage: true
                }
            },
            updateMovie() {
                this.model.slug = stringUtil.convertToSlug(this.model.name)
                this.setDataForm();
                MovieService.updateMovie(this.form)
                    .then(respose => {
                        this.message = respose.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Lưu thông tin thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thủ lại sau!", StringConstant.TypeToastError)
                        }
                        this.showToast()
                        if (this.$routerHistory.hasPrevious()) {
                            this.$router.push({path: this.$routerHistory.previous().path})
                        }
                    });
            },
            async uploadImage(event) {
                // let data = new FormData();
                // data.append('file', event.target.files[0], 'my-picture');
                const storageRef = firebase.storage().ref(`${event.target.files[0].name}`).put(event.target.files[0]);
                storageRef.on(`state_changed`, snapshot => {
                        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    }, error => {
                        // eslint-disable-next-line no-console
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue = 100;
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            // this.picture =url;
                            // eslint-disable-next-line no-console
                            console.log("url", url)
                        });
                    }
                )
            },
            getImgUrl(val) {
                return getUrl.getImgUrl(val, 1)
            },
            prepation() {
                MovieService.getCountrys()
                    .then(respose => {
                        this.countrys = respose.data.data.data;
                    });
                MovieService.getGenres()
                    .then(respose => {
                        this.genres = respose.data.data.data;
                    });
                MovieService.getActors()
                    .then(respose => {
                        this.actors = respose.data.data.data;
                    });
                MovieService.getDirectors()
                    .then(respose => {
                        this.directors = respose.data.data.data;
                    });
                if (this.slug.localeCompare("new") != 0) {
                    MovieService.getMovieBySlug(this.slug)
                        .then(response => {
                            this.model = response.data.data.data;
                            // eslint-disable-next-line no-console
                            console.log(this.getImgUrl(this.model.banner.url));
                        });
                } else {
                    this.initData();
                }
            },
            initData() {
                this.model = {
                    "id": 0,
                    "name": "",
                    "slug": "",
                    "description": "",
                    "release_year": null,
                    "num_view": 0,
                    "run_time": 0,
                    "rate": 0,
                    "num_rate": 0,
                    "country": null,
                    "image": {
                        "id": 0,
                        "url": "empty.jpg",
                        "alt": " "
                    },
                    "banner": {
                        "id": 0,
                        "url": "empty_banner.jpg",
                        "alt": ""
                    },
                    "genres": [],
                    "actors": [],
                    "directors": []
                }
            }
        }
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style>
    .background {
        background-image: url("data:image/jpeg;base64,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");
        min-height: 600px;
        background-size: cover;
        background-position: center top;
    }

    .opacity-8 {
        opacity: .2 !important;
    }

    .bg-gradient-success {
        background: linear-gradient(87deg, #0085ce 0, #f5365c 100%) !important;
    }

    .bg-gradient-success {
        background: linear-gradient(87deg, #f5365c 0, #ffffff 100%) !important;
    }

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

</style>
