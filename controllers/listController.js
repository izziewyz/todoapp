const router = require('express').Router();

const Models = require('../models');

//Define router
let hbsObject = {};
router.get('/', (req, res) => {
    Models.List.findAll({}).then((data) => {
      
    });
});

router.post('/', (req, res) => {
  
        Models.List.create({
           
        }).then(() => res.redirect('/'));
    
});

router.put('/:id', (req, res) => {
    Models.List.update(
        
        
        ).then(() => res.redirect('/'));
});

router.delete('/:id', (req, res) => {
    Models.List.destroy(
        
        ).then(() => res.redirect('/'));
});

module.exports = router;