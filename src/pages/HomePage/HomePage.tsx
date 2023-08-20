import SuccessSnackbar from 'components/SuccessSnackbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function HomePage() {
  const location = useLocation();
  const [message, setMessage] = useState<string | null>(location.state?.message || null);
  return (
    <div>
      <h2>Home Page</h2>
      <SuccessSnackbar message={message} onClose={() => setMessage(null)} />
    </div>
  );
}

export default HomePage;
