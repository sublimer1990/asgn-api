var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AssignmentSchema = new Schema({
    courseName: {
        type: String,
    },
    assignmentName: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
    }
})

module.exports = mongoose.model('Assignment', AssignmentSchema);