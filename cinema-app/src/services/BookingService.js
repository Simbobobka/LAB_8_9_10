export const BookingService = {
    // Отримати всі бронювання
    getAllBookings: () => {
      const bookings = localStorage.getItem('movieBookings');
      return bookings ? JSON.parse(bookings) : [];
    },
  
    // Отримати бронювання за ID фільму
    getBookingsByMovieId: (movieId) => {
      const allBookings = BookingService.getAllBookings();
      return allBookings.filter(booking => booking.movieId === movieId);
    },
  
    // Додати нове бронювання
    addBooking: (bookingData) => {
      const allBookings = BookingService.getAllBookings();
      const updatedBookings = [...allBookings, bookingData];
      localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
      return bookingData;
    },

    getBookedSeats(movieId){
      const bookings = this.getAllBookings();
      return bookings.reduce((seats,booking) => [...seats, ...booking.seats], []);
    }
  };