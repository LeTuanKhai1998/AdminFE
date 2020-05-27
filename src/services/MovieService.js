import axios from "axios";
import APIPath from "../utils/APIPath";

const INSTRUCTOR = "api/admin";
const COURSE_API_URL = "http://localhost:8083";
const INSTRUCTOR_API_URL = `${COURSE_API_URL}/${INSTRUCTOR}`;

class UsersDataService {


    // eslint-disable-next-line no-unused-vars
    uploadFile(URL, data, config) {
        alert("ssssss")
        axios.post(URL, data, {
            onUploadProgress: progressEvent => {
                // eslint-disable-next-line no-console
                console.log(progressEvent.loaded / progressEvent.total)
            }
        })
        // axios.put(
        //     URL,
        //     data,
        //     config
        // ).then(
        //     response => {
        //         // eslint-disable-next-line no-console
        //         console.log('image upload response > ', response)
        //     }
        // )
    }

    getDirectors() {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Directors}`);
    }

    getActors() {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Actors}`);
    }

    getGenres() {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Genres}`);
    }

    getCountrys() {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Countrys}`);
    }

    getPermissionTab(){
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.PermissionTab}`);
    }

    getUserRoles() {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UserRoles}`);
    }

    getMovieBySlug(slug) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.MovieBySlug}` + slug);
    }

    getMovieById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.MovieById}` + id);
    }

    getMovies(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Movies}`, form);
    }

    getAllActors(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.AllActors}`, form);
    }

    getAllGenres(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.AllGenres}`, form);
    }

    getAllUser(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.Users}`, form);
    }

    getAllCountrys(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.AllCountrys}`, form);
    }

    getAllDirectors(form) {
    return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.AllDirector}`, form);
}
    getAllUserRoles(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.AllUserRoles}`, form);
    }

    getTopViewByTime(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.TopViewByTime}`, form);
    }


    updateUser(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateUser}`, form);
    }

    deleteUserById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteUserById}` + id);
    }

    updateActor(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateActor}`, form);
    }

    deleteActorById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteActorById}` + id);
    }

    updateCountry(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateCountry}`, form);
    }
    deleteCountryById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteCountryById}` + id);
    }
    updateDirector(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateDirector}`, form);
    }
    deleteDirectorById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteDirectorById}` + id);
    }
    updateGenre(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateGenre}`, form);
    }
    deleteGenreById(id) {
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteGenreById}` + id);
    }
    updateMovie(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateMovies}`, form);
    }
    deleteMovieById(id){
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteMovieById}` + id);
    }
    UpdateUserRole(form) {
        return axios.post(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.UpdateUserRole}`, form);
    }
    deleteUserRoleById(id){
        return axios.get(`${INSTRUCTOR_API_URL}/${APIPath.MOVIE.DeleteUserRoleById}` + id);
    }
}

export default new UsersDataService();