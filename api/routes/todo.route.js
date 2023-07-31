import express from "express";
import Todo from "../models/todo.model.js";
import multer from "multer";

const router = express.Router();


//Create new Todo
router.post("/post", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.status(200).json(savedTodo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Todos
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(200).json("Todo has been deleted...");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Todos
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    try {
      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTodo);
      console.log("Todo has been updated!");
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


export default router;
