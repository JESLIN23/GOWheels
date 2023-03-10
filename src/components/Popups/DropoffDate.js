import React, { useState } from 'react'
import PopupLayout from '../layout/PopupLayout/PopupLayout'
import Button from '@mui/material/Button';
import styles from './styles.module.css'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 
import {ClockPicker}  from '@mui/x-date-pickers';


function DropoffDate({ data, DropoffDateInfo, onClose }) {
    const [dropoffDate, setDropoffDate] = useState('');
    const [dropoffTime, setDropoffTime] = useState('');
  
    const twoMonth = dayjs().add(4, 'month');
    const tomarrow = dayjs(data.date).add(1, 'day');
    let hr = dayjs().$H + 3;
    let twoHR;

    if (new Date(data.date).getDate() + 1 === dropoffDate.$D) {
        twoHR = dayjs().set('hour', hr).startOf('hour');
      } else {
        twoHR = null;
      }
    
  
    if (dropoffDate && dropoffTime) {
      DropoffDateInfo({ date: new Date(dropoffDate.$d).toDateString(), time: dropoffTime.$H });
    }
  
    const popupCloseHandler = () => {
      onClose('Please SelectDropoffp Date & Time');
    };
  
    return (
      <PopupLayout>
        <div className={styles.headerWrapper}>
          <h2>{dropoffDate ? 'Select Your Dropoff Time' : 'Select Your Dropoff Date'}</h2>
        </div>
        <div className={styles.contentWrapper}>
          {!dropoffDate && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CalendarPicker
                defaultValue={tomarrow}
                value={dropoffDate}
                onChange={(newValue) => setDropoffDate(newValue)}
                // disablePast
                maxDate={twoMonth}
                minDate={tomarrow}
              />
            </LocalizationProvider>
          )}
          {dropoffDate && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ClockPicker views={['hours']} value={dropoffTime} onChange={(newValue) => setDropoffTime(newValue)} disablePast minTime={twoHR} ampm={false} />
            </LocalizationProvider>
          )}
        </div>
        <div className={styles.btnWrapper}>
          <Button onClick={popupCloseHandler}>cancel</Button>
        </div>
      </PopupLayout>
    );
  }

export default DropoffDate