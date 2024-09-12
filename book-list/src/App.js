import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './BookForm';
import BookList from './BookList';
import './App.css';

const App = () => {
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch all books from the database
    const fetchBooks = async () => {
        try {
            const res = await axios.get('http://localhost:5000/books');
            setBooks(res.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const editBook = (book) => {
        setCurrentBook(book);
        setIsEditing(true);
    };

    // Fetch books when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []); // Empty dependency array means this runs only once when the component mounts

    return (
        <div className="container">
            <h1>Book Management</h1>
            <BookForm addOrEditBook={setCurrentBook} currentBook={currentBook} isEditing={isEditing} fetchBooks={fetchBooks} />
            <BookList books={books} editBook={editBook} fetchBooks={fetchBooks} />
        </div>
    );
};

export default App;
