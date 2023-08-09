const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const { ValidationError } = require('sequelize');

//  If environment is in production, variable isProduction will be set to true
const { environment } = require('./config');
const isProduction = environment === 'production';

//  Initialize Express application
const app = express();

/***    SECURITY MIDDLEWARE  ***/
//  Connect morgan middleware for logging info about req/res
app.use(morgan('dev'));

//  cookieParser middleware for parsing cookies
//  express.json middleware for parsing JSON bodies of req w/ Content-Type of 'application/json'
app.use(cookieParser());
app.use(express.json());

/***    Security Middleware   ***/
//  enable cors only in development
if (!isProduction) app.use(cors())

//  helmet helps set a variety of headers to better secure your app
app.use( helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
})
);

//  Set the _csrf token and create req.csrfToken method
app.use( csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && "Lax",
    httpOnly: true
  }
})
);
/***    SECURITY MIDDLEWARE  ***/

//  Connects all the routes
app.use(routes);

//  Homepage welcome message
app.get('/', async (req, res) => {
  res.json( "Welcome to the FireTnT homepage! 🐱‍👤🔥🙌" )
})

/***        Error-Handlers      ***/
//  Catch unhandled requests and foward to error handler.
app.use((_req, _res, next) => {
  const err = new Error('The requested resource couldn\'t be found.');
  err.title = 'Resource Not Found';
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
})

//  2nd error handler for catching Sequelize errors & formatting before sending error response

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

//  Error handler for formatting all errors before returning a res.JSON.
//  Will include error message as a JSON object with key-value pairs & error stack trace with status code of error message
// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});
/***        Error-Handlers      ***/



//  Export app.js
module.exports = app;
