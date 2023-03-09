import React from 'react';

import styles from './FAQStyles.module.css';
import Slider from './Slider';
import Footer from '../../components/Footer/Footer';

const FAQPage = () => {
  return (
    <div className={styles.faqWrapper}>
      <div className={styles.heading}>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className={styles.questions}>
        <Slider />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default FAQPage;
