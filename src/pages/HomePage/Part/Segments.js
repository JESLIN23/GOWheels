import React from "react";

import Grid from "@mui/material/Grid";

import styles from "../HomeStyle.module.css";
import sadan from "../SVG/sedan-car-model.svg";
import MPV from '../SVG/minivan-car-svgrepo-com.svg'
import SUV from '../SVG/SUV.svg'
import Hatchback from '../SVG/car-svgrepo-com.svg'
import convertable from '../SVG/car-muscle-design-svgrepo-com.svg'
import Wagon from '../SVG/car-city-model-svgrepo-com.svg'

function Segments() {
  return (
    <div className={styles.segmentWrapper}>
      <h1 className={styles.secondHeading}>Available Car Segments</h1>
      <div className={styles.line}></div>
      <Grid container columnSpacing={4} xs={12} className={styles.carSegments}>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={sadan} alt="" />
            <span>Sadan</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={MPV} alt="" />
            <span>MPV</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={SUV} alt="" />
            <span>SUV</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={Hatchback} alt="" />
            <span>Hatchback</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={convertable} alt="" />
            <span>Convertable</span>
          </div>
        </Grid>
        <Grid item xs={6} sm={4} className={styles.cars}>
          <div className={styles.carsvgWrapper}>
            <img src={Wagon} alt="" />
            <span>Wagon</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Segments;
