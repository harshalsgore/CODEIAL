const express = require('express');
const env = require('./configs/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');

const flash = require('connect-flash');
const customMware = require('./configs/middleware')

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./configs/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local-strategy');
const passportJWT = require('./configs/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);

//Not using the below code instead using manual script to update sass files to css
//Added script in package.json
//Command use to run script is - npm run sass
// const sassMiddleware = require('sass-middleware');
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//makes the upload path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server started successfully on port ${port}`)
})
