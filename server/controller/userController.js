
const User = require("../schemas/registerSchema");
require('../schemas/userConnect')
const Task = require("../schemas/taskSchema")


// controller for user register...
exports.register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Request body is missing" })
        }

        const existingUser = await User.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }
        const userReg = new User(req.body)
        const savedUser = await userReg.save()

        res.status(201).json({
            success: true,
            data: savedUser
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
  }

// controller for user login...
exports.login = async (req,res)=>{
    try{
        const user = await User.findByCredentials(
            req.body.email, 
            req.body.password
        );
        res.send(user);
    }catch(error){
        res.status(400).send({ error: error.message });
    }
}

//create task...
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//get task...
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//update task....
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


//delete task...
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};