const router = require('express').Router();
const path = require('path');
const Models = require('../models');

//Define router
// let hbsObject = {};
router.get('/', (req, res) => {
    Models.Task.findAll({}).then((data) => {
      res.sendFile(path.join(__dirname, '../index.html'));
    });
});

router.post('/', (req, res) => {
  
        Models.Task.create({
           
        }).then(() => res.redirect('/'));
    
});

router.put('/:id', (req, res) => {
    Models.Task.update(
        
        
        ).then(() => res.redirect('/'));
});

router.delete('/:id', (req, res) => {
    Models.Task.destroy(
        
        ).then(() => res.redirect('/'));
});

module.exports = router;