const BASE_URL = "https://shortenr-api.herokuapp.com/v1/"
const REGEX_EMAIL = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);  

export {
    BASE_URL, REGEX_EMAIL
}