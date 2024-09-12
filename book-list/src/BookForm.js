import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ addOrEditBook, currentBook, isEditing, fetchBooks }) => {
    const [book, setBook] = useState({ title: '', author: '', isbn: '', publishedDate: '', genre: '' });

    useEffect(() => {
        if (isEditing && currentBook) {
            setBook(currentBook);
        }
    }, [currentBook, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (book.title && book.author && book.isbn && book.publishedDate && book.genre) {
            try {
                if (isEditing) {
                    await axios.put(`http://localhost:5000/books/${book.id}`, book);
                } else {
                    await axios.post('http://localhost:5000/books', book);
                }
                fetchBooks(); // Refresh the book list after submitting the form
                setBook({ title: '', author: '', isbn: '', publishedDate: '', genre: '' });
                addOrEditBook(book); // Reset editing state
                
                // Refresh the page
                window.location.reload();
            } catch (error) {
                console.error('Error submitting book:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} required />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} required />
            </div>
            <div>
                <label>ISBN:</label>
                <input type="text" value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} required />
            </div>
            <div>
                <label>Published Date:</label>
                <input type="number" value={book.publishedDate} onChange={(e) => setBook({ ...book, publishedDate: e.target.value })} required />
            </div>
            <div>
                <label>Genre:</label>
                <input type="text" value={book.genre} onChange={(e) => setBook({ ...book, genre: e.target.value })} required />
            </div>
            <button type="submit">{isEditing ? 'Update Book' : 'Add Book'}</button>
        </form>
    );
};

export default BookForm;
