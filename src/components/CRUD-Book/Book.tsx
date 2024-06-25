import { useRef } from "react";
type Books = {
  title:string,
  author:string,
  publicationYear: number
}

function Book() {
  const booksArray: Books[] = [
    {
      title:"The teens",
      author:"Freshia",
      publicationYear:2021
    },
    {
      title:"The teens",
      author:"Freshia",
      publicationYear:2021
    },
    {
      title:"The teens",
      author:"Freshia",
      publicationYear:2021
    },
    {
      title:"The teens",
      author:"Freshia",
      publicationYear:2021
    },
      
  ]
  const booksToStore = JSON.stringify(booksArray);
  localStorage.setItem("books", booksToStore);

  const storedBooks = localStorage.getItem("books");
  let books: Books[] = [];
  if (storedBooks !== null) books = JSON.parse(storedBooks) as Books[]

  
  const storeBook = () => {
    const ref = useRef([])
    ref.current = storeBook
    alert(bookItem)
  }
  return (
    <>
    <form className="form" onSubmit={storeBook}>
      <input type="text" placeholder="Book Title" />
      <input type="text" placeholder="Author" />
      <input type="number" placeholder="Publication Year" />
      <button type="submit">Add Book to Repo</button>
    </form>
    </>
  )
}

export default Book