const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const devPort = 3002;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


// Express App Config
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'puki muki secret stuff',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static('public'));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const petRoutes = require('./api/pet/pet.routes');
const shopRoutes = require('./api/shop/shop.routes');
const orderRoutes = require('./api/order/order.routes');
const userRoutes = require('./api/user/user.routes');
const authRoutes = require('./api/auth/auth.routes');
const chatRoutes = require('./api/chat/chat.routes');
const connectSockets = require('./api/socket/socket.routes');


app.use('/api/pet', petRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
connectSockets(io);


const port = process.env.PORT || devPort;
app.get('/**', (req, res) => {
 res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

http.listen(port, () => {
    // console.log(`Example app listening at http://localhost:${port}`);
})



// const logger = require('./services/logger.service')

// http.listen(port, () => {
//     // logger.info('Server is running on port: ' + port)
// });


// app.listen(devPort, () => {
//     console.log(`Example app listening at http://localhost:${devPort}`);
// })


