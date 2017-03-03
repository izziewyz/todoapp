const router = require('express').Router();
const path = require('path');
const Models = require('../models');

//Define router
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../index.html'));
    res.render('./layouts/home');
});
//Route for viewing all tasks
router.get('/do-task', (req, res) => {
    Models.Task.findAll({}).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        // console.log(dustObj)
          res.render('./layouts/do-task', dustObj);
    });
});
//Route for returning relevant tasks that fit query parameters
router.post('/do-task', (req, res) => {
    const duration = parseInt(req.body.duration_minutes);
    const context = req.body.context === 'any' ?
         ['home', 'work', 'mobile'] :
         [req.body.context];

    Models.Task.findAll({
        limit: 2,
        order: 'priority DESC',
        where: {
            duration_minutes: {
                $lte: duration
            },
            context: {
                $in: context
            },
        }
    }).then((data) => {
            // console.log(data)
        let dustObj = {};
        dustObj.tasks = data;
        res.render('./layouts/view-task', dustObj);
    });
});


router.get('/manage-task', (req, res) => {
    Models.Task.findAll({
       
    }).then((data) => {
            // console.log(data)
        let dustObj = {};
        dustObj.tasks = data;
        res.render('layouts/view-task', dustObj);
    });
});

router.post('/add-task', (req, res) => {
    console.log(req.body)
    Models.Task.create({
        task_name: req.body.task_name,
        project_name: "",
        context: "home",
        notes: "",
        duration_minutes: 45,
        priority: 3,
        
    }).then((data) => {
        res.redirect('../add-task');
    });
});
// Route for viewing 5 most recent tasks on the add task page
router.get('/add-task', (req, res) => {
        Models.Task.findAll({
            limit: 5,
            order: 'id DESC'
        }).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        res.render('layouts/add-task', dustObj);
    });
});

router.put('/do-task/:id', (req, res) => {
    
    Models.Task.update({
       completed: true
    },
    {
        where: {
            id: req.params.id
        }
    }
    
    ).then(() => res.redirect('back'));
});

router.put('/manage-task/:id', (req, res) => {
    Models.Task.update(req.body, {where: {id: req.params.id}}).then(
        ()=> res.redirect('back')
    );
});

router.delete('/manage-task/:id', (req, res) => {
    Models.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.redirect('back'));
});

module.exports = router;