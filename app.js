const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const mongoose = require('mongoose');

const User = require('./models/user')

const app = express();
const cors = require('cors');

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('656c4ed2093a0bc22b4d17ed')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
const options = { useNewUrlParser: true };


mongoose.connect('mongodb+srv://srlohith92:Lohith%40123@cluster0.kce3sda.mongodb.net/shop',options)
  .then(result => {
    User.findOne().then(user=>{
      if(!user){
        const user = new User({
          name:'lohith',
          email:'lohith@gmail.com',
          cart:{
            items:[]
          }
      });
      user.save();
      }
    })
   
    app.listen(8000,()=>{
      console.log("listening @ port 8000");
    });
  })
  .catch(err => {
    console.log(err);
});

