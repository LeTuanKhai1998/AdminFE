import servePath from "../utils/servePath";

function getImgUrl(val, type) {
    if (type == 1) {
        return servePath.serveImage + '/movies/' + val
    } else {
        return servePath.serveImage + '/user/' + val
    }

}

export default {
    getImgUrl
}