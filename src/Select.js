import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'

class Select extends Component {

  state ={
    shelf:'none'
  }// End state

  componentDidMount(){
    this.setState({shelf:this.props.book.shelf})
  }// End componentDidMount

  /*  Does the main page show three categories (or “bookshelves”) for books (currently reading, want to read, and read)?
      Does the main page allow users to move books between shelves?
  */
  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.shelf} onChange={(e)=> {
          BooksAPI.update(this.props.book, e.target.value).then(()=>
                this.props.updateBookInfo()
          )
          this.setState({shelf:e.target.value})
        }}>
          <option value="never" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }// End render
}// End class Select extends Component

export default Select
