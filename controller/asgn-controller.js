var Assignment = require('../model/asgn-model');

exports.showAssignment = function(req, res){
    if(!req.query.asgnID) {
        return res.status(400).send('Missing URL parameter');
    }
    Assignment.findOne({
        asgnID: req.query.asgnID
    })
    .then((doc) =>{
        res.json(doc);
    })
    .catch((err) => {
        res.status(500).jason(err);
    });
}

exports.addAssignment = function(req, res) {
    if(!req.body) {
        return res.status(400).send('Req body missing');
    }
    var model = new Assignment(req.body);
    model.save()
        .then((doc) => {
            if(!doc || doc.length === 0) {
                return res.status(500).send('Internal Server Error')
            }
            res.status(201).send(doc);
        })
        .catch((err) => {
                res.status(500).json(err)
            })
}

exports.dropAssignment = function(req, res) {
    
}