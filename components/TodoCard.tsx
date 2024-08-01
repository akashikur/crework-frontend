import { getRemainingTime } from "@/utils/getRemainingTime";
import { getTimeElapsed } from "@/utils/getTimeElapsed";
import { Trash } from "lucide-react";
import React from "react";

export interface TodoItem {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
  updatedDate?: string;
}

interface TodoCardProps {
  item: TodoItem;
  setActiveCard: (id: string | null) => void;
  handleDelete: (id: string) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  item,
  setActiveCard,
  handleDelete,
}) => {
  // Function to get the class name based on priority
  const getPriorityClass = (priority: string | undefined): string => {
    switch (priority) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Urgent":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div
      className="h-[231px] border border-gray-400 rounded flex flex-col py-4 px-3 gap-y-2 cursor-pointer"
      draggable
      onDragStart={() => setActiveCard(item._id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="h-max flex gap-y-1 flex-col">
        <div className="flex justify-between">
          <h5 className="text-[16px] text-gray-500 font-medium">
            {item.title}
          </h5>
          <Trash
            className="hover:text-red-600"
            onClick={() => handleDelete(item._id)}
          />
        </div>

        <p className="text-[14px] text-gray-400">{item.description}</p>
        <p
          className={`p-2 text-[12px] w-min rounded-xl text-white ${getPriorityClass(
            item.priority
          )}`}
        >
          {item.priority}
        </p>
        <p className="text-[14px] text-gray-500 font-medium">
          {" "}
          {item.deadline ? getRemainingTime(item.deadline) : "No deadline set"}
        </p>
      </div>
      <p className="text-[14px] text-gray-600 font-semibold text-left">
        {item.updatedDate
          ? getTimeElapsed(item.updatedDate)
          : "No recent updates"}
      </p>
    </div>
  );
};

export default TodoCard;
function async(_id: string) {
  throw new Error("Function not implemented.");
}
