const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load env variables
dotenv.config({ path: './config/config.env' })

//Load Model
const Bootcamp = require('./models/BootcampModel');

//Mongoose connection DB
mongoose.connect(process.env.DB_CONNECTION,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);

    console.log('Data Imported...');
    process.exit();    
  } catch(err) {
    console.error(err);
  }
}

// Import into DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany(bootcamps);

    console.log('Data Destroyed...');
    process.exit();    
  } catch(err) {
    console.error(err);
  }
}

// Call Back of seeder
if(process.argv[2] === '-i') {
  importData();
} else if(process.argv[2] === '-d') {
  deleteData();
}
