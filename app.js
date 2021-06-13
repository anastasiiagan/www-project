const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

//import routes
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/auth');
const recRoute = require('./routes/recommendations');


//Middlewares
app.use('/api/posts', postsRoute);
app.use('/api/user', authRoute);
app.use('/api/recommendations', recRoute);
app.use(express.json());


//Connect To DB
//const MongoDB_URI = 'mongodb+srv://dbuser:summer123@rest.ojlbm.mongodb.net/rest?retryWrites=true&w=majority';
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {console.log('connected to DB')
});


//Middlewares

/*app.use('/posts', () => {
    console.log('This is a middleware running');
});*/


//Routes

app.get('/', (req, res) => {

    res.send('We are on home');
});
/*
app.get('/posts', (req, res) => {

    res.send('We are on posts');
});*/

app.listen(3003);
