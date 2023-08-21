const path = require("path");
const admin = require("firebase-admin");
const credentials = require("../../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();
const todoRef = db.collection("todoList");

const getTasks = async () => {
  const allTasksRef = await todoRef.get();
  const response = allTasksRef.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return response;
};

const getTask = async (id) => {
  const taskRef = await todoRef.doc(id).get();
  return taskRef.data();
};

const addNewTask = async (data) => {
  const newTask = {
    ...data,
    createdAt: new Date(),
    isCompleted: false,
  };
  const response = await todoRef.add(newTask);
  return { ...newTask, id: response.id };
};

const updateTask = async (id, data) => {
  await todoRef.doc(id).update(data);
};

const updateTasks = async (data) => {
  const tasks = data.taskList;
  // console.log(data.taskList);
  for (const task of tasks) {
    await todoRef.doc(task.id).update(task.taskData);
  }
};

const deleteTasks = async (ids) => {
  await Promise.all(ids.map((id) => todoRef.doc(id).delete()));
};

module.exports = {
  getTasks,
  getTask,
  addNewTask,
  updateTask,
  updateTasks,
  deleteTasks,
};
