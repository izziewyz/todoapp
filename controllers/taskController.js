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
          res.render('./layouts/do-task', dustObj);
    });
});
//Route for returning relevant tasks that fit query parameters
router.post('/do-task', (req, res) => {
    const duration = parseInt(req.body.duration_minutes);
    const context = req.body.context === 'any' ?
         ['home', 'work', 'mobile'] :
         [req.body.context];

    const whereObj = {
        duration_minutes: {
            $lte: duration
        },
        context: {
            $in: context
        },
        completed: {
            $eq: false
        }
    };

    if (req.body.project_name) {
        whereObj.project_name = req.body.project_name;
    }

    Models.Task.findAll({
        limit: 5,
        order: 'priority DESC',
        where: whereObj
        
    }).then((data) => {
            // console.log(data)
        let dustObj = {};
        dustObj.tasks = data;
        res.render('./layouts/view-task', dustObj);
    });
});

router.put('/do-task/:id', (req, res) => {
    Models.Task.update(
    {
       completed: true
    },
    {
        where: {
            id: {
             $eq: req.params.id
            }
        }
    }).then(() => res.redirect('back'));
});

router.get('/done', (req, res) => {
    Models.Task.findAll({
        order: 'updatedAt DESC',
        where: {
            completed: {
                $eq: true
            }
        }
    }).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        res.render('./layouts/view-task', dustObj);
    });
});


router.get('/manage-task', (req, res) => {
    Models.Task.findAll({
            order: 'updatedAt DESC',
        }).then((data) => {
        let dustObj = {};
        dustObj.tasks = data;
        dustObj.manage = true;
        res.render('layouts/view-task', dustObj);
    });
});

router.post('/manage-task', (req, res) => {
    console.log(req.body.status)
    let status = req.body.status == 'null' ? [false, true] : (req.body.status == 'true' ? [true] : [false]);
    console.log(status);
    Models.Task.findAll({
        order: 'updatedAt DESC',
        where: {
            completed: {
                $in: status,
            }
        }
    }).then((data) =>  { 
        let dustObj = {};
        dustObj.tasks = data;
        dustObj.manage = true;
        res.render('layouts/view-task', dustObj);
    });
});

router.post('/add-task', (req, res) => {
    const context = req.body.context == 'any' ? ['home', 'work', 'mobile'] : req.body.context;
    console.log(context)
    Models.Task.create({
        task_name: req.body.task_name,
        project_name: "",
        context: context,
        notes: "",
        duration_minutes: req.body.duration_minutes,
        priority: 3,
        
    }).then((data) => {
        res.redirect('../add-task');
    });
});

router.put('/manage-task/:id', (req, res) => {
    Models.Task.update(req.body, {where: {id: req.params.id}}).then(
        () => res.redirect('back')
    );
});

router.delete('/manage-task/:id', (req, res) => {
    console.log('eh?')
    Models.Task.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.redirect('back'));
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

module.exports = router;