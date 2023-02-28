import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css";
// import logo from './c785ba2145e9497eb75dff1d147873ee.png'

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    setShowMenu(false)
     navigate("/login", { replace: true })
    };

  let menuClasses = "";
  let linksWrapperClasses = ''
  let headerClasses = ''

  if (showMenu) {
    menuClasses = `${styles.menuBtnBurger} ${styles.menuBtnBurgerOpen}`
    linksWrapperClasses = `${styles.linksWrapper} ${styles.linksWrapperOpen}`
    headerClasses = `${styles.header} ${styles.headerOpen}`
  } else {
    menuClasses = `${styles.menuBtnBurger}`
    linksWrapperClasses = `${styles.linksWrapper}`
    headerClasses = `${styles.header}`
  }


  return (
    <div className={styles.NavBarWrapper}>
      <div className={styles.logos}>
        <div className={styles.menuBtn}>
          <span
            className={menuClasses}
            onClick={() => setShowMenu(!showMenu)}
          ></span>
        </div>
        <div className={styles.logo}>
          <span>GO Wheels</span>
        </div>
      </div>
      <div className={linksWrapperClasses}>
        <header className={headerClasses}>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  onClick={() => setShowMenu(false)}
                  end
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  end
                  onClick={() => setShowMenu(false)}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/FAQ"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  end
                  onClick={() => setShowMenu(false)}
                >
                  FAQ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/offers"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  end
                  onClick={() => setShowMenu(false)}
                >
                  Offers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                  end
                  onClick={() => setShowMenu(false)}
                >
                  Contact Us
                </NavLink>
              </li>
              <li className={styles.login}>
                <button
                  onClick={redirectToLoginPage}
                  className={styles.btn}
                  end
                >
                  Login
                </button>

                <button
                  onClick={redirectToLoginPage}
                  className={styles.btn}
                  end
                >
                  Signup
                </button>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default NavBar;
