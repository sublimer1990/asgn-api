var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
require('dotenv').config();

var assignmentRoute = require('./route/asgn-router');

console.log(process.env.MONGO_URI)
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

app.use((req, res, next) => {
    console.log(`${new Date().toString()} ===> ${req.originalUrl}`);
    next();
});
app.use(express.urlencoded({
    extended: true
}
));

app.use(express.json());
app.use(express.static('public'));

app.use('/asgn-api', assignmentRoute);

app.use((req, res, next) => {
    res.status(404).send('Page not found, sorry!');
});

app.listen(PORT, () => {
    console.log(`server has started on ${PORT}`);
});