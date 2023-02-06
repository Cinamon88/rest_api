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


app.use((req, res) => {
    res.status(404).send('Not found...');
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});