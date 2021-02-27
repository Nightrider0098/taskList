const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const TaskList = new Schema({
    date: Date,
    taskArray: [{
        name: String,
        toTrack: Boolean,
        RemindAt: Date
    }],
    isWeekEnd: Boolean,
    holiday: Boolean,
    hoursOnline: Number

});

module.exports = TaskList;
