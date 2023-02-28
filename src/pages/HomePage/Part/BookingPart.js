import React, { useState } from 'react'

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import location from "../SVG/location.svg";
import calender from "../SVG/calendar.svg";
import styles from "../HomeStyle.module.css";


function BookingPart() {

    
  const [pickupPoint, setPickupPoint] = useState("Select Pickup City");

  return (
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
              <div className={styles.btn}>
                <img src={location} className={styles.logoSM} alt="logo" />
                <input type="hidden" value={pickupPoint} />
                <span>{pickupPoint}</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Pickup Date&Time<span>*</span>
              </h4>
              <div className={styles.btn}>
                <img src={calender} className={styles.logoSM} alt="logo" />
                <input type="hidden" value={pickupPoint} />
                <span>Select Pickup Date&Time</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Dropoff Point<span>*</span>
              </h4>
              <div className={styles.btn}>
                <img src={location} className={styles.logoSM} alt="logo" />
                <input type="hidden" value={pickupPoint} />
                <span>Select Dropoff City</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={3} className={styles.rentInfoWrapper}>
            <div className={styles.rentSelect}>
              <h4>
                Dropoff Date&Time<span>*</span>
              </h4>
              <div className={styles.btn}>
                <img src={calender} className={styles.logoSM} alt="logo" />
                <input type="hidden" value={pickupPoint} />
                <span>Select Dropoff Date&Time</span>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" className={styles.btns}>
              Search
            </Button>
          </Grid>
          {/* <button className={styles.btns}>Search</button> */}
        </Grid>
      </div>
  )
}

export default BookingPart