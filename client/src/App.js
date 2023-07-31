import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import AddTodo from "./pages/addTodo";
import ListTodo from "./pages/listTodo";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<ListTodo />} />
          <Route path="/create" element={<AddTodo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;