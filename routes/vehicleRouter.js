const express = require('express');
const Vehicles = require('../model/vehicle');
const bodyParser = require('body-parser');
const cors = require('./cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage:storage});

const vehicleRouter = express.Router();

vehicleRouter.use(bodyParser.json());

// vehicleRouter.route('/get-type')
//     .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
//     .get(cors.cors, (req, res, next) => {
//         Vehicles.find(req.query).distinct('Type')
//             .then((types) => {
//                 Vehicles.find(req.query).distinct('Color')
//                     .then((colors) => {
//                         res.statusCode = 200;
//                         res.setHeader('Content-Type', 'application/json');
//                         res.json({ color: colors, type: types });
//                     })
//                     .catch(err => next(err));
//             }, err => next(err))
//             .catch(err => next(err));

//     });

vehicleRouter.route('/updateVehicleStatus/:vehicleID')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus = 200;})
    .put(cors.corsWithOptions, (req, res, next) => {
        Vehicles.findByIdAndUpdate(req.params.vehicleID, {
            $set: req.body
        }, {
            new: true
        })
        .then((out) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(out);
        }, err => next(err))
        .catch(err => next(err));
    });

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

    .post(cors.corsWithOptions, upload.single('VehicleImage'), (req, res, next) => {
        console.log(req.file);

        const vehicle = new Vehicles({
            Type: req.body.Type,
            Make: req.body.Make,
            Model: req.body.Model,
            Year: req.body.Year,
            Color: req.body.Color,
            PlateNo: req.body.PlateNo,
            Available: req.body.Available,
            ImageURL: req.file.path
        })
        
        vehicle.save()
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
            }, err => next(err))
            .catch(err => next(err));
    })

    .put(cors.corsWithOptions, upload.single('VehicleImage'), (req, res, next) => {

        const vehicle = new Vehicles({
            Type: req.body.Type,
            Make: req.body.Make,
            Model: req.body.Model,
            Year: req.body.Year,
            Color: req.body.Color,
            PlateNo: req.body.PlateNo,
            ImageURL: req.file.path
        });

        console.log(vehicle);
        

        Vehicles.findByIdAndUpdate(req.params.vehicleID, {
            $set: {'Type': vehicle.Type,
            'Make': vehicle.Make,
            'Model': vehicle.Model,
            'Year': vehicle.Year,
            'Color': vehicle.Color,
            'PlateNo': vehicle.PlateNo,
            'ImageURL': vehicle.ImageURL}
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
        Vehicles.findOneAndRemove({ _id: req.params.vehicleID })
            .then((vehicle) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(vehicle);
            }, err => next(err))
            .catch(err => next(err))
    });



module.exports = vehicleRouter;
