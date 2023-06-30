require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const PORT = process.env.PORT || 3000;

// Express Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware that sets the variables for the hbs templates
app.use(require('./middleware/hbs'));

// Routes
app.use(require('./controllers'));

// Syncing the database and starting the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on ${process.env.URL}:${PORT}`)
  );
});
