import './App.scss';
import React, { useState, useEffect } from "react";
import axios from "axios";
import mainImg from './assets/books.jpg';

function App() {

  const [result, setResult] = useState([]);
  const [book, setBook] = useState("");
  const [apiKey, setApiKey] = useState("");


 
  function handleChange(event){
    const book = event.target.value;
  
    setBook(book);
  }
  function handleSubmit(event){
    event.preventDefault();
  
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxResults=30`)
    .then(data => {
      console.log(data.data.items);
     setResult(data.data.items);
    })

  }
  
  return (
    <div className="App">
    <header className="header-app">
      <div class="container">
      <div className="logo-wrapper">
      <div>Book<span>Finder</span></div>
      </div>
      <ul class="main-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Contact</a></li>
      </ul>
      </div>
    </header>
    <div className="container">
    <div className="content main d-flex align-items-center justify-content-center">
 
          <div className="text">
              <div className="introduction-title"><span>BookFinder</span></div>
              <div className="introduction-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur sem nec imperdiet volutpat. Morbi rutrum sollicitudin aliquam. Nam ullamcorper nibh sed sapien semper, vel efficitur justo rutrum. Morbi ultricies libero quis dapibus posuere.  </div>
              <div><a href="#section-search" class="btn btn-primary">Search</a></div>
          </div>
          <div className="book-img ">
              <img src={mainImg} />
          </div>  
      </div>
      {/* I need to do something about this section.. */}
      <div id="section-search">
        <div class="search-heading d-flex flex-row">
      <div className="form-wrapper mb-4">
            <form onSubmit={handleSubmit} className="d-flex flex-row">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" autoComplete="off" onChange={handleChange}/>
              </div>
              {/* Should eventually switch to icons.. */}
              <button type="submit" className="btn btn-primary">S</button>
            </form>
          </div>
          <div class="show-as d-flex">
           <p class="active">List</p>
           <p>Cards</p>
          </div>
          </div>
          <div className="row results">
            {result.map(book => (
              <div className="col-3 book-item">
              <a href={book.volumeInfo.previewLink} target="_blank"  rel="noreferrer" >
              <img  src={book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                </a>
                <p>{book.volumeInfo.title}</p>
              
                </div>
            ))}
          </div>
  </div>
  </div>
  </div>
  );
}

export default App;
