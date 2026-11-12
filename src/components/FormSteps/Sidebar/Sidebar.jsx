import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const Sidebar = ({ currentStep }) => {
  const steps = ['Your Info', 'Select Plan', 'Add-Ons', 'Summary'];

  return (
    <ol className={styles.sidebar} aria-label="Registration progress">
      {steps.map((step, index) => (
        <li
          aria-current={currentStep === index + 1 ? 'step' : undefined}
          key={index}
          className={`${styles.step} ${currentStep === index + 1 ? styles.active : ''}`}
        >
          <div className={`${styles.stepNumber} ${currentStep === index + 1 ? styles.active : ''}`}>
            {index + 1}
          </div>
          <div className={styles.stepDetails}>
            <span>STEP {index + 1}</span>
            <h4>{step}</h4>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default Sidebar;

Sidebar.propTypes = { currentStep: PropTypes.number.isRequired };
