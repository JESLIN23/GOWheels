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

// const validateEmail = (value) =>
//   value.trim().length > 6 &&
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(value);
// const validateName = (value) => value.trim().length !== 0;
// const validatePhone = (value) => value.trim().length === 10 && /^[4-9]+[0-9]/i.test(value.trim());

function ProfilePage() {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [logout, setLogout] = useState(false);
  const [isShowSaveButton, setIsShowSaveButton] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const navigate = useNavigate();
  const { userProfile, initiateLogout, isLoggedIn, setUserProfile } = userContextHook();
  const { postSuccessAlert, postErrorAlert } = useContext(AlertMessageContext);

  const uploadFrontImg = (e) => {
    setUpdatedData({ ...updatedData, licence_front: e.target.files[0] });
  };
  const uploadBackImg = (e) => {
    setUpdatedData({ ...updatedData, licence_back: e.target.files[0] });
  };
  const uploadUserImg = (e) => {
    setUpdatedData({ ...updatedData, avatar: e.target.files[0] });
  };

  // const validateHandler = () => {
  //   if (!validateName(updatedFields?.name)) {
  //     setErrorMessage('name is invalid');
  //     return;
  //   }
  //   if (!validateEmail(updatedFields?.email)) {
  //     setErrorMessage('email is invalid');
  //     return;
  //   }
  //   if (!validatePhone(updatedFields?.phone)) {
  //     setErrorMessage('phone is invalid');
  //     return;
  //   }
  // };

  const userDataUpdateHandler = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (updatedData?.avatar) formData.append('avatar', updatedData?.avatar);
      if (updatedData?.licence_front) formData.append('licence_front', updatedData?.licence_front);
      if (updatedData?.licence_back) formData.append('licence_back', updatedData?.licence_back);
      const response = await UserServices.updateUser(formData);
      setData(response);
      setUserProfile(response);
      setUpdatedData({});
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
      postErrorAlert(error?.message)
    } finally {
      postSuccessAlert('Logout successfully');
      setData({});
      setUpdatedData({});
      setLogout(false);
      navigate(ROUTES.HOME);
    }
  };

  const getAvatarSrc = () => {
    if (updatedData?.avatar) {
      return URL.createObjectURL(updatedData.avatar);
    } else if (data?.avatar) {
      return data.avatar;
    }
  };

  const getLicenceFrontSrc = () => {
    if (updatedData?.licence_front) {
      return URL.createObjectURL(updatedData?.licence_front);
    } else if (data?.driving_licence?.front_img) {
      return data?.driving_licence?.front_img;
    }
  };

  const getLicenceBackSrc = () => {
    if (updatedData?.licence_back) {
      return URL.createObjectURL(updatedData.licence_back);
    } else if (data?.driving_licence?.back_img) {
      return data?.driving_licence?.back_img;
    }
  };

  const isAnyChangeOnUserData = useCallback(() => {
    return (
      updatedData?.licence_front !== data?.driving_licence?.front_img ||
      updatedData?.licence_back !== data?.driving_licence?.back_img ||
      updatedData?.avatar !== data?.avatar
    );
  }, [updatedData?.licence_front, updatedData?.licence_back, updatedData?.avatar]);

  useEffect(() => {
    if (!userProfile) return;
    setData(userProfile);
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
              disabled
              label='First name'
              className={styles.input}
              value={data?.firstName || ''}
              // onChange={(e) => setData({ ...data, firstName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              label='Second name'
              disabled
              className={styles.input}
              value={data?.secondName || ''}
              // onChange={(e) => setData({ ...data, secondName: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              disabled
              label='Email'
              className={styles.input}
              value={data?.email || ''}
              // onChange={(e) => setData({ ...data, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              id='outlined-basic'
              variant='outlined'
              fullWidth
              disabled
              label='Phone'
              className={styles.input}
              value={data?.phone || ''}
              // onChange={(e) => setData({ ...data, phone: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginTop: 16, marginBottom: 16 }} />
        <h5 style={{ marginBottom: 16 }}>Driving License</h5>
        <Grid container className={styles.licenseWrapper}>
          <Grid className={styles.license} item xs={12} md={6}>
            {(data?.driving_licence?.front_img || updatedData?.licence_front) && (
              <img
                src={getLicenceFrontSrc()}
                alt='license image'
                id='image'
                className={styles.licenseImg}
              />
            )}
            <input type='file' className={styles.uploader} onChange={uploadFrontImg} />
            {!data?.driving_licence?.front_img && !updatedData?.licence_front && (
              <span className={styles.span}>
                Click to upload the front side of your driving license
              </span>
            )}
          </Grid>
          <Grid className={styles.license} item xs={12} md={6}>
            {(data?.driving_licence?.back_img || updatedData?.licence_back) && (
              <img
                src={getLicenceBackSrc()}
                alt='license image'
                id='image'
                className={styles.licenseImg}
              />
            )}
            <input type='file' className={styles.uploader} onChange={uploadBackImg} />
            {!data?.driving_licence?.back_img && !updatedData?.licence_back && (
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
