const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./routes/user.route");
const { menRouter } = require("./routes/men.route")
const { womenRouter } = require("./routes/women.route")

require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api",userRouter);
app.use("/api/men", menRouter);
app.use("/api/women", womenRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to CartZ..")
})

app.listen(process.env.port,async()=> {
    try {
        await connection
        console.log(`Running on port ${process.env.port}`)
        console.log("Connected to the DB")
    } catch (err) {
        console.log(err)
    }
})