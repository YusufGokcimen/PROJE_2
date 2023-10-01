import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
function App() {
  const localStorageTasks = JSON.parse(localStorage.getItem("tasks"))
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(localStorageTasks);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const normalizeTurkishCharacters = (str) => {
    const turkishCharacters = {
      ç: "c",
      ğ: "g",
      ı: "i",
      ö: "o",
      ş: "s",
      ü: "u",
      Ç: "C",
      Ğ: "G",
      İ: "I",
      Ö: "O",
      Ş: "S",
      Ü: "U",
    };
    return str
      .toLowerCase()
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (matched) => turkishCharacters[matched]);
  };

  const filteredTask = () => {
    let filterTask = [];
    if (searchValue?.length > 0) {
      tasks?.filter((task) => {
        if (
          normalizeTurkishCharacters(task.name).includes(
            normalizeTurkishCharacters(searchValue)
          )
        ) {
          filterTask.push(task);
        }
      });
    }
    return filterTask;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <Navbar />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-14 pt-24">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks
          tasks={tasks}
          setTasks={setTasks}
          filteredTask={filteredTask()}
          searchValue={searchValue}
        />
      </div>
    </DndProvider>
  );
}

export default App;
