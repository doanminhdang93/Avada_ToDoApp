const { object, string, date } = require("yup");

async function taskValidation(ctx, next) {
  try {
    const data = ctx.request.body;
    let schema = object({
      name: string(),
    });
    await schema.validate(data);
    next();
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: error.message,
    };
  }
}

module.exports = {
  taskValidation,
};
