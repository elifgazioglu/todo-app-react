import React, { useState, useEffect } from "react";
import axios from "axios";
import "../pages/listTodo.style.css";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [updateMessage, setUpdateMessage] = useState("");

  const todosPerPage = 5;

  const PF = "http://localhost:5002/images/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/todos");
        setTodos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //COMPLATE
  const handleCompleteTodo = async (id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === id); //ilgili todo'yu bul
      updatedTodo.status = false; //ilgili todo'nun status özelliğini false yap. yani todo artık aktif değil
      await axios.put(`http://localhost:5002/api/todos/${id}`, updatedTodo);
      setUpdateMessage("Todo item updated successfully.");
      setTimeout(() => {
        setUpdateMessage("");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  const renderCompleteButton = (todo) => {
    if (!todo.status) {
      //eğer todo aktif halde ise complete butonu oluşturur ve butona handleCompleteTodo işlevi verilir
      return <span></span>;
    } else {
      return (
        <button
          className="complete-button"
          onClick={() => handleCompleteTodo(todo._id)}
        >
          Complete
        </button>
      );
    }
  };

  //DELETE
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5002/api/todos/${id}`);
      setDeleteMessage("Todo item deleted successfully.");
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  //UPDATE
  const handleUpdateTodo = async () => {
    try {
      await axios.put(
        `http://localhost:5002/api/todos/${editingTodo._id}`,
        editingTodo
      );
      setUpdateMessage("Todo item updated successfully.");
      setTimeout(() => {
        setUpdateMessage("");
      }, 3000);
      setEditingTodo(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); //kategori değiştiğinde sayfayı sıfırla
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentPage(1); // Önem derecesi değiştiğinde sayfayı sıfırla
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
  };

  // Todo'ları filtrele
  const filteredTodos =
    selectedCategory === "all"
      ? todos
      : todos.filter((todo) => todo.category === selectedCategory);

  const filteredTodosByLevel =
    selectedLevel === "all"
      ? filteredTodos
      : filteredTodos.filter((todo) => todo.level === selectedLevel);

  const indexOfLastTodo = currentPage * todosPerPage; // bulunduğumuz sayfadaki son todo'nun index değeri
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage; // bulunduğumuz sayfadaki ilk todo'nun index değeri
  const currentTodos = filteredTodosByLevel.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  ); //bu iki değerin arasındaki todo'lar. (seçilen filtre grubu içerisindeki)

  // toplam sayfa sayısı
  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  // sayfa numaraları
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h2 className="heading">Todo List</h2>
      {deleteMessage && <p className="deleteMessage">{deleteMessage}</p>}
      {updateMessage && <p className="updateMessage">{updateMessage}</p>}
      <div className="filterContainer">
        <span className="filterLabel">Filter by Category:</span>
        <select
          className="filterSelect"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="cleaning">Cleaning</option>
          <option value="studying">Studying</option>
          <option value="working">Working</option>
          <option value="school">School</option>
          <option value="shopping">Shopping</option>
          <option value="hobby">Hobby</option>
        </select>
        <span className="filterLabel">Filter by Level:</span>
        <select
          className="filterSelect"
          value={selectedLevel}
          onChange={(e) => handleLevelChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <ul className="todoList">
        {currentTodos.map((todo) => (
          <li key={todo.id} className="todoItem">
            {todo.photo && (
              <div className="img">
                <img className="todo-img" src={PF + todo.photo} alt=""></img>
              </div>
            )}
            <strong className="list-head">Title:</strong>{" "}
            {editingTodo && editingTodo._id === todo._id ? (
              <input
                type="text"
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
              />
            ) : (
              todo.title
            )}{" "}
            <br />
            <strong className="list-head">Status:</strong>{" "}
            {editingTodo && editingTodo._id === todo._id ? (
              // Status düzenlemesi burada yok, sadece metin gösteriliyor
              <React.Fragment>
                {todo.status ? "Active" : "Completed"}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {todo.status ? "Active" : "Completed"}
                {!editingTodo && renderCompleteButton(todo)}
              </React.Fragment>
            )}
            <br />
            <strong className="list-head">Description:</strong>{" "}
            {editingTodo && editingTodo._id === todo._id ? (
              <textarea
                value={editingTodo.desc}
                onChange={(e) =>
                  setEditingTodo({
                    ...editingTodo,
                    desc: e.target.value,
                  })
                }
              /> 
            ) : (
              todo.desc
            )}{" "}
            <br />
            <strong className="list-head">Category:</strong>{" "}
            {editingTodo && editingTodo._id === todo._id ? (
              <React.Fragment>
                <button className="list-todo-button" onClick={handleUpdateTodo}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingTodo(null)}
                >
                  Cancel
                </button>
              </React.Fragment>
            ) : (
              <button
                className="list-todo-button"
                onClick={() => handleEditTodo(todo)}
              >
                Edit
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <span
            key={number}
            className={
              number === currentPage ? "currentPageNumber" : "pageNumber"
            }
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ListTodos;
