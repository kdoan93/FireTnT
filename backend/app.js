const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

//  If environment is in productin, variable isProduction will be set to true
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
if (!isProduction) {
    //  enalbe cors only in development
    app.use(cors());
}

//  helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

//  Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

/***    SECURITY MIDDLEWARE  ***/


const routes = require('./routes');
//  Connects all the routes
app.use(routes);

//  Export app.js
module.exports = app;
