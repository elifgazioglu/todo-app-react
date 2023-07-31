import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import axios from "axios";
import Select from "react-select";
import "../pages/addTodo.style.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoCategory, setTodoCategory] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [todoLevel, setTodoLevel] = useState("");
  const [file, setFile] = useState(null);
  const [todoStatus, setTodoStatus] = useState(true);
  const [error, setError] = useState(null);

  const category = [
    { value: "cleaning", label: "Cleaning" },
    { value: "studying", label: "Studying" },
    { value: "working", label: "Working" },
    { value: "school", label: "School" },
    { value: "shopping", label: "Shopping" },
    { value: "hobby", label: "Hobby" },
  ];

  const level = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const handleSubmitTodo = async () => {
    try {
      if (!todoCategory || !todoTitle || !todoDescription) {
        setError("Please enter all required fields.");
        return;
      }

      const newTodo = {
        title: todoTitle,
        desc: todoDescription,
        category: todoCategory,
        level: todoLevel,
        status: todoStatus,
      };

      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newTodo.photo = filename;
        try {
          await axios.post("http://localhost:5002/api/todos/upload", data);
        } catch (err) {
          console.log(err);
        }
      }

      const res = await axios.post(
        "http://localhost:5002/api/todos/post",
        newTodo
      );
      console.log(res.data);

      setTodos([...todos, res.data]);
      setTodoTitle("");
      setTodoCategory("");
      setTodoDescription("");
      setTodoLevel("");
      setTodoStatus(true);
      setError(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <label htmlFor="fileInput">
        <FcAddImage className="todoIcon" />
      </label>
      {error && <p>{error}</p>}
      {file && (
        <img className="img" src={URL.createObjectURL(file)} alt=""></img>
      )}
      <div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Select
          className="select"
          options={category}
          onChange={(selectedOption) =>
            setTodoCategory(selectedOption ? selectedOption.value : "")
          }
        >
          <option value="">Select a todo category</option>
        </Select>
        <Select
          className="select"
          options={level}
          onChange={(selectedOption) =>
            setTodoLevel(selectedOption ? selectedOption.value : "")
          }
        >
          <option value="">Select a todo level</option>
        </Select>
        <input
          className="title"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Todo Title"
        />
        <input
          className="desc"
          type="text"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Todo Description"
        />
        <button onClick={handleSubmitTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default App;
