
import {BookList} from './components/bookList/BookList';
// import Book from "./components/CRUD-Book/Book"

const App: React.FC = () => {
    return (
        <div >
            <header className=''>
                <h1 >Book Repository</h1>
            </header>
            <main>
                <BookList />
                {/* <Book /> */}
            </main>
        </div>
    );
};

export default App;

