import { Grid } from "@mui/material";
import React from "react";

import styles from "./AboutusStyle.module.css";
import carimg from "./istockphoto-468686480-170667a.jpg";

import Cities from '../HomePage/Part/Cities'
import Footer from '../HomePage/Part/Footer'

function AboutUsPage() {
  return (
    <div className={styles.aboutInfo}>
      <div className={styles.gradient}></div>
      <Grid container className={styles.grid1}>
        <Grid item sm={6} xs={12} className={styles.imgs}>
          <img src={carimg} className={styles.img} alt="" />
        </Grid>
        <Grid item sm={6} xs={12} className={styles.info}>
          <h3>About GOWheels</h3>
          <p>
            Realizing the importance of superior quality transport in Kerala, he
            hired cars and ferried travelers across the state. This was the
            inception of a great venture which transformed the car rental
            business of Kerala. Over time, he modeled the service on a US based
            transport system. Today, we are proud owners of 45 active cars that
            fall under two categories, namely automatic rental car and manual
            rental car segments. Also, premium wedding rental cars are
            available.</p>
            <p> To get in touch, you simply have to go through an easy
            and fast procedure. NRIs can book the car of their choice in advance
            and make the location and duration clear for better services. The
            vehicle will greet you at the moment you walk out of the airport.
            After completing 25 years in the industry, we are glad to have the
            support of satisfied customers who associate with us regularly.
            Regular inspections and timely redressal of customers’ grievances
            set us apart from other NRI car rental services in Kerala.
          </p>
        </Grid>
      </Grid>
      <Cities/>
      <Footer/>
    </div>
  );
}

export default AboutUsPage;
