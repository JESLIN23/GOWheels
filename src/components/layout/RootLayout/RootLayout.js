import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './RootLayout.module.css';
import NavBar from '../../NavBar/NavBar';

function RootLayout() {
  return (
    <div className={styles.ContentsWrapper}>
      <div className={styles.NavBarWrapper}>
        <NavBar />
      </div>
      <div className={styles.PagesWrapper}>
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
