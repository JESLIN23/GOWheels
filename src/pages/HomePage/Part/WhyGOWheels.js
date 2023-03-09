import React from 'react';
import Grid from '@mui/material/Grid';

import styles from '../HomeStyle.module.css';

import settings from '../SVG/settings.svg';
import home from '../SVG/house-solid.svg';
import phone from '../SVG/phone-solid (1).svg';
import cash from '../SVG/money-check-dollar-solid.svg';
import stock from '../SVG/sack-dollar-solid.svg';
import location from '../SVG/location.svg';

function WhyGOWheels() {
  return (
    <div className={styles.whyWrapper}>
      <h1 className={styles.mainHeading}>Why GOWheels</h1>
      <div className={styles.line}></div>
      <Grid container className={styles.Whycontainer}>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={location} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Flexible Start & End Points</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              Book by the hour, day or week.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={cash} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Low Security Deposit</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              Now book a vehicle paying minimum securitydeposit.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={settings} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Well Maintained Cars</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              Regular service & maintenace, Inspected after each trip
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={home} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Home Delivery & Return</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              On-time doorstep service at your prefered location & time
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={stock} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Instant Refund</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              Refund and payments auto processed immediately.
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={styles.whyContent}>
          <div className={styles.worklogo}>
            <div className={styles.logoWrapper}>
              <img src={phone} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>24x7 Roadside Assistance</h2>
            <p style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
              Help is always near to you
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default WhyGOWheels;
