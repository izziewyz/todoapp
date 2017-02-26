const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path');

const dust = require('express-dustjs');
const routes = require('./controllers/');
const db = require('./models')

const app = require('express')();
const port = process.env.PORT || 3000;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST with middleware package
app.use(methodOverride("_method"));

//Set template engine
// Use Dustjs as Express view engine 
app.engine('dust', dust.engine({
  // Use dustjs-helpers 
  useHelpers: true
}));

app.set('view engine', 'dust')
app.set('views', path.resolve(__dirname, './views'))

db.sequelize.sync({force: true}).then(() => {
    app.listen(port);
});

//Use routes defined in controller
// console.log(routes.taskController)
app.use("/", routes.taskController);
app.use('/', routes.listController);
