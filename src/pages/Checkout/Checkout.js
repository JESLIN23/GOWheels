import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';
import { Button, Grid, Divider } from '@mui/material';
import Loader from '../../util/Loading/loading';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useSelector } from 'react-redux';
import { ROUTES, STORAGE_KEYS } from '../../const';
import { useNavigate, Link } from 'react-router-dom';
import PlaceHolderImage from '../../util/PlaceHolderImage';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { getTimeDuration, getDateWMDY, getTime12H } from '../../helpers/DateHelper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CarRentalIcon from '@mui/icons-material/CarRental';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import BookingServices from '../../services/BookingServices';
import CalculatePrice from '../../helpers/CalculatePrice';

function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookingCar, setBookingCar] = useState(null);
  const [carFilterData, setCarFilterData] = useState(null);

  let selectedCar = useSelector((state) => state.car.selectedCar);
  let filterData = useSelector((state) => state.carFilter.filterData);
  const navigate = useNavigate();

  const handleBackToSearchPage = () => {
    navigate(-1);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      const res = await BookingServices.getCheckoutSession(bookingCar, carFilterData);
      if (res.status === 'success') {
        window.location.href = res?.session?.url;
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!selectedCar || !filterData) {
      selectedCar = JSON.parse(localStorage.getItem(STORAGE_KEYS.SELECTED_CAR));
      filterData = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAR_FILTER_DATA));
    }
    if (!selectedCar || !filterData) {
      navigate(ROUTES.HOME);
    }
    setBookingCar(selectedCar);
    setCarFilterData(filterData);
  }, []);

  return (
    <div className={styles.container}>
      <Loader isOpen={isLoading} />
      <div className={styles.head}>
        <Button variant='outlined' onClick={handleBackToSearchPage}>
          <ArrowBackIosNewRoundedIcon sx={{ marginRight: '5px' }} /> back
        </Button>
      </div>
      <Grid className={styles.paymentWrapper} container>
        <Grid item xs={12} className={styles.selectedCar}>
          <div className={styles.carImage}>
            <img src={bookingCar?.images[0]?.url || PlaceHolderImage} alt='' />
          </div>
          <div className={styles.carDetails}>
            <h4
              style={{ marginBottom: '16px', fontWeight: 600 }}
            >{`${bookingCar?.brand} ${bookingCar?.name}`}</h4>
            <div style={{ display: 'flex' }}>
              <AirlineSeatReclineExtraIcon className={styles.info} />
              <h5>{`${bookingCar?.seating_capacity} seater`}</h5>
            </div>
            <div style={{ display: 'flex' }}>
              <SettingsIcon className={styles.info} />
              <h5>{bookingCar?.transmission}</h5>
            </div>
            <div style={{ display: 'flex' }}>
              <LocalGasStationIcon className={styles.info} />
              <h5>{bookingCar?.fuel}</h5>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={styles.durationWrapper}>
          <h5>{`Total travel duration: ${getTimeDuration(
            carFilterData?.pickupDate?.pickup_date,
            carFilterData?.dropoffDate?.dropoff_date,
          )}`}</h5>
        </Grid>
        <Grid item xs={12} md={6} className={styles.filterDataWrapper}>
          <div className={styles.filterHeading}>
            <h3>Pickup information</h3> <Link to={ROUTES.HOME}>change</Link>
          </div>
          <div className={styles.bookingInfo}>
            <LocationOnIcon style={{ color: '#43d7c8', marginRight: 5, fontSize: '30px' }} />
            <div className={styles.LOCinfo}>
              <h4>
                {carFilterData?.pickupPoint?.pickup_location},{' '}
                {carFilterData?.pickupPoint?.pickup_city}
              </h4>
              <h5>
                {getDateWMDY(carFilterData?.pickupDate?.pickup_date)},
                {getTime12H(carFilterData?.pickupDate?.pickup_date)}
              </h5>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={styles.filterDataWrapper}>
          <div className={styles.filterHeading}>
            <h3>Pickup information</h3> <Link to={ROUTES.HOME}>change</Link>
          </div>
          <div className={styles.bookingInfo}>
            <LocationOnIcon style={{ color: 'red', marginRight: 5, fontSize: '30px' }} />
            <div className={styles.LOCinfo}>
              <h4>
                {carFilterData?.pickupPoint?.pickup_location},{' '}
                {carFilterData?.pickupPoint?.pickup_city}
              </h4>
              <h5>
                {getDateWMDY(carFilterData?.pickupDate?.pickup_date)},
                {getTime12H(carFilterData?.pickupDate?.pickup_date)}
              </h5>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} className={styles.priceDetailsContainer}>
          <h3>Price Details</h3>
          <Grid container marginTop={2} paddingLeft={1}>
            <Grid item xs={6}>
              <h5>Base Fare</h5>
            </Grid>
            <Grid item xs={6} className={styles.priceItems}>
              <CurrencyRupeeIcon style={{ fontSize: '13px', marginRight: '8px' }} />
              <h5>
                {CalculatePrice.calculatedBookingPrice(
                  bookingCar?.price,
                  carFilterData?.pickupDate?.pickup_date,
                  carFilterData?.dropoffDate?.dropoff_date,
                )}
              </h5>
            </Grid>
          </Grid>
          <Grid container marginTop={1.5} paddingLeft={1}>
            <Grid item xs={6}>
              <h5>Delivery Charge</h5>
            </Grid>
            <Grid item xs={6} className={styles.priceItems}>
              <CurrencyRupeeIcon style={{ fontSize: '13px', marginRight: '8px' }} />
              <h5>0</h5>
            </Grid>
          </Grid>
          <Grid container marginTop={1.5} paddingLeft={1}>
            <Grid item xs={6}>
              <h5>Deposit amount</h5>
            </Grid>
            <Grid item xs={6} className={styles.priceItems}>
              <CurrencyRupeeIcon style={{ fontSize: '13px', marginRight: '8px' }} />
              <h5>0</h5>
            </Grid>
          </Grid>
          <Divider style={{ margin: '1rem 0' }} />
          <Grid container marginTop={1.5} paddingLeft={1}>
            <Grid item xs={6}>
              <h4>Total amount</h4>
            </Grid>
            <Grid item xs={6} className={styles.priceItems}>
              <CurrencyRupeeIcon style={{ fontSize: '13px', marginRight: '8px' }} />
              <h4>
                {CalculatePrice.calculatedBookingPrice(
                  bookingCar?.price,
                  carFilterData?.pickupDate?.pickup_date,
                  carFilterData?.dropoffDate?.dropoff_date,
                )}
              </h4>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className={styles.priceDetailsContainer}>
          <h3>Things good to know</h3>
          <Grid container marginTop={2}>
            <Grid item xs={12} sm={6} md={3} className={styles.service}>
              <div className={styles.serviceDetails}>
                <h4>24 X 7</h4>
                <h4>Assistance</h4>
              </div>
              <MiscellaneousServicesIcon sx={{ fontSize: '60px' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.service}>
              <div className={styles.serviceDetails}>
                <h4>Well maintained</h4>
                <h4>& Serviced cars</h4>
              </div>
              <DriveEtaIcon sx={{ fontSize: '60px' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.service}>
              <div className={styles.serviceDetails}>
                <h4>Wide</h4>
                <h4>Range of Cars</h4>
              </div>
              <CarRentalIcon sx={{ fontSize: '60px' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.service}>
              <div className={styles.serviceDetails}>
                <h4>Pick & Drop</h4>
                <h4>Anywhere</h4>
              </div>
              <LocalTaxiIcon sx={{ fontSize: '60px' }} />
            </Grid>
          </Grid>
          <ul>
            <li>
              <Link to={ROUTES.TERMS_CONDETIONS}>Terms & Condetions</Link>
            </li>
            <li>
              <Link to={ROUTES.TERMS_CONDETIONS}>Cancellation Policy</Link>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid container className={styles.paymentContainer}>
        <Grid item xs={6} className={styles.paymentValue} flexDirection={'column'}>
          <div>
            <h5>Amount to pay:</h5>
          </div>
          <div className={styles.totalAmount}>
            <CurrencyRupeeIcon style={{ fontSize: '15px', marginRight: '8px' }} />
            <h4>
              {CalculatePrice.calculatedBookingPrice(
                bookingCar?.price,
                carFilterData?.pickupDate?.pickup_date,
                carFilterData?.dropoffDate?.dropoff_date,
              )}
            </h4>
          </div>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
          <Button variant='contained' onClick={handlePayment}>
            Proceed to pay
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
