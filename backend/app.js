const Koa = require("koa");
const { koaBody } = require("koa-body");
const { todoListRouter } = require("./src/routes/routes");
const cors = require("koa-cors");
const http = require('http');
const bodyParser = require("koa-bodyparser");
const json = require("koa-bodyparser");

const app = new Koa();

// app.use(bodyParser());
// app.use(json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(koaBody());

//error handler
// app.use((err, req, res, next) => {
//   const status = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(status).json({ message, stack: err.stack });
// });

// todoList
app.use(todoListRouter.routes());
app.use(todoListRouter.allowedMethods());

app.use(async (ctx) => {
  ctx.body = {
    success: false,
    message: "Page not found!",
  };
});

app.listen(8000,() => {
  console.log(
    `Server is running on http://localhost:${8000}`
  );
});
