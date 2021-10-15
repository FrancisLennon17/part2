import { useBook } from '../../context/books-context';
import TrashCan from '../../icons/trash-can';

import './book-list.css';

export const BookList = () => {

  const { books, stageBookDelete, stagedDeleteIsbn, deleteBook } = useBook();

  return (<>
    <ul className="book-list">
      {books.map(({ title, isbn, subtitle }) =>
        <li key={`book_${isbn}`}>
          {(stagedDeleteIsbn !== isbn) &&
            <>
              <span className="title">{title}</span>
              {subtitle && <>: <span className="subtitle">{subtitle}</span></>}
              <button className="delete" onClick={() => stageBookDelete(isbn)}>
                <TrashCan className="delete" />
              </button></>}
          {stagedDeleteIsbn === isbn && <>
          <button className="confirm-delete" onClick={() => 
            deleteBook(isbn)}>Confirm delete "{title}"?
            </button>
             or  
             <button className="cancel-delete" onClick={() => stageBookDelete(null)}>
              Keep it
            </button>
          </>}
        </li>)}
    </ul>
  </>);
}

export default BookList;
