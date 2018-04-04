const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Item = require('../Models/Item');

router.post('/', (req, res) => {

    Item.create({
            name : req.body.name,
            description : req.body.description,
            userId: req.body.userId,            
        },
        (err, item) => {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(item);
        });
 });

router.get('/:userId', (req, res) => {

    Item.find({'userId': req.params.userId})
    .sort({ name: 1 })
    .exec( (err, items) => {
        if (err) return res.status(500).send("There was a problem finding the items.");
        
        res.status(200).send(items);
    });
 });
 

router.get('/', (req, res) => {
    
    Item.findOne({})
    .populate('userId')
    .exec( (err, users) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!users) return res.status(404).send("Password or email is incorrect");
        res.status(200).send(users);
      });
})
 
router.delete('/:id', (req, res) => {

    Item.findByIdAndRemove(req.params.id, (err, item) => {
        if (err) return res.status(500).send("There was a problem deleting the item.");
        res.status(200).send("Item "+ item.name +" was deleted.");
    });
});
 
router.put('/:id', (req, res) => {
    
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, item) => {
        if (err) return res.status(500).send("There was a problem updating the item.");
        res.status(200).send(item);       
    });
});

module.exports = router;