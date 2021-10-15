import React, { useState } from "react";

export interface Book {
  title: string;
  isbn: string;
  author: string;
  subtitle: string;
  published: string; // for now...
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

const apiUrl = `${
  process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : "http://localhost:7000/api/v1/"
}`;

interface BookContextInterface {
  books: Book[];
  authors: string[];
  loading: boolean;
  getBooksByAuthor(author: string): Promise<void>;
  resetSearch(): void;
  stageBookDelete(isbn: string | null): void;
  stagedDeleteIsbn: string | null;
  deleteBook(isbn: string): Promise<void>;
}

interface PropsInterface {
  children: React.ReactNode;
}

const BookContext = React.createContext({} as BookContextInterface);

function BooksProvider(props?: PropsInterface): JSX.Element {
  const [books, setBooks] = useState([] as Book[]);
  const [authors, setAuthors] = useState([] as string[]);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [stagedDeleteIsbn, setStageDeleteIsbn] = useState<string | null>(null);

  const getAuthors = async (): Promise<void> => {
    setLoading(true);
    try {
      const authorsResponse = await fetch(`${apiUrl}authors`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const newAuthors = await authorsResponse.json();
      setAuthors(newAuthors);
    } catch (e) {
      alert(
        'Error connecting to the server - please check your connection or moan at us on Twitter.'
      );
    }
    setLoading(false);
  };

  const stageBookDelete = (isbn: string | null): void => {
    setStageDeleteIsbn(isbn);
  };

  const getBooksByAuthor = async (author: string): Promise<void> => {
    setLoading(true);
    try {
      console.log('this bit')
      const booksByAuthorResponse = await fetch(
        `${apiUrl}books/${encodeURIComponent(author)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const booksByAuthor: Book[] = await booksByAuthorResponse.json();
      console.log('booksByAuthor', booksByAuthor);
      setBooks(booksByAuthor);
    } catch (e) {
      alert(
        'Error connecting to the server - please check your connection or moan at us on Twitter.'
      );
    }
    setLoading(false);
  };

  const deleteBook = async (isbn: string) => {
    setLoading(true);
    try {
      const deleteRequest = await fetch(`${apiUrl}book/${isbn}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!(deleteRequest.status === 200 || deleteRequest.status === 204)) {
        return alert("Something went wrong trying to delete this book");
      }

      // reload the author's book list if they have more than one book
      if (Array.isArray(books) && books.length > 1) {
        const bookToDelete = books.find((book) => book.isbn === isbn);
        if (bookToDelete) {
          getBooksByAuthor(bookToDelete.author);
        }
      } else {
        setBooks([] as Book[]);
      }
      getAuthors();
      stageBookDelete(null);
    } catch (e) {
      alert(
        'Error connecting to the server - please check your connection or moan at us on Twitter.'
      );
    }
    setLoading(false);
  };

  const resetSearch = () => {
    setBooks([] as Book[]);
  };

  if (firstLoad) {
    setLoading(true);
    getAuthors();
    setFirstLoad(false);
  }

  return (
    <BookContext.Provider
      value={{
        books,
        authors,
        loading,
        getBooksByAuthor,
        resetSearch,
        stageBookDelete,
        stagedDeleteIsbn,
        deleteBook,
      }}
      {...props}
    />
  );
}

const useBook = (): BookContextInterface => React.useContext(BookContext);

export { BooksProvider, useBook };
