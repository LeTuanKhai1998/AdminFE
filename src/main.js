/*!

=========================================================
* Vue Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouterBackButton from 'vue-router-back-button'
import VueLazyload from 'vue-lazyload'
import store from "./store";

import firebase from "firebase";

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueToast);
Vue.use(flatPicker);
Vue.use(Vuelidate)
// hoặc khởi tạo với custom option
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png',
    loading: 'https://i.pinimg.com/originals/a2/de/bf/a2debfb85547f48c3a699423ba75f321.gif',
    attempt: 1
})

firebase.initializeApp({
    apiKey: "AIzaSyBH3h8OgjCShqLOc7Jl32tPV9rVD1mNi7c",
    authDomain: "movie-online-7f8ea.firebaseapp.com",
    databaseURL: "https://movie-online-7f8ea.firebaseio.com",
    projectId: "movie-online-7f8ea",
    storageBucket: "movie-online-7f8ea.appspot.com",
    messagingSenderId: "13168361818",
    appId: "1:13168361818:web:7162eba6023fcf9a4af363",
    measurementId: "G-M5N7RMB4H8"
})
Vue.config.productionTip = false

Vue.use(ArgonDashboard)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

Vue.use(VueRouterBackButton, {router})
