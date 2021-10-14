import React from 'react';

import Container from './components/container/container';
import AuthorsList from './components/author-list/author-list';
import BookList from './components/book-list/book-list';
import Facets from './components/facets/facets';
import Spinner from './components/spinner/spinner';

import { useBook } from './context/books-context';

import './App.css';

function App() {

  const { authors, books, loading } = useBook()

  if (loading) {
    return <Spinner />;
  }
  const showBooks = books && books.length > 0;
  return (
    <div className="App">
      <p>DELETE BOOKS FOR FUN!</p>
      <Container>
        {<Facets />}
        {!showBooks && <AuthorsList authors={authors} />}
        {showBooks && <BookList />}
      </Container>
    </div>
  );
}

export default App;
