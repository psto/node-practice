const express = require('express');
const app = express();
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 5000;
const exphbs = require('express-handlebars');
// control prototype access in handlebars
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Method override middleware
app.use(methodOverride('_method'));

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// flash middleware
app.use(flash());

// global variables
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

// index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

// about route
app.get('/about', (req, res) => {
  res.render('about');
})

// Idea Index Page
app.get('/ideas', (req, res) => {
  Idea.find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas:ideas
      });
    });
})

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

// Edit Idea Form
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', {
        idea: idea
      });
    })
})

// Process form
app.post('/ideas', (req, res) => {
  let errors = [];

  if (!req.body.title){
    errors.push({text:'Please add a title'});
  }
  if (!req.body.details){
    errors.push({text:'Please add some details'})
  }

  if (errors.length > 0){
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video idea added!');
        res.redirect('/ideas');
      })
  }
})

// Edit Form Process
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      idea.title = req.body.title;
      idea.details = req.body.details;

      idea.save()
        .then(idea => {
          req.flash('success_msg', 'Video idea updated!');
          res.redirect('/ideas');
        })
    })
})

// Delte Idea
app.delete('/ideas/:id', (req, res) => {
  Idea.remove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Video idea removed!');
      res.redirect('/ideas');
    })
})

app.listen(port, () => {
  console.log(`server started on ${port}`);
})
