const express = require('express');
const Reserve = require('../model/reserve');
const bodyParser = require('body-parser');
const cors = require('./cors');
const reserveRouter = express.Router();

reserveRouter.use(bodyParser.json());

reserveRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus = 200;})
    .get(cors.cors, (req, res, next) => {
        Reserve.find(req.query)
            .then((reserve) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reserve);
            }, err => next(err))
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        Reserve.create(req.body)
            .then((reserve) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reserve);
            }, err => next(err))
            .catch(err => next(err));
    })

module.exports = reserveRouter;

