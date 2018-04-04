const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../Models/User');

router.post('/signup/', (req, res) => {
    console.log(req);
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function (err, user) {
        if (err) return res.status(500).send(err.message);
        res.status(200).send(user);
    });
});

router.post('/login/', (req, res) => {
    if (req.body.email && req.body.password) {
    User.findOne({
            email: req.body.email,
            password: req.body.password
        },
        (err, user) => {
            if (err) return res.status(500).send(err);
            if (!user) return res.status(404).send('user is not found');
            res.status(200).send(user);
        });
     } else {
        res.status(400).send("password or email is missed");
     }
});

router.get('/:id', (req, res) => {
    
    User.findById(req.params.password, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("Password or email is incorrect");
        res.status(200).send(user);
    });
});
 
router.delete('/:id', (req, res) => {

    User.findByIdAndRemove(req.params.password, (err, user) => {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});
 
router.put('/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.params.password, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send("There was a problem updating the item.");
        res.status(200).send(user);       
    });
});

module.exports = router;