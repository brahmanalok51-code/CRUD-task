import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if(res.ok){
        alert("registration successfully..!")
        navigate("/login");

      }

      
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-hidden">

     
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">

       
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative"
        >
          <h1 className="text-5xl font-extrabold leading-tight">
            Join Us Today
          </h1>

          <p className="mt-4 text-lg opacity-90">
            Build your profile and explore new opportunities.
          </p>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-96 h-96 border-[12px] border-white/20 rounded-full"
          />
        </motion.div>

      
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-10 md:p-14"
        >
          <h2 className="text-4xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2 mb-6">Sign up to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              icon={<FaUser />}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />

            <Input
              icon={<FaEnvelope />}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
            />

            <div>
              <Input
                icon={<FaLock />}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
              <p className="text-xs text-gray-400 mt-1">
                Minimum 8 characters
              </p>
            </div>

            <Input
              icon={<FaPhone />}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              type="tel"
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition"
            >
              Create Account
            </motion.button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      required
      className="w-full pl-12 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
    />
  </div>
);

export default Register;
