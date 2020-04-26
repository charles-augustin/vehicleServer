const express = require('express');
const chatRouter = express.Router();

const Chats = require('../model/chat');

const cors = require('./cors');

chatRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200 })
    .get(cors.cors, (req, res, next) => {
        Chats.find(req.query).limit(200).sort({ _id: 1 })
            .then((chats) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(chats);
            }, (err) => next(err))
            .catch(err => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        //Connect to socket.io
        const io = req.app.get('io');
        Chats.create(req.body)
            .then(chats => {
            io.emit('chatAdded');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(chats);
        })
    })

chatRouter.route('/clear')
    .post(cors.corsWithOptions, (req, res, next) => {
        socket.on('clear', (data) => {
            //remove all chats from collection
            Chats.remove({}, () => {
                socket.emit('cleared');
            });
        });
    });

module.exports = chatRouter;