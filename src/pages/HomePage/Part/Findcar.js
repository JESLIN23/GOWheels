import React from "react";

import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

import styles from "../HomeStyle.module.css";
import Carousal from "./Carousal";


function Findcar() {


  return (
    <div className={styles.findWrapper}>
      <h3 className={styles.midHeading}>
        Find The Perfect Car For Your Roadtrips!
      </h3>
      <Grid
        container
        columnSpacing={2}
        rowGap={{md: 2, xs: 1}}
        xs={12}
        className={styles.findCar}
      >
        <Grid item md={6} xs={12} className={styles.carName}>
          <div className={styles.carInfo}>
            <div className={styles.dis}>
              <h4>AVAILABLE CARS</h4>
              <div className={styles.line2}></div>
            </div>
            <div className={styles.carNames}>
              <p className={styles.paraInfo}>
                Maruti Wangon R, Maruti Celerio ,Maruti Swift, Maruti Baleno,
                Maruti Ignis , Toyota Etios Liva , Maruti Brezza, Maruti Dzire,
                Maruti S-Cross, Maruti Ciaz, Honda City, Toyota Innova Crysta,
                Mahindra XUV500, Toyota Fortuner, Mercedes Benz.
              </p>
              <Button variant="contained" className={styles.btns}>
                Rent a car
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item md={6} xs={12} className={styles.carImg}>
          <div className={styles.im}><Carousal/></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Findcar;
