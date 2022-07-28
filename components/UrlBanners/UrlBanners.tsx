import React from "react";
import { MAX_URL_CHARACTERS_POSSIBLE } from "../../constants";

interface IProps {
  isURLVeryLong: boolean;
  isURLValid: boolean;
  isURLShortened: boolean
  url?: string
}

const UrlBanners = (props: IProps) => {
  return (
    <>
      {props.isURLVeryLong && (
        <p className="border-solid border-[1px] bg-[#fefefe] text-center  rounded-[4px]  text-sm px-4  py-2 mb-2">
          Sorry, Links longer than {MAX_URL_CHARACTERS_POSSIBLE} characters can&apos;t be shortened yet.
        </p>
      )}
      {!props.isURLValid && props.url && props.url?.length > 0 && (
        <p className="border-solid border-[1px] bg-[#fefefe] text-center  rounded-[4px]  text-sm px-4 py-2 mb-2">
          Please , enter a valid URL!
        </p>
      )}
      {
        props.isURLShortened && (
          <p className="border-solid border-[1px] bg-[#fefefe] text-center  rounded-[4px]  text-sm px-4 py-2 mb-2">
          Seems this link has been shortened :(.
        </p>
        )
      }
    </>
  );
};

export default UrlBanners;
