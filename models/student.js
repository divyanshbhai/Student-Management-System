const mongoose = require('mongoose');

main().catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/student_management_system');
}

let studentSchema = new mongoose.Schema({
    enrollment_number: { 
        type: String, 
        required: true 
    },
    enrollment_date: { 
        type: Date, 
        required: true 
    },
    first_name: { 
        type: String, 
        required: true 
    },
    last_name: { 
        type: String,  
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    date_of_birth: { 
        type: Date, 
        required: true 
    },
    address: String,
    phone_number: String,
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true 
    },
    course_name: { 
        type: String, 
        required: true 
    }
});

let Student = mongoose.model('student', studentSchema);

module.exports = Student;

