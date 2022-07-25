import React from "react";

interface IProps {
  isURLVeryLong: boolean;
  isURLValid: boolean;
}

const UrlBanners = (props: IProps) => {
  return (
    <>
      {props.isURLVeryLong && (
        <p className="border-solid border-[1px] bg-[#fefefe] text-center  rounded-[8px]  px-6  py-2">
          Sorry, Links longer than 255 characters can&apos;t be shortened yet.
        </p>
      )}
      {!props.isURLValid && (
        <p className="border-solid border-[1px] bg-[#fefefe] text-center  rounded-[8px]  px-6  py-2">
          Please , enter a valid URL!
        </p>
      )}
    </>
  );
};

export default UrlBanners;
