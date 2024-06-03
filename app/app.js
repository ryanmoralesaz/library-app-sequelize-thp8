var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var { sequelize } = require("./models"); // Import Sequelize instance
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  console.error(`Status: ${err.status}, Message: ${err.message}`);

  if (err.status === 404) {
    res.status(404);
    res.render("page-not-found", { error: err });
  } else {
    res.status(err.status);
    res.render("error", { error: err });
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false }); // Set to true if you want to drop and recreate tables
    console.log("Database synced successfully.");

    // Start the server after the database is synced
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = app;
