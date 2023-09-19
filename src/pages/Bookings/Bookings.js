import React, { useEffect, useState } from 'react';
import Loader from './../../util/Loading/loading';
import styles from './styles.module.css';
import BookingServices from '../../services/BookingServices';
import Info from '../../util/Alerts/Info';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getBookings = async () => {
    setIsLoading(true);
    try {
      const res = await BookingServices.getBookings();
      setBookings(res);
    } catch (error) {
      console.log('Error', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className={styles.bookingWrapper}>
      <Loader isOpen={isLoading} />
      {bookings && bookings.length ? (
        bookings.map((booking) => {
          console.log(booking);
        })
      ) : (
        <Info
          title={'Oops No Bookings Found!'}
          content={`You don't have any bookings at the moment. Please book a car`}
        />
      )}
    </div>
  );
}

export default Bookings;
