export interface Book {
    id: string;
    title: string;
    author: string;
    year: string;
  }
  
  export type Action =
    | { type: 'ADD_BOOK'; book: Book }
    | { type: 'REMOVE_BOOK'; id: string }
    | { type: 'UPDATE_BOOK'; book: Book };
  