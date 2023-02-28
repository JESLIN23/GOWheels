import React from "react";

import styles from "./HomeStyle.module.css";

import Work from "./Part/WorkPart";
import WhyGOWheels from "./Part/WhyGOWheels";
import BookingPart from './Part/BookingPart'
import Segments from './Part/Segments'
import Findcar from "./Part/Findcar";
import Cities from "./Part/Cities";
import Footer from "./Part/Footer";

function HomePage() {

  return (
    <div className={styles.bodyWrapper}>
      <BookingPart/>
      <Work />
      <WhyGOWheels />
      <Segments/>
      <Findcar/>
      <Cities/>
      <Footer/>
    </div>
  );
}

export default HomePage;
