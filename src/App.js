import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import mainImg from './assets/books.jpg';
import logo from './assets/logo.png';
function App() {

  const [result, setResult] = useState([]);
  const [book, setBook] = useState("");
  const [apiKey, setApiKey] = useState("AIzaSyBQUMhzPEVpfEA613Y_2V1iLYOEMrvczmY");


 
  function handleChange(event){
    const book = event.target.value;
  
    setBook(book);
  }
  function handleSubmit(event){
    event.preventDefault();
  
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${book}&key=${apiKey}&maxResults=30`)
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
      <img src={logo} />
      </div>
      <p>
      Book finder
      </p>
      </div>
    </header>
    <div className="container">
    <div className="content main d-flex align-items-center justify-content-center">
          <div className="text">
              <div className="introduction-title"><span>Lorem Ipsum</span></div>
              <div className="introduction-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur sit amet odio et ligula volutpat eleifend.
                  Donec ex magna, rutrum et sagittis quis, volutpat in nunc.</div>
          </div>
          <div className="book-img ">
              <img src={mainImg} />
          </div>
       
      
      </div>
  
      <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="d-flex flex-row">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" autoComplete="off" onChange={handleChange}/>
              </div>
              <button type="submit" className="btn btn-danger">Search</button>
            </form>
          </div>
          <div className="row results">
            {result.map(book => (
              <div className="col-3 book-item">
              <a href={book.volumeInfo.previewLink} target="_blank" >
              <img  src={book.volumeInfo.imageLinks === undefined
                ? ""
                : `${book.volumeInfo.imageLinks.thumbnail}`} alt={book.title} />
                </a>
                <p>{book.volumeInfo.title}</p>
                <p>{book.volumeInfo.authors}</p>
                {/* <p>{book.volumeInfo.description}</p> */}
                </div>
            ))}
          </div>
  </div>

  </div>
  );
}

export default App;
