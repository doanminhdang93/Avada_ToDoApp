import axios from "axios";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { server } from "../../server";

const TaskItem = ({ task, deleteTask }) => {
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const handleCheckboxClick = async () => {
    try {
      await axios.put(`${server}/task/${task.id}`, {
        isCompleted: !isCompleted,
        name: task.name,
      });
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="single-item">
      <div className="items">
        {task.name.length > 20 ? task.name.slice(0, 20) + "..." : task.name}
        <span className="icon-trash">
          <FaTrash onClick={() => deleteTask(task.id)}></FaTrash>
        </span>
      </div>
      <div
        className="checkbox"
        onChange={handleCheckboxClick}
        role="checkbox"
        aria-checked
      >
        <input
          type="checkbox"
          className="checkCompleted"
          checked={isCompleted}
          readOnly
          tabIndex={-1}
        ></input>
      </div>
    </div>
  );
};

export default TaskItem;
