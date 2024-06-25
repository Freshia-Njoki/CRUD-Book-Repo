import React, { useRef } from 'react';
import { Book } from '../interface';
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
        <form onSubmit={handleSubmit} className='max-w-lg mx-auto my-8 p-4 shadow-lg rounded-lg'>
            <input ref={titleRef} type="text" placeholder="Title" required />
            <input ref={authorRef} type="text" placeholder="Author" required />
            <input ref={yearRef} type="text" placeholder="Publication Year" required />
            <button type="submit">Add Book</button>
        </form>
    );
};
