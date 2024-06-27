const mongoose = require('mongoose');

main().catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/student_management_system');
}


let authSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

let Auth = mongoose.model('auth', authSchema);
module.exports = Auth;