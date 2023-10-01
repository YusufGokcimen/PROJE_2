import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

function ListTasks({ tasks, setTasks, filteredTask, searchValue }) {
  const [upcoming, setUpcoming] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const tasksList = searchValue.length > 0 ? filteredTask : tasks;

  useEffect(() => {
    const fUpcoming = tasksList.filter((task) => task.status === "upcoming");
    const fInProgress = tasksList.filter(
      (task) => task.status === "inprogress"
    );
    const fDone = tasksList.filter((task) => task.status === "done");

    setUpcoming(fUpcoming);
    setInProgress(fInProgress);
    setDone(fDone);
  }, [filteredTask, tasks]);

  const statuses = ["upcoming", "inprogress", "done"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            tasks={tasksList}
            setTasks={setTasks}
            upcoming={upcoming}
            inProgress={inProgress}
            done={done}
          />
        );
      })}
    </div>
  );
}

export default ListTasks;

function Section({ status, tasks, setTasks, upcoming, inProgress, done }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "section",
    item: { status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  let text = "Upcoming";
  let bg = "bg-zinc-500";
  let tasksToMap = upcoming;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-rose-500";
    tasksToMap = inProgress;
  }

  if (status === "done") {
    text = "Done";
    bg = "bg-emerald-500";
    tasksToMap = done;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast("Task status changed", { icon: "🔄" });
      return updatedTasks;
    });
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task, index) => (
          <Task key={index} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
}

function Header({ text, bg, count }) {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
}

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);
    setTasks(fTasks);
    toast("Task removed", { icon: "☠" });
  };

  const editableComponent = () => {
    const [editValue, setEditValue] = useState(task.name);

    const onSave = (value, item) => {
      const editTasks = tasks?.map((taskItem) => {
        if (taskItem.id === item.id) {
          taskItem.editable = false;
          taskItem.name = value;
        }
        return taskItem;
      });
      setTasks(editTasks);
    };

    const editClick = (task, isEdit) => {
      const editTasks = tasks?.map((taskItem) => {
        if (taskItem.id === task.id) {
          taskItem.editable = isEdit;
        }
        return taskItem;
      });
      setTasks(editTasks);
    };

    return task?.editable ? (
      <div className={"flex"}>
        <input
          className={
            "border-2 border-slate-400 bg-slate-200 rounded-sm mr-4 h-8 w-32 px-2 outline-none"
          }
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button
          className="text-green-600"
          onClick={() => onSave(editValue, task)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
        <br />
        <button
          className={"text-red-600"}
          onClick={() => editClick(task, false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    ) : (
      <p onClick={() => editClick(task, true)}>{task.name}</p>
    );
  };
  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${
        isDragging ? "opacity-0" : "opacity-100"
      }`}
    >
      {editableComponent()}
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
