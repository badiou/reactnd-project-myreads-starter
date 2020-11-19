import React from "react";
import { Route } from "react-router-dom";
import ListofBooks from "./ListofBooks";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./SearchPage";



class BooksApp extends React.Component {
  state = {
    books: []
  };
  handleChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getAllBooks();
    });
  };
  getAllBooks() {
    BooksAPI.getAll()
    .then(data => {
      this.setState({
        books: data
      });
    });
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then(data => {
      this.setState({
        books: data
      });
    });
  }

  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListofBooks booksOnShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchPage onChangeShelf={this.handleChange} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
