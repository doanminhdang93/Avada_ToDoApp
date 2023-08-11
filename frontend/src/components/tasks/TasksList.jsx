import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "../../styles/tasksStyles/tasksList.css";
import axios from "axios";
import { server } from "../../server";
import TaskItem from "./TaskItem";

const TasksList = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${server}/tasks`);
      // console.log(data);
      setTaskList(data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/task`, {
        name: newTask,
      });

      const newTasks = [{ ...data.data }, ...taskList];
      setTaskList(newTasks);
      setNewTask("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${server}/task/${id}`);
      setTaskList(taskList.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllTasks = async () => {
    try {
      await axios.delete(`${server}/tasks`);
      setTaskList([]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>To Do App</h2>
      <form className="inputField" onSubmit={addNewTask}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          required
          autoFocus
        />
        <button>
          <AiOutlinePlus className="plus" size={30}></AiOutlinePlus>
        </button>
      </form>
      <h4>Tasks List</h4>
      {isLoading ? (
        <div>Loading tasks ...</div>
      ) : (
        <div className="tasksList">
          {taskList.length > 0 ? (
            <>
              {taskList.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                ></TaskItem>
              ))}
            </>
          ) : (
            <div>No task found!!!</div>
          )}
        </div>
      )}
      <div className="footer">
        <span>
          You have <span className="pendingTasks">{taskList.length}</span> tasks
        </span>
        <button
          onClick={deleteAllTasks}
          className={`${taskList.length === 0 && "disabled-button"}`}
        >
          Clear All
        </button>
      </div>
    </>
  );
};

export default TasksList;
