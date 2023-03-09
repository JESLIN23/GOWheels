import React from 'react';
import Grid from '@mui/material/Grid';

import styles from '../../pages/HomePage/HomeStyle.module.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <Grid container xs={12} columnSpacing={{ md: 4, xs: 1 }} rowSpacing={{ xs: 1 }}>
        <Grid item xs={12} sm={6} md={3} className={styles.footerContent}>
          <div className={styles.promiseInfo}>
            <h2>GOWheels</h2>
            <p>
              GOWheels.com gives the best service to our customers. Customer satisfaction is our
              top-most priority.
            </p>
            <ul>
              <li>
                <Link to=''>
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link to=''>
                  <TwitterIcon />
                </Link>
              </li>
              <li>
                <Link to=''>
                  <InstagramIcon />
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.footerContent}>
          <div className={styles.comInfo}>
            <h4>INFORMATION</h4>
            <div className={styles.lineFooter}></div>
            <ul>
              <li>
                <Link to='/about'>
                  <ArrowRightAltIcon /> About
                </Link>
              </li>
              <li>
                <Link to='/about'>
                  <ArrowRightAltIcon /> Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to='/about'>
                  <ArrowRightAltIcon /> Privacy & Cookies Policy
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.footerContent}>
          <div className={styles.comInfo}>
            <h4>CUSTOMER SUPPORT</h4>
            <div className={styles.lineFooter}></div>
            <ul>
              <li>
                <Link to='/FAQ'>
                  <ArrowRightAltIcon /> FAQ
                </Link>
              </li>
              <li>
                <Link to='/home'>
                  <ArrowRightAltIcon /> How it works?
                </Link>
              </li>
              <li>
                <Link to='/contactus'>
                  <ArrowRightAltIcon /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.footerContent}>
          <div className={styles.comInfo}>
            <h4>HAVE QUESTION</h4>
            <div className={styles.lineFooter}></div>
            <ul>
              <li>
                <p>
                  <EmailIcon style={{ color: '#43D7C8' }} />
                  <span>jeslinmusthafa@gmail.com</span>
                </p>
              </li>
              <li>
                <p>
                  <LocalPhoneIcon style={{ color: '#43D7C8' }} />
                  <span> 7591986068 / 7907763800</span>
                </p>
              </li>
              <li>
                <Button>
                  <Link to='/contactus'>Sent Message</Link>
                </Button>
              </li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <div className={styles.line} style={{ color: '#18776D' }}></div>
        </Grid>
        <Grid xs={12} style={{ textAlign: 'center', fontSize: 14 }}>
          <p>Copyright @2023 GOToday</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
