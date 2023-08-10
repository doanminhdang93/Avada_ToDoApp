const {
  getTasks,
  getTask,
  addNewTask,
  updateTask,
  deleteTask,
  deleteAllTasks
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

async function handleDeleteTask(ctx) {
  try {
    const { id } = ctx.params;
    deleteTask(id);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: `Task with id: ${id} was deleted successfully`,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
}

async function handleDeleteAllTasks(ctx) {
  try {
    deleteAllTasks();
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: `All Tasks were deleted successfully`,
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
  handleUpdateTask,
  handleDeleteTask,
  handleDeleteAllTasks
};
