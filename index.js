const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const cors = require('cors')

app.use(cors())


app.use(express.json())
 app.set("views", path.join(__dirname, "./public/views")); 
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.render('index')
    
});


  app.get('/signup' , (req , res)=>{
  res.render('create')
  console.log("Create is getting loged")
})

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});
