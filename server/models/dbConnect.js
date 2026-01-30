const mongoose = require("mongoose")
require("dotenv").config()
uri = process.env.URI

module.exports = mongoose.connect(uri)
.then(()=>{
console.log("database connection sucessfully...!")
})
.catch((e)=>{
console.log(e.message)
})