import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookList.css'; // Make sure to create this CSS file for styling

const BookList = ({ editBook, fetchBooks }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooksData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error.response ? error.response.data : error.message);
            }
        };

        fetchBooksData();
    }, []);

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <div className="book-list-container">
            <h2>Book List</h2>
            {books.length === 0 ? (
                <p className="no-books">No books available</p>
            ) : (
                <div className="book-list">
                    {books.map((book) => (
                        <div className="book-card" key={book.id}>
                            <h3 className="book-title">{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>ISBN:</strong> {book.isbn}</p>
                            <p><strong>Published Date:</strong> {book.publishedDate}</p>
                            <p><strong>Genre:</strong> {book.genre}</p>
                            <div className="buttons">
                                <button className="edit-button" onClick={() => editBook(book)}>Edit</button>
                                <button className="delete-button" onClick={() => deleteBook(book.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BookList;
