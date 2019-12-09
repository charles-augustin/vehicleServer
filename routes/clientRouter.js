const express = require('express');
const clientRouter = express.Router();

const Clients = require('../model/client');

clientRouter.route('/')
    .get((req, res, next) => {
        Clients.find(req.query)
            .then((client) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(client);
            }, (err) => next(err))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        Clients.create(req.body)
            .then((client) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(client);
            }, (err) => next(err))
            .catch(err => next(err)); 
    });

    module.exports = clientRouter;