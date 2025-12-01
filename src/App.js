import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css"; 

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddToList = () => {
    if (input.trim() === "") return;
    setTodos(pre => [...pre, { id: uuidv4(), text: capitalizeWord(input) }]);
    setInput("");
  };

  const handleInputValue = (e) => setInput(e.target.value);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") handleAddToList();
  };

  const handleDeleteTask = (id) => {
    setTodos(pre => pre.filter(todo => todo.id !== id));
  };

  const capitalizeWord = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="App">
      <h1>ToDo App Mini</h1>
      <div className="input-group">
        <input
          type="text"
          onKeyDown={handleEnterPress}
          onChange={handleInputValue}
          value={input}
        />
        <button onClick={handleAddToList}>Add to list</button>
      </div>
      <h3>Danh sách các nhiệm vụ</h3>
      <select>
        <option>All task</option>
        <option>Done</option>
        <option>Not yet</option>
      </select>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
