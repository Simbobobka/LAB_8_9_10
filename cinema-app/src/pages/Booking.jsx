import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';

const Booking = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const foundMovie = movies.find(m => m.id === parseInt(movieId));
    setMovie(foundMovie);
  }, [movieId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  if (!movie) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="booking-page">
      <h2>Бронювання квитків на фільм: {movie.title}</h2>
      <p>Сеанс: {new Date(movie.sessionTime).toLocaleString('uk-UA')}</p>
      
      <CinemaHall 
        selectedSeats={selectedSeats} 
        onSeatSelect={handleSeatSelect} 
      />
      
      {selectedSeats.length > 0 && (
        <div className="selected-seats">
          <h3>Вибрані місця: {selectedSeats.join(', ')}</h3>
          <button className="confirm-button">Підтвердити бронювання</button>
        </div>
      )}
    </div>
  );
};

export default Booking;