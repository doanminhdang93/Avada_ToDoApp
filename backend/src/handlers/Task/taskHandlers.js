const {
  getTasks,
  getTask,
  addNewTask,
  updateTasks,
  updateTask,
  deleteTasks,
} = require("../../database/todoLists/todoListRepository");

const handleGetTask = async (ctx) => {
  try {
    const { id } = ctx.params;
    const currentTask = await getTask(id);
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
};

const handleGetTasks = async (ctx) => {
  try {
    const allTasks = await getTasks();
    const allTasksWithoutCreatedAt = allTasks.map((obj) => {
      return {
        id: obj.id,
        name: obj.name,
        isCompleted: obj.isCompleted,
      };
    });
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: allTasksWithoutCreatedAt,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      data: [],
      error: error.message,
    });
  }
};

const handleAddTask = async (ctx) => {
  try {
    //const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const data = ctx.request.body;
    //await delay(3000);
    const taskAdded = await addNewTask(data);
    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: {
        id: taskAdded.id,
        name: taskAdded.name,
        isCompleted: taskAdded.isCompleted,
      },
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

const handleUpdateTask = async (ctx) => {
  try {
    const data = ctx.request.body;

    const { id } = ctx.params;
    const taskUpdated = await updateTask(id, data);
    ctx.status = 200;
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
};

const handleUpdateTasks = async (ctx) => {
  try {
    const { ids } = ctx.request.body;

    await updateTasks(ids);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: "Tasks were updated successfully!",
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

const handleDeleteTasks = async (ctx) => {
  try {
    const { ids } = ctx.request.body;

    await deleteTasks(ids);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      message: `Tasks were deleted successfully!`,
    });
  } catch (error) {
    return (ctx.body = {
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  handleGetTasks,
  handleGetTask,
  handleAddTask,
  handleUpdateTasks,
  handleUpdateTask,
  handleDeleteTasks,
};
