import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {

  const storageTask = JSON.parse(localStorage.getItem('tasks'));

  const [todos, setTodos] = useState(storageTask ?? []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAddToList = () => {
    if (input.trim() === "") return;

    setTodos(pre => {
      const newJob = [...pre, { id: uuidv4(), text: capitalizeWord(input), status: false }]

      const jsonJobs = JSON.stringify(newJob);
      localStorage.setItem('tasks', jsonJobs);
      return newJob;
    }
    );

    setInput("");
  };
  const handleDeleteTask = (id) => {
    setTodos(pre => {
      const newTodos = pre.filter(todo => todo.id !== id);
      localStorage.setItem('tasks', JSON.stringify(newTodos));
      return newTodos;
    }
    );
  };

  const handleMarkStatusTask = (id) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status }
      }
      return todo;
    }
    )
    setTodos(newTodos);
    localStorage.setItem('tasks', JSON.stringify(newTodos));

  }



  const handleEnterPress = (e) => {
    if (e.key === "Enter") handleAddToList();
  };



  const capitalizeWord = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const filterTodo = useMemo(() => {
    if (filter === "done") return todos.filter(t => t.status)
    if (filter === "not") return todos.filter(t => !t.status) 
    return todos
  }, [todos, filter])



  return (
    <div className="App">
      <h1>ToDo App Mini</h1>
      <div className="input-group">
        <input
          type="text"
          onKeyDown={handleEnterPress}
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button onClick={handleAddToList}>Add to list</button>
      </div>
      <div className="header-row ">
        <h3>Danh sách các nhiệm vụ</h3>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All task</option>
          <option value="done">Done</option>
          <option value="not">Not yet</option>
        </select>
      </div>
      <ul className="todo-list">
        {filterTodo.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.status ? "line-through" : "none" }}>
              {todo.text}
            </span>
            <div>
              <button className="delete" onClick={() => handleDeleteTask(todo.id)}>Delete</button>
              <input type="checkbox" checked={todo.status} onChange={() => handleMarkStatusTask(todo.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
