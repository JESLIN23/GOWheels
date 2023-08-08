import React, { useState, useEffect, useContext, useCallback } from 'react';
import styles from './ProfilePage.module.css';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import AlertMessageContext from '../../context/AlertMessageContext';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import AlertLayout from '../../components/layout/AlertLayout/AlertLayout';
import { ROUTES } from '../../const';
import LogoutIcon from '@mui/icons-material/Logout';
import userContextHook from '../../hooks/userContextHook';
import UserServices from '../../services/UserServices';

const validateEmail = (value) =>
  value.trim().length > 6 &&
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
const validateName = (value) => value.trim().length !== 0;
const validatePhone = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());

function ProfilePage() {
  const [drivingLicence, setDrivingLicence] = useState({ front: null, back: null });
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [isShowSaveButton, setIsShowSaveButton] = useState(false);
  const [prevData, setPrevData] = useState({});

  const navigate = useNavigate();
  const { userProfile, initiateLogout, isLoggedIn, getUserProfile } = userContextHook();
  const { postSuccessAlert } = useContext(AlertMessageContext);

  const uploadFrontImg = (e) => {
    setDrivingLicence({ ...drivingLicence, front: e.target.files[0] });
  };
  const uploadBackImg = (e) => {
    setDrivingLicence({ ...drivingLicence, back: e.target.files[0] });
  };
  const uploadUserImg = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setAvatar(selectedFile);
    }
  };

  const validateHandler = () => {
    if (!data?.name) {
      setErrorMessage('name cannot be empty');
      return;
    }
    if (!validateName(data?.name)) {
      setErrorMessage('name is invalid');
      return;
    }
    if (!data?.email) {
      setErrorMessage('email cannot be empty');
      return;
    }
    if (!validateEmail(data?.email)) {
      setErrorMessage('email is invalid');
      return;
    }
    if (!data?.phone) {
      setErrorMessage('phone cannot be empty');
      return;
    }
    if (!validatePhone(data?.phone)) {
      setErrorMessage('phone is invalid');
      return;
    }
  };

  const userDataUpdateHandler = async () => {
    const validate = validateHandler();

    if (!validate) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
    setLoading(true);
    try {
      if (avatar) {
        await UserServices.addUserImage(data?.id, avatar);
      }
      if (drivingLicence?.front) {
        await UserServices.addDrivingLicenceFront(data?.id, drivingLicence.front);
      }
      if (drivingLicence?.back) {
        await UserServices.addDrivingLicenceBack(data?.id, drivingLicence.back);
      }
      if (isAnyChangesOnUserInfo()) {
        const response = await UserServices.updateUser(data);
        setData(response);
      } else {
        await getUserProfile();
      }

      postSuccessAlert('Updated successfully');
    } catch (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const logoutHandler = () => {
    setLogout(true);
  };
  const logoutConfirmHandler = async () => {
    try {
      await initiateLogout();
      isLoggedIn();
    } catch (error) {
      console.log('Error while logging out', error);
    } finally {
      postSuccessAlert('Logout successfully');
      setData({});
      setPrevData({});
      setLogout(false);
      navigate(ROUTES.HOME);
    }
  };

  const getAvatarSrc = () => {
    if (avatar) {
      return URL.createObjectURL(avatar);
    } else if (data?.avatar) {
      return data.avatar;
    }
  };

  const getLicenceFrontSrc = () => {
    if (drivingLicence?.front) {
      return URL.createObjectURL(drivingLicence?.front);
    } else if (data?.driving_licence?.front) {
      return data?.driving_licence?.front;
    }
  };

  const getLicenceBackSrc = () => {
    if (drivingLicence?.back) {
      return URL.createObjectURL(drivingLicence?.back);
    } else if (data?.driving_licence?.back) {
      return data?.driving_licence?.back;
    }
  };

  const isAnyChangesOnUserInfo = () => {
    return (
      data?.firstName !== prevData?.firstName ||
      data?.secondName !== prevData?.secondName ||
      data?.email !== prevData?.email ||
      data?.phone !== prevData?.phone
    );
  };

  const isAnyChangeOnUserData = useCallback(() => {
    return (
      data?.firstName !== prevData?.firstName ||
      data?.secondName !== prevData?.secondName ||
      data?.email !== prevData?.email ||
      data?.phone !== prevData?.phone ||
      avatar !== null ||
      drivingLicence?.front !== null ||
      drivingLicence?.back !== null
    );
  }, [
    data?.firstName,
    data?.secondName,
    data?.email,
    data?.phone,
    prevData?.firstName,
    prevData?.secondName,
    prevData?.email,
    prevData?.phone,
    avatar,
    drivingLicence?.front,
    drivingLicence?.back,
  ]);

  useEffect(() => {
    if (!userProfile) return;
    setData(userProfile);
    setPrevData(userProfile);
  }, [userProfile?.id]);

  useEffect(() => {
    setIsShowSaveButton(isAnyChangeOnUserData());
  }, [isShowSaveButton, isAnyChangeOnUserData]);

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <div className={styles.pageHeader}>
          <h3>My Profile</h3>
          <Button className={styles.btn} onClick={logoutHandler}>
            <LogoutIcon style={{ marginRight: '5px' }} />
            logout
          </Button>
        </div>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <h5 style={{ marginBottom: 8 }}>Account information</h5>
        <Grid container>
          <Grid className={styles.profileImage} item md={3} xs={12}>
            <input type='file' className={styles.uploader} onChange={uploadUserImg} />
            <Avatar src={getAvatarSrc()} sx={{ width: 120, height: 120 }} />
          </Grid>
          <Grid className={styles.profileEdit} item md={9} xs={12}>
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='First name'
              className={styles.input}
              value={data?.firstName || ''}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Second name'
              className={styles.input}
              value={data?.secondName || ''}
              onChange={(e) => setData({ ...data, secondName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Email'
              className={styles.input}
              value={data?.email || ''}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Phone'
              className={styles.input}
              value={data?.phone || ''}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <h5 style={{ marginBottom: 16 }}>Driving License</h5>
        <Grid container className={styles.licenseWrapper}>
          <Grid className={styles.license} item xs={12} md={6}>
            {(data?.driving_licence?.front || drivingLicence?.front) && (
              <img
                src={getLicenceFrontSrc()}
                alt='license image'
                id='image'
                className={styles.licenseImg}
              />
            )}
            <input type='file' className={styles.uploader} onChange={uploadFrontImg} />
            {!data?.driving_licence?.front && !drivingLicence?.front && (
              <span className={styles.span}>
                Click to upload the front side of your driving license
              </span>
            )}
          </Grid>
          <Grid className={styles.license} item xs={12} md={6}>
            {(data?.driving_licence?.back || drivingLicence?.back) && (
              <img
                src={getLicenceBackSrc()}
                alt='license image'
                id='image'
                className={styles.licenseImg}
              />
            )}
            <input type='file' className={styles.uploader} onChange={uploadBackImg} />
            {!data?.driving_licence?.back && !drivingLicence?.back && (
              <span className={styles.span}>
                Click to upload the back side of your driving license
              </span>
            )}
          </Grid>
        </Grid>
        <div className={styles.btnWrapper}>
          <div className={styles.messageWrapper}>
            {errorMessage && <h5 style={{ color: 'red', marginBottom: 16 }}>{errorMessage}</h5>}
          </div>
          <Box sx={{ position: 'relative' }}>
            <Button
              className={styles.btn}
              disabled={isShowSaveButton === false}
              onClick={userDataUpdateHandler}
            >
              Save Changes
              {loading && (
                <CircularProgress
                  size={16}
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
            </Button>
          </Box>
        </div>
      </div>

      <Footer />

      {logout && (
        <AlertLayout
          head='Logout Alert'
          message='Are you sure you want to continue ? '
          handleClose={() => setLogout(false)}
          handleAgree={logoutConfirmHandler}
        />
      )}
    </div>
  );
}

export default ProfilePage;
