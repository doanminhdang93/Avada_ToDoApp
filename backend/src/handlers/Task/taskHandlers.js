const {
  getTasks,
  getTask,
  addNewTask,
  updateTasks,
  updateTask,
  deleteTasks,
} = require("../../database/todoLists/todoListRepository");

async function handleGetTask(ctx) {
  try {
    const { id } = ctx.params;
    const currentTask = getTask(id);
    if (currentTask) {
      return (ctx.body = {
        success: true,
        data: currentTask,
      });
    }
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      message: `Task Not Found with id: ${id}`,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function handleGetTasks(ctx) {
  try {
    const queryParam = ctx.query;
    const allTasks = getTasks(queryParam);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: allTasks,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message,
    });
  }
}

async function handleAddTask(ctx) {
  try {
    const data = ctx.request.body;
    const taskAdded = addNewTask(data);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: taskAdded,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function handleUpdateTask(ctx) {
  try {
    const data = ctx.request.body;
    const { id } = ctx.params;
    const taskUpdated = updateTask(id, data);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: taskUpdated,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function handleUpdateTasks(ctx) {
  try {
    const { ids } = ctx.request.body;
    console.log(ids);

    const taskUpdated = updateTasks(ids);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: taskUpdated,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function handleDeleteTasks(ctx) {
  try {
    const { ids } = ctx.request.body;
    console.log(ids);
    deleteTasks(ids);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: `Tasks were deleted successfully`,
      taskIds: ids,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  handleGetTasks,
  handleGetTask,
  handleAddTask,
  handleUpdateTasks,
  handleUpdateTask,
  handleDeleteTasks,
};
