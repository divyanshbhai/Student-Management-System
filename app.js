const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Student = require('./models/student.js');
const Auth = require('./models/auth.js')
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({extended: true}))
app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));


main().then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/student_management_system');
}

app.get('/', (req, res)=>{
    res.render('auth/login.ejs', {error: ''})
})

app.get('/auth', (req, res)=>{
    res.render('auth/register.ejs')
})

app.get('/students', async (req, res)=>{
    let students = await Student.find({});
    res.render('students/index.ejs', {students});
});

app.get('/students/new', (req, res)=>{
    res.render('students/new.ejs')
})

app.get('/students/:id', async (req, res)=>{
    let {id}  = req.params;
    let student = await Student.findById(id);
    res.render('students/show.ejs', {student});
})

app.get('/students/:id/edit', async (req, res)=>{
    let {id}  = req.params;
    let student = await Student.findById(id);
    res.render('students/edit.ejs', {student});
})

app.post('/students', async (req, res)=>{
    let student = new Student(req.body.student);
    await student.save();
    res.redirect('/students')
});

app.post('/auth', async (req, res)=>{
    let auth = new Auth();
    await auth.save();
    res.redirect('/')
})

app.post('/login', async (req, res)=>{
    let auth = await Auth.find(req.body.auth)
    console.log(auth)
    if(auth.length>0){
        res.redirect('/students')
    }else{
        res.render('auth/login.ejs',{error: 'Invalid login'})
    }
})

app.put('/students/:id', async (req, res)=>{
    let {id}  = req.params;
    await Student.findByIdAndUpdate(id, req.body.student);
    res.redirect(`/students/${id}`)
})

app.delete('/students/:id', async (req, res)=>{
    let {id}  = req.params;
    await Student.findByIdAndDelete(id)
    res.redirect(`/students`)
})

app.listen(8080, ()=>{
    console.log('Listening port: 8080');
})