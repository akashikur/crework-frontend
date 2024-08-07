import { createTodo, editTodo } from "@/app/api/todoApi";
import { useUser } from "@/app/context/store";

import React, { useEffect, useState } from "react";

const Modal = () => {
  const { setIsModalOpen, taskInfo, setTaskInfo } = useUser();
  console.log(taskInfo);
  const [formData, setFormData] = useState({
    title: "",
    status: "",
    priority: "",
    deadline: "",
    description: "",
  });

  useEffect(() => {
    if (taskInfo) {
      setFormData({
        title: taskInfo.title || "",
        status: taskInfo.status || "",
        priority: taskInfo.priority || "",
        deadline: taskInfo.deadline || "",
        description: taskInfo.description || "",
      });
    }
  }, [taskInfo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleForm() {
    if (
      !formData.title ||
      !formData.status ||
      !formData.priority ||
      !formData.deadline
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (taskInfo && taskInfo._id) {
        await editTodo(taskInfo._id, formData);
        setTaskInfo(null);
      } else {
        await createTodo(formData);
      }
      setIsModalOpen((prev: any) => !prev);
    } catch (error) {
      console.error("Error while creating/updating todo:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="w-[622px] h-max bg-white p-4 flex flex-col ">
      <div className="flex justify-between">
        <div className="w-[64px] flex gap-x-3">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
            onClick={() => setIsModalOpen((prev: any) => !prev)}
          >
            <path
              d="M6.7583 17.2426L12.0009 12M12.0009 12L17.2435 6.75732M12.0009 12L6.7583 6.75732M12.0009 12L17.2435 17.2426"
              stroke="#797979"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.75 9.75L18 18M18 18V10.08M18 18H10.08"
              stroke="#797979"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.25 14.25L6 6M6 6V13.92M6 6H13.92"
              stroke="#797979"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex gap-x-5">
          <button className="p-2 flex gap-x-3 justify-center items-center bg-[#F4F4F4]">
            <p className="text-[#797979] font-normal">Share</p>
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
          <button className="p-2 flex gap-x-3 justify-center items-center bg-[#F4F4F4]">
            <p className="text-[#797979] font-normal">Favorite</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z"
                stroke="#797979"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-y-9 flex-col">
        <input
          type="text"
          className="h-[58px] w-full bg-transparent text-[48px] focus:bg-none outline-none"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <div className="h-[192px] flex flex-col w-[60%] justify-between">
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-x-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2V6"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 18V22"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 12H18"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 12H2"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.9292 4.92896L7.75762 7.75738"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.2427 16.2427L19.0711 19.0711"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.0711 4.92896L16.2427 7.75738"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.75713 16.2427L4.92871 19.0711"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-[#666666] text-[16px]">Status</p>
            </div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Not Selected
              </option>
              <option value="TO DO">TO DO</option>
              <option value="In Process">In Process</option>
              <option value="Under Review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-x-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_42_503)">
                  <path
                    d="M11.5757 1.42427C11.81 1.18996 12.1899 1.18996 12.4243 1.42427L22.5757 11.5757C22.81 11.81 22.8101 12.1899 22.5757 12.4243L12.4243 22.5757C12.19 22.81 11.8101 22.8101 11.5757 22.5757L1.42427 12.4243C1.18996 12.19 1.18996 11.8101 1.42427 11.5757L11.5757 1.42427Z"
                    stroke="#666666"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 8V12"
                    stroke="#666666"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16.0099L12.01 15.9988"
                    stroke="#666666"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_42_503">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p className="text-[#666666] text-[16px]">Priority</p>
            </div>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="" disabled>
                Not Selected
              </option>
              <option value="Urgent">Urgent</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-x-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 2V6"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-[#666666] text-[16px]">Deadline</p>
            </div>
            <input
              type="date"
              id="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center gap-x-5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.3631 5.65147L15.843 4.17148C16.6241 3.39043 17.8904 3.39043 18.6715 4.17148L20.0857 5.5857C20.8667 6.36674 20.8667 7.63307 20.0857 8.41412L18.6057 9.89411M14.3631 5.65147L4.74742 15.2671C4.41535 15.5992 4.21072 16.0375 4.1694 16.5053L3.92731 19.2458C3.87254 19.8658 4.39141 20.3847 5.01143 20.3299L7.75184 20.0878C8.21965 20.0465 8.658 19.8418 8.99007 19.5098L18.6057 9.89411M14.3631 5.65147L18.6057 9.89411"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p className="text-[#666666] text-[16px] ">Description</p>
            </div>
            <textarea
              name="description"
              placeholder="Not selected"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <button
          className="bg-customPurple p-2 rounded-md text-white"
          onClick={handleForm}
        >
          {taskInfo ? "Edit Form" : "save"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
