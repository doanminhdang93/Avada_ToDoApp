const getTaskListFromDoc = (doc) => {
  return {
    ...doc.data(),
    id: doc.id,
  };
};
module.exports = getTaskListFromDoc;
