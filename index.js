console.log('Hola');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/hugo-api', { useNewUrlParser: true })
.then(() => console.log('Connection with MongoDB'))
.catch(err => console.log('Could not connect to MongoDB', err));




const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastname: {type: String, minlength: 2, maxlength: 255},
  //category: {type: String, enum: ['man', 'female']},
  role: Number,
  tags: [ String ],
  active: Boolean,
});

const indicatorSchema = mongoose.Schema({
  register_date: Date,
  status: String,
  time_elapsed: String,
  color: String,
  name: String,
});



const User = mongoose.model('user', userSchema);
const Indicator = mongoose.model('indicator', indicatorSchema);


async function createIndicator(){
  let  registerDate = Date.now();
  const indicator = new Indicator({
    register_date: registerDate,
    status: 'finished',
    time_elapsed: '03:00',
    color: 'red',
    name: 'prueba',
  });
  try {
    const resp = await indicator.save();
    console.log(`Result: ${resp}`);

    return resp;
  } catch(e){
    console.log(`Error: ${e.message}`);
    return "Error";
  }
}

app.get('/insert-indicator', async (req, res) => {
  const indicator = await createIndicator();
  res.send(indicator);
});


// Classes, objects
async function createUser(){
  const user = new User({
    name: 'Becky',
    lastname: 'Escobar',
    role: 1,
    tags: ['designer', 'que', 'pro'],
    active: false
  });
  try {
    const result = await user.save();
    console.log(`Result: ${result}`);
  } catch(e){
    console.log(`Error: ${e.message}`);

  }

}

async function getUsers(){
  const users = await User.find().or([ {name: 'Osvaldo'}, {name: 'Marcelo'}]);
  console.log(`Result: ${users}`);
}


async function updateUser(id){
  //OPTION 1 query first findById, modify, save()
  const user = await User.findById(id);
  if (!user) return;
  console.log(`Result before: ${user}`)
  user.active = true;
  user.name = 'Osvaldo';
  user.role = 1;
  //user.set({active: false, role: 'user'});

  const result = await user.save();
  console.log(`Result after: ${result}`);
  // OPTION 2 update first update directly, getDocument updated
  //const result = await User.update({_ id: id}, {$set: {name; 'Edwin', active: false}});
  // User.findByIdAndUpdate(id, {$set: {name; 'Edwin', active: false}}, {new: true});
}

async function removeUser(id){
  const result = await User.deleteOne({_id: id});
  //.findByIdAndDelete()
  //.deleteMay()
  console.log(result);
}
//createUser();
//getUsers();
//updateUser('5c626111cd3baa266050bdb4');
//removeUser('5c627357561bfd30111b782b');
app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000')
})
