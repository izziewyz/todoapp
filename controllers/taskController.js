const router = require('express').Router();
const path = require('path');
const Models = require('../models');

//Define router
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../index.html'));
    res.render('./layouts/home');
});

router.get('/do-task', (req, res) => {
    Models.Task.findAll({}).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        console.log(dustObj)
          res.render('./layouts/do-task', dustObj);
    });
});

router.get('/add-task', (req, res) => {
        Models.Task.findAll({
            limit: 5,
            order: 'id DESC'
        }).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        res.render('./layouts/add-task', dustObj);
    });
});

router.post('/do-task', (req, res) => {
    const duration = parseInt(req.body.duration_minutes);

        Models.Task.findAll({
            limit: 2,
            order: 'priority DESC',
            where: {
                duration_minutes: {
                    $lte: duration
                }
            }
        }
        ).then((data) => {
            console.log(data)
        let dustObj = {};
        dustObj.tasks = data;
        res.render('./layouts/add-task', dustObj);
    });
});

router.post('/add-task', (req, res) => {
    console.log(req.body)
    Models.Task.create({
        task_name: req.body.task_name,
        project_name: "",
        context: "Mobile",
        notes: "",
        duration_minutes: 45,
        priority: 3,
        
    }).then((data) => {
        res.redirect('../add-task');
    });
});

// Change to post after form is ready. GET for testing.
router.get('/add-task-test', (req, res) => {
  
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