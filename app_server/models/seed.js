//Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

//Read Seed data from JSON file

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

//delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};


//Close the MongoDB connection then exit

seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});