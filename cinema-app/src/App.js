import React from 'react';
import { movies } from './data/movies';
import MovieList from './components/MovieList';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Кінотеатр "Синема"</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;