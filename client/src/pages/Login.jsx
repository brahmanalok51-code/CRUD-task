import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard")
      }

      
      localStorage.setItem("token", data.token);

      
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 relative overflow-hidden">

    
    <div className="absolute -top-16 -left-16 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />

    <div className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">


      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="p-10 md:p-14 flex flex-col justify-center"
      >
        <h2 className="text-4xl font-extrabold text-gray-800">
          Welcome Back 
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Login to access your dashboard
        </p>

        {error && (
          <p className="mb-4 text-sm text-red-600 font-semibold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

        
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full pl-12 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full pl-12 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

       
          <div className="text-right">
            <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          
          <p className="text-center text-gray-500 text-sm mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </form>
      </motion.div>

     
      <motion.div
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative p-12"
      >
        <h1 className="text-5xl font-extrabold text-center leading-tight">
          Welcome to<br />Your Workspace 
        </h1>

        <p className="mt-6 text-lg opacity-90 text-center max-w-md">
          Manage your profile, track progress, and explore powerful features — all in one place.
        </p>

        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="absolute -top-20 -right-20 w-96 h-96 border-[12px] border-white/20 rounded-full"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 border-[10px] border-white/10 rounded-full"
        />
      </motion.div>
    </div>
  </div>
  );
};

export default Login;
