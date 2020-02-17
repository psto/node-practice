const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = 5000;

// Handlebars middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// index route
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', {
    title: title
  });
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(port, () => {
  console.log(`server started on ${port}`);
})
