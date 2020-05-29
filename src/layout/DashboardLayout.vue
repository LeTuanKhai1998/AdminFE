<template>
    <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
        <side-bar
                :background-color="sidebarBackground"
                short-title="Argon"
                title="Argon"
        >
            <template slot="links">
                <sidebar-item
                        :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
                />

                <!--        <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>-->
                <!--        <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/>-->
                <sidebar-item
                        :link="{name: 'Thông tin cá nhân', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
                <!--        <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>-->
                <div v-if="isShowUser">
                    <sidebar-item :link="{name: 'Quản lý người dùng', icon: 'fa fa-user text-black', path: '/users'}"/>
                </div>
                <div v-if="isShowMovie">
                    <sidebar-item :link="{name: 'Quản lý phim', icon: 'fa fa-film text-red', path: '/movies'}"/>
                </div>
                <div v-if="isShowGenre">
                    <sidebar-item
                            :link="{name: 'Quản lý thể loại', icon: 'fa fa-braille text-blue', path: '/genres'}"/>
                </div>
                <div v-if="isShowCountry">
                    <sidebar-item
                            :link="{name: 'Quản lý quốc gia', icon: 'fa fa-globe text-red', path: '/countrys'}"/>
                </div>
                <div v-if="isShowActor">
                    <sidebar-item
                            :link="{name: 'Quản lý diễn viên', icon: 'fa fa-users text-green', path: '/actors'}"/>
                </div>
                <div v-if="isShowDirector">
                    <sidebar-item
                            :link="{name: 'Quản lý đạo diễn', icon: 'fa fa-male text-blue', path: '/directors'}"/>
                </div>
                <div v-if="isShowRole">
                    <sidebar-item
                            :link="{name: 'Quản lý phân quyền', icon: 'ni ni-active-40', path: '/userroles'}"/>
                </div>
                <!--        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>-->
                <!--        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/>-->

            </template>
        </side-bar>
        <div class="main-content" :data="sidebarBackground">
            <dashboard-navbar></dashboard-navbar>

            <div @click="toggleSidebar">
                <fade-transition :duration="200" origin="center top" mode="out-in">
                    <!-- your content here -->
                    <router-view></router-view>
                </fade-transition>
                <content-footer v-if="!$route.meta.hideFooter"></content-footer>
            </div>
        </div>
    </div>
</template>
<script>
    import DashboardNavbar from './DashboardNavbar.vue';
    import ContentFooter from './ContentFooter.vue';
    import {FadeTransition} from 'vue2-transitions';
    import MovieService from "../services/MovieService";

    export default {
        components: {
            DashboardNavbar,
            ContentFooter,
            FadeTransition
        },
        data() {
            return {
                sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
                model: null,
                isShowUser: false,
                isShowMovie: false,
                isShowGenre: false,
                isShowCountry: false,
                isShowActor: false,
                isShowDirector: false,
                isShowRole: false,
            };
        },
        created() {
            this.checkUserRole()
        },
        mounted: {},
        methods: {
            // eslint-disable-next-line no-unused-vars
            checkRole() {
                if (this.model) {
                    this.model.role.permissionTabs.forEach(item => {
                        switch (item.id) {
                            case 1:
                                this.isShowUser = true;
                                break;
                            case 2:
                                this.isShowGenre = true;
                                break;
                            case 3:
                                this.isShowMovie = true;
                                break;
                            case 4:
                                this.isShowCountry = true;
                                break;
                            case 5:
                                this.isShowActor = true;
                                break;
                            case 6:
                                this.isShowDirector = true;
                                break;
                            case 7:
                                this.isShowRole = true;
                                break;
                            default:
                                break;
                        }
                    })
                }

            },
            checkUserRole() {
                MovieService.getUserByUserName(this.$store.getters.getUserName).then(
                    response => {
                        this.model = response.data.data.data
                        this.checkRole()

                    }
                )
            },
            toggleSidebar() {
                if (this.$sidebar.showSidebar) {
                    this.$sidebar.displaySidebar(false);
                }
            }
        }
    };
</script>
<style lang="scss">
</style>
