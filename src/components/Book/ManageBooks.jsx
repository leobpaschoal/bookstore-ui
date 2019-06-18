import React, { Component } from 'react';
import api from '../../client';
import { error, information, success } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Divider, Button } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import BookFilter from './BookFilter';
import BooksTable from './BooksTable';
import BookEdit from './BookEdit';
import BookInformation from './BookInformation';

class ManageBooks extends Component {
  state = {
    books: [],
    genres: [],
    filteredBooks: [],
    inputAuthor: '',
    inputTitle: '',
    inputIsbn: '',
    inputGenres: [],
    quantity: 0,
    recordedBook: {},
    bookManageVisible: false,
    hasBook: false,
    isLoading: false,
    isEditingLoading: false,
    isStockLoading: false
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await this.loadBooksAndGenres();
    this.setState({ isLoading: false });
  };

  loadBooksAndGenres = async () => {
    let hasError = false;
    await api()
      .get('books')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({
            books: resp.data,
            filteredBooks: resp.data
          });
        } else {
          error(resp.message);
          hasError = true;
        }
      })
      .catch(() => {
        error(messages.errorMessage);
        hasError = true;
      });

    if (hasError) {
      return false;
    }

    await api()
      .get('genres')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({
            genres: resp.data
          });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
  };

  onStock = async (id, quantity) => {
    this.setState({ isStockLoading: true });
    await api()
      .post(`stock-quantity`, { id, quantity })
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.updateBooks(resp.data, false);
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isStockLoading: false });
  };

  onDelete = async bookId => {
    this.setState({ isLoading: true });
    await api()
      .post(`delete-book`, { bookId: bookId })
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          success(resp.message);
          this.setState({
            books: this.state.books.filter(book => (book.id === bookId ? false : true)),
            filteredBooks: this.state.filteredBooks.filter(book => (book.id === bookId ? false : true))
          });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isLoading: false });
  };

  updateBooks = async (data, newBook) => {
    if (newBook) {
      this.setState({ isLoading: true });
      await this.loadBooksAndGenres();
      this.setState({ isLoading: false });
    } else {
      this.setState({
        books: this.state.books.map(book => (book.id === data.id ? { ...data } : book)),
        filteredBooks: this.state.filteredBooks.map(book => (book.id === data.id ? { ...data } : book))
      });
    }
  };

  handleInformation = async book => {
    this.setState({ isLoading: true });
    await api()
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}`)
      .then(response => {
        if (response.data.totalItems !== 0) {
          information(<BookInformation bookApi={response.data.items[0].volumeInfo} book={book} />);
        } else {
          error(`ISBN ${book.isbn} not found. Get other ISBN to bring more information of this book!`);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isLoading: false });
  };

  handleQuantity = value => {
    this.setState({ quantity: value });
  };

  handleManageBook = (book, hasBook) => {
    this.setState({ bookManageVisible: true, recordedBook: book, hasBook });
  };

  handleCloseBookManage = () => {
    this.setState({ bookManageVisible: false });
  };

  handleEditingLoading = () => {
    this.setState({ isEditingLoading: true });
  };

  finishEditingLoading = () => {
    this.setState({ isEditingLoading: false });
  };

  filterByAuthor = value => {
    this.setState({
      inputAuthor: value,
      filteredBooks: this.state.books.filter(book => book.author.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    });
  };

  filterByTitle = value => {
    this.setState({
      inputTitle: value,
      filteredBooks: this.state.books.filter(book => book.title.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    });
  };

  filterByIsbn = value => {
    this.setState({
      inputIsbn: value,
      filteredBooks: this.state.books.filter(book => book.isbn.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    });
  };

  filterByGenres = value => {
    this.setState({ inputGenres: value });
    const { books } = this.state;

    if (value.length === 0) {
      this.setState({ filteredBooks: books });
    } else {
      this.setState({
        filteredBooks: books.filter(book => {
          let isFilter = false;
          let genreNames = [];
          if (book.genres.length > 0) {
            book.genres.forEach(genre => {
              genreNames.push(genre.name);
            });
            value.forEach(element => {
              if (genreNames.indexOf(element) !== -1) {
                isFilter = true;
              }
            });
          }
          return isFilter;
        })
      });
    }
  };

  render() {
    const {
      filteredBooks,
      quantity,
      inputAuthor,
      inputTitle,
      inputIsbn,
      inputGenres,
      genres,
      recordedBook,
      bookManageVisible,
      hasBook,
      isLoading,
      isEditingLoading,
      isStockLoading
    } = this.state;
    return (
      <LoadingOverlay active={isLoading} spinner text="Loading...">
        <BookEdit
          recordedBook={recordedBook}
          bookManageVisible={bookManageVisible}
          isEditingLoading={isEditingLoading}
          handleCloseBookManage={this.handleCloseBookManage}
          handleEditingLoading={this.handleEditingLoading}
          finishEditingLoading={this.finishEditingLoading}
          hasBook={hasBook}
          updateBooks={this.updateBooks}
          cleanAllFilters={this.cleanAllFilters}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <h1>Books</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={() => this.handleManageBook({}, false)}>
            Create new book
          </Button>
        </div>
        <Divider> Filters </Divider>
        <BookFilter
          filterByAuthor={this.filterByAuthor}
          filterByTitle={this.filterByTitle}
          filterByIsbn={this.filterByIsbn}
          filterByGenres={this.filterByGenres}
          inputAuthor={inputAuthor}
          inputTitle={inputTitle}
          inputIsbn={inputIsbn}
          inputGenres={inputGenres}
          genres={genres}
        />
        <Divider> Book's table </Divider>
        <BooksTable
          handleInformation={this.handleInformation}
          handleQuantity={this.handleQuantity}
          handleManageBook={this.handleManageBook}
          onDelete={this.onDelete}
          onStock={this.onStock}
          filteredBooks={filteredBooks}
          quantity={quantity}
          isStockLoading={isStockLoading}
        />
        {filteredBooks.length >= 10 ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button type="primary" onClick={() => this.handleManageBook({}, false)}>
              Create new book
            </Button>
          </div>
        ) : (
          ''
        )}
      </LoadingOverlay>
    );
  }
}

export default ManageBooks;
