// src/pages/Booking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../services/BookingService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { movies } from '../data/movies';
const Booking = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Тут має бути запит до API або з вашого масиву фільмів
    // Для прикладу використовуємо статичний список
    const foundMovie = movies.find(m => m.id === parseInt(movieId));
    setMovie(foundMovie);

    // Отримуємо заброньовані місця
    const bookings = BookingService.getBookingsByMovieId(parseInt(movieId));
    const seats = bookings.flatMap(booking => booking.seats);
    setBookedSeats(seats);
  }, [movieId]);

  const handleSeatSelect = (seatId) => {
    if (bookedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleBookingSubmit = (userData) => {
    const booking = {
      movieId: parseInt(movieId),
      movieTitle: movie.title,
      seats: selectedSeats,
      user: userData,
      bookingDate: new Date().toISOString()
    };

    BookingService.addBooking(booking);
    toast.success('Бронювання успішно завершено!');
    navigate('/');
  };

  if (!movie) return <div>Завантаження...</div>;

  return (
    <div className="booking-page">
      <h2>Бронювання квитків на фільм: {movie.title}</h2>
      <p>Сеанс: {new Date(movie.sessionTime).toLocaleString('uk-UA')}</p>
      
      <CinemaHall 
        selectedSeats={selectedSeats}
        bookedSeats={bookedSeats}
        onSeatSelect={handleSeatSelect}
      />
      
      {selectedSeats.length > 0 && !showForm && (
        <button 
          onClick={() => setShowForm(true)}
          className="confirm-button"
        >
          Забронювати ({selectedSeats.length} місць)
        </button>
      )}
      
      {showForm && (
        <BookingForm 
          onSubmit={handleBookingSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default Booking;