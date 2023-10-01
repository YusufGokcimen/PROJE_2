import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function CreateTask({ tasks, setTasks }) {
  const formRef = useRef(null);
  const [task, setTask] = useState({
    id: "",
    name: "",
    status: "upcoming",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name.length < 3)
      return toast.error("A task must have more than 3 characters");

    if (task.name.length > 100)
      return toast.error("A task must not be more than 100 characters");

    setTasks((prev) => {
      const list = [...prev, task];
      return list;
    });
    setTask({
      id: "",
      name: "",
      status: "upcoming",
    });

    if (task.name.length >= 3 && task.name.length <= 100)
      return toast.success("Task Created");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-200 rounded-sm mr-4 h-12 w-64 px-2 outline-none"
        value={task.name}
        onChange={(e) =>
          setTask({ ...task, id: uuidv4(), name: e.target.value })
        }
      />
      <button className="bg-blue-400 rounded-md px-4 h-12 text-white opacity-70 border-2 border-blue-400">
        Create
      </button>
    </form>
  );
}

export default CreateTask;
