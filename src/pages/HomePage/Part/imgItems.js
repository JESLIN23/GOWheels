import React from 'react';
import { Paper } from '@mui/material';
import styles from '../HomeStyle.module.css';

function Item({ item }) {
  return (
    <Paper
      style={{ boxShadow: 'none', display: 'flex', alignItem: 'center', justifyContent: 'center' }}
    >
      <img src={item.img} alt={item.title} className={styles.imgSize} />
    </Paper>
  );
}

export default Item;
