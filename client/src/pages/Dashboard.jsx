import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const statuses = [
  { name: "Todo", color: "border-blue-500", badge: "bg-blue-100 text-blue-600" },
  { name: "In Progress", color: "border-yellow-500", badge: "bg-yellow-100 text-yellow-600" },
  { name: "Done", color: "border-green-500", badge: "bg-green-100 text-green-600" }
];

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Todo",
    dueDate: ""
  });

  /* ---------------- API HANDLERS ---------------- */

  const getTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    getTasks();
  };

  const updateTask = async () => {
    await fetch(`http://localhost:5000/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setEditId(null);
    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE"
    });
    getTasks();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editId ? updateTask() : createTask();
    setForm({ title: "", description: "", status: "Todo", dueDate: "" });
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setForm(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getTasks();
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#faf5ff] px-6 py-10">

      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-black text-gray-800">Task Dashboard</h1>
        <p className="text-gray-500 mt-2">Stay productive. Stay focused.</p>

        
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={getTasks}
          className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-lg shadow"
        >
          🔄 Get Tasks
        </motion.button>
      </motion.div>

     
      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-16"
      >
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          {editId ? "Update Task" : "Create New Task"}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            className="input"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="date"
            className="input"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
        </div>

        <textarea
          className="input mt-6"
          placeholder="Describe task"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <div className="flex gap-6 mt-6 items-center">
          <select
            className="input md:w-1/3"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            {statuses.map(s => (
              <option key={s.name}>{s.name}</option>
            ))}
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-8 py-3 text-white rounded-xl shadow-lg ${
              editId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}
          >
            {editId ? "Update Task" : "Create Task"}
          </motion.button>
        </div>
      </motion.form>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {statuses.map(status => (
          <div key={status.name} className="bg-white/60 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between mb-5">
              <h2 className="font-bold text-gray-700">{status.name}</h2>
              <span className={`px-3 py-1 text-xs rounded-full ${status.badge}`}>
                {tasks.filter(t => t.status === status.name).length}
              </span>
            </div>

            <AnimatePresence>
              {tasks
                .filter(t => t.status === status.name)
                .map(task => (
                  <motion.div
                    key={task._id}
                    whileHover={{ scale: 1.03 }}
                    className={`bg-white p-5 rounded-2xl shadow mb-4 border-l-4 ${status.color}`}
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-gray-400">
                         {task.dueDate}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="text-yellow-500"
                        >
                          
                        </button>
                        <button
                          onClick={() => deleteTask(task._id)}
                          className="text-red-500"
                        >
                          
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <style>
        {`
          .input {
            width: 100%;
            padding: 0.9rem 1rem;
            border-radius: 1rem;
            border: 1px solid #e5e7eb;
            outline: none;
          }
          .input:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
          }
        `}
      </style>
    </div>
  );
}
