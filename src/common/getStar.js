import NumConstant from "../constant/NumConstant";

function getNoStar(val) {
    return Math.floor(NumConstant.RATINGSTART - val)
}

export default {
    getNoStar
}