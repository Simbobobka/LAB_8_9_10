import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      weekday: 'short' 
    };
    return new Date(dateString).toLocaleDateString('uk-UA', options);
  };

  const handleBookClick = () => {
    navigate(`/booking/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
        <div className="movie-footer">
          <p className="movie-session">Сеанс: {formatDate(movie.sessionTime)}</p>          
        </div>
        <button onClick={handleBookClick} className="book-button">
            Забронювати
        </button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    sessionTime: PropTypes.string.isRequired
  }).isRequired
};

export default MovieCard;