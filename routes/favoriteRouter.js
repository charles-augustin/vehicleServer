const express = require('express');
const Favorites = require('../model/favorites');
const bodyParser = require('body-parser');
const cors = require('./cors');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => res.sendStatus = 200)
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .populate('vehicles')
            .then((favorite) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            }, err => next(err))
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

        Favorites.findOne({ user: req.user._id })
            .then((fav) => {

                if (fav) {

                    if (fav.vehicles.indexOf(req.body.vehicles) === -1)
                        fav.vehicles.push(req.body.vehicles);

                    fav.save()
                        .then((fav) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(fav);
                        }, err => next(err));
                }
                else {
                    const favorites = new Favorites({
                        vehicles: [req.body.vehicles],
                        user: req.user._id
                    });

                    favorites.save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, err => next(err));
                }
            }, err => next(err))
            .catch(err => next(err));
    });

favoriteRouter.route('/:id')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ user: req.user._id })
            .then((favs) => {
                if (favs.vehicles.length > 1) {
                    let val = req.params.id;
                    const index = favs.vehicles.indexOf(val);
                    favs.vehicles.splice(index, 1);
                    favs.save()
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                        }, err => next(err));
                }
                else {
                    Favorites.findOneAndRemove({ user: req.user._id })
                        .then((favs) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favs);
                        }, err => next(err))
                }

            }, err => next(err))
            .catch(err => next(err));
    });


module.exports = favoriteRouter;