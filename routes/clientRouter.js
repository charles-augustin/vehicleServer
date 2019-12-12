const express = require('express');
const clientRouter = express.Router();

const Clients = require('../model/client');

const cors = require('./cors');

clientRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => {res.sendStatus = 200;})
    .get(cors.cors, (req, res, next) => {
        Clients.find(req.query)
            .then((client) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(client);
            }, (err) => next(err))
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        Clients.create(req.body)
            .then((client) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(client);
            }, (err) => next(err))
            .catch(err => next(err)); 
    });

    module.exports = clientRouter;