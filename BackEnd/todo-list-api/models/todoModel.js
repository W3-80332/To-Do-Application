const mongoose = require('mongoose');
const { type } = require('os');

const TodoSchema = new mongoose.Schema({


  task_desc: {
    type: String,
    required: true
  },
  task_assigned_to: {
    type: String,
    required: false
  },
  task_status: {
    type: String,
    required: false
  },
  task_dueDate: {
    type: Date,
    required: false
  },
  task_priority: {
    type: String,
    required: false
  }
}); 

module.exports = mongoose.model('Todo', TodoSchema);
