const router = require('express').Router();
const path = require('path');
const Models = require('../models');

//Define router
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../index.html'));
    res.render();
});


router.get('/do-task', (req, res) => {
    Models.Task.findAll({}).then((data) => {
          res.send(data);
    });
});

router.get('/add-task', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/add-task.html'));
});

// Change to post after form is ready. GET for testing.
router.post('/add-task', (req, res) => {
  
    Models.Task.create({
        task_name:"name",
        project_name: "",
        context: "Mobile",
        notes: "",
        duration_minutes: 45,
        priority: 3,
        
    }).then((data) => {
        res.redirect('../do-task');
    });
});

router.put('/do-task/:id', (req, res) => {
    Models.Task.update({
        id: req.params.id,
        task_name: req.body.task_name,
        project_name: req.body.project_name,
        context: req.body.context,
        notes: req.body.notes,
        duration_minutes: req.body.duration_minutes,
        priority: req.body.priority,
    }).then(() => res.redirect('/'));
});

router.get('/remove-task/:id', (req, res) => {
    Models.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then((data) => res.send(data)
        );
            // () => res.redirect('/'));
});

module.exports = router;