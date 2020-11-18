// @flow
import React from "react"
import "./App.css";
import { Link } from "react-router-dom"
import BookShelf from "./BookShelf"
import * as BooksAPI from "./BooksAPI"


class ListBooks extends React.Component {
  state = {};

  handleChangeBookShelf = (bookId: int, e: any) => {
    const books = this.props.booksOnShelf;
    const book = books.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: books
      });
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            key="currently"
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.handleChangeBookShelf}
            shelftitle="Currently Reading"
          />
          <BookShelf
            key="wantToRead"
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.handleChangeBookShelf}
            shelftitle="Want to Read"
          />
          <BookShelf
            key="read"
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.handleChangeBookShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
export default ListBooks;
