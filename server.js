const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
const { sequelize } = require("./util/database");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const accountRoutes = require("./routes/accounts");

const app = express();

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/* Add new routes here ... */
app.use("/users", authRoutes);

app.use("/user", usersRoutes);

app.use("/accounts", accountRoutes);

app.use(errorController.get404);

const PORT = 5000;

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(process.env.PORT || PORT, function () {
      console.log("server connected to port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})

//Error: listen EADDRINUSE: address already in use :::5000
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, (new Date).toUTCString() + ' Unhandled Rejection at Promise:', p)
  })
  .on('uncaughtException', err => {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    process.exit(1);
  });
