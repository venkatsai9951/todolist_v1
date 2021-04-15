// Template for express and body parser

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
let item_name = ["Buy food", "Cook food", "Eat food"];
let work_item = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  let day = date();
  res.render("list", { listTitle: day, newListItem: item_name });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list == "Work List") {
    work_item.push(item);
    res.redirect("/work");
  } else {
    item_name.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItem: work_item });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  work_item.push(item);
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("server has started on port 3000");
});
