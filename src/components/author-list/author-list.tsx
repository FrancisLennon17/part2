

import React from 'react';

import { useBook } from '../../context/books-context';

import './author-list.css';

export const AuthorsList = ({ authors }: { authors: string[] }) => {

  const { getBooksByAuthor } = useBook();

  if (authors.length === 0) {
    return (<div>There are currently no authors in the app.</div>)
  }

  return (<>
    <div>Please select an author to view their books, then you can experience the fun of deleting their books:</div>
    <ul className="author-list">
      {authors.map((author: string, id: number) =>
        <li key={`author_${id}`}
          onClick={() =>
            getBooksByAuthor(author)}>{author}</li>)}
    </ul>
  </>);
}

export default AuthorsList;
