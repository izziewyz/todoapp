const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');

// const dust = require('dustjs-linkedin');
const cons = require('consolidate');
const routes = require('./controllers/');
const db = require('./models')

const app = require('express')();
const port = process.env.PORT || 3003;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));
app.set('views', path.resolve(__dirname, './views'))

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST with middleware package
app.use(methodOverride("_method"));

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', 'views');

cons.dust.render('notatemplate', {
  ext: app.get('view engine'),
  views: path.resolve(__dirname, app.get('views'))
}, function() {
    console.log('Template Worked')
});
// require('./dust-helpers')(cons.requires.dust);

db.sequelize.sync({force: true}).then(() => {
    app.listen(port);
    console.log('App running on: ' + port);
});

//Use routes defined in controller
// console.log(routes.taskController)
app.use("/", routes.taskController);
app.use('/', routes.listController);
