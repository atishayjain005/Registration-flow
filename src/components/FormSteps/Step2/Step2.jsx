import React, { useState } from 'react';
import styles from './Step2.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const Step2 = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useFormContext();
  const [isYearly, setIsYearly] = useState(formData.planType === 'yearly');

  const handlePlanSelect = (plan) => {
    updateFormData('plan', plan);
    updateFormData('planType', isYearly ? 'yearly' : 'monthly');
  };

  const plans = [
    { name: 'Arcade', monthly: 9, yearly: 90 },
    { name: 'Advanced', monthly: 12, yearly: 120 },
    { name: 'Pro', monthly: 15, yearly: 150 },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Select your plan</h2>
      <p className={styles.description}>
        You have the option of monthly or yearly billing.
      </p>
      <div className={styles.plans}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            onClick={() => handlePlanSelect(plan.name)}
            className={`${styles.planCard} ${
              formData.plan === plan.name ? styles.selected : ''
            }`}
          >
            <h3>{plan.name}</h3>
            <p>
              ${isYearly ? plan.yearly : plan.monthly}/{isYearly ? 'yr' : 'mo'}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.billingToggle}>
        <span className={!isYearly ? styles.active : ''}>Monthly</span>
        <input
          type="checkbox"
          checked={isYearly}
          onChange={() => setIsYearly((prev) => !prev)}
        />
        <span className={isYearly ? styles.active : ''}>Yearly</span>
      </div>
      <div className={styles.navigation}>
        <button type="button" onClick={goToPreviousStep} className={styles.backButton}>
          Go Back
        </button>
        <button type="button" onClick={goToNextStep} className={styles.nextButton}>
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2;
