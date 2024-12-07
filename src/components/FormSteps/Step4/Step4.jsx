import React from 'react';
import styles from './Step4.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const Step4 = () => {
  const { formData, goToNextStep, goToPreviousStep } = useFormContext();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Finishing up</h2>
      <p className={styles.description}>Double-check everything looks OK before confirming.</p>
      <div className={styles.summary}>
        <h3>{formData.plan} ({formData.planType})</h3>
        <p>
          Add-ons: {formData.addons.length > 0 ? formData.addons.join(', ') : 'None'}
        </p>
      </div>
      <div className={styles.navigation}>
        <button type="button" onClick={goToPreviousStep} className={styles.backButton}>
          Go Back
        </button>
        <button type="button" onClick={goToNextStep} className={styles.confirmButton}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Step4;
