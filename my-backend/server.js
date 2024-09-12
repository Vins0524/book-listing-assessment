const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // To allow cross-origin requests
app.use(express.json()); // To parse JSON data

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL root password
    database: 'book-management'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Get all books
app.get('/books', (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Add a new book
app.post('/books', (req, res) => {
    const newBook = req.body;
    const query = 'INSERT INTO books SET ?';
    db.query(query, newBook, (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...newBook });
    });
});

// Update a book
app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    const updatedBook = req.body;
    const query = 'UPDATE books SET ? WHERE id = ?';
    db.query(query, [updatedBook, id], (err) => {
        if (err) throw err;
        res.send({ id, ...updatedBook });
    });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, id, (err) => {
        if (err) throw err;
        res.send({ message: 'Book deleted' });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});