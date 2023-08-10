const fs = require("fs");
const todoList = require("./todoList.json");
const path = require("path");

const getTasks= () =>{
  return todoList;
}

const getTask = (id) =>{
  const taskFound = todoList.find((task) => task.id === id);
  return taskFound;
}

const addNewTask = (data) =>{
  const newTask = {id: Math.floor(Math.random() * Date.now()).toString(36), createAt: Date.now(),isCompleted: false,...data};
  const todoListData = [newTask, ...todoList];
  fs.writeFileSync(
    path.join(__dirname, 'todoList.json'),
    JSON.stringify(todoListData)
  );
  return newTask;
}

const updateTask= (id, data) =>{
  const index = todoList.findIndex(
    (item) => item.id === id
  );
  todoList[index] = {id: id, createdAt: Date.now(), ...data };
  fs.writeFileSync(
    path.join(__dirname, 'todoList.json'),
    JSON.stringify(todoList)
  );
  return todoList[index];
}

const deleteTask = (id) =>{
  const newTodoList = todoList.filter((item) => item.id !== id);
  return fs.writeFileSync(
    path.join(__dirname, 'todoList.json'),
    JSON.stringify(newTodoList)
  );
}

const deleteAllTasks = () =>{
  const newTodoList = [];
  return fs.writeFileSync(
    path.join(__dirname, 'todoList.json'),
    JSON.stringify(newTodoList)
  );
}


module.exports = {
    getTasks,
    getTask,
    addNewTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
}


