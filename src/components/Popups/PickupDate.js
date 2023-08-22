import React, { useState } from 'react';
import PopupLayout from '../layout/PopupLayout/PopupLayout';
import styles from './styles.module.css';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ClockPicker } from '@mui/x-date-pickers';
import { getBookingDateInIsoFomat } from '../../helpers/DateHelper';

function PickupDate({ PickupDateInfo, onClose }) {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');

  const twoMonth = dayjs().add(2, 'month');
  const today = dayjs();
  let hr = today.$H + 3;
  let twoHR;

  if (new Date().getDate() === pickupDate.$D) {
    twoHR = dayjs().set('hour', hr).startOf('hour');
  } else {
    twoHR = null;
  }

  if (pickupDate && pickupTime) {
    PickupDateInfo({
      pickup_date: getBookingDateInIsoFomat(pickupDate.$d, pickupTime.$H),
    });
  }

  const popupCloseHandler = () => {
    onClose('Please Select Pickup Date & Time');
  };

  return (
    <PopupLayout>
      <div className={styles.headerWrapper}>
        <h2>{pickupDate ? 'Select Your Pickup Time' : 'Select Your Pickup Date'}</h2>
      </div>
      <div className={styles.contentWrapper}>
        {!pickupDate && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarPicker
              value={pickupDate}
              onChange={(newValue) => setPickupDate(newValue)}
              disablePast
              maxDate={twoMonth}
            />
          </LocalizationProvider>
        )}
        {pickupDate && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ClockPicker
              views={['hours']}
              value={pickupTime}
              onChange={(newValue) => setPickupTime(newValue)}
              minTime={twoHR}
              ampm={false}
              disablePast
            />
          </LocalizationProvider>
        )}
      </div>
      <div className={styles.btnWrapper}>
        <Button onClick={popupCloseHandler}>cancel</Button>
      </div>
    </PopupLayout>
  );
}

export default PickupDate;
