require('dotenv').config();
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    aws = require('aws-sdk'),
    authCtlr = require('./controllers/authController'),
    canyonCtlr = require('./controllers/canyonController'),
    commentCtlr = require('./controllers/commentController'),
    weatherCtlr = require('./controllers/weatherController'),
    userCtlr = require('./controllers/userController'),
    socket = require('socket.io'),
    { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env,
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


//Listen for changes and connect to sockets
const io = socket(
    app.listen(SERVER_PORT, console.log(`MyCanyon listening on ${SERVER_PORT}`))
)


//AUTH ENDPOINTS
app.post('/api/auth/register', authCtlr.register);
app.post('/api/auth/login', authCtlr.login);
app.post('/api/auth/logout', authCtlr.logout);
app.get('/api/auth/me', authCtlr.getUser);
app.get('/api/auth/users', authCtlr.getUsers);
app.put('/api/edit/:id', authCtlr.addDescription);

//CANYON(POSTS) ENDPOINTS
app.get('/api/canyons', canyonCtlr.getCanyons);
app.get('/api/canyon/:id', canyonCtlr.getCanyon);
app.get('/api/usercanyons/:id', canyonCtlr.getCanyonsByUserId);
app.post('/api/canyons', canyonCtlr.addCanyon);
app.delete('/api/canyons/:id', canyonCtlr.deleteCanyon);
app.put('/api/canyon/:id', canyonCtlr.editCanyon);


//EDIT COMMENTS ENDPOINTS
app.get('/api/comments/:id', commentCtlr.getComments);
app.post('/api/comments/:id', commentCtlr.addComment);
app.delete('/api/comment/:id', commentCtlr.deleteComment);
app.get('/api/comment/:id', commentCtlr.getComment);
app.put('/api/comment/:id', commentCtlr.editComment);

//WEATHER ENPOINT
app.post('/api/weather', weatherCtlr.getWeather);

//USER
app.put('/api/signs3', userCtlr.uploadPhoto);
//S3
app.get('/api/signs3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };

    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
        };

        return res.send(returnData);
    });
});


//Sockets
io.on("connection", function (socket) {
    socket.on("startChat", async function (data) {
        console.log('start hit', data);
        const { chatRoomId, viewedUserId, id } = data;
        const db = app.get("db");
        let room = await db.chat.check_room({ id: chatRoomId });
        room = room[0];
        if (!room) {
            db.chat.create_room({
                id: chatRoomId,
                user1: id,
                user2: viewedUserId
            });
            socket.join(chatRoomId);
        } else {
            const { room_id } = room;
            let messages = await db.chat.get_all_messages({ room_id: room_id });

            socket.join(chatRoomId);
            io.to(chatRoomId).emit("startChat", messages);
        }
    });

    socket.on("endChat", function (chatRoomId) {
        socket.leave(chatRoomId);
        // socket.disconnect() ;

    });

    socket.on("sendMsg", async function (data) {
        console.log(data);
        const { user1, message, room } = data;
        const db = app.get("db");
        let messages = await db.chat.create_message({
            room_id: room,
            message,
            sender_id: user1
        });

        console.log(messages);

        io.to(data.room).emit("sendMsg", messages);
    });
});
