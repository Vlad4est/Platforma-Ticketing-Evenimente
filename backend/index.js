//Express import
const express = require('express');
const app = express();

//Mongoose import
const mongoose = require("mongoose");

//Routers import
const usersRouter = require("./routers/users.router");
const eventsRouter = require("./routers/event.router");
const authRouter = require("./routers/authentification.router");

const cors = require("cors");
app.use(cors());

//Donenv import
require("dotenv").config();


const port = 3000;
app.use(express.json());

//Routers
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use("/auth", authRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  mongoose.connect(`mongodb+srv://vlad:${process.env.MONGODB_CONNECTION_STRING}@cluster0.rgkzjm4.mongodb.net/dbticketing?retryWrites=true&w=majority&appName=Cluster0`)
  .then(async () => {
    console.log("Connected");

    /* Testing mongodb creation
    const Cat = mongoose.model("Cat", {name: String});
    const cat1 = await Cat.create({name: "kitty"});
    console.log(cat1);
    */
  }).catch((err) => console.log(err));
});


