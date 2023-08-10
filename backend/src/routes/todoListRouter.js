const Router = require('koa-router');
const {
  handleAddTask,
  handleDeleteTask,
  handleGetTasks,
  handleGetTask,
  handleUpdateTask,
  handleDeleteAllTasks,
} = require("../handlers/Task/taskHandlers");
const { taskValidation } = require("../middleware/taskValidation.js");

// Prefix all routes with /Tasks
const todoListRouter = new Router({
  prefix: "/api",
});

//Router will go here
todoListRouter.get("/tasks", handleGetTasks);
todoListRouter.get("/task/:id", handleGetTask);
todoListRouter.post("/task", taskValidation, handleAddTask);
todoListRouter.put("/task/:id", taskValidation, handleUpdateTask);
todoListRouter.delete("/task/:id", handleDeleteTask);
todoListRouter.delete("/tasks", handleDeleteAllTasks);

module.exports = todoListRouter;
