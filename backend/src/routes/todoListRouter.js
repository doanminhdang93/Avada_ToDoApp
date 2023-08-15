const Router = require("koa-router");
const {
  handleAddTask,
  handleGetTasks,
  handleGetTask,
  handleUpdateTasks,
  handleUpdateTask,
  handleDeleteTasks,
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
todoListRouter.put("/taskIds", taskValidation, handleUpdateTasks);
todoListRouter.put("/task/:id", taskValidation, handleUpdateTask);
todoListRouter.delete("/taskIds", handleDeleteTasks);

module.exports = todoListRouter;
