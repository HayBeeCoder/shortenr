import { REGEX_URL, REGEX_WHITESPACE, SERVER_DOMAIN } from "../constants";

export const validateURL = (url: string): boolean => {
  const returnValue =
    REGEX_URL.test(url) &&
    !url.includes(SERVER_DOMAIN) &&
    Boolean(new URL(url)) &&
    !REGEX_WHITESPACE.test(url);
  console.log("1", REGEX_URL.test(url));
  console.log("2", !url.includes(SERVER_DOMAIN));
  console.log("3", Boolean(new URL(url)));
  console.log("4", !REGEX_WHITESPACE.test(url));
  console.log("12345", returnValue);
  return returnValue;
};