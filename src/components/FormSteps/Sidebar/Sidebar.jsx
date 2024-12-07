import React from 'react';
// import styles from './Sidebar.module.css';

const Sidebar = ({ currentStep }) => {
  const steps = ['Your Info', 'Select Plan', 'Add-Ons', 'Summary'];

  return (
    <div className={styles.sidebar}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`${styles.step} ${currentStep === index + 1 ? styles.active : ''}`}
        >
          <div className={styles.stepNumber}>{index + 1}</div>
          <div className={styles.stepDetails}>
            <span>STEP {index + 1}</span>
            <h4>{step}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
