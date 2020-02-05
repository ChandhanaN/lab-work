const express = require('express');
const router = express.Router();
const Person = require('../model/person');

router.post('/register', (req, res) => {
    Person.findOne({email:req.body.email})
    .then(person =>{
        if(person){
            return res.send('person already existed');
        }
        else{
            const newPerson = new Person({
                name: req.body.name,
                email:req.body.email,
                password: req.body.password
            })
            newPerson.save()
            .then(person =>  res.json(person))
            .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Person.findOne({email})
    .then(person =>{
        if(!person){
            return res.send('plz register');
        }else if(person.password == password){  
                res.send('logged in successfullu');
            }else{
                res.send('try again');
            }
        
    })
    .catch(err => console.log(err))
});
module.exports = router;