const express = require("express");
const exphbs = require("express-handlebars");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));


app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

module.exports = app;
