const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const { notFound, errorsCollectors } = require("./app/handlers/errorHandler");

const router = require("./app/router"); // Path relative to current file

app.set("view engine", "ejs");
app.set("views", "./app/views"); // Path relative to the location of the file that will require this server

app.use(express.static("public")); // Path relative to the location of the file that will require this server

app.use(express.urlencoded({ extended: true })); // To be able to read POST req.body content

app.set("port", process.env.PORT);
app.set("base_url", process.env.BASE_URL);

// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60 * 24, // 24h
//     },
//   })
// );

// pour avoir les variables de session dans les views
app.use((req, res, next) => {
  app.locals.session = req.session;
  // if (req.session.loginInfos === undefined) {
  // req.session.user = [];
  // }
  next();
});

// Main router
app.use(router);

// Manage error 404 globally
app.use(notFound);
// Manage errors 500 or other globally
app.use(errorsCollectors);

app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("base_url")}:${app.get("port")}`);
});
