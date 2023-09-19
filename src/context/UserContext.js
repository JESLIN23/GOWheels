import React, { createContext, useEffect, useState } from 'react';

import AuthService from '../services/AuthService';
import { STORAGE_KEYS } from '../const';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const initiateLogin = async (credentials) => {
    const response = await AuthService.login(credentials);
    isLoggedIn();
    setUserProfile(response);
  };

  const initiateSignup = async (credentials) => {
    const response = await AuthService.signup(credentials);
    isLoggedIn();
    setUserProfile(response);
  };

  const initiateLogout = () => {
    return AuthService.logout();
  };

  const getUserProfile = async () => {
    try {
      const resp = await AuthService.userProfile();
      setUserProfile(resp?.data?.user);
    } catch (error) {
      console.error(error.message);
    }
  };

  const isLoggedIn = () => {
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (refreshToken && accessToken) {
      setLoggedIn(true);
      return true;
    } else {
      setLoggedIn(false);
      setUserProfile({});
      return false;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) {
      return;
    }
    isLoggedIn();
    getUserProfile().then();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        loggedIn,
        setUserProfile,
        initiateLogin,
        initiateSignup,
        initiateLogout,
        getUserProfile,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
