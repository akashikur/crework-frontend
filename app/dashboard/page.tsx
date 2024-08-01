"use client";
import Banner from "@/components/Banner";
import Modal from "@/components/Modal";
import NavBar from "@/components/NavBar";
import TodoDetails from "@/components/TodoDetails";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/store";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const router = useRouter();
  const { isModalOpen, userLoad } = useUser();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="w-full h-screen flex">
      <div className="basis-1/5 border border-r-gray-400 flex justify-between flex-col items-center py-7">
        {userLoad ? <ClipLoader /> : <NavBar />}
        <div className="h-[61px] w-[253px] flex items-center gap-x-3">
          <svg
            width="40"
            height="41"
            viewBox="0 0 40 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 33.8335H30"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.9998 7.1665V27.1665M19.9998 27.1665L25.8332 21.3332M19.9998 27.1665L14.1665 21.3332"
              stroke="#666666"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <p className="text-[20px] text-[#666666] font-medium">
              Download the app
            </p>
            <p className="text-[14px] text-[#666666] font-normal">
              Get the full experience
            </p>
          </div>
        </div>
      </div>
      <div className="basis-4/5 my-2 mx-4 overflow-hidden">
        <main className="flex gap-y-4 flex-col">
          <section>
            <Banner />
          </section>
          <section className="flex justify-around overflow-auto max-h-full mt-1">
            <TodoDetails />
          </section>
        </main>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Modal />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
