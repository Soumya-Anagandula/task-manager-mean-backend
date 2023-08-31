const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');


// load the mongoose models
const { List,Task }= require('./db/models')

//load the middleware
app.use(express.json());
app.use(bodyParser.json());
//cors header middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods","GET,POST,PATCH,HEAD,OPTIONS,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/lists',(req,res) =>{
    //we want to return an array of all of the lists in the db
   List.find({}).then((lists) => {
        res.send(lists);
    })
    
});
app.post('/lists',(req,res) =>{
    //we wnat to create a new list and return the new list back to the user
    //the list information will be passed in via the json request body
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        res.send(listDoc);
    })
    

});
app.patch('/lists/:id',(req,res) =>{
    List.findOneAndUpdate({ _id : req.params.id}, {
        $set : req.body
    }).then(() =>{
        res.send({'message':'updated successsfully'})
    });
    
});
app.delete('/lists/:id',(req,res) => {
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removeListdoc) => {
        res.send(removeListdoc);
    })

});

app.get('/lists/:listId/tasks', (req,res) => {
    //we want  to return all the tasks that belong to a specofic list

    Task.find({
        _listId : req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

app.post('/lists/:listId/tasks', (req,res) => {
    //we want  to create a new task in a list specified by listId
    let newTask = new Task({
        title : req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        // the full list document is returned (incl. id)
        res.send(newTaskDoc);
    })
    
});
app.patch('/lists/:listId/tasks/:taskId',( req,res) => {
    //update an existing task
    Task.findOneAndUpdate({ 
        _id : req.params.taskId,
        _listId : req.params.listId
    }, {
        $set : req.body
    }).then(() =>{
        res.send({message : 'updated successfully'})
    })
});
app.delete('/lists/:listId/tasks/:taskId',(req,res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId : req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc);
    })

});

app.listen(3000,() => {
    console.log("server is listening to port 3000");
})