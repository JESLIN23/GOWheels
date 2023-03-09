import React from 'react';
import PopupLayout from '../layout/PopupLayout/PopupLayout';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import styles from './styles.module.css';
import Button from '@mui/material/Button';

function notSelectData(props) {
  const popupCloseHandler = () => {
    props.onClose();
  };

  return (
    <PopupLayout>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <ReportGmailerrorredIcon className={styles.icon} />
        </div>
        <div className={styles.warningInfo}>
          <h2>{props.data}</h2>
        </div>
        <div className={styles.btnWrapper}>
          <Button style={{padding: '0 1.5rem'}} onClick={popupCloseHandler}>ok</Button>
        </div>
      </div>
    </PopupLayout>
  );
}

export default notSelectData;
