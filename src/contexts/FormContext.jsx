import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

// Create the context
const FormContext = createContext();

// Create a provider component
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    planType: 'monthly',
    addons: [],
  });

  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', plan: '', planType: 'monthly', addons: [] });
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider
      value={{
        resetForm,
        formData,
        updateFormData,
        currentStep,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// Hook to use the FormContext
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

FormProvider.propTypes = { children: PropTypes.node.isRequired };
