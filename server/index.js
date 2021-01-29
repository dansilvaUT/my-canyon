require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authCtlr = require('./controllers/authController'),
    canyonCtlr = require('./controllers/canyonController'),
    commentCtlr = require('./controllers/commentController'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
    app = express();

//Middleware
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}));

//Connect to our DB
massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log(`MyCanyon DB Connected!`);
}).catch(err => console.log(`Error: ${err.message}`));

//AUTH ENDPOINTS
app.post('/api/auth/register', authCtlr.register);
app.post('/api/auth/login', authCtlr.login);
app.post('/api/auth/logout', authCtlr.logout);
app.get('/api/auth/me', authCtlr.getUser);
app.get('/api/auth/users', authCtlr.getUsers);

//CANYON(POSTS) ENDPOINTS
app.get('/api/canyons', canyonCtlr.getCanyons);
app.get('/api/canyons/:id', canyonCtlr.getCanyon);
app.post('/api/canyons', canyonCtlr.addCanyon);
app.delete('/api/canyons/:id', canyonCtlr.deleteCanyon);
app.put('/api/canyons/:id', canyonCtlr.editCanyon);


//EDIT COMMENTS ENDPOINTS
app.get('/api/comments', commentCtlr.getComments);
app.post('/api/comments/:id', commentCtlr.addComment);
app.delete('/api/comments', commentCtlr.deleteComment);
app.put('/api/comments', commentCtlr.editComment);
//Listen for changes on our server
app.listen(SERVER_PORT, console.log(`MyCanyon listening on ${SERVER_PORT}`));