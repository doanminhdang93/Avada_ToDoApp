const fs = require("fs");
const todoList = require("./todoList.json");
const path = require("path");
const admin = require("firebase-admin");
const credentials = require("../../../key.json");
const getTaskListFromDoc = require("../../helpers/getTaskListFromDoc");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const getTasks = async () => {
  const allTasksRef = await db.collection("todoList").get();
  const response = allTasksRef.docs.map((doc) => getTaskListFromDoc(doc));

  return response;
};

const getTask = async (id) => {
  const taskRef = db.collection("todoList").doc(id);
  const response = await taskRef.get();

  return response.data();
};

const addNewTask = async (data) => {
  const newTask = {
    ...data,
    createdAt: new Date(),
    isCompleted: false,
  };
  const response = await db.collection("todoList").add(newTask);
  return { ...newTask, id: response.id };
};

const updateTask = async (id, data) => {
  const docRef = db.collection("todoList").doc(id);

  try {
    const doc = await docRef.get();

    if (!doc.exists) {
      console.log(`Document with ID: ${id} does not exist in Firestore.`);
      throw new Error("ID not found!");
    }

    await docRef.update(data);

    const updatedTaskSnapshot = await docRef.get();
    const updatedTask = {
      id: updatedTaskSnapshot.id,
      ...updatedTaskSnapshot.data(),
    };

    return updatedTask;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTasks = async (ids) => {
  const batch = db.batch();

  const updatePromises = ids.map(async (id) => {
    const docRef = db.collection("todoList").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.log(`Document with ID: ${id} does not exist in Firestore.`);
      throw new Error("Ids not found!");
    }

    const taskData = docSnapshot.data();

    const updatedTaskData = {
      ...taskData,
      isCompleted: !taskData.isCompleted,
    };

    batch.update(docRef, updatedTaskData);
  });

  await Promise.all(updatePromises);

  try {
    await batch.commit();
  } catch (error) {
    console.log("Error while updating tasks:", error);
    throw new Error("Error while updating tasks:", error);
  }
};

const deleteTasks = async (ids) => {
  const batch = db.batch();

  const deletePromises = ids.map(async (id) => {
    const docRef = db.collection("todoList").doc(id);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      console.log(`Document with ID: ${id} does not exist in Firestore.`);
      throw new Error("Ids not found!");
    }

    batch.delete(docRef);
  });

  await Promise.all(deletePromises);

  try {
    await batch.commit();
  } catch (error) {
    console.log("Error while deleting tasks:", error);
    throw new Error("Error while deleting tasks:", error);
  }
};

module.exports = {
  getTasks,
  getTask,
  addNewTask,
  updateTask,
  updateTasks,
  deleteTasks,
};
