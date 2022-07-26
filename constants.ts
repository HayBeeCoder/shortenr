// const BASE_URL = " http://127.0.0.1:8000/v1/"
const BASE_URL = "https://shrtenr.herokuapp.com/v1/";
const REGEX_EMAIL = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const REGEX_URL = RegExp(/^(http(s?):\/\/)?(www.)?/);
const SERVER_DOMAIN = "https://shortenr-api.herokuapp.com/";
const MAX_URL_CHARACTERS_POSSIBLE = 255;
const ROW_PER_PAGE = 10;
//below regex matches a space character
const REGEX_WHITESPACE = RegExp(/ /g);

export {
  BASE_URL,
  REGEX_EMAIL,
  REGEX_URL,
  SERVER_DOMAIN,
  MAX_URL_CHARACTERS_POSSIBLE,
  REGEX_WHITESPACE,
  ROW_PER_PAGE,
};
