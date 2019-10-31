const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: Array
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({description: [{ktrak: 'haha'}], completed: true})

task.save().then(() => {
    console.log('eita la giromba loka')
})