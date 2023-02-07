const express = require('express');
const uuid = require('uuidv4')
const db = require('../db.js');

const router = express.Router();

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);  
});

router.route('/concerts/:id').get((req, res) => {
    res.json(db.concerts.find((data) => data.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newConcerts = { id: id, author: author, text: text };
    db.concerts.push(newConcerts);
    res.json({ message: 'ok!' });
});

router.route('/concerts/:id').put((req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const concerts = db.concerts.find((data) => data.id === id);
    const index = db.concerts.indexOf(concerts);
    const changeConcerts = {
        id: id,
        author: author,
        text: text,
    };
    db.concerts[index] = changeConcerts
    res.json({ message: 'ok!' });    },
);

router.route('/concerts/:id').delete((req, res) => {
    const element = db.concerts.find((data) => data.id == req.params.id);
    const index = db.concerts.indexOf(element);

    db.concerts.splice(index, 1);
    res.json({ message: 'ok' });
});

module.exports = router;