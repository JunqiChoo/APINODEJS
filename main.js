const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/tasks');

const app = express();


app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/TODO')
  .then(() => console.log('Connected'))
  .catch(err => console.error(err));

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });   

//initialising the MOCK dummy data for insertion
const dummyTasks = [
    {
        task_id: "T001",
        task_message: "Finish writing report",
        completion_status: false
    },
    {
        task_id: "T002",
        task_message: "Attend team meeting",
        completion_status: true
    },
    {
        task_id: "T003",
        task_message: "Update GitHub repository",
        completion_status: false
    },
    {
        task_id: "T004",
        task_message: "Review pull requests",
        completion_status: true
    },
    {
        task_id: "T005",
        task_message: "Plan next sprint",
        completion_status: false
    }
];
 

app.get('/', (req, res) => {
    res.send('Hello, Welcome to express!');
    //pumping of dummy data into the mongoDB 
    /*
    mongoose.connect('mongodb://localhost:27017/TODO')
        .then(async () => {
            await Task.insertMany(dummyTasks);
            console.log("Dummy tasks inserted");
            mongoose.disconnect();
        })
        .catch(err => console.error(err));*/
});


//(CREATE) Adding Task from the body.
app.post("/add_Task", async (req, res) => {
    Task.create({
        task_id: req.body.task_id,
        task_message: req.body.task_message,
        completion_status:req.body.completion_status
    }).then(AppendedTask=>{
        console.log(AppendedTask)
    }).catch(err=>{
        console.log(err)
    })
})

//(READ) Retrieving all the items fromt he TODO list
app.get("/all",()=>{
    Task.find().then(tasks => console.log(tasks));
})
//(UPDATE)For editing the task item
app.put("/editTask/:id", async (req, res) => {
    Task.findByIdAndUpdate(
        req.params.id,           // MongoDB _id
        {
            task_message: req.body.task_message,
            completion_status: req.body.completion_status   
        },
        { new: true }                         // return the updated document
    )
        .then(updatedTask => {
            console.log('Updated task:', updatedTask);
        })
        .catch(err => {
            console.error('Error updating task:', err);

        })

});

//(DELETE) For deleting the item based on the ID
app.delete("/remove/:id",(req,res)=>{
    Task.findByIdAndDelete(req.params.id)
    .then(() => res.send('Task deleted'))
    .catch(err => res.status(500).send(err));
});

