const express = require('express');
const path = require('path');
const cors = require('cors');
const uuid = require('uuid').v4;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  ];


app.get('/testimonials', (req, res) => {
    res.json(db);  
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.find((data) => data.id == req.params.id));
});

app.get('/testimonials/random', (req, res) => {
    res.json(db);  
});

app.post('/testimontials', (req, res) => {
    const { author, text } = req.body;
    const id = uuid();
    const newTestimonial = { id: id, author: author, text: text };
    db.push(newTestimonial);
    res.json({ message: 'ok!' });
});

app.put('/testimontials/:id',(req, res) => {
        const { author, text } = req.body;
        const id = +req.params.id;
        const testimonial = db.find((testimonial) => testimonial.id === id);
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'ok!' });    },
    (err) => {
        console.log(err);
    }
);

app.delete('/testimontials/:id',(req, res) => {
        const id = +req.params.id;
        db.splice(
            db.findIndex((testimonial) => testimonial.id === id),
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