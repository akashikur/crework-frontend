import React from "react";
import { bannerContainerInfo } from "./bannerinfo";
import { useUser } from "@/app/context/store";
import { ClipLoader } from "react-spinners";

export interface User {
  fullName: string;
}

const Banner = () => {
  const { user, setIsModalOpen, userLoad } = useUser();

  const firstname = user?.fullName.split(" ");
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-semibold">
          {userLoad ? (
            <ClipLoader />
          ) : (
            `Good morning ${firstname ? firstname[0] : " "}`
          )}
        </h1>
        <div className="flex gap-x-2 items-center">
          <p className="text-[16px]">Help & feedback</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#080808"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 9.00001C9 5.49998 14.5 5.50001 14.5 9.00001C14.5 11.5 12 10.9999 12 13.9999"
              stroke="#080808"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 18.0099L12.01 17.9988"
              stroke="#080808"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="h-[123px] w-full flex justify-around">
        {bannerContainerInfo.map((item, index) => (
          <div
            key={index}
            className="w-[363.67px] h-[123px] flex gap-x-2 items-center"
          >
            <div className="w-[77px] h-[61px] ">{item.image}</div>
            <div>
              <h6 className="text-[16px] font-semibold text-gray-500">
                {item.title}
              </h6>
              <p className="text-[14px] text-gray-400 leading-4">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[40px] flex justify-between items-center ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none"
          />
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            <path
              d="M17 17L21 21"
              stroke="#797979"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"
              stroke="#797979"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex gap-x-4 text-[14px]">
          <button className="flex flex-row items-center gap-x-2 rounded text-gray-500 bg-gray-200 px-2">
            <p>Calendar view</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 2V6"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="flex flex-row items-center gap-x-2 rounded p-2 text-gray-500 bg-gray-200 px-2">
            <p>Automation</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 15C12.8747 15 15 12.949 15 8C15 12.949 17.1104 15 22 15C17.1104 15 15 17.1104 15 22C15 17.1104 12.8747 15 8 15Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M2 6.5C5.13376 6.5 6.5 5.18153 6.5 2C6.5 5.18153 7.85669 6.5 11 6.5C7.85669 6.5 6.5 7.85669 6.5 11C6.5 7.85669 5.13376 6.5 2 6.5Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="flex flex-row items-center gap-x-2 rounded p-2 text-gray-500 bg-gray-200 px-2">
            <p>Filter</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.99951 3H19.9996C20.5519 3 20.9996 3.44764 20.9996 3.99987L20.9998 5.58569C20.9999 5.85097 20.8945 6.10538 20.7069 6.29295L14.2924 12.7071C14.1049 12.8946 13.9995 13.149 13.9995 13.4142V19.7192C13.9995 20.3698 13.3881 20.8472 12.757 20.6894L10.757 20.1894C10.3118 20.0781 9.99951 19.6781 9.99951 19.2192V13.4142C9.99951 13.149 9.89415 12.8946 9.70662 12.7071L3.2924 6.29289C3.10486 6.10536 2.99951 5.851 2.99951 5.58579V4C2.99951 3.44772 3.44722 3 3.99951 3Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="flex flex-row items-center gap-x-2 rounded p-2 text-gray-500 bg-gray-200 px-2">
            <p>Share</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.5 6.5L8.5 10.5"
                stroke="#797979"
                stroke-width="1.5"
              />
              <path
                d="M8.5 13.5L15.5 17.5"
                stroke="#797979"
                stroke-width="1.5"
              />
            </svg>
          </button>
          <button
            className="bg-customPurple rounded-lg p-2 text-white flex flex-row items-center gap-x-2 "
            onClick={() => setIsModalOpen((prev: boolean) => !prev)}
          >
            <p>Create new</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.25V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H12.75V8Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
