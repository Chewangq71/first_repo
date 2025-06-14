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

app.post('/login' , (req ,res)=>{
  const {name , password} = req.body;
  console.log(name , password);
  console.log("HEllo")
})

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});
