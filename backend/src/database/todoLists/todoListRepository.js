const path = require("path");
const admin = require("firebase-admin");
const credentials = require("../../../key.json");
admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const getTasks = async () => {
  const allTasksRef = await db.collection("todoList").get();
  const response = allTasksRef.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return response;
};

const getTask = async (id) => {
  const taskRef = await db.collection("todoList").doc(id).get();
  return taskRef.data();
};

const addNewTask = async (data) => {
  const response = await db.collection("todoList").add({
    ...data,
    createdAt: new Date(),
    isCompleted: false,
  });
  return {
    ...data,
    createdAt: new Date(),
    isCompleted: false,
    id: response.id,
  };
};

const updateTask = async (id, data) => {
  const docRef = db.collection("todoList").doc(id);
  await docRef.update(data);
  const updatedTaskSnapshot = await docRef.get();
  const updatedTask = {
    ...updatedTaskSnapshot.data(),
    id: updatedTaskSnapshot.id,
  };

  return updatedTask;
};

const updateTasks = async (ids) => {
  const batch = db.batch();

  await Promise.all(
    ids.map(async (id) => {
      const docRef = db.collection("todoList").doc(id);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        console.log(`Document with ID: ${id} does not exist in Firestore.`);
        return {};
      }

      const taskData = docSnapshot.data();

      batch.update(docRef, {
        isCompleted: !taskData.isCompleted,
      });
    })
  );

  await batch.commit();
};

const deleteTasks = async (ids) => {
  await Promise.all(
    ids.map((id) => db.collection("todoList").doc(id).delete())
  );
};

module.exports = {
  getTasks,
  getTask,
  addNewTask,
  updateTask,
  updateTasks,
  deleteTasks,
};
