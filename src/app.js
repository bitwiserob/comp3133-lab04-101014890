const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const app = express();
const User = require('./user.js');
const users = require('./users.json');
const bodyParser = require('body-parser');
const uri = "mongodb+srv://admin:1234@101014890.ceawi2z.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err));


// users.forEach(async user => {
//     try {
//       const newUser = new User(user);
//       await newUser.save();
//       console.log(`User "${user.name}" added to the database.`);
//     } catch (error) {
//       console.error(`Error adding user "${user.name}" to the database: ${error}`);
//     }
//   });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(bodyParser.json());


router.post('/users', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    address: {
      street: req.body.address.street,
      suite: req.body.address.suite,
      city: req.body.address.city,
      zipcode: req.body.address.zipcode,
      geo: {
        lat: req.body.address.geo.lat,
        lng: req.body.address.geo.lng
      }
    },
    phone: req.body.phone,
    website: req.body.website,
    company: {
      name: req.body.company.name,
      catchPhrase: req.body.company.catchPhrase,
      bs: req.body.company.bs
    }
  });
  
  newUser.save((err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user);
  });
});



app.listen(3000, () => console.log('Server running on port 3000'));

module.exports = router;
