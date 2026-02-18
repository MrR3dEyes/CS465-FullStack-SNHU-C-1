const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //Register Model
const Model = mongoose.model('trips');

//Get: /trips - list of all of the trips
//Regardless of outcome response must be an html status code and json message to the client

const tripsList = async(req, res) => {
    const q = await Model
        .find({})
        .exec();

        //Uncomment line to show results of querey in console log
        //console.log(q);
    
    if(!q)
    { //Database returns no data
        return res
        .status(404)
        .json({ message: "No trips found" });
    }
    else{
        return res
        .status(200)
        .json(q);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
  const newTrip = new Model({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  const q = await newTrip.save();

  if (!q) {
    return res
      .status(400)
      .json({ message: "Trip not saved" });
  } else {
    return res
      .status(201)
      .json(q);
  }
};

const tripsFindByCode = async(req, res) =>{
    const q = await Model
    .find({'code' : req.params.tripCode})
    .exec();
    //Uncomment line to show results of querey in console log
        //console.log(q);

    if(!q)
    {
        return res
            .status(404)
            .json({ message: "Trip not found" });
    }
    else{
        return res.status(200)
        .json(q);
    }
};

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const q = await Model
    .findOneAndUpdate(
      { 'code': req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    )
    .exec();

  if (!q) {
    return res
      .status(404)
      .json({ message: "Trip not found" });
  } else {
    return res
      .status(200)
      .json(q);
  }
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteTrip = async (req, res) => {
  const q = await Model
    .findOneAndDelete({ 'code': req.params.tripCode })
    .exec();

  if (!q) {
    return res.status(404).json({ message: 'Trip not found' });
  } else {
    return res.status(204).send(); // No Content
  }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip, 
    tripsUpdateTrip, 
    tripsDeleteTrip
};
