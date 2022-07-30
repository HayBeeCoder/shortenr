const BASE_URL = "https://shrtenr.herokuapp.com/v1/";

const REGEX_EMAIL =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// Source for regex url:  https://www.regextester.com/93652
const REGEX_URL =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

const SERVER_DOMAIN = "https://shrtenr.herokuapp.com";

const MAX_URL_CHARACTERS_POSSIBLE = 1000;

const Y_AXIS_LENGTH = 10

const ROW_PER_PAGE = 10;

//below regex matches a space character
const REGEX_WHITESPACE = RegExp(/ /g);

const TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const HOURS = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

// const HOUR_COUNTS = new Array(24).fill(0);

export {
  BASE_URL,
  REGEX_EMAIL,
  REGEX_URL,
  SERVER_DOMAIN,
  MAX_URL_CHARACTERS_POSSIBLE,
  REGEX_WHITESPACE,
  ROW_PER_PAGE,
  TIME_ZONE,
  HOURS,
  Y_AXIS_LENGTH
};
