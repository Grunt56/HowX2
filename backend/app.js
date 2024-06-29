const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "54321",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  res.send("hello");
});
app.use("/usuarios", userRoutes);

app.listen(port, function () {
  console.log("funcionou");
});
