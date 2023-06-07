const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes/index'));

app.set('view engine','ejs');
app.set('views', './views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`)
    }
    console.log(`Server started successfully on port ${port}`)
})
