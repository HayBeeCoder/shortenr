import { REGEX_URL, REGEX_WHITESPACE, SERVER_DOMAIN } from "../constants";

interface ReturnValue{
  regex_test: boolean,
  url_contains_domain_test: boolean
}

export const validateURL = (url: string): ReturnValue => {
  // let returnValue: {regex_test: boolean,url_contains_domain_test: boolean};
  // console.log(url)
  // try {
    let a = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm.test(url.trim());
    
    // let a = REGEX_URL.test(url.trim());
    // let a = REGEX_URL.test(url.trim());

    // console.log("aaaaaaaaaaa:" ,a)
    // console.log('regex: ', REGEX_URL)
    const returnValues = {
      regex_test: a && !url.includes(" "),
      url_contains_domain_test: url.includes(SERVER_DOMAIN)
    }
    // returnValue = returnValues;
    // console.log("return value: " ,returnValue)
  // } catch (e) {
  //   returnValue = false;
  // }

  return returnValues;
};
