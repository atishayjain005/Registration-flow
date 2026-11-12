import { useState } from 'react';
import styles from './Step1.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email Address', type: 'email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone Number', type: 'tel', autoComplete: 'tel' },
];

export default function Step1() {
  const { formData, updateFormData, goToNextStep } = useFormContext();
  const [errors, setErrors] = useState({});

  const handleNext = (event) => {
    event.preventDefault();
    const nextErrors = {};
    for (const field of fields) {
      if (!formData[field.name].trim()) nextErrors[field.name] = `${field.label} is required.`;
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    const phone = formData.phone.trim();
    if (phone && (!/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15)) {
      nextErrors.phone = 'Enter a phone number with 7–15 digits.';
    }
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      event.currentTarget.elements.namedItem(firstError).focus();
      return;
    }
    for (const field of fields) updateFormData(field.name, formData[field.name].trim());
    goToNextStep();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Personal Info</h2>
      <p className={styles.description}>Please provide your name, email address, and phone number.</p>
      <form className={styles.form} onSubmit={handleNext} noValidate>
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input id={field.name} name={field.name} type={field.type}
              autoComplete={field.autoComplete} required maxLength={field.name === 'phone' ? 30 : 254}
              value={formData[field.name]} className={styles.input}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              onChange={(event) => updateFormData(field.name, event.target.value)} />
            {errors[field.name] && <p id={`${field.name}-error`} className={styles.error}>{errors[field.name]}</p>}
          </div>
        ))}
        <button type="submit" className={styles.nextButton}>Next Step</button>
      </form>
    </div>
  );
}
