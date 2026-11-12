import { plans, addons } from '../../../data/catalog';
import styles from './Step4.module.css';
import { useFormContext } from '../../../contexts/FormContext';

const Step4 = () => {
  const { formData, goToNextStep, goToPreviousStep } = useFormContext();

  const planPrice = plans.find((plan) => plan.name === formData.plan)?.[formData.planType] ?? 0;
  const selectedAddons = addons.filter((addon) => formData.addons.includes(addon.name));
  const total = planPrice + selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const period = formData.planType === 'yearly' ? 'yr' : 'mo';

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Finishing up</h2>
      <p className={styles.description}>Double-check everything looks OK before confirming.</p>
      <div className={styles.summary}>
        <h3>{formData.plan} ({formData.planType})</h3>
        <p>Plan: ${planPrice}/{period}</p>
        <ul>{selectedAddons.map((addon) => <li key={addon.name}>{addon.name}: +${addon.price}/{period}</li>)}</ul>
        {selectedAddons.length === 0 && <p>No add-ons selected.</p>}
        <p><strong>Total: ${total}/{period}</strong></p>
        <p>Demo only. Confirming does not create an account or charge you.</p>
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
