const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 4000
const cors = require("cors");
const routes = require("./route/routes")


app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(port, ()=>{
    console.log(`server is running on the port ${port}`)
})
