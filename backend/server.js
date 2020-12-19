const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose'); //should be added after the cors

const app = express();
//const bodyParser = require('body-parser');

require('dotenv').config();

const port = process.env.PORT || 5000;


//app.use(bodyParser.json());
app.use(cors()); //Now, after the line app.use(express.json());, add:
const uri = process.env.ATLAS_URI;


app.use(express.json());


mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const connection = mongoose.connection;
connection.once('open', () => { console.log("MongoDB database connection established succesfully"); });

app.use(express.json());

const bookRouter = require('./routes/book');
const booklendingRouter = require('./routes/booklending');
const userRouter = require('./routes/user');
const lendbookRouter = require('./routes/lendbook');
const categoryRouter = require('./routes/category')

app.use('/book', bookRouter);
app.use('/booklending', booklendingRouter);
app.use('/user', userRouter);
app.use('/lendbook', lendbookRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
    console.log('server is running on port:' + port);
});





