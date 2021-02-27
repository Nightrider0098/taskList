const router = require('express').Router()
const { getTaskList, createTask } = require('../database')

router.get('/task', (req, res) => {
    getTaskList().then(e => {
        res.send(e)
    }).catch(e => {
        console.log(e)

    })

})

router.post('/task', (req, res) => {
    let task = req.body
    if (task == undefined) {
        return res.status(400).send({ message: "failed to store the task." })
    } else {
        createTask(task).then(e => {
            res.status(200).send({ message: "task added to the list." })
        }).catch(e => {
            res.status(400).send({ message: "failed to store the task." })
        })
    }
})

router.delete('/tasks')
module.exports = router
    