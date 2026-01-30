const controller = require("../controller/userController")
const express = require("express")
const routes = express.Router()

routes.post("/register",controller.register)
routes.post("/login", controller.login)
routes.post("/create", controller.createTask);
routes.get("/getTask", controller.getTasks);
routes.patch("/update/:id", controller.updateTask);
routes.delete("/delete/:id", controller.deleteTask);

module.exports = routes