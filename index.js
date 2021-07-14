const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

const app = express();
//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
//routes
app.use('/api/blog', postRoute);
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoute);

app.get('/', (req, res)=>{
    res.send('Welcome to Server')
})

const port = process.env.port || 4000;
app.listen(port,()=>{
    console.log(`server is running at port : ${port}`);
})