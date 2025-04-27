import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');

  // Отримуємо всі унікальні жанри
  const allGenres = ['all', ...new Set(movies.map(movie => movie.genre))];
  
  // Отримуємо всі унікальні дати (без часу)
  const allDates = ['all', ...new Set(movies.map(movie => {
    const date = new Date(movie.sessionTime);
    return date.toISOString().split('T')[0]; // Форматуємо як YYYY-MM-DD
  }))];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || movie.genre === selectedGenre;
    
    const movieDate = new Date(movie.sessionTime).toISOString().split('T')[0];
    const matchesDate = selectedDate === 'all' || movieDate === selectedDate;
    
    return matchesSearch && matchesGenre && matchesDate;
  });

  return (
    <div className="movie-list-container">
      <div className="filters-container">
        <input
          type="text"
          placeholder="Пошук фільмів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-select"
        >
          {allGenres.map(genre => (
            <option key={genre} value={genre}>
              {genre === 'all' ? 'Всі жанри' : genre}
            </option>
          ))}
        </select>
        
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-select"
        >
          {allDates.map(date => (
            <option key={date} value={date}>
              {date === 'all' ? 'Всі дати' : new Date(date).toLocaleDateString('uk-UA')}
            </option>
          ))}
        </select>
      </div>
      
      {filteredMovies.length === 0 ? (
        <div className="no-results">Фільмів не знайдено</div>
      ) : (
        <div className="movie-list">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      sessionTime: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MovieList;