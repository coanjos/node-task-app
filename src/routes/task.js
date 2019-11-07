const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }    
})

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        res.send(task)
        
        if(!task){
            return res.status(404).send()
        }
    } catch (error) {
        res.status(500).send(error)
    }    
})

router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdatesArray = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdatesArray.includes(update))

    if(!isValidOperation){
        res.status(400).send({ error: 'Invalid operation' })
    }

    try {
        const task = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).send()
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router