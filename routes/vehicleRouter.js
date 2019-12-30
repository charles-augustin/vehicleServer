const express = require('express');
const Vehicles = require('../model/vehicle');
const bodyParser = require('body-parser');
const cors = require('./cors');

const vehicleRouter = express.Router();

vehicleRouter.use(bodyParser.json());

vehicleRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        Vehicles.find(req.query)
            .then((vehicles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicles);
            }, (err) => next(err))
            .catch((err) => next(err))
    })

    .post(cors.corsWithOptions, (req, res, next) => {
        Vehicles.create(req.body)
            .then((vehicle) => {
                console.log("Vehicle Created: " + vehicle);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicle);
            })

            .catch((err) => {
                next(err);
            })
    });

vehicleRouter.route('/:vehicleID')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        Vehicles.findById(req.params.vehicleID)
        .then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        },err => next(err))
        .catch(err => next(err));
    })

    .put(cors.corsWithOptions, (req, res, next) => {
        Vehicles.findByIdAndUpdate(req.params.vehicleID, {
            $set: req.body
        }, {
            new: true
        })
            .then((vehicles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicles);
            }, err => next(err))
            .catch(err => next(err));
    })

    .delete(cors.corsWithOptions, (req, res, next) => {
        Vehicles.findOneAndRemove({_id: req.params.vehicleID})
            .then((vehicle) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicle);
            }, err => next(err))
            .catch(err => next(err))
    });

module.exports = vehicleRouter;
