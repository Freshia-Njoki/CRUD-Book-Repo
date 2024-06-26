import React, { useState, useEffect, useCallback } from 'react';
import { BookForm } from './BookForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Book, Action } from '../interfaces';

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
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Book>({ id: '', title: '', author: '', year: '' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const booksPerPage = 5;

  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setEditFormData({ ...editFormData, [fieldName]: fieldValue });
  };

  const handleEditClick = (book: Book) => {
    setEditBookId(book.id);
    setEditFormData(book);
  };

  const handleCancelClick = () => {
    setEditBookId(null);
  };

  const handleSaveClick = () => {
    dispatch({ type: 'UPDATE_BOOK', book: editFormData });
    setEditBookId(null);
  };

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', book });
  };

  const removeBook = (id: string) => {
    dispatch({ type: 'REMOVE_BOOK', id });
  };

  const handlePageChange = useCallback((direction: 'next' | 'prev') => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return prevPage + 1;
      } else {
        return prevPage - 1;
      }
    });
  }, []);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <BookForm addBook={addBook} />
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="max-w-lg mx-auto my-8 divide-y divide-gray-200">
        {currentBooks.map(book => (
          <li key={book.id} className="flex justify-between items-center p-4 bg-white">
            {editBookId === book.id ? (
              <div>
                <input type="text" name="title" value={editFormData.title} onChange={handleEditFormChange} className="p-1 border border-gray-300 rounded mb-1"/>
                <input type="text" name="author" value={editFormData.author} onChange={handleEditFormChange} className="p-1 border border-gray-300 rounded mb-1"/>
                <input type="text" name="year" value={editFormData.year} onChange={handleEditFormChange} className="p-1 border border-gray-300 rounded mb-1"/>
              </div>
            ) : (
              <span>{book.title} by {book.author}, {book.year}</span>
            )}
            {editBookId === book.id ? (
              <div>
                <button onClick={handleSaveClick} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded mr-2">Save</button>
                <button onClick={handleCancelClick} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded">Cancel</button>
              </div>
            ) : (
              <div>
                <button onClick={() => handleEditClick(book)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">Edit</button>
                <button onClick={() => removeBook(book.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-between max-w-lg mx-auto">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
          Previous
        </button>
        <button onClick={() => handlePageChange('next')} disabled={currentBooks.length < booksPerPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
          Next
        </button>
      </div>
    </>
  );
};
