<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                        <span class="avatar avatar-sm rounded-circle">
                            <img v-if="model.avatar" v-lazy="model.avatar.url"
                                 :alt="model.avatar.alt">
                            <!--                            <img alt="Image placeholder" src="img/theme/team-4-800x800.jpg">-->
                        </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{model.lastname |
                                concatStr(model.firstname)}}
                            </span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Xin chào!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Thông tin cá nhân</span>
                        </router-link>
<!--                        <router-link to="/profile" class="dropdown-item">-->
<!--                            <i class="ni ni-settings-gear-65"></i>-->
<!--                            <span>Settings</span>-->
<!--                        </router-link>-->
<!--                        <router-link to="/profile" class="dropdown-item">-->
<!--                            <i class="ni ni-calendar-grid-58"></i>-->
<!--                            <span>Activity</span>-->
<!--                        </router-link>-->
<!--                        <router-link to="/profile" class="dropdown-item">-->
<!--                            <i class="ni ni-support-16"></i>-->
<!--                            <span>Support</span>-->
<!--                        </router-link>-->
                        <div class="dropdown-divider"></div>
                        <router-link to="/login" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Đăng xuất</span>
                        </router-link>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
    import MovieService from "../services/MovieService";

    export default {
        data() {
            return {
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
                activeNotifications: false,
                showMenu: false,
                searchQuery: ''
            };
        },
        created() {
            this.prepation()
        },
        filters: {
            concatStr: function (lastname, firstname) {
                return lastname.concat(' ', firstname)
            },
        },
        methods: {
            prepation() {
                if (this.$store.getters.getUserName) {
                    MovieService.getUserByUserName(this.$store.getters.getUserName)
                        .then(response => {
                            this.model = response.data.data.data;
                        });
                }
            },
            toggleSidebar() {
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
            },
            hideSidebar() {
                this.$sidebar.displaySidebar(false);
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
            }
        }
    };
</script>
