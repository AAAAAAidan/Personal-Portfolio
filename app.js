const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const port = process.env.PORT || 8080;
app.listen(port);

// Views

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/portfolio', (request, response) => {
  response.render('portfolio');
});

app.get('/enjoyment', (request, response) => {
  response.render('enjoyment');
});

// Redirects

app.get(['/index', '/home'], (request, response) => {
  response.redirect('/');
});

// Errors

app.use((request, response) => {
  response.status(404).render('404');
});
