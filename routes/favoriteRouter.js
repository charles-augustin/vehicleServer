const express = require('express');
const Favorites = require('../model/favorites');
const bodyParser = require('body-parser');
const cors = require('./cors');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus = 200)
    .get(cors.cors, (req, res, next) => {
        Favorites.find(req.body)
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, err => next(err))
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        Favorites.create(req.body)
            .then(favs => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favs);
            }, err => next(err))
            .catch(err => next(err));
    })

module.exports = favoriteRouter;