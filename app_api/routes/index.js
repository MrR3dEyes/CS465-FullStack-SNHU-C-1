const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authentication');

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader == null) {
    return res.sendStatus(401);
  }

  let headers = authHeader.split(' ');
  if (headers.length < 2) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.auth = verified;
    next();
  });
}

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// GET all trips
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// GET single trip by code
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
