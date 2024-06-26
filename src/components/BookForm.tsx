import React, { useRef } from 'react';
import { Book } from '../interfaces';

interface BookFormProps {
  addBook: (book: Book) => void;
}

export const BookForm: React.FC<BookFormProps> = ({ addBook }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: Book = {
      id: Date.now().toString(),
      title: titleRef.current!.value,
      author: authorRef.current!.value,
      year: yearRef.current!.value,
    };
    addBook(newBook);
    titleRef.current!.value = '';
    authorRef.current!.value = '';
    yearRef.current!.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <input ref={titleRef} className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Title" required />
      </div>
      <div className="mb-4">
        <input ref={authorRef} className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Author" required />
      </div>
      <div className="mb-4">
        <input ref={yearRef} className="w-full p-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Publication Year" required />
      </div>
      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Book
      </button>
    </form>
  );
};
