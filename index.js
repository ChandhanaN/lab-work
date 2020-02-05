const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const dm = require('./routes/myroute')


const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
//configuring db
const db= require('./setup/myurl').mongoURL;
mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('mongo connected successfully..'))
    .catch(err => console.log(err))

const port = process.env.PORT ||8000;

app.get('/',(req,res) =>{
    res.send('im ok');
})

app.use('/plz', dm)

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});