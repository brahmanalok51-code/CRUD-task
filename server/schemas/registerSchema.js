const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../schemas/userConnect")


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, 
      trim : true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
    },
  },
);

userSchema.statics.findByCredentials = async function(email, password){ 
const user = await this.findOne({ email }); 

    if (!user) {   
        throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) { 
        throw new Error("Invalid password");
    }

    return user;
};


userSchema.pre('save', async function(next){
    const user = this   

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8) 
    }
    next() 
})


module.exports = mongoose.model("User", userSchema);
