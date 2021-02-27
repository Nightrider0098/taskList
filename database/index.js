const connection = require('./connection')
const { TaskList } = require('./Schema')

const taskList = connection.model('taskList', TaskList);


const getTaskList = () => new Promise((resolve, reject) => {
    taskList.find({}).then(result => {
        console.log(result)
        resolve(result)
    }).catch(err => {
        console.log(err)
        reject('unable to process requrest now.')
    })
})


const createTask = (data) => {
    return new Promise(async (resolve, reject) => {
        taskList.findOne({ date: data.date || new Date() }).then(result => {
            if (result !== null) {
                taskList.updateOne({ date: data.date }, {
                    taskArray: { $set: data.taskArray }
                }).then(e => {
                    resolve()
                })
            }
            else {
                taskList(data).save().then(e => {
                    console.log('saved', e)
                    resolve()
                })
            }
        }).catch(e => {
            console.log(e);
            reject('failed to add new task.')
        })

    })
}


module.exports = { getTaskList, createTask }