import React, { useState } from 'react'
import PopupLayout from '../layout/PopupLayout/PopupLayout'
import Button from '@mui/material/Button';
import styles from './styles.module.css'


function DropoffPoint({ data, DropoffLocationInfo, onClose }) {
    const [dropoffLOC, setDropoffLOC] = useState(null);
    const [dropoffLocation, setDropoffLocation] = useState(null);
  
    if (dropoffLOC && dropoffLocation) {
      DropoffLocationInfo({ city: dropoffLOC[0], location: dropoffLocation });
    }
  
    const popupCloseHandler = () => {
      onClose('Please Select Dropoff Point');
    };
  
    return (
      <PopupLayout>
        <div className={styles.headerWrapper}>
          <h2>{dropoffLOC ? 'Select Your Dropoff Location' : 'Select Your Dropoff City'}</h2>
        </div>
        <div className={styles.contentWrapper}>
          {!dropoffLOC &&
            Object.entries(data).map((val, index) => (
              <div key={index} className={styles.dataWrapper} onClick={() => setDropoffLOC(val)}>
                <h3>{val[0]}</h3>
              </div>
            ))}
          {dropoffLOC &&
            dropoffLOC[1].map((val, index) => (
              <div key={index} className={styles.dataWrapper} onClick={() => setDropoffLocation(val)}>
                <h3>{val}</h3>
              </div>
            ))}
        </div>
        <div className={styles.btnWrapper}>
          <Button onClick={popupCloseHandler}>cancel</Button>
        </div>
      </PopupLayout>
    );
}

export default DropoffPoint