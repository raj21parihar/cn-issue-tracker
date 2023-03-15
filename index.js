const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
// const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));

app.use(
    session({
        name: 'cn-issue-tracker',
        secret: 'cn-issue-tracker',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100,
        },
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/cn_issue_tracker_db',
            autoRemove: 'disabled',
        }),
    })
);
// app.use(
//     sassMiddleware({
//         src: './assets/scss',
//         dest: './assets/css',
//         debug: true,
//         outputStyle: 'expanded',
//         prefix: '/css',
//     })
// );
app.use(express.static('./assets'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(process.env.PORT, function (err) {
    if (err) {
        console.log('Error: ', err);
    }
    console.log('Express server running on port :', process.env.PORT);
});
