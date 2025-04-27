// src/components/CinemaHall.jsx
import React from 'react';
import PropTypes from 'prop-types';

const CinemaHall = ({ selectedSeats, bookedSeats, onSeatSelect }) => {
  const rows = 12;
  const seatsPerRow = 7;
  
  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        seats.push(`${row}-${seat}`);
      }
    }
    return seats;
  };

  const allSeats = generateSeats();

  return (
    <div className="cinema-hall">
      <div className="screen">ЕКРАН</div>
      <div className="seats-grid">
        {allSeats.map(seatId => {
          const isSelected = selectedSeats.includes(seatId);
          const isBooked = bookedSeats.includes(seatId);
          
          return (
            <div
              key={seatId}
              className={`seat 
                ${isSelected ? 'selected' : ''} 
                ${isBooked ? 'booked' : ''}`}
              onClick={() => !isBooked && onSeatSelect(seatId)}
            >
              {seatId}
            </div>
          );
        })}
      </div>
    </div>
  );
};

CinemaHall.propTypes = {
  selectedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  bookedSeats: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSeatSelect: PropTypes.func.isRequired
};

export default CinemaHall;