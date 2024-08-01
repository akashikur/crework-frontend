"use client";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useUser } from "@/app/context/store";
import { editTodo } from "@/app/api/todoApi";

interface TodoItem {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
  updatedDate?: string;
}

const TodoDetails = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [todoData, setTodoData] = useState<TodoItem[]>([]);
  const { isLoading, setIsLoading, setIsModalOpen, isModalOpen } = useUser();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const onDrop = async (status: string) => {
    if (!activeCard) return;
    setIsLoading(true);
    try {
      await editTodo(activeCard, { status });
      await getData();
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/todo/getTodos`, {
        headers: { todo: localStorage.getItem("token") },
      });
      setTodoData(res.data.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "An error occurred");
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    setIsLoading(true);
    await axios
      .delete(`${backendUrl}/todo/deleteTodo/${id}`, {
        headers: { todo: localStorage.getItem("token") },
      })
      .then(() => {
        getData();
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.message || "An error occurred");
        } else {
          alert("An unknown error occurred");
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      getData();
    }
  }, [isModalOpen]);

  return (
    <>
      {isLoading ? (
        <div className="overflow-hidden">
          <ClipLoader />
        </div>
      ) : (
        <div className="flex gap-x-5 ">
          {["TO DO", "In Process", "Finished", "Under Review"].map((status) => (
            <div
              key={status}
              className="w-[256.75px] flex flex-col"
              onDrop={() => onDrop(status)}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="h-[20px] w-full flex justify-between items-center mb-2">
                <p className="text-[16px] text-[#555555]">{status}</p>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.5 5H11.5"
                    stroke="#555555"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 12H16.5"
                    stroke="#555555"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.5 19H21.5"
                    stroke="#555555"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col gap-y-4 overflow-y-auto max-h-[400px]">
                {todoData.map(
                  (item) =>
                    item.status === status && (
                      <TodoCard
                        item={item}
                        key={item._id}
                        setActiveCard={setActiveCard}
                        handleDelete={handleDelete}
                      />
                    )
                )}
              </div>
              <button
                className="w-full bg-add-gradient rounded-lg text-[#E3E1E1] text-[] p-2 mt-2 flex justify-between"
                onClick={() => setIsModalOpen((prev: boolean) => !prev)}
              >
                <p>Add new</p>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.75 12H12.75M12.75 12H18.75M12.75 12V6M12.75 12V18"
                    stroke="#E3E1E1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TodoDetails;
