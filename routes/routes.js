const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/model');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => res.send('welcome'));

router.post('/register', (req, res) => {
    //console.log(req.body)
    const { name, email, password, password2 } = req.body
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                res.send({ 'msg': 'Email is already registered' });
            } else {
                const newUser = new User({
                    name, email, password
                });
                //Hash Password
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        //save the user
                        newUser.save()
                            .then(user => {
                                req.send(user , 'You are now registered and can log in ');
                            })
                            .catch(err => res.send(err))
                    }))
            }
        }).then(user => {
            req.send(user , 'You are now registered and can log in ');
        })
        .catch(err => res.send(err))
});

router.get('/login',async (req,res)=>{
    //console.log(req.body)
    try {
        const {email,password} = req.body
        console.log(email)
        userObj = await User.findOne({email})
        if(userObj){
            let pass = bcrypt.compare(password,userObj.password)
            if(pass){
                res.send({
                    'name':userObj.name,
                    'email':email
                })
            }else{
                res.send({'err':'Error found'})
            }
        }else{
            res.send({'err':'Error found'})
        }
        }catch (error) {
            console.log(error);
        }    

});

module.exports = router;