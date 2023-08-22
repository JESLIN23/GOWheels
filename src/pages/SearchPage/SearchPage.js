import React, { useState, useEffect } from 'react';
import styles from './SearchPage.module.css';
import Footer from '../../components/Footer/Footer';
import { ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useSelector } from 'react-redux';
import FilterPart from './FilterPart/FilterPart';
import { getDateWMDY, getTime12H } from '../../helpers/DateHelper';
import Loader from '../../util/Loading/loading';
import CarServices from '../../services/CarServices';
import Info from '../../util/Alerts/Info';
import PlaceHolderImage from '../../util/PlaceHolderImage/index';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function SearchPage() {
  const [sort, setSort] = useState('price');
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState(null);
  const [filterValues, setFilterValues] = useState({});

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carFilterData = useSelector((state) => state.carFilter.filterData);

  const handleSorting = (event, sorting) => {
    if (sorting !== null) {
      setSort(sorting);
    }
  };

  const getTimeDuration = (date1, date2) => {
    const pickupDate = new Date(date1);
    const dropoffDate = new Date(date2);

    const timeDifferenceMs = Math.abs(dropoffDate - pickupDate);
    const days = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days} days ${hours} hours`;
  };

  const carBookHandler = () => {};

  const handleFilterValues = (val) => {
    console.log(val);
    setFilterValues(val);
  };

  const handleNavigateToHome = () => {
    navigate('/home');
  };

  const handleFindCar = async () => {
    setIsLoading(true);
    const searchFilters = Object.fromEntries([...searchParams]);
    const data = { ...searchFilters, sort, ...filterValues };
    data.segment = (data?.segment || []).join(',');
    data.fuel = (data?.fuel || []).join(',');
    data.transmission = (data?.transmission || []).join(',');
    const res = await CarServices.getCars(data);
    setCars(res);
    setIsLoading(false);
  };

  useEffect(() => {
    handleFindCar();
  }, [searchParams, sort, filterValues]);

  return (
    <>
      <div className={styles.container}>
        <Loader isOpen={isLoading} />
        <div className={styles.filterWrapper}>
          <Button onClick={handleNavigateToHome}>
            <HomeOutlinedIcon />
          </Button>
          <div className={styles.sortWrapper}>
            <h4 className={styles.label}>Sort by value: </h4>
            <ToggleButtonGroup
              value={sort}
              color='primary'
              exclusive
              onChange={handleSorting}
              aria-label='Platform'
            >
              <ToggleButton value='price' aria-label='left aligned'>
                <ArrowDownwardIcon />
              </ToggleButton>
              <ToggleButton value='-price' aria-label='centered'>
                <ArrowUpwardIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <FilterPart filterHandler={handleFilterValues} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.durationWrapper}>
            <div className={styles.boodkingInfoFixed}>
              <div className={styles.bookingInfoWrapper}>
                <h3>Pick up information</h3>
                <div className={styles.bookingInfo}>
                  <LocationOnIcon style={{ color: '#43d7c8', marginRight: 5 }} />
                  <div className={styles.LOCinfo}>
                    <h4>
                      {carFilterData?.pickupPoint?.pickup_location},{' '}
                      {carFilterData?.pickupPoint?.pickup_city}
                    </h4>
                    <h6>
                      {getDateWMDY(carFilterData?.pickupDate?.pickup_date)},
                      {getTime12H(carFilterData?.pickupDate?.pickup_date)}
                    </h6>
                  </div>
                </div>
                <div className={styles.divider}></div>
                <h3>Drop off information</h3>
                <div className={styles.bookingInfo}>
                  <LocationOnIcon style={{ color: 'red', marginRight: 5 }} />
                  <div className={styles.LOCinfo}>
                    <h4>
                      {carFilterData?.dropoffPoint?.dropoff_location},{' '}
                      {carFilterData?.dropoffPoint?.dropoff_city}
                    </h4>
                    <h6>
                      {getDateWMDY(carFilterData?.dropoffDate?.dropoff_date)},{' '}
                      {getTime12H(carFilterData?.dropoffDate?.dropoff_date)}
                    </h6>
                  </div>
                </div>
              </div>
              <div className={styles.durationInfo}>
                <h4>Total travel duration</h4>
                <h4 style={{ color: 'white', marginTop: 5 }}>
                  {getTimeDuration(
                    carFilterData?.pickupDate?.pickup_date,
                    carFilterData?.dropoffDate?.dropoff_date,
                  )}
                </h4>
              </div>
            </div>
          </div>
          <div className={styles.findCarWrapper}>
            {cars?.available_cars &&
              cars?.available_cars.length &&
              cars?.available_cars.map((car) => {
                const { name, brand, price, fuel, seating_capacity, transmission } = car;
                return (
                  <div className={styles.selectCar} key={car?.id}>
                    <div className={styles.carInfo}>
                      <div className={styles.carImage}>
                        <img src={car?.images[0]?.url || PlaceHolderImage} alt='' />
                      </div>
                      <div className={styles.carDetails}>
                        <h4
                          style={{ marginBottom: '12px', fontWeight: 600 }}
                        >{`${brand} ${name}`}</h4>
                        <div style={{ display: 'flex' }}>
                          <AirlineSeatReclineExtraIcon className={styles.info} />
                          <h5>{`${seating_capacity} seater`}</h5>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <SettingsIcon className={styles.info} />
                          <h5>{transmission}</h5>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <LocalGasStationIcon className={styles.info} />
                          <h5>{fuel}</h5>
                        </div>
                      </div>
                    </div>
                    <div className={styles.bookCar}>
                      <h3 style={{ marginBottom: '0.5rem' }}>
                        <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                        {price}
                      </h3>
                      <Button onClick={carBookHandler}>Book Now</Button>
                    </div>
                  </div>
                );
              })}
            {cars?.available_cars &&
              cars?.available_cars.length &&
              cars?.available_cars.map((car) => {
                const { name, brand, price, fuel, seating_capacity, transmission } = car;
                return (
                  <div className={styles.selectCarMinWrapper} key={car?.id}>
                    <div className={styles.carInfoMin}>
                      <h3 style={{ marginBottom: '12px' }} className={styles.h3}>
                        {`${brand} ${name}`}
                      </h3>
                      <h5>{`${seating_capacity} seater, ${transmission}, ${fuel}`}</h5>
                      <h3 style={{ marginBottom: 5, marginTop: '1rem' }}>
                        <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                        {price}
                      </h3>
                    </div>
                    <div className={styles.bookCarMin}>
                      <div className={styles.carImage}>
                        <img src={car?.images[0]?.url || PlaceHolderImage} alt='' />
                      </div>
                      <div className={styles.arrow} onClick={carBookHandler}>
                        <KeyboardArrowRightIcon style={{ color: '#43d7c8', fontSize: 30 }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            {cars?.booked_cars &&
              cars?.booked_cars.length &&
              cars?.booked_cars.map((car) => {
                const { name, brand, price, fuel, seating_capacity, transmission } = car;
                return (
                  <div className={styles.missedCar} key={car?.id}>
                    <div className={styles.carInfo}>
                      <div className={styles.carImage}>
                        <img src={car?.images[0]?.url || PlaceHolderImage} alt='' />
                      </div>
                      <div className={styles.carDetails}>
                        <h4
                          style={{ marginBottom: '12px', fontWeight: 600 }}
                        >{`${brand} ${name}`}</h4>
                        <div style={{ display: 'flex' }}>
                          <AirlineSeatReclineExtraIcon className={styles.info} />
                          <h5>{`${seating_capacity} seater`}</h5>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <SettingsIcon className={styles.info} />
                          <h5>{transmission}</h5>
                        </div>
                        <div style={{ display: 'flex' }}>
                          <LocalGasStationIcon className={styles.info} />
                          <h5>{fuel}</h5>
                        </div>
                      </div>
                    </div>
                    <div className={styles.bookCar}>
                      <h3 style={{ marginBottom: '0.5rem' }}>
                        <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                        {price}
                      </h3>
                      <Button onClick={carBookHandler}>Book Now</Button>
                    </div>
                    <div className={styles.blindCar}>
                      <h3>You Missed it.</h3>
                    </div>
                  </div>
                );
              })}
            {cars?.booked_cars &&
              cars?.booked_cars.length &&
              cars?.booked_cars.map((car) => {
                const { name, brand, price, fuel, seating_capacity, transmission } = car;
                return (
                  <div className={styles.missedCarMinWrapper} key={car?.id}>
                    <div className={styles.carInfoMin}>
                      <h3 style={{ marginBottom: '12px' }} className={styles.h3}>
                        {`${brand} ${name}`}
                      </h3>
                      <h5>{`${seating_capacity} seater, ${transmission}, ${fuel}`}</h5>
                      <h3 style={{ marginBottom: 5, marginTop: '1rem' }}>
                        <CurrencyRupeeIcon style={{ fontSize: 18 }} className={styles.info} />
                        {price}
                      </h3>
                    </div>
                    <div className={styles.bookCarMin}>
                      <div className={styles.carImage}>
                        <img src={car?.images[0]?.url || PlaceHolderImage} alt='' />
                      </div>
                      <div className={styles.arrow} onClick={carBookHandler}>
                        <KeyboardArrowRightIcon style={{ color: '#43d7c8', fontSize: 30 }} />
                      </div>
                    </div>
                    <div className={styles.blindCar}>
                      <h3>You Missed it.</h3>
                    </div>
                  </div>
                );
              })}
            {cars?.available_cars.length === 0 && cars?.booked_cars.length === 0 && (
              <Info
                title={'Oops ther is no cars available on your filter'}
                content={
                  'Oops ther is no cars available on your filter. Please change current filter configration to get cars'
                }
              />
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default SearchPage;
