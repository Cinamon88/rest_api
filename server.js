const express = require('express');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid').v4;

const db = require('./db.js')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);  
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.find((data) => data.id == req.params.id));
});

app.get('/concerts', (req, res) => {
    res.json(db.concerts);  
});

app.get('/concerts/:id', (req, res) => {
    res.json(db.concerts.find((data) => data.id == req.params.id));
});

app.get('/seats', (req, res) => {
    res.json(db.seats);  
});

app.get('/seats/:id', (req, res) => {
    res.json(db.seats.find((data) => data.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials);  
});

app.post('/testimontials', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author: author, text: text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'ok!' });
});

app.post('/concerts', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newConcerts = { id: id, author: author, text: text };
    db.concerts.push(newConcerts);
    res.json({ message: 'ok!' });
});

app.post('/seats', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newSeats = { id: id, author: author, text: text };
    db.seats.push(newSeats);
    res.json({ message: 'ok!' });
});

app.put('/testimontials/:id',(req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimonial = db.testimonials.find((testimonial) => testimonial.id === id);
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);

app.put('/concerts/:id',(req, res) => {
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

app.put('/seats/:id',(req, res) => {
    const { author, text } = req.body;
    const id = +req.params.id;
    const seats = db.seats.find((data) => data.id === id);
    const index = db.seats.indexOf(seats);
    const changeSeats = {
        id: id,
        author: author,
        text: text,
    };
    db.seats[index] = changeSeats
    res.json({ message: 'ok!' });    },
);

app.delete('/testimontials/:id',(req, res) => {
        const id = +req.params.id;
        db.testimonials.splice(
            db.testimonials.findIndex((testimonial) => testimonial.id === id),
            1
        );
        res.json({ message: 'deleted' });
    },
    (err) => {
        console.log(err);
    }
);

app.delete('/concerts/:id',(req, res) => {
    const element = db.concerts.find((data) => data.id == req.params.id);
    const index = db.concerts.indexOf(element);

    db.concerts.splice(index, 1);
    res.json({ message: 'ok' });
});

app.delete('/seats/:id',(req, res) => {
    const element = db.seats.find((data) => data.id == req.params.id);
    const index = db.seats.indexOf(element);

    db.seats.splice(index, 1);
    res.json({ message: 'ok' });
});


app.use((req, res) => {
    res.status(404).send('Not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});