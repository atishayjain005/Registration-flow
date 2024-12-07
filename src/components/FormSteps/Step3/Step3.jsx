import React from 'react';
import styles from './Step3.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const Step3 = () => {
  const { formData, updateFormData, goToNextStep, goToPreviousStep } = useFormContext();

  const addons = [
    { name: 'Online service', description: 'Access to multiplayer games', price: 1 },
    { name: 'Larger storage', description: 'Extra 1TB of cloud save', price: 2 },
    { name: 'Customizable profile', description: 'Custom theme on your profile', price: 2 },
  ];

  const handleAddonToggle = (addon) => {
    const newAddons = formData.addons.includes(addon)
      ? formData.addons.filter((a) => a !== addon)
      : [...formData.addons, addon];
    updateFormData('addons', newAddons);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pick add-ons</h2>
      <p className={styles.description}>
        Add-ons help enhance your gaming experience.
      </p>
      <div className={styles.addons}>
        {addons.map((addon) => (
          <label key={addon.name} className={styles.addon}>
            <input
              type="checkbox"
              checked={formData.addons.includes(addon.name)}
              onChange={() => handleAddonToggle(addon.name)}
            />
            <div className={styles.details}>
              <h3>{addon.name}</h3>
              <p>{addon.description}</p>
            </div>
            <span>
              +${addon.price}/{formData.planType === 'yearly' ? 'yr' : 'mo'}
            </span>
          </label>
        ))}
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

export default Step3;
