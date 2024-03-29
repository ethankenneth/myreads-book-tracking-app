import React from 'react'
import {Route} from 'react-router-dom'
import BookList from './BookList'
import './App.css'
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";


class App extends React.Component {

  state = {
    books:[],
    updateCount:0
  }// End state

  updateBookInfo = () => {
    BooksAPI.getAll().then((books) =>{
      this.setState({books})
      this.setState( prevState => ({
        updateCount:prevState.updateCount + 1
      })
      )
    })
  }// End updateBookInfo

  componentDidMount() {
    BooksAPI.getAll().then((books) =>{
      this.setState({
        books:books,
      })
    })
  }// End componentDidMount

  render() {
    return (<div className="app">
        <Route exact path="/" render={() => {
          return (
              <BookList books={this.state.books} updateBookInfo={this.updateBookInfo}/>)
        }}/>
        <Route path="/search" render={() => {
          return (
              <BookSearch updateBookInfo={this.updateBookInfo}/>)
        }}/>
      </div>)
  }// End render
}// End class App extends React.Component

export default App
