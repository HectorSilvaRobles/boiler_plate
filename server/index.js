const express = require('express');
const app = express();
const path = require('path');
const cors =require('cors');
const config = require('./config/key')

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Connecting Mongoose DataBase
const mongoose = require('mongoose');
console.log(config)
mongoose.connect(`${config.mongoURI}`, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    userUnifiedTopology: true
})
.then(()=> console.log('MongooDB connected'))
.catch(err => console.error('there was error', err))


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors())

app.get('/', (req, res) => {
    res.json({
        "hello": "I am happy to deploy our app"
    })
});

app.use('/api/users', require('./routes/rUsers'));

const port = process.env.PORT || 6000


app.listen(port, () => console.log(`server running on port ${port}`));