const express = require('express');
const uuid = require('uuidv4')
const db = require('../db');

const router = express.Router();

router.route('/seats').get((req, res) => {
    res.json(db.seats);  
});

router.route('/seats/random').get((req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);  
});

router.route('/seats/:id').get((req, res) => {
    res.json(db.seats.find((seat) => seat.id == req.params.id));
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = uuid();
    const newSeats = { id: id, day, seat, client, email };
    if(db.seats.some((checkSeat) => checkSeat.day == newSeats.day && checkSeat.seat == newSeats.seat)) {
        res.json({ message: 'The slot is already taken' });
        res.status(409).json({ message: 'The slot is already taken!'});
    } else {
        db.seats.push(newSeats);
        res.json({ message: 'ok!' });
    }
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const id = +req.params.id;
    const seats = db.seats.find((seat) => seat.id === id);
    seats.day = day;
    seats.seat = seat;
    seats.client = client;
    seats.email = email;
    res.json({ message: 'ok!' });    
    },
    (err) => {
        console.log(err);
    }
);

router.route('/seats/:id').delete((req, res) => {
        const id = +req.params.id;
        db.seats.splice(
            db.seats.findIndex((seat) => seat.id === id),
            1 
        );
        res.json({ message: 'deleted' });
    },
    (err) => {
        console.log(err);
    }
);

module.exports = router;