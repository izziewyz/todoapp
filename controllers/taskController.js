const router = require('express').Router();

const Models = require('../models');

//Define router
let hbsObject = {};
router.get('/', (req, res) => {
    Models.Task.findAll({}).then((data) => {
      
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