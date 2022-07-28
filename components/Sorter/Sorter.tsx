import React, { useState } from "react";

interface IProps{
    isOlderFirst: boolean,
    setIsOlderFirst: React.Dispatch<React.SetStateAction<boolean>>
}

const Sorter = ({isOlderFirst, setIsOlderFirst}: IProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <div className="inline-block relative">
      <button className="bg-[#fff] rounded-[4px] p-[5px] hover:scale-105 " onClick={() => setIsModalVisible((value: boolean) =>  !value)}>
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.33332 2.43478L8.97233 2.08883L9.33332 1.71214L9.69432 2.08883L9.33332 2.43478ZM9.83332 25.5652C9.83332 25.8414 9.60947 26.0652 9.33332 26.0652C9.05718 26.0652 8.83332 25.8414 8.83332 25.5652L9.83332 25.5652ZM4.30566 6.9584L8.97233 2.08883L9.69432 2.78074L5.02765 7.6503L4.30566 6.9584ZM9.69432 2.08883L14.361 6.9584L13.639 7.6503L8.97233 2.78074L9.69432 2.08883ZM9.83332 2.43478L9.83332 25.5652L8.83332 25.5652L8.83332 2.43478L9.83332 2.43478Z"
            fill="#0B1A30"
          />
          <path
            d="M18.6667 19.4783L18.3057 19.8242L18.6667 20.2009L19.0277 19.8242L18.6667 19.4783ZM19.1667 8.52175C19.1667 8.24561 18.9428 8.02175 18.6667 8.02175C18.3905 8.02175 18.1667 8.24561 18.1667 8.52175L19.1667 8.52175ZM13.639 14.9547L18.3057 19.8242L19.0277 19.1323L14.361 14.2628L13.639 14.9547ZM19.0277 19.8242L23.6943 14.9547L22.9723 14.2628L18.3057 19.1323L19.0277 19.8242ZM19.1667 19.4783L19.1667 8.52175L18.1667 8.52175L18.1667 19.4783L19.1667 19.4783Z"
            fill="#0B1A30"
          />
        </svg>

        {/* fill="#0B1A30" */}
      </button>

      {
        isModalVisible &&
        <ul className="absolute w-32 right-0 top-[105%] bg-[#fff] rounded-[4px] shadow overflow-hidden">
        <li >
            <button
             className={`px-4 py-2 w-full text-sm ${isOlderFirst ? " bg-[#0b1a30] text-white " : ""}  `}
             onClick={() => setIsOlderFirst(true)}
            >
                Newer first
            </button>
        </li>
        <li>
            <button
         className={`px-4 py-2 w-full text-sm ${isOlderFirst ? "" :"  bg-[#0b1a30] text-white " }  `}
         onClick={() => setIsOlderFirst(false)}
         >
           
                Older first
            </button>
        </li>
      </ul>
      }

    
    </div>
  );
};

export default Sorter;
