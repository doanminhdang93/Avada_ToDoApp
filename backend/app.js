const Koa = require("koa");
const { koaBody } = require("koa-body");
const { todoListRouter } = require("./src/routes/routes");
const cors = require("koa-cors");

const app = new Koa();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(koaBody({ parsedMethods: ["PUT", "POST", "DELETE"] }));

// todoList
app.use(todoListRouter.routes());
app.use(todoListRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.body = {
    success: false,
    message: "Page not found!",
  };
});

app.listen(8000, () => {
  console.log(`Server is running on http://localhost:${8000}`);
});
