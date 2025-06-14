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

app.post('/login' , (req , res)=>{
  const {name , password} = req.body;

     console.log(name , password);
})

app.get('/signup' , (req , res)=>{
  res.render('create')
  console.log("Create is getting loged")
})

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});
