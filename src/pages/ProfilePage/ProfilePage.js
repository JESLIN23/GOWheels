import React, { useState } from 'react';
import styles from './ProfilePage.module.css';
import Footer from '../../components/Footer/Footer';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const validateEmail = (value) =>
  value.trim().length > 6 &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
const validateName = (value) => value.trim().length !== 0;
const validatePhone = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());
const validateDob = (value) => {
  let date = Date.now() - new Date(value).getTime();
  let age = new Date(date).getFullYear() - 1970;

  return value !== null && age > 17;
};

function ProfilePage() {
  const [file, setFile] = useState({ front: '', back: '' });
  const [data, setData] = useState({ name: '', phone: '', email: '', dob: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadFrontImg = (e) => {
    setFile({ ...file, front: URL.createObjectURL(e.target.files[0]) });
  };
  const uploadBackImg = (e) => {
    setFile({ ...file, back: URL.createObjectURL(e.target.files[0]) });
  };

  const validateHandler = () => {
    if (!data.name) {
      setErrorMessage('name cannot be empty');
      return;
    }
    if (!validateName(data.name)) {
      setErrorMessage('name is invalid');
      return;
    }
    if (!data.email) {
      setErrorMessage('email cannot be empty');
      return;
    }
    if (!validateEmail(data.email)) {
      setErrorMessage('email is invalid');
      return;
    }
    if (!data.phone) {
      setErrorMessage('phone cannot be empty');
      return;
    }
    if (!validatePhone(data.phone)) {
      setErrorMessage('phone is invalid');
      return;
    }
    if (!data.dob) {
      setErrorMessage('date of birth cannot be empty');
      return;
    }
    if (!validateDob(data.dob)) {
      setErrorMessage('age should be greaterthan 18');
      return;
    }
  };

  const userDataUpdateHandler = () => {
    const validate = validateHandler();
    setLoading(true)

    if (!validate) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }

    setLoading(false)
    setSuccessMessage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <h3>My Profile</h3>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <h5 style={{ marginBottom: 8 }}>Account information</h5>
        <Grid container>
          <Grid className={styles.profileImage} item md={3} xs={12}>
            <Avatar alt='Remy Sharp' src='' sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid className={styles.profileEdit} item md={9} xs={12}>
            <TextField
              id='outlined-basic'
              fullWidth
              defaultValue={data.name || ''}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              variant='outlined'
              sx={{ mb: 2 }}
              type='text'
              className={styles.input}
              //   error={error.name}
              //   helperText={error.name ? error.name : ''}
              label='Name'
            />
            <TextField
              id='outlined-basic'
              fullWidth
              defaultValue={data.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              variant='outlined'
              sx={{ mb: 2 }}
              type='text'
              className={styles.input}
              //   error={error.email}
              //   helperText={error.email ? error.email : ''}
              label='Email'
            />
            <TextField
              id='outlined-basic'
              fullWidth
              defaultValue={data.phone || ''}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              variant='outlined'
              sx={{ mb: 2 }}
              type='text'
              className={styles.input}
              //   error={error.phone}
              //   helperText={error.phone ? error.phone : ''}
              label='Phone No'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Date of Birth'
                onChange={(value) => {
                  setData({ ...data, dob: value });
                }}
                value={data.dob || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    className={styles.input}
                    // error={error.dob}
                    // helperText={error.dob ? error.dob : ''}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <h5 style={{ marginBottom: 16 }}>Driving License</h5>
        <Grid container className={styles.licenseWrapper}>
          <Grid className={styles.license} item xs={12} md={6}>
            {file.front && (
              <img src={file.front} alt='license image' id='image' className={styles.licenseImg} />
            )}
            <input type='file' className={styles.uploader} onChange={uploadFrontImg} />
            {!file.front && (
              <span className={styles.span}>
                Click to upload the front side of your driving license
              </span>
            )}
          </Grid>
          <Grid className={styles.license} item xs={12} md={6}>
            {file.back && (
              <img src={file.back} alt='license image' id='image' className={styles.licenseImg} />
            )}
            <input type='file' className={styles.uploader} onChange={uploadBackImg} />
            {!file.back && (
              <span className={styles.span}>
                Click to upload the back side of your driving license
              </span>
            )}
          </Grid>
        </Grid>
        <div className={styles.btnWrapper}>
          <div className={styles.messageWrapper}>
            {errorMessage && <h5 style={{ color: 'red', marginBottom: 16 }}>{errorMessage}</h5>}
            {successMessage && (
              <h5 style={{ color: 'green', marginBottom: 16 }}>{successMessage}</h5>
            )}
          </div>
          <Box sx={{ position: 'relative' }}>
            <Button className={styles.btn} disabled={loading} onClick={userDataUpdateHandler}>
              Save Changes
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: '#18776d',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
