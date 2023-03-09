import React, { useState } from 'react';

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

  let pickupLocations = {
    calicut: ['home', 'railwaystation', 'airport', 'medical'],
    kochi: ['home', 'vpa', 'mdv', 'lma'],
    trv: ['home', 'tre', 'egt', 'ekpd', 'pd', 'fmo', 'ddd'],
  };

  const searchVehicleHandler = () => {};

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
                <span >
                  {pickupPoint.location
                    ? `${pickupPoint.city} - ${pickupPoint.location}`
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
              <div className={styles.btn}  onClick={() => setSelectPickupDate(true)}>
                <img src={calender} className={styles.logoSM} alt='logo' />
                <input type='hidden' value={pickupPoint} />
                <span>
                  {pickupDate.time
                    ? `${pickupDate.date} - ${pickupDate.time} - hr`
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
                <span >
                  {dropoffPoint.location
                    ? `${dropoffPoint.city} - ${dropoffPoint.location}`
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
                <span >
                  {dropoffDate.time
                    ? `${dropoffDate.date} - ${dropoffDate.time} - hr`
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
        (pickupPoint.location ? (
          <PickupDate
            PickupDateInfo={(date) => {
              setPickupDate(date);
              setSelectPickupDate(false);
              setSelectDropoffPoint(true);
            }}
            onClose={(info) => {
              setSelectPickupDate(false);
              setWarningData(info);
              setNotSelectWarning(true);
            }}
          />
        ) : (
          (setSelectPickupDate(false), setNotSelectWarning(true), setWarningData('Please Select Pickup point'))
        ))}

      {selectDropoffPoint &&
        (pickupPoint.location ? (
          pickupDate.time ? (
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
            (setSelectDropoffPoint(false), setWarningData('Please Select Pickup Date'), setNotSelectWarning(true))
          )
        ) : (
          (setSelectDropoffPoint(false), setWarningData('Please Select Pickup Point'), setNotSelectWarning(true))
        ))}

      {selectDropoffDate &&
        (pickupPoint.location ? (
          pickupDate.time ? (
            dropoffPoint.location ? (
              <DropoffDate
                data={pickupDate}
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
              (setSelectDropoffDate(false), setWarningData('Please Select Dropoff Point'), setNotSelectWarning(true))
            )
          ) : (
            (setSelectDropoffDate(false), setWarningData('Please Select Pickup Date'), setNotSelectWarning(true))
          )
        ) : (
          (setSelectDropoffDate(false), setWarningData('Please Select Pickup Point'), setNotSelectWarning(true))
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
