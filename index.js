const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const cors = require("cors");
const {DataSource} = require('typeorm');
const {UserSchema} = require('./public/Entity/entity');
const argon2 = require('argon2');

app.use(cors());

// const absolute_path = path.join(__dirname , './public/Entity/entity.js');


const first_table = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  username: "postgres",
  password: "Yukino123@",
 port: 5432,
 synchronize: true,
 entities: [UserSchema],
 database: "demo"

});

 first_table.initialize().then(()=>{
  console.log("Connected to postgres db")
}).catch(e => console.log("Error in postgres db"))

  const ready_user = first_table.getRepository(UserSchema);
   
  

app.use(express.json());
app.set("views", path.join(__dirname, "./public/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", (req, res) => {
  res.render("index");
});

app.post("/login", async(req, res) => {
  try {
    const {name , password} = req.body;

 
   if(!name || !password)
    return   res.json({
      message: "Field empty",
      status_code: 431
    })   


    //Use actual validtor like joi..or use ts and class validator
    //This is just quick plain regex

    if(!/^[a-zA-Z]{3,40}$/.test(name) || !/^[a-zA-Z0-9]{8,30}$/.test(password)  ){
      console.log("Ops iam inside regex validation err")
       return res.status(401).send({
        success: false,
        message: "The letters should be of type string"
       })
    }


    //For the next dev working on this project ...here either sepreate this...length or just use above regex which is \n
    //Combination of both checking it it is characters and checking min and max length


    // if(name.length > 30 ||  name.length < 5 || password.length < 7 || password.length > 30  ){
    //   console.log("Hello i got stuck in validation error block");  
    //   return res.status(400).json({
    //       success: false,
    //       message: "Validation err",
    //       minName_Length: 5,
    //       maxName_Length: 30,
    //       pwd_min_Length: 8,
    //       pwd_max_Length: 30

    //     })
    // }
        const hashed_password = await argon2.hash(password);
    if(!hashed_password){
     throw new Error("Password could not be hashed! ")
    }
    const create_user = await ready_user.create({name: name , password: hashed_password});
    if(!create_user){
      return res.json({
        success: false,
        message: "User could not be created"
      })
    }
    const validation = await ready_user.save(create_user);
 
 if(!validation){
res.status(401).json({
  success: false,
  message: "Something went wrong in auth"
})
 }
 return res.status(200).json({
  message: "User created succesfully",
  created: true
})

  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      err_msg: error.message
    })

    console.log(error)
  }


});

app.get("/signup", (req, res) => {
  res.render("create");
  console.log("Create is getting loged");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Listening on port", PORT);
});


//DataSource -> { connection data} =new ...now connected ....user Schema....export DataSource(the given repo) -> 

