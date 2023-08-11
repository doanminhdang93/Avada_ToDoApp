const fs = require("fs");
const todoList = require("./todoList.json");
const path = require("path");

const writeIntoFile = (data) => {
  return fs.writeFileSync(
    path.join(__dirname, "todoList.json"),
    JSON.stringify(data)
  );
};

const getTasks = () => {
  return todoList;
};

const getTask = (id) => {
  const taskFound = todoList.find((task) => task.id === id);
  return taskFound;
};

const addNewTask = (data) => {
  const newTask = {
    ...data,
    id: Math.floor(Math.random() * Date.now()).toString(36),
    createdAt: new Date(),
    isCompleted: false,
  };
  const todoListData = [newTask, ...todoList];
  writeIntoFile(todoListData);
  return newTask;
};

const updateTask = (id, data) => {
  const index = todoList.findIndex((item) => item.id === id);
  todoList[index] = { ...data, id: id, createdAt: new Date() };
  writeIntoFile(todoList);
  return todoList[index];
};

const deleteTask = (id) => {
  const newTodoList = todoList.filter((item) => item.id !== id);
  writeIntoFile(newTodoList);
};

const deleteAllTasks = () => {
  const newTodoList = [];
  writeIntoFile(newTodoList);
};

module.exports = {
  getTasks,
  getTask,
  addNewTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
};
