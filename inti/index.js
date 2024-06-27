const mongoose = require('mongoose');
const Student = require('../models/student.js');
let data = require('./data.js');

main().catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/student_management_system');
}


async function initDB(){
    await Student.deleteMany({});
    await Student.insertMany(data);
    console.log('Data initalized');
}
initDB()

