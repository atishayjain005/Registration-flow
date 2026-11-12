import { useFormContext } from '../../../contexts/FormContext';

export default function Final() {
  const { resetForm } = useFormContext();
  return (
    <div>
      <h2>Demo complete</h2>
      <p>You have completed the registration preview. No account was created, no payment was taken, and your details were not sent to a server.</p>
      <button type="button" onClick={resetForm}>Start again</button>
    </div>
  );
}
