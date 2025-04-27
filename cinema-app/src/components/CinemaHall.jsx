import React from 'react';
import PropTypes from 'prop-types';

const CinemaHall = ({ selectedSeats, onSeatSelect }) => {
  // Створюємо схему залу - 8 рядів по 10 місць
  const rows = 8;
  const seatsPerRow = 10;
  
  // Генеруємо ID місць у форматі "Ряд-Місце" (наприклад, "1-3")
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
          return (
            <div
              key={seatId}
              className={`seat ${isSelected ? 'selected' : ''}`}
              onClick={() => onSeatSelect(seatId)}
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
  onSeatSelect: PropTypes.func.isRequired
};

export default CinemaHall;