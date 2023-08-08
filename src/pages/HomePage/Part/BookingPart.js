import React, { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import location from '../SVG/location.svg';
import calender from '../SVG/calendar.svg';
import styles from '../HomeStyle.module.css';
import PickupPoint from '../../../components/Popups/PickupPoint';
import PickupDate from '../../../components/Popups/PickupDate';
import DropoffPoint from '../../../components/Popups/DropoffPoint';
import DropoffDate from '../../../components/Popups/DropoffDate';
import Warning from '../../../components/Popups/Warning';

function BookingPart() {
  const [pickupPoint, setPickupPoint] = useState({});
  const [selectPickupPoint, setSelectPickupPoint] = useState(false);
  const [pickupDate, setPickupDate] = useState({});
  const [selectPickupDate, setSelectPickupDate] = useState(false);
  const [dropoffPoint, setDropoffPoint] = useState({});
  const [selectDropoffPoint, setSelectDropoffPoint] = useState(false);
  const [dropoffDate, setDropoffDate] = useState({});
  const [selectDropoffDate, setSelectDropoffDate] = useState(false);
  const [warningData, setWarningData] = useState('');
  const [notSelectWarning, setNotSelectWarning] = useState(false);

  const navigate = useNavigate();

  let pickupLocations = {
    calicut: [
      'Home Delivery',
      'Calicut Railway station',
      'Calicut International Airport',
      'GoWheel Calicut',
    ],
    kochin: [
      'Home Delivery',
      'GoWheel Edapally',
      'North Railway Station',
      'Cochin International Airport',
    ],
    trivandrum: [
      'Home Delivery',
      'GoWheel Trivandram',
      'Trivandram International Airport',
      'Trivandram Central Railway Station',
    ],
  };

  const getDate = (givenDate) => {
    const date = new Date(givenDate);
    const formattedDateString = date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return formattedDateString;
  };

  const getTime = (givenDate) => {
    const date = new Date(givenDate);
    const formattedDateString = date.getUTCHours();
    if (formattedDateString > 12) {
      return `${formattedDateString - 12}:00 AM`;
    } else {
      return `${formattedDateString}:00 PM`;
    }
  };

  const searchVehicleHandler = () => {
    if (!pickupPoint?.pickup_location) {
      setWarningData('Please Select Pickup Point');
      setNotSelectWarning(true);
      return;
    }
    if (!pickupDate?.pickup_date) {
      setWarningData('Please Select Pickup Date');
      setNotSelectWarning(true);
      return;
    }
    if (!dropoffPoint?.dropoff_location) {
      setWarningData('Please Select Dropoff Point');
      setNotSelectWarning(true);
      return;
    }
    if (!dropoffDate?.dropoff_date) {
      setWarningData('Please Select Dropoff Date');
      setNotSelectWarning(true);
      return;
    }

    console.log({
      pickup_city: pickupPoint?.pickup_city,
      pickup_date: pickupDate?.pickup_date,
      dropoff_date: dropoffDate?.dropoff_date,
    });
    let searchParams = {
      pickup_city: pickupPoint?.pickup_city,
      pickup_date: pickupDate?.pickup_date,
      dropoff_date: dropoffDate?.dropoff_date,
    };

    navigate({
      pathname: '/search',
      search: `?${createSearchParams(searchParams)}`,
    });
  };

  return (
    <>
      <div className={styles.headWrapper}>
        <h3>
          RENT YOUR FAVOURITE CAR IN AN <span>AFFORDABLE RATE</span>
        </h3>
        <Grid container rowSpacing={{ xs: 1 }} className={styles.rentWrapper}>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Pickup Point<span>*</span>
              </h4>
              <div className={styles.btn} onClick={() => setSelectPickupPoint(true)}>
                <img src={location} className={styles.logoSM} alt='logo' />
                <input type='hidden' value={pickupPoint} />
                <span>
                  {pickupPoint?.pickup_location
                    ? `${pickupPoint?.pickup_city} - ${pickupPoint?.pickup_location}`
                    : 'Select Pickup City'}
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Pickup Date&Time<span>*</span>
              </h4>
              <div className={styles.btn} onClick={() => setSelectPickupDate(true)}>
                <img src={calender} className={styles.logoSM} alt='logo' />
                <input type='hidden' value={pickupPoint} />
                <span>
                  {pickupDate?.pickup_date
                    ? ` ${getDate(pickupDate?.pickup_date)} - ${getTime(
                        pickupDate?.pickup_date,
                      )} - hr`
                    : 'Select Pickup Date'}
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Dropoff Point<span>*</span>
              </h4>
              <div className={styles.btn} onClick={() => setSelectDropoffPoint(true)}>
                <img src={location} className={styles.logoSM} alt='logo' />
                <input type='hidden' value={pickupPoint} />
                <span>
                  {dropoffPoint?.dropoff_location
                    ? `${dropoffPoint?.dropoff_city} - ${dropoffPoint?.dropoff_location}`
                    : 'Select Dropoff City'}
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Dropoff Date&Time<span>*</span>
              </h4>
              <div className={styles.btn} onClick={() => setSelectDropoffDate(true)}>
                <img src={calender} className={styles.logoSM} alt='logo' />
                <input type='hidden' value={pickupPoint} />
                <span>
                  {dropoffDate?.dropoff_date
                    ? ` ${getDate(dropoffDate?.dropoff_date)} - ${getTime(
                        dropoffDate?.dropoff_date,
                      )} - hr`
                    : 'Select Dropoff Date'}
                </span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' className={styles.btns} onClick={searchVehicleHandler}>
              Search
            </Button>
          </Grid>
        </Grid>
      </div>

      {selectPickupPoint && (
        <PickupPoint
          data={pickupLocations}
          PickupLocationInfo={(loc) => {
            setPickupPoint(loc);
            setDropoffPoint({
              dropoff_city: loc?.pickup_city,
              dropoff_location: loc?.pickup_location,
            });
            setSelectPickupPoint(false);
            setSelectPickupDate(true);
          }}
          onClose={(info) => {
            setSelectPickupPoint(false);
            setWarningData(info);
            setNotSelectWarning(true);
          }}
        />
      )}

      {selectPickupDate &&
        (pickupPoint?.pickup_location ? (
          <PickupDate
            PickupDateInfo={(date) => {
              setPickupDate(date);
              setSelectPickupDate(false);
              setSelectDropoffDate(true);
            }}
            onClose={(info) => {
              setSelectPickupDate(false);
              setWarningData(info);
              setNotSelectWarning(true);
            }}
          />
        ) : (
          (setSelectPickupDate(false),
          setNotSelectWarning(true),
          setWarningData('Please Select Pickup point'))
        ))}

      {selectDropoffPoint &&
        (pickupPoint?.pickup_location ? (
          pickupDate?.pickup_date ? (
            <DropoffPoint
              data={pickupLocations}
              DropoffLocationInfo={(loc) => {
                setDropoffPoint(loc);
                setSelectDropoffPoint(false);
                setSelectDropoffDate(true);
              }}
              onClose={(info) => {
                setSelectDropoffPoint(false);
                setWarningData(info);
                setNotSelectWarning(true);
              }}
            />
          ) : (
            (setSelectDropoffPoint(false),
            setWarningData('Please Select Pickup Date'),
            setNotSelectWarning(true))
          )
        ) : (
          (setSelectDropoffPoint(false),
          setWarningData('Please Select Pickup Point'),
          setNotSelectWarning(true))
        ))}

      {selectDropoffDate &&
        (!dropoffDate?.dropoff_date ? (
          pickupPoint?.pickup_location ? (
            pickupDate?.pickup_date ? (
              dropoffPoint?.dropoff_location ? (
                <DropoffDate
                  data={{
                    date: pickupDate?.pickup_date,
                    time: getTime(pickupDate?.pickup_date),
                  }}
                  DropoffDateInfo={(date) => {
                    setDropoffDate(date);
                    setSelectDropoffDate(false);
                  }}
                  onClose={(info) => {
                    setSelectDropoffDate(false);
                    setWarningData(info);
                    setNotSelectWarning(true);
                  }}
                />
              ) : (
                (setSelectDropoffDate(false),
                setWarningData('Please Select Dropoff Point'),
                setNotSelectWarning(true))
              )
            ) : (
              (setSelectDropoffDate(false),
              setWarningData('Please Select Pickup Date'),
              setNotSelectWarning(true))
            )
          ) : (
            (setSelectDropoffDate(false),
            setWarningData('Please Select Pickup Point'),
            setNotSelectWarning(true))
          )
        ) : (
          setSelectDropoffDate(false)
        ))}

      {notSelectWarning && (
        <Warning
          data={warningData}
          onClose={() => {
            setNotSelectWarning(false);
            setWarningData(null);
          }}
        />
      )}
    </>
  );
}

export default BookingPart;
