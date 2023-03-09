import React, { useState, useEffect } from 'react';
import styles from './LoginStyle.module.css';
import Footer from '../../components/Footer/Footer';
import useForm from '../../hooks/use-form';
import { Grid, TextField } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// import styled from '@emotion/styled';

const validateEmail = (value) =>
  value.trim().length > 6 &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
const validatePassword = (value) => value.trim().length > 7;
const validateName = (value) => value.trim().length !== 0;
const validatePhone = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());
const validateGender = (value) => value !== 'male' || 'female' || 'other';
const validatePC = (value, password) => value.length > 7 && value === password;
const validateDob = (value) => {
  let date = Date.now() - new Date(value).getTime();
  let age = new Date(date).getFullYear() - 1970;

  return value !== null && age > 17;
};

function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(true);
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState();
  const [showPassword, setShowPassword] = React.useState(false);

  const loginParams = { data: 'login' };
  const signupParams = { data: 'signup' };

  const redirectToLogin = () => {
    navigate({
      pathname: '/login',
      search: `?${createSearchParams(loginParams)}`,
    });
  };
  const redirectToSignup = () => {
    navigate({
      pathname: '/login',
      search: `?${createSearchParams(signupParams)}`,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // const newParams = Object.fromEntries([...searchParams]);
    // setUser(newParams.data);
    setUser(searchParams.get('data'));
  }, [searchParams]);

  const [date, setDate] = useState(null);

  let dobIsValid = validateDob(date);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    // inputResetHandler: emailResetHandler,
  } = useForm(validateEmail);
  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    // inputResetHandler: passwordResetHandler,
  } = useForm(validatePassword);

  const {
    value: enteredFirstname,
    isValid: firstnameIsValid,
    hasError: firstnameHasError,
    inputChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    // inputResetHandler: firstnameResetHandler,
  } = useForm(validateName);
  const {
    value: enteredSecondname,
    isValid: secondnameIsValid,
    hasError: secondnameHasError,
    inputChangeHandler: secondnameChangeHandler,
    inputBlurHandler: secondnameBlurHandler,
    // inputResetHandler: secondnameResetHandler,
  } = useForm(validateName);
  const {
    value: selectedGender,
    isValid: genderIsValid,
    hasError: genderHasError,
    inputChangeHandler: genderChangeHandler,
    inputBlurHandler: genderBlurHandler,
    // inputResetHandler: genderResetHandler,
  } = useForm(validateGender);
  // const {
  //   value: selectedDob,
  //   isValid: dobIsValid,
  //   hasError: dobHasError,
  //   inputChangeHandler: dobChangeHandler,
  //   inputBlurHandler: dobBlurHandler,
  //   // inputResetHandler: dobResetHandler,
  // } = useForm(validateDob);
  const {
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    // inputResetHandler: phoneResetHandler,
  } = useForm(validatePhone);
  // const {
  //   value: enteredPasswordConfirm,
  //   // isValid: passwordConfirmIsValid,
  //   // hasError: passwordConfirmHasError,
  //   inputChangeHandler: passwordConfirmChangeHandler,
  //   inputBlurHandler: passwordConfirmBlurHandler,
  //   // inputResetHandler: passwordConfirmResetHandler,
  // } = useForm(validatePasswordConfirm);

  const passwordConfirmBlurHandler = () => {
    setPasswordConfirmIsValid(validatePC(enteredPasswordConfirm, enteredPassword));
  };

  let loginFormIsValid = false;
  if (emailIsValid && passwordIsValid) {
    loginFormIsValid = true;
  }
  let signupFormIsValid = false;
  if (
    emailIsValid &&
    passwordIsValid &&
    firstnameIsValid &&
    secondnameIsValid &&
    genderIsValid &&
    phoneIsValid &&
    dobIsValid &&
    passwordConfirmIsValid
  ) {
    signupFormIsValid = true;
  }

  const userLoginHandler = () => {};

  const userSignupHandler = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          {user === 'login' && (
            <>
              <h2>LOGIN</h2>
              <Grid container xs={12}>
                <Grid item xs={12}>
                  <TextField
                    label='Email'
                    placeholder='Enter Your Email'
                    name='email'
                    defaultValue={enteredEmail || ''}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    type='email'
                    className={styles.input}
                    error={emailHasError}
                    helperText={emailHasError ? 'Please enter a valid email' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      placeholder='Enter Your Password'
                      name='password'
                      defaultValue={enteredPassword || ''}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      variant='outlined'
                      sx={{ mb: 2 }}
                      type={showPassword ? 'text' : 'password'}
                      className={styles.input}
                      error={passwordHasError}
                      helperText={passwordHasError ? 'Password is incorrect' : ''}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  </FormControl>
                </Grid>
                <div className={styles.forget}>
                  <FormGroup>
                    <FormControlLabel
                      className={styles.fogetLink}
                      control={<Checkbox />}
                      label='Remember Password?'
                    />
                  </FormGroup>
                  <Link to='#'>Forget Password?</Link>
                </div>
                <div className={styles.btn}>
                  <Button disabled={!loginFormIsValid} onClick={userLoginHandler}>
                    login
                  </Button>
                </div>
                <div className={styles.redirect}>
                  <h5>
                    New User? <span onClick={redirectToSignup}> SIGNUP</span>
                  </h5>
                </div>
              </Grid>
            </>
          )}

          {user === 'signup' && (
            <>
              <h2>SIGNUP</h2>
              <Grid container xs={12} columnSpacing={{ sm: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='First Name'
                    name='first name'
                    defaultValue={enteredFirstname || ''}
                    onChange={firstnameChangeHandler}
                    onBlur={firstnameBlurHandler}
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    type='text'
                    className={styles.input}
                    error={firstnameHasError}
                    helperText={firstnameHasError ? 'Please enter first name' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Second Name'
                    name='second name'
                    defaultValue={enteredSecondname || ''}
                    onChange={secondnameChangeHandler}
                    onBlur={secondnameBlurHandler}
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    type='text'
                    className={styles.input}
                    error={secondnameHasError}
                    helperText={secondnameHasError ? 'Please enter second name' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='outlined-select-currency'
                    select
                    label='Gender'
                    defaultValue={selectedGender || ''}
                    onChange={genderChangeHandler}
                    onBlur={genderBlurHandler}
                    error={genderHasError}
                    fullWidth
                    className={styles.input}
                    helperText={genderHasError ? 'Please select your gender' : ''}
                  >
                    <MenuItem value={'male'}>male</MenuItem>
                    <MenuItem value={'female'}>female</MenuItem>
                    <MenuItem value={'other'}>other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Email'
                    name='email'
                    defaultValue={enteredEmail || ''}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    type='email'
                    className={styles.input}
                    error={emailHasError}
                    helperText={emailHasError ? 'Please enter a valid email' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label='Phone No'
                    name='phone'
                    defaultValue={enteredPhone || ''}
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    variant='outlined'
                    fullWidth
                    sx={{ mb: 2 }}
                    type='number'
                    className={styles.input}
                    error={phoneHasError}
                    helperText={phoneHasError ? 'Please enter a valid phone number' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label='Date of Birth'
                      onChange={(value) => {
                        setDate(value);
                      }}
                      value={date || ''}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className={styles.input}
                          helperText={'Age should be greater than 18'}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      name='password'
                      defaultValue={enteredPassword || ''}
                      onChange={passwordChangeHandler}
                      onBlur={passwordBlurHandler}
                      variant='outlined'
                      sx={{ mb: 2 }}
                      type={showPassword ? 'text' : 'password'}
                      className={styles.input}
                      error={passwordHasError}
                      helperText={
                        passwordHasError ? 'Password should contain atleast 8 charactor' : ''
                      }
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>Confirm Password</InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      name='password'
                      defaultValue={enteredPasswordConfirm || ''}
                      onChange={(e) => setEnteredPasswordConfirm(e.target.value)}
                      onBlur={passwordConfirmBlurHandler}
                      variant='outlined'
                      sx={{ mb: 2 }}
                      type={showPassword ? 'text' : 'password'}
                      className={styles.input}
                      error={!passwordConfirmIsValid}
                      helperText={!passwordConfirmIsValid ? 'Passwords are not same' : ''}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Confirm Password'
                    />
                  </FormControl>
                </Grid>
                <div className={styles.btn}>
                  <Button disabled={!signupFormIsValid} onClick={userSignupHandler}>
                    SIGNUP
                  </Button>
                </div>
                <div className={styles.redirect}>
                  <h5>
                    Already have an account? <span onClick={redirectToLogin}> LOGIN</span>
                  </h5>
                </div>
              </Grid>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
