import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaCalendarAlt, FaTasks, FaSearch } from "react-icons/fa";

const statuses = [
  { name: "Todo", color: "border-blue-500", badge: "bg-blue-100 text-blue-600" },
  { name: "In Progress", color: "border-yellow-500", badge: "bg-yellow-100 text-yellow-600" },
  { name: "Done", color: "border-green-500", badge: "bg-green-100 text-green-600" }
];

const initialFormState = {
  title: "",
  description: "",
  status: "Todo",
  dueDate: ""
};

const TASK_LIMIT = 1; // number of visible tasks initially

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [search, setSearch] = useState("");
  const [showMore, setShowMore] = useState({});

  const getTasks = async () => {
    const res = await fetch("http://localhost:5000/getTask");
    const data = await res.json();
    setTasks(data);
  };

  const createTask = async () => {
    const res = await fetch("http://localhost:5000/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      getTasks();
      setForm(initialFormState);
    }
  };

  const updateTask = async () => {
    await fetch(`http://localhost:5000/update/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setEditId(null);
    setForm(initialFormState);
    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`, { method: "DELETE" });
    getTasks();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editId ? updateTask() : createTask();
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setForm(task);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleShowMore = (status) => {
    setShowMore(prev => ({ ...prev, [status]: !prev[status] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-6 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Smart Task Dashboard
        </h1>
        <p className="text-gray-600 mt-3 text-lg">Manage smarter. Work faster.</p>
      </motion.div>

   

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-10 mb-20"
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-3">
          <FaTasks /> {editId ? "Update Task" : "Create New Task"}
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input className="input" placeholder="Task title" value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })} required />

          <div className="relative">
            <input type="date" className="input pl-11" value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
          </div>
        </div>

        <textarea className="input mt-6" placeholder="Describe your task..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })} required />

        <div className="flex flex-wrap gap-6 mt-8 items-center">
          <select className="input md:w-1/3" value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {statuses.map(s => (<option key={s.name}>{s.name}</option>))}
          </select>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className={`px-10 py-3 text-white text-lg font-semibold rounded-xl shadow-lg ${
              editId
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-indigo-600 to-purple-600"
            }`}>
            {editId ? "Update Task" : "Create Task"}
          </motion.button>
        </div>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {statuses.map(status => {
          const statusTasks = tasks.filter(t => t.status === status.name);
          const visibleTasks = showMore[status.name]
            ? statusTasks
            : statusTasks.slice(0, TASK_LIMIT);

          return (
            <div key={status.name} className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-gray-700 text-lg">{status.name}</h2>
                <span className={`px-4 py-1 text-sm rounded-full ${status.badge}`}>
                  {statusTasks.length}
                </span>
              </div>

              <AnimatePresence>
                {visibleTasks.map(task => (
                  <motion.div key={task._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }} whileHover={{ scale: 1.04 }}
                    className={`bg-white rounded-2xl p-5 mb-4 shadow-md border-t-4 ${status.color}`}>
                    <h3 className="font-semibold text-gray-800 text-lg">{task.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>

                    <div className="flex justify-between items-center mt-5">
                      <span className="text-xs px-6 py-1 rounded-full bg-gray-100 text-gray-500">📅 {task.dueDate}</span>
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.2 }} onClick={() => handleEdit(task)}
                          className="p-2 rounded-full bg-yellow-100 text-yellow-600"><FaEdit size={14} /></motion.button>
                        <motion.button whileHover={{ scale: 1.2 }} onClick={() => deleteTask(task._id)}
                          className="p-2 rounded-full bg-red-100 text-red-600"><FaTrash size={14} /></motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {statusTasks.length > TASK_LIMIT && (
                <button onClick={() => toggleShowMore(status.name)}
                  className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow">
                  {showMore[status.name] ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.9rem 1rem;
          border-radius: 1rem;
          border: 1px solid #e5e7eb;
          outline: none;
          background: white;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
        }
      `}</style>
    </div>
  );
}
