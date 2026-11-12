import { useEffect, useRef } from 'react';
import Sidebar from '../../components/FormSteps/Sidebar/Sidebar';
import { useFormContext } from '../../contexts/FormContext';
import Step1 from '../../components/FormSteps/Step1/Step1';
import Step2 from '../../components/FormSteps/Step2/Step2';
import Step3 from '../../components/FormSteps/Step3/Step3';
import Step4 from '../../components/FormSteps/Step4/Step4';
import Final from '../../components/FormSteps/Final/Final';
import styles from './MultiStepForm.module.css';

const MultiStepForm = () => {
  const { currentStep } = useFormContext();
  const contentRef = useRef(null);
  useEffect(() => {
    const heading = contentRef.current?.querySelector('h2');
    heading?.setAttribute('tabindex', '-1');
    heading?.focus();
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Final />;
      default:
        return <Step1 />;
    }
  };

  return (
    <main className={styles.container} aria-label="Registration demo">
      <div className={styles.sidebar}>
        <Sidebar currentStep={currentStep} />
      </div>
      <div ref={contentRef} className={styles.content}>
        {renderStep()}
      </div>
    </main>
  );
};

export default MultiStepForm;
