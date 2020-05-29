import Vue from 'vue'
import Vuex from 'vuex'
import MovieService from "./services/MovieService";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loginSuccess: false,
        loginError: false,
        userName: null,
        userPass: null,
        response: []
    },
    mutations: {
        login_success(state, payload) {

            state.loginSuccess = true;
            state.userName = payload.userName;
            state.userPass = payload.userPass;
        },
        login_error(state) {
            state.loginError = true
            state.userName = name
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async login({commit}, userObj) {
            let user = userObj.user;
            // eslint-disable-next-line no-console
            console.log("user", user)
            return MovieService.login(user.username, user.password)
                .then(response => {
                    // eslint-disable-next-line no-console
                    console.log("Response: '" + response.data + "' with Statuscode " + response.status);
                    if (response.status == 200) {
                        MovieService.getUserByUserName(user.username).then(
                            response => {
                                if (response.data.data.data.role.permissionTabs.length > 0) {

                                    // place the loginSuccess state into our vuex store
                                    return commit('login_success', {
                                        userName: user.username,
                                        userPass: user.password
                                    });
                                }
                            }
                        )
                    }
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log("Error: " + error);
                    // place the loginError state into our vuex store
                    commit('login_error', name);
                    return Promise.reject("Invald credentials!")
                })
        }
    },
    getters: {
        isLoggedIn: state => state.loginSuccess,
        hasLoginErrored: state => state.loginError,
        getUserName: state => state.userName,
        getUserPass: state => state.userPass
    }
})
export default store;