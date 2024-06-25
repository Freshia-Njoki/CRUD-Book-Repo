import React from 'react';
import { BookForm } from '../bookForm/BookForm';
import { useLocalStorage } from '../useLocalStorage';
import { Book, Action } from '../interface';

const bookReducer = (state: Book[], action: Action): Book[] => {
    switch (action.type) {
        case 'ADD_BOOK':
            return [...state, action.book];
        case 'REMOVE_BOOK':
            return state.filter(book => book.id !== action.id);
        case 'UPDATE_BOOK':
            return state.map(book => book.id === action.book.id ? action.book : book);
        default:
            return state;
    }
};

export const BookList: React.FC = () => {
    const [books, dispatch] = useLocalStorage<Book[]>('books', bookReducer, []);

    const addBook = (book: Book) => {
        dispatch({ type: 'ADD_BOOK', book });
    };

    const removeBook = (id: string) => {
        dispatch({ type: 'REMOVE_BOOK', id });
    };

    return (
        <>
            <BookForm addBook={addBook} />
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}, {book.year}
                        <button onClick={() => removeBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    );
};
