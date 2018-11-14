import React,{Component} from 'react'
import * as BooksAPI from "./BooksAPI";
import Book from './Book'
import {Link} from "react-router-dom"
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp';

class BookSearch extends Component{
  state = {
    books:[],
    searchingBooks:[],
    query:'',
  }// End state

/*  Does the search page have a search input that lets users search for books?
    Do the search results allow a user to categorize a book as “currently reading”, “want to read”, or “read”?
*/
  searchingBooks = {}
  bookQuery = (e) => {
    const match = new RegExp(escapeRegExp(e.target.value),'i')
    if(match.test(e.target.value)){
      this.setState({query:e.target.value})
      BooksAPI.search(e.target.value).then(searchingBooks => {
        if(Array.isArray(searchingBooks)) {
          this.searchingBooks = searchingBooks
          if (this.searchingBooks !== undefined && this.searchingBooks instanceof Array){
            for(const searchingBook of this.searchingBooks){
              let flag = 0
              for(const book of this.state.books){
                if (searchingBook.id === book.id) {
                  searchingBook.shelf = book.shelf
                  flag = 1
                }// End if (searchingBook.id === book.id)
              }// End for(const book of this.state.books)
              if(flag === 0){
                searchingBook.shelf = 'none'
              }// End if(flag === 0)
            }// End for(const searchingBook of this.searchingBooks)
            this.setState({
              searchingBooks:this.searchingBooks
            })// End this.setState
          }// End if (this.searchingBooks !== undefined && this.searchingBooks instanceof Array)
        }else {
          this.setState({searchingBooks:[]})
        }// End else
      })// End BooksAPI.search
    }// End if(match.test(e.target.value))
  }// End bookQuery

  componentDidMount(){
    BooksAPI.getAll().then(books =>{
      this.setState({books})
    })// End BooksAPI.getAll
    this.searchingBooks = this.state.searchingBooks
  }// End componentDidMount

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="400" handler="onChange">
            <input type="text" placeholder="Search by title or author" onChange={this.bookQuery}/>
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchingBooks.map(searchingBook => (
              <Book key={searchingBook.id} book={searchingBook} updateBookInfo={this.props.updateBookInfo} />
            ))}
          </ol>
        </div>
      </div>)
    }// End render
}// End class BookSearch extends Component

export default BookSearch
