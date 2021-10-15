

import React from 'react';

import { useBook } from '../../context/books-context';
import Cross from '../../icons/cross';

import './facets.css';

export const Facets = () => {

    // three main modes - nothing, an author, a book by an author
    const { books, resetSearch } = useBook();

    return (<>
        <ul className="facets">
            {books?.length > 0 && <li>{books[0].author} <span className="remove" onClick={() => resetSearch()}> <Cross width="10px" height="10px" /></span></li>}
        </ul>
    </>);
}

export default Facets;