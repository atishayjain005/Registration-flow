import React from 'react';
import styles from './Step1.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const Step1 = () => {
  const { formData, updateFormData, goToNextStep } = useFormContext();

  const handleNext = () => {
    if (formData.name && formData.email && formData.phone) {
      goToNextStep();
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal Info</h2>
      <p className={styles.description}>
        Please provide your name, email address, and phone number.
      </p>
      <form className={styles.form}>
        <label>
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            placeholder="e.g. Stephen King"
            className={styles.input}
          />
        </label>
        <label>
          Email Address
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="e.g. stephenking@lorem.com"
            className={styles.input}
          />
        </label>
        <label>
          Phone Number
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="e.g. +1 234 567 890"
            className={styles.input}
          />
        </label>
        <button type="button" onClick={handleNext} className={styles.nextButton}>
          Next Step
        </button>
      </form>
    </div>
  );
};

export default Step1;
