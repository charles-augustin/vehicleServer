const express = require('express');
const Vehicles = require('../model/vehicle');
const bodyParser = require('body-parser');

const vehicleRouter = express.Router();

vehicleRouter.use(bodyParser.json());

vehicleRouter.route('/')
    .get((req, res, next) => {
        Vehicles.find(req.query)
            .then((vehicles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(vehicles);
            }, (err) => next(err))
            .catch((err) =>next(err))
    })

    .post((req, res, next) => {
        Vehicles.create(req.body)
            .then((vehicle) => {
                console.log("Vehicle Created: "+vehicle);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicle);
            })
            
            .catch((err) => {
                next(err);
            })
    })


module.exports = vehicleRouter;
