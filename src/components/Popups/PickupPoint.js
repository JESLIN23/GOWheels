import React, { useState } from 'react';
import PopupLayout from '../layout/PopupLayout/PopupLayout';
import Button from '@mui/material/Button';
import styles from './styles.module.css';

function PickupPoint({ data, PickupLocationInfo, onClose }) {
  const [pickupLOC, setPickupLOC] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);

  if (pickupLOC && pickupLocation) {
    PickupLocationInfo({ pickup_city: pickupLOC[0], pickup_location: pickupLocation });
  }

  const popupCloseHandler = () => {
    onClose('Please Select Pickup Point');
  };

  return (
    <PopupLayout>
      <div className={styles.headerWrapper}>
        <h2>{pickupLOC ? 'Select Your Pickup Location' : 'Select Your Pickup City'}</h2>
      </div>
      <div className={styles.contentWrapper}>
        {!pickupLOC &&
          Object.entries(data).map((val, index) => (
            <div key={index} className={styles.dataWrapper} onClick={() => setPickupLOC(val)}>
              <h4>{val[0]}</h4>
            </div>
          ))}
        {pickupLOC &&
          pickupLOC[1].map((val, index) => (
            <div key={index} className={styles.dataWrapper} onClick={() => setPickupLocation(val)}>
              <h4>{val}</h4>
            </div>
          ))}
      </div>
      <div className={styles.btnWrapper}>
        <Button onClick={popupCloseHandler}>cancel</Button>
      </div>
    </PopupLayout>
  );
}

export default PickupPoint;
