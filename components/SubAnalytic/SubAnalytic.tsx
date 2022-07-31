import { Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import SpecialModalListItem from "./SpecialModalListItem";
interface IProps {
  children?: JSX.Element;
  title: string;
  toolTipMessage?: string;
  special?: boolean;
  should_flex?: boolean;
  data_exists?: boolean;
  selected?: number
  setSelected?: React.Dispatch<React.SetStateAction<number>>
}

// should_flex && special refer to the line chart
const SPECIAL_HEADER_OPTIONS = ["Current Day", "Current Month"];
const SubAnalytic = ({
  toolTipMessage,
  title,
  children,
  special,
  should_flex,
  data_exists,
  selected,
  setSelected
}: IProps) => {
  const [showToolTip, setShowToolTip] = useState(false);
  const [isSpecialModalVisible, setIsSpecialModalvisible] = useState(false);

  // useEffect(() => {});

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showToolTip) {
      timeout = setTimeout(() => {
        setShowToolTip(false);
      }, 1000);
    }
    return () => clearInterval(timeout);
  });

  const handleClick = (e: React.FormEvent) => {
    e.stopPropagation()
    const listener = function() {
      if(isSpecialModalVisible){
        setIsSpecialModalvisible((value: boolean) => false)
      }
    }
    // console.log("IsSpecialModalvisible: ", isSpecialModalVisible);
    // if(isSpecialModalVisible) setIsSpecialModalvisible(false) 
    // if(!isSpecialModalVisible) setIsSpecialModalvisible(true) 
    // setIsSpecialModalvisible((isSpecialModalVisible) => !isSpecialModalVisible);
    document.body.addEventListener("click" , listener)
    setIsSpecialModalvisible((value: boolean) => !value)
  };

  useEffect(() => {
    const listener = () => setIsSpecialModalvisible((v: boolean) => false);
    document.body.addEventListener("click", listener);
    return () => document.body.removeEventListener("click", listener);

}, []);
// console.log("Oguntade Omowale")
  return (
    <div
      className={`py-7  w-full bg-[#FFF] rounded-md  aspect-square   ${
        should_flex ? "flex flex-col aspect-auto" : "px-5  "
      }`}
    >
      <div className={`flex justify-center gap-2 items-center  mb-3 relative flex-shrink-0 `}>
        {!special  ? (
          <p className="block font-bold text-center text-[18px]  ">{title}</p>
        ) : (
          <div className="w-[250px] relative shadow">
            <button
              className="font-bold text-center text-[18px] w-full gap-5 flex justify-between items-center px-4"
              onClick={(e) => handleClick(e)}
            >
              <span className="">{SPECIAL_HEADER_OPTIONS[selected as number]}</span>
              <span className="">
                <svg
                  className={`duration-150 ease-out ${
                    isSpecialModalVisible ? "rotate-180 " : "rotate-0"
                  }`}
                  width="15"
                  height="14"
                  viewBox="0 0 26 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 13L13.3536 13.3536L13 13.7071L12.6464 13.3536L13 13ZM25.3536 1.35355L13.3536 13.3536L12.6464 12.6464L24.6464 0.646447L25.3536 1.35355ZM12.6464 13.3536L0.646446 1.35355L1.35355 0.646448L13.3536 12.6464L12.6464 13.3536Z"
                    fill="#0B1A30"
                  />
                </svg>
              </span>
            </button>
            {isSpecialModalVisible && (
              <ul
                className={` w-full absolute top-8 rounded-[4px] overflow-hidden bg-white shadow-md `}
              >
                {SPECIAL_HEADER_OPTIONS.map((key, index) => (
                  <SpecialModalListItem
                    index={index}
                    key={index}
                    isSelected={selected == index}
                    setSelected={setSelected as React.Dispatch<React.SetStateAction<number>>}
                  >
                    {key}
                  </SpecialModalListItem>
                ))
                }
              
              </ul>
            )}
          </div>
        )}

        {toolTipMessage && (
          <>
            <span
              className={` absolute w-full bg-gray-700 bg-opacity-50 text-white -top-12 rounded-sm p-2 text-[14px] max-w-[350px] text-center ${
                showToolTip ? "block" : "hidden"
              }`}
            >
              {toolTipMessage}
            </span>
            <button
              className="p-[2px] "
              onClick={() => setShowToolTip(!showToolTip)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="9" stroke="#0B1A30" />
                <path
                  d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z"
                  fill="#0B1A30"
                />
                <path d="M12 17V10" stroke="#0B1A30" />
              </svg>
            </button>
          </>
        )}
      </div>
      {/* <div className='my-1'> */}
      <div
        className={`w-full h-full ${
          special ? "overflow-x-scroll md:overflow-x-auto" : ""
        }`}
      >
        <div
          className={`h-full ${
            special && data_exists ? "w-[1000px] md:w-full" : "w-full"
          }`}
        >
          {children}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default SubAnalytic;
