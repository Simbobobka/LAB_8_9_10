import React from 'react';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';

const Home = () => {
  return (
    <div className="app">
      <h1 className="app-title">LNU Ciname 🎬</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;