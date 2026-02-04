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
        .json(err);
    }
    else{
        return res
        .status(200)
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
            .json(err);
    }
    else{
        return res.status(200)
        .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};