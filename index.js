const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api",userRouter);

app.listen(process.env.port,async()=> {
    try {
        await connection
        console.log(`Running on port ${process.env.port}`)
        console.log("Connected to the DB")
    } catch (err) {
        console.log(err)
    }
})