const PORT = 8080;
const DBTOKEN = "YOUR DB TOKEN";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRouter = require("./routes/todo");
const app = express();

app.use(bodyParser.json());
app.use(todoRouter);

const launchServer = async () => {
    try {
        await mongoose.connect(DBTOKEN, { useNewUrlParser: true, useUnifiedTopology: true });
    }catch(err){
    console.log('Mongo connection error!');
    }
app.listen(PORT);
}

launchServer();
