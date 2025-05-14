const mongoose  = require("mongoose")


const TaskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        required: true
      },
      task_message: {
        type: String,
        required: true
      },
      completion_status: {
        type: Boolean,
        default: false
      }
})

module.exports = mongoose.model('Task', TaskSchema);  