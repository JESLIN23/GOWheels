import { Grid } from "@mui/material";
import React from "react";

import styles from "./ContactStyle.module.css";
import MailIcon from "@mui/icons-material/Mail";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import BusinessIcon from "@mui/icons-material/Business";

function ContactPage() {
  return (
    <div className={styles.contactWrapper}>
      <div className={styles.heading}>
        <h2 style={{fontWeight: 'bold'}}>Contact Us</h2>
      </div>
      <Grid
        container
        xs={12}
        columnSpacing={{ xs: 0, sm: 2 }}
        rowSpacing={{ xs: 2, sm: 0 }}
        className={styles.contentWrapper}
      >
        <Grid item xs={12} sm={6}>
          <Grid
            container
            className={styles.contactInfo}
            rowGap={{ xs: 1, sm: 2 }}
          >
            <Grid item xs={12} className={styles.items}>
              <div className={styles.item}>
                <div className={styles.logoWrapper}>
                  <MailIcon style={{fontSize: '2.5rem'}}/>
                </div>
                <div>
                  <h3>Email</h3>
                  <p className={styles.data}>gowheels@gmail.com</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className={styles.items}>
              <div className={styles.item}>
                <div className={styles.logoWrapper}>
                  <LocalPhoneIcon style={{fontSize: '2.5rem'}}/>
                </div>
                <div>
                  <h3>Phone No</h3>
                  <p className={styles.data}>7907763800 / 7907763800</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} className={styles.items}>
              <div className={styles.item}>
                <div className={styles.logoWrapper}>
                  <BusinessIcon style={{fontSize: '2.5rem'}}/>
                </div>
                <div>
                  <h3>Address</h3>
                  <p className={styles.data}>
                    gowheels, abc complex,vazhakkad junctioon, areecode
                    ,malappuram, kerala
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Grid container>
            <Grid item xs={12} sx={{ padding: "12px" }}>
              <iframe
                style={{ width: "100%", height: "400px" }}
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.447802159312!2d76.04291705258434!3d11.23499066981404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6465679d7400b%3A0xb70edbc19a1f7ba4!2sAreacode%20-%20Vazhakkad%20Rd%2C%20Surya%20Nagar%2C%20Areekode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1677497841968!5m2!1sen!2sin"
                id="my_map"
                allowfullscreen="true"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ContactPage;
