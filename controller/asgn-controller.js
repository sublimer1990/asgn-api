var Assignment = require('../model/asgn-model');

exports.addAssignment = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Assignment content can not be empty"
        });
    }

    // Create a Note
    const assignment = new Assignment({
        title: req.body.title || "Untitled Assignment", 
        content: req.body.content
    });

    // Save Note in the database
    assignment.save()
    .then(doc => {
        res.send(doc);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the assignment."
        });
    });
};


exports.showAll = (req, res) => {
    Assignment.find()
        .then(assignment => {
            res.send(assignment);
        })
        .catch(err => {
            res.status(500).jason(err);
        });
}

exports.showAssignment = (req, res) => {
    Assignment.findById(req.params.assignmentName)
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });            
        }
        res.send(assignment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving assignment with name " + req.params.assignmentName
        });
    });
};

exports.updateAssignment = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Assignment content can not be empty"
        });
    }
    Assignment.findByNameAndUpdate(req.params.assignmentName, {
        title: req.body.title || "Unnamed assignment",
        content: req.body.content
    }, {new: true})
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });
        }
        res.send(assignment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });                
        }
        return res.status(500).send({
            message: "Error updating assignment with name " + req.params.assignmentName
        });
    });
};

exports.deleteAssignment = (req, res) => {
    Assignment.findByIdAndRemove(req.params.assignmentName)
    .then(assignment => {
        if(!assignment) {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });
        }
        res.send({message: "Assignment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Assignment not found with name " + req.params.assignmentName
            });                
        }
        return res.status(500).send({
            message: "Assignment not deleted with name " + req.params.assignmentName
        });
    });
};