import React, { useState } from 'react';
import { NavLink, useNavigate, createSearchParams } from 'react-router-dom';

import styles from './NavBar.module.css';
// import logo from './c785ba2145e9497eb75dff1d147873ee.png'
import {
  Menu,
  MenuItem,
  Divider,
  Paper,
  MenuList,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ArticleIcon from '@mui/icons-material/Article';
import userContextHook from '../../hooks/userContextHook';
import { ROUTES } from '../../const';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const loginParams = { data: 'login' };
  const { loggedIn } = userContextHook();

  const redirectToLoginPage = () => {
    setShowMenu(false);
    navigate({
      pathname: `${ROUTES.LOGIN}`,
      search: `?${createSearchParams(loginParams)}`,
    });
  };

  let menuClasses = '';
  let linksWrapperClasses = '';
  let headerClasses = '';

  if (showMenu) {
    menuClasses = `${styles.menuBtnBurger} ${styles.menuBtnBurgerOpen}`;
    linksWrapperClasses = `${styles.linksWrapper} ${styles.linksWrapperOpen}`;
    headerClasses = `${styles.header} ${styles.headerOpen}`;
  } else {
    menuClasses = `${styles.menuBtnBurger}`;
    linksWrapperClasses = `${styles.linksWrapper}`;
    headerClasses = `${styles.header}`;
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const profilePageHandler = () => {
    setShowMenu(false);
    navigate(ROUTES.PROFILE);
    handleClose();
  };
  const termsPageHandler = () => {
    setShowMenu(false);
    navigate(ROUTES.TERMS_CONDETIONS);
    handleClose();
  };
  const privacyPageHandler = () => {
    setShowMenu(false);
    navigate(ROUTES.PRIVACY_POLICY);
    handleClose();
  };

  return (
    <div className={styles.NavBarWrapper}>
      <div className={styles.logos}>
        <div className={styles.menuBtn}>
          <span className={menuClasses} onClick={() => setShowMenu(!showMenu)}></span>
        </div>
        <div className={styles.logo}>
          <span>GO Wheels</span>
        </div>
      </div>
      <div className={linksWrapperClasses} onClick={() => setShowMenu(!showMenu)}>
        <header className={headerClasses} onClick={(event) => event.stopPropagation()}>
          <nav>
            <ul>
              <li>
                <NavLink
                  to={ROUTES.HOME}
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                  onClick={() => setShowMenu(false)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.ABOUTUS}
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                  end
                  onClick={() => setShowMenu(false)}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.FAQ}
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                  end
                  onClick={() => setShowMenu(false)}
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.OFFERS}
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                  end
                  onClick={() => setShowMenu(false)}
                >
                  Offers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={ROUTES.CONTACTUS}
                  className={({ isActive }) => (isActive ? styles.active : undefined)}
                  end
                  onClick={() => setShowMenu(false)}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <span onClick={handleClick} className={styles.headerText}>
                  Info
                  <KeyboardArrowDownIcon className={styles.headerText} />
                </span>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Paper sx={{ width: 200, maxWidth: '100%' }}>
                    <MenuList>
                      <MenuItem onClick={termsPageHandler}>
                        <ListItemIcon>
                          <ArticleIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Terms & Conditions</ListItemText>
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={privacyPageHandler}>
                        <ListItemIcon>
                          <PrivacyTipIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Privacy Policy</ListItemText>
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </Menu>
              </li>
              {!loggedIn && (
                <li>
                  <span onClick={redirectToLoginPage} className={styles.loginText}>
                    Login
                  </span>
                </li>
              )}
              {loggedIn && (
                <li>
                  <Avatar className={styles.avatar} alt='Remy Sharp' src='' onClick={profilePageHandler} />
                </li>
              )}
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default NavBar;
