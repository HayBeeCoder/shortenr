// const BASE_URL = " http://127.0.0.1:8000/v1/"
const BASE_URL = "https://shortenr-api.herokuapp.com/v1/"
const REGEX_EMAIL = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);  

export {
    BASE_URL, REGEX_EMAIL
}