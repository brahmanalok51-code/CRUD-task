import React from 'react'

function TaskForm() {
  const handleSubmit = async ()=>{
   const res = await fetch("http://localhost:5000/api/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
});
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
    
      </form>
    </div>
  )
}

export default TaskForm
