import { REGEX_URL, REGEX_WHITESPACE, SERVER_DOMAIN } from "../constants";

export const validateURL = (url: string): boolean => {
  let returnValue: boolean;
  // console.log(url)
  try {
    let a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(url.trim());
    // let a = REGEX_URL.test(url.trim());
    // let a = REGEX_URL.test(url.trim());

    // console.log("aaaaaaaaaaa:" ,a)
    // console.log('regex: ', REGEX_URL)
    returnValue = a && !url.includes(SERVER_DOMAIN);
    // console.log("return value: " ,returnValue)
  } catch (e) {
    returnValue = false;
  }

  return returnValue;
};
