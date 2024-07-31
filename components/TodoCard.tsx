import React from "react";

export interface TodoItem {
  _id: string;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  deadline?: string;
  updatedDate?:string
}

interface TodoCardProps {
  item: TodoItem;
  setActiveCard: (id: string | null) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ item, setActiveCard }) => {
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

  const getRemainingTime = (deadline: string | undefined): string => {
    if (!deadline) return 'No deadline set';
    
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const difference = deadlineDate.getTime() - now.getTime();
    
    if (difference <= 0) return 'Deadline has passed';
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours} hours and ${minutes} minutes remaining`;
  };

  return (
    <div
      className="h-[231px] border border-gray-400 rounded flex flex-col py-4 px-3 gap-y-2 cursor-pointer"
      draggable
      onDragStart={() => setActiveCard(item._id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="h-max flex gap-y-1 flex-col">
        <h5 className="text-[16px] text-gray-500 font-medium">{item.title}</h5>
        <p className="text-[14px] text-gray-400">{item.description}</p>
        <p
          className={`p-2 text-[12px] w-min rounded-xl text-white ${getPriorityClass(
            item.priority
          )}`}
        >
          {item.priority}
        </p>
        <p className="text-[14px] text-gray-500 font-medium"> {item.deadline ? getRemainingTime(item.deadline) : 'No deadline set'}</p>
      </div>
      <p className="text-[14px] text-gray-600 font-semibold text-left">
       {item.updatedDate ? getRemainingTime(item.updatedDate) : ""}
      </p>
    </div>
  );
};

export default TodoCard;
