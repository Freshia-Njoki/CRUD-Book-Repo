import './index.css';
import { BookList } from './components/BookList';

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">Book Repository</h1>
      </header>
      <main>
        <BookList />
      </main>
    </div>
  );
};

export default App;
