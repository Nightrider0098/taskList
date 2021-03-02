const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const TaskList = new Schema({
    date: Date,


    // checkList of tasks
    taskArray: [{
        name: String,
        toTrack: Boolean,
        RemindAt: Date
    }],



    // shall be removed as this wiil be moved to analysis code
    isWeekEnd: Boolean,
    holiday: Boolean,
    hoursOnline: Number,
    
    
    priority: Number,

    // 0  non repeat
    // 1  everyday repeat
    // 2  only working day
    // 3  custom
    // 4  never repeat
    repeat: Number,

    // duration: Number,

    customRepeat: [{ date: Date }],
    tagArray: [{
        name: String,
        color: String,
        tagPriority: Number
    }]

});

module.exports = TaskList;
