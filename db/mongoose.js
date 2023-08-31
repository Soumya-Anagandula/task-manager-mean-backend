// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/TaskManager', { useNewUrlParser: true }).then(() => {
//     console.log("Connected to MongoDB successfully :)");
// }).catch((e) => {
//     console.log("Error while attempting to connect to MongoDB");
//     console.log(e);
// });

mongoose.connect("mongodb+srv://anagandulasoumya:Soumya503@cluster0.uhsgdar.mongodb.net/TaskManager").then( () =>{
    console.log("connected to MongoDB successfully :)");
}).catch((e) => {
         console.log("Error while attempting to connect to MongoDB");
         console.log(e);
    
})

// To prevent deprectation warnings (from MongoDB native driver)
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};