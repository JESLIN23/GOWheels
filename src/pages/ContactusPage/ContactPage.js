import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

import React from 'react';

import carimg from './img/car.png';

import Link from '@mui/material/Link';
import styles from './ContactStyle.module.css';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';

import useForm from '../../hooks/use-form';
import TextInput from '../../util/TextInput/TextInput'
import Footer from '../../components/Footer/Footer'

const nameValidation = (value) => value.trim() !== '' && value.trim().length > 2;
const emailValidation = (value) =>
  value.trim().length > 6 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
const phoneValidation = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());
const messageValidation = (value) => value.trim().length > 0;

function ContactPage() {

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    // inputResetHandler: nameResetHandler,
  } = useForm(nameValidation);
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // inputResetHandler: emailResetHandler,
  } = useForm(emailValidation);
  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    // inputResetHandler: phoneResetHandler,
  } = useForm(phoneValidation);
  const {
    value: enteredMessage,
    isValid: messageIsValid,
    hasError: messageHasError,
    inputChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    // inputResetHandler: messageResetHandler,
  } = useForm(messageValidation);

  let formIsValid = false
  if(nameIsValid && phoneIsValid && messageIsValid && emailIsValid) formIsValid = true;

  const submitFormHandler = () => {

  }

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.heading}>
        <h2>Contact Us</h2>
      </div>
      <Grid
        container
        xs={12}
        columnSpacing={{ xs: 0, sm: 2 }}
        rowSpacing={{ xs: 2, sm: 0 }}
        className={styles.contentWrapper}
      >
        <Grid item xs={12} sm={6}>
          <Grid container className={styles.contactInfo} rowGap={{ xs: 1, sm: 2 }}>
            <Grid item xs={12} className={styles.items}>
              <div className={styles.item}>
                <div className={styles.logoWrapper}>
                  <Link
                    style={{ cursor: 'pointer' }}
                    to='#'
                    onClick={(e) => {
                      window.location.href = 'mailto:jeslinmusthafa6068@gmail.com';
                      e.preventDefault();
                    }}
                  >
                    <MailIcon style={{ fontSize: '2.5rem', color: '#18776d' }} />
                  </Link>
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
                  <LocalPhoneIcon style={{ fontSize: '2.5rem' }} />
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
                  <BusinessIcon style={{ fontSize: '2.5rem' }} />
                </div>
                <div>
                  <h3>Address</h3>
                  <p className={styles.data}>
                    gowheels, abc complex,vazhakkad junctioon, areecode ,malappuram, kerala
                  </p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container>
            <Grid item xs={12} sx={{ padding: '12px' }}>
              <iframe
                className={styles.mapSize}
                title='map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2845.447802159312!2d76.04291705258434!3d11.23499066981404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6465679d7400b%3A0xb70edbc19a1f7ba4!2sAreacode%20-%20Vazhakkad%20Rd%2C%20Surya%20Nagar%2C%20Areekode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1677497841968!5m2!1sen!2sin'
                id='my_map'
                allowfullscreen='true'
                loading='lazy'
              ></iframe>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div className={styles.heading}>
        <h2>Get In Touch With Us</h2>
      </div>
      <Grid container xs={12} className={styles.contentWrapper}>
        <Grid item sm={6} xs={12} className={styles.imgWrapper}>
          <img src={carimg} />
        </Grid>
        <Grid item sm={6} xs={12} className={styles.inputField}>
          <Grid container xs={12}>
              <Grid item xs={12}>
                <TextInput 
                  label= 'Name'
                  name= 'Name'
                  className={styles.input}
                  value= {enteredName || ''}
                  onChange= {nameChangeHandler}
                  onBlur= {nameBlurHandler}
                  error={nameHasError ? 'name should contain atleast 3 charactor' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput 
                  label= 'Email'
                  name= 'Email'
                  type='email'
                  className={styles.input}
                  value= {enteredEmail || ''}
                  onChange= {emailChangeHandler}
                  onBlur= {emailBlurHandler}
                  error={emailHasError ? 'Please provide a valid email' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput 
                  label= 'Phone No:'
                  name= 'PhoneNo'
                  type='number'
                  className={styles.input}
                  value= {enteredPhone || ''}
                  onChange= {phoneChangeHandler}
                  onBlur= {phoneBlurHandler}
                  error={phoneHasError ? 'Please provide a valid phone number' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput 
                  label= 'Message'
                  name= 'Message'
                  placeholder='Please enter your message'
                  className={styles.input}
                  value= {enteredMessage || ''}
                  onChange= {messageChangeHandler}
                  onBlur= {messageBlurHandler}
                  error={messageHasError ? 'Message should not be empty' : ''}
                  multiline
                />
              </Grid>
          </Grid>
          <div className={styles.btnWrapper}>
            <Button variant="contained" disabled={!formIsValid} onClick={submitFormHandler}>send message</Button>
          </div>
        </Grid>
      </Grid>
      <Footer/>
    </div>
  );
}

export default ContactPage;
