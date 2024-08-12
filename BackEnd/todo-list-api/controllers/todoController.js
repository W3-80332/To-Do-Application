const mongoose = require('mongoose'); // Import mongoose
const Todo = require('../models/todoModel');

// Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({
      task_desc: req.body.task_desc,
      task_assigned_to: req.body.task_assigned_to,
      task_status: req.body.task_status,
      task_dueDate: req.body.task_dueDate,
      task_priority: req.body.task_priority
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single Todo by ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Todo by ID
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Update fields
    todo.task_desc = req.body.task_desc || todo.task_desc;
    todo.task_assigned_to = req.body.task_assigned_to || todo.task_assigned_to;
    todo.task_status = req.body.task_status || todo.task_status;
    todo.task_dueDate = req.body.task_dueDate || todo.task_dueDate;
    todo.task_priority = req.body.task_priority || todo.task_priority;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Todo by ID
exports.deleteTodo = async (req, res) => {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const result = await Todo.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
