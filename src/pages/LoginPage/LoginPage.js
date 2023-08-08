import React, { useState, useEffect, useContext } from 'react';
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import styles from './LoginStyle.module.css';
import Footer from '../../components/Footer/Footer';
import useForm from '../../hooks/use-form';
import Loader from '../../util/Loading/loading';
import UserContext from '../../context/UserContext';
import {
  Button,
  InputAdornment,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Grid,
  TextField,
  FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ROUTES } from '../../const';

// import styled from '@emotion/styled';

const validateEmail = (value) =>
  value.trim().length > 6 &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
const validatePassword = (value) => value.trim().length > 7;
const validateName = (value) => value.trim().length !== 0;
const validatePhone = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());
const validatePC = (value, password) => value.length > 7 && value === password;

function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { initiateLogin, initiateSignup } = useContext(UserContext);

  const [user, setUser] = useState('');
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(true);
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const loginParams = { data: 'login' };
  const signupParams = { data: 'signup' };

  const redirectToLogin = () => {
    navigate({
      pathname: `${ROUTES.LOGIN}`,
      search: `?${createSearchParams(loginParams)}`,
    });
  };
  const redirectToSignup = () => {
    navigate({
      pathname: `${ROUTES.LOGIN}`,
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
    value: enteredPhone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    // inputResetHandler: phoneResetHandler,
  } = useForm(validatePhone);

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
    phoneIsValid &&
    passwordConfirmIsValid
  ) {
    signupFormIsValid = true;
  }

  const userLoginHandler = async () => {
    setIsLoading(true);
    try {
      await initiateLogin({ email: enteredEmail, password: enteredPassword });
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error?.message);
    }
    setIsLoading(false);
  };

  const userSignupHandler = async () => {
    setIsLoading(true);
    try {
      await initiateSignup({
        firstName: enteredFirstname,
        secondName: enteredSecondname,
        email: enteredEmail,
        phone: enteredPhone,
        password: enteredPassword,
        passwordConfirm: enteredPasswordConfirm,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.login}>
          {user === 'login' && (
            <>
              <h3>LOGIN</h3>
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
                    <FormHelperText id='outlined-weight-helper-text' error={Boolean(loginError)}>
                      {loginError ? loginError : ''}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <div className={styles.forget}>
                  <Link to='#'>Forget Password?</Link>
                </div>
                <div className={styles.btn}>
                  <Button disabled={!loginFormIsValid} onClick={userLoginHandler}>
                    <Loader isOpen={isLoading} />
                    login
                  </Button>
                </div>
                <div className={styles.redirect}>
                  <h6>
                    New User? <span onClick={redirectToSignup}> SIGNUP</span>
                  </h6>
                </div>
              </Grid>
            </>
          )}

          {user === 'signup' && (
            <>
              <h3>SIGNUP</h3>
              <Grid container xs={12} columnSpacing={{ sm: 1 }}>
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
                    <Loader isOpen={isLoading} />
                    SIGNUP
                  </Button>
                </div>
                <div className={styles.redirect}>
                  <h6>
                    Already have an account? <span onClick={redirectToLogin}> LOGIN</span>
                  </h6>
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
