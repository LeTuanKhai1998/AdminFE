<template>
    <div v-if="model">
        <!--        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center background"-->
        <!--                     :style="{'backgroundImage': 'url('+getImgUrl(model.banner.url)+')'}">-->
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center background"
                     :banner="model.banner">
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
                            <button class="btn btn-info" style="font-size: small;min-width: 120px;">Đổi hình</button>
                            <input accept="image/*" type="file" name="myfile" style="cursor: pointer"
                                   @change="onFileSelectedBanner"
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
                                        <!--                                        <img :src="getImgUrl(model.image.url)" :alt="model.image.alt"-->
                                        <!--                                             class="rounded-circle">-->
                                        <img v-lazy="model.image.url" :alt="model.image.alt"
                                             class="rounded-circle">
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
                            <div class="text-center" style="padding-bottom: 100px">
                                <h6 class="heading-small text-muted mb-4">Trailer</h6>
                                <div class="h5 font-weight-300" v-if="model.trailers.length>0">
                                    <iframe style="width: 320px;height: 240px" :src="model.trailers[0].url"></iframe>
                                </div>
                                <div class="h5 font-weight-300" v-else>
                                    <img class="text-center" v-lazy="tempImage" :alt="model.banner.alt"
                                         style="max-width: 320px;border-radius: 10px; border: 1px solid;padding: 10px;box-shadow: 2px 4px #888888;">
                                </div>
                                <div class="h5 font-weight-300">
                                    <base-input alternative=""
                                                spellcheck="false"
                                                label="Nhập link nhúng youtube"
                                                placeholder="Nhập link nhúng youtube"
                                                input-classes="form-control-alternative"
                                                v-model="tempTrailerUrl"/>
                                    <button @click="changeTrailerLink" class="btn btn-info"
                                            style="font-size: small;min-width: 120px;">Đổi link traier
                                    </button>

                                </div>
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
                                    <div class="row" style="margin-bottom: 80px">
                                        <div class="col-md-12">
                                            <h6 class="heading-small text-muted mb-4">Xem trước phim</h6>
                                            <div class="col-md-12">
                                                <div class="upload-btn-wrapper">
                                                    <button class="btn btn-info"
                                                            style="font-size: small;min-width: 120px;">Chọn phim
                                                    </button>
                                                    <input accept="video/*" type="file" name="myfile"
                                                           style="cursor: pointer"
                                                           @change="onFileSelectedMovie"/>
                                                </div>
                                            </div>
                                            <div v-if="model.serves.length>0">
                                                <video width="100%" height="auto" controls
                                                       :src="this.model.serves[0].url"></video>
                                            </div>
                                            <div v-else>
                                                <img class="text-center" v-lazy="tempImage" :alt="model.banner.alt"
                                                     style="max-width: 640px;border-radius: 10px">
                                            </div>
                                        </div>

                                    </div>
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
        <modal :show.sync="isUploadImage">
            <template slot="header">
                <h3 class="modal-title">Lưu thông tin</h3>
            </template>
            <div>
                <base-progress v-if="selectedImage" type="success" :height="8" :value="uploadValue"
                               label="Đang tải ảnh lên..."></base-progress>
                <h5 v-if="uploadValue==100" class="modal-title" style="color: green;margin-top: 5px">Đã tải ảnh thành
                    công!</h5>
                <base-progress v-if="selectedBanner" type="success" :height="8" :value="uploadValueBanner"
                               label="Đang tải ảnh banner lên..."></base-progress>
                <h5 v-if="uploadValueBanner==100" class="modal-title" style="color: green;margin-top: 5px">Đã tải ảnh
                    banner thành công!</h5>
                <base-progress v-if="selectedMovie" type="success" :height="12" :value="uploadValueMovie"
                               label="Đang tải ảnh phim lên..."></base-progress>
                <h5 v-if="uploadValueMovie==100" class="modal-title" style="color: green;margin-top: 5px">Đã tải ảnh
                    phim thành công!</h5>
            </div>
            <!--            </div>-->
            <template slot="footer">
                <base-button type="secondary" @click.prevent="updateMovieDetail">OK</base-button>
                <!--                <base-button type="primary" @click.prevent="deleteActor">Xác nhận xóa</base-button>-->
            </template>
        </modal>
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
            Multiselect,
        },
        name: 'movie-deatil',
        props: {
            slug: String
        },
        data() {
            return {
                tempTrailerUrl: "",
                tempImage: "https://firebasestorage.googleapis.com/v0/b/movie-online-7f8ea.appspot.com/o/movies%2Fempty.jpg?alt=media&token=dbdc5be2-4c74-4dc8-8f56-6c9217a678b4",
                uploadValue: 0,
                uploadValueBanner: 0,
                uploadValueMovie: 0,
                isUploadImage: false,
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
                selectedMovie: null,
                selectedImage: null,
                selectedBanner: null,
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
            changeTrailerLink() {
                if (this.model.trailers.length == 0) {
                    this.model.trailers.push({
                        "id": 0,
                        "url": this.tempTrailerUrl
                    })
                } else {
                    this.model.trailers[0].url = this.tempTrailerUrl;
                }
            },
            onFileSelectedMovie(event) {
                this.selectedMovie = event.target.files[0];
                if (this.model.serves.length == 0) {
                    this.model.serves.push({
                        "id": 0,
                        "url": URL.createObjectURL(this.selectedMovie)
                    })
                } else {
                    this.model.serves[0].url = URL.createObjectURL(this.selectedMovie);
                }
            },
            onFileSelectedBanner(event) {
                this.selectedBanner = event.target.files[0];
                this.model.banner.url = URL.createObjectURL(this.selectedBanner);
            },
            onFileSelectedImage(event) {
                this.selectedImage = event.target.files[0];
                this.model.image.url = URL.createObjectURL(this.selectedImage);
            },
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
            updateMovieDetail() {
                // eslint-disable-next-line no-console
                console.log("image", this.model.image)
                // eslint-disable-next-line no-console
                console.log("banner", this.model.banner)
                // eslint-disable-next-line no-console
                console.log("banner", this.model.serves)
                this.setDataForm();
                MovieService.updateMovie(this.form)
                    .then(respose => {
                        this.message = respose.data.data.data;
                        if (this.message.localeCompare("successful") == 0) {
                            this.setDataToast("Lưu thông tin thành công!", StringConstant.TypeToastSuccess)
                        } else {
                            this.setDataToast("Thao tác không thành công, xin thử lại sau!", StringConstant.TypeToastError)
                        }
                        this.isUploadImage = false
                        this.showToast()
                        if (this.$routerHistory.hasPrevious()) {
                            this.$router.push({path: this.$routerHistory.previous().path})
                        }
                    });
            },
            updateMovie() {
                this.model.slug = stringUtil.convertToSlug(this.model.name)
                if (this.selectedImage) {
                    this.isUploadImage = true;
                    this.uploadFile(this.model.slug, this.selectedImage, 1);
                }
                if (this.selectedImage) {
                    this.isUploadImage = true;
                    this.uploadFile(this.model.slug + "_banner", this.selectedBanner, 2);
                }
                if (this.selectedMovie) {
                    this.isUploadImage = true;
                    this.uploadFile(this.model.slug, this.selectedMovie, 3);
                }
            },
            uploadFile(name, selectedImage, type) {
                // let data = new FormData();
                // data.append('file', this.selectedImage, 'my-picture');

                let extention = ".jpg";
                let sourceFolder = "/movies/";
                if (type == 3) {
                    extention = ".mp4"
                    sourceFolder = "/videos/";
                }

                const storageRef = firebase.storage().ref(`${sourceFolder}${name}${extention}`).put(selectedImage);
                storageRef.on(`state_changed`, snapshot => {
                        switch (type) {
                            case 1:
                                this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                break;
                            case 2:
                                this.uploadValueBanner = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                break;
                            case 3:
                                this.uploadValueMovie = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                break;
                            default:
                                break;
                        }
                        // if (type == 1) {
                        //     this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // } else {
                        //     this.uploadValueBanner = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        // }

                    }, error => {
                        // eslint-disable-next-line no-console
                        console.log(error.message)
                    },
                    () => {
                        switch (type) {
                            case 1:
                                this.uploadValue = 100;
                                break;
                            case 2:
                                this.uploadValueBanner = 100;
                                break;
                            case 3:
                                this.uploadValueMovie = 100;
                                break;
                            default:
                                break;
                        }

                        // if (type == 1) {
                        //     this.uploadValue = 100;
                        // } else {
                        //     this.uploadValueBanner = 100;
                        // }
                        storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            switch (type) {
                                case 1:
                                    this.model.image.url = url;
                                    this.model.image.alt = name;
                                    break;
                                case 2:
                                    this.model.banner.url = url;
                                    this.model.banner.alt = name + " banner";
                                    break;
                                case 3:
                                    this.model.serves[0].url = url;
                                    break;
                                default:
                                    break;
                            }
                            // if (type == 1) {
                            //     this.model.image.url = url;
                            //     this.model.image.alt = name;
                            // } else {
                            //     this.model.banner.url = url;
                            //     this.model.banner.alt = name + " banner";
                            // }
                            // eslint-disable-next-line no-console
                            console.log("image", this.model.image)
                            // eslint-disable-next-line no-console
                            console.log("banner", this.model.banner)

                            // eslint-disable-next-line no-console
                            console.log("movie", this.model.serves)
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
                        "url": "https://firebasestorage.googleapis.com/v0/b/movie-online-7f8ea.appspot.com/o/movies%2Fempty_banner.jpg?alt=media&token=d29e1c49-f22b-4e84-8cc7-e8f68bbc2ba2",
                        "alt": " "
                    },
                    "banner": {
                        "id": 0,
                        "url": "https://firebasestorage.googleapis.com/v0/b/movie-online-7f8ea.appspot.com/o/movies%2Fempty.jpg?alt=media&token=dbdc5be2-4c74-4dc8-8f56-6c9217a678b4",
                        "alt": ""
                    },
                    "genres": [],
                    "actors": [],
                    "directors": [],
                    "serves": [],
                    "trailers": []
                }
            }
        }
    };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>
<style>
    .background {
        background-image: url("https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif");
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
