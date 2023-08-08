import React from 'react';
import Grid from '@mui/material/Grid';

import carsearch from '../SVG/search-car-8952.svg';
import stearing from '../SVG/black-car-steering-wheel-17614.svg';
import rotate from '../SVG/rotate-left-solid.svg';
import blackCar from '../SVG/car-solid.svg';

import styles from '../HomeStyle.module.css';

function WorkPart() {
  return (
    <div className={styles.workWrapper} id='working'>
      <h1 className={styles.mainHeading}>How It Works ?</h1>
      <div className={styles.line}></div>
      <Grid container className={styles.container}>
        <Grid item xs={12} sm={6} className={styles.workContent}>
          <div className={styles.worklogo}>
            <h3 className={styles.thirdHeading}>Step 1</h3>
            <div className={styles.logoWrapper}>
              <img src={carsearch} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Search & Book a vehicle with us</h2>
            <p className={styles.para}>
              Use our website or apps to search & book a vehicle that suits your budget & needs
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.workContent}>
          <div className={styles.worklogo}>
            <h3 className={styles.thirdHeading}>Step2</h3>
            <div className={styles.logoWrapper}>
              <img src={blackCar} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Pick Up your Vehicle</h2>
            <p className={styles.para}>
              Ride from home or from any of our conveniently located sites around your city
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.workContent}>
          <div className={styles.worklogo}>
            <h3 className={styles.thirdHeading}>Step 3</h3>
            <div className={styles.logoWrapper}>
              <img src={stearing} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Drive Your Vehicle</h2>
            <p className={styles.para}>Explore where ever you want to with your loved ones.</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.workContent}>
          <div className={styles.worklogo}>
            <h3 className={styles.thirdHeading}>Step 4</h3>
            <div className={styles.logoWrapper}>
              <img src={rotate} className={styles.logoLG} alt='' />
            </div>
          </div>
          <div>
            <h2 className={styles.secondHeading}>Return your Vehicle</h2>
            <p className={styles.para}>
              Get the vehicle back to your preferred return location, and we will take it from there
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default WorkPart;
