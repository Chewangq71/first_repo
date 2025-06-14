const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");


app.use(express.json())
 app.set("views", path.join(__dirname, "./public/views")); 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
    console.log(req.body);
    res.render('index' , {name: "Ouput"})
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});
