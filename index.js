const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");


 app.set("views", path.join(__dirname, "./public/views")); 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/hello", (req, res) => {
  res.render("index"); 
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});
