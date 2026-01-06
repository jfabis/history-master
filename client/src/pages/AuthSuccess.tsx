import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Pobierz token z URL (?token=xyz...)
    const token = searchParams.get('token');

    if (token) {
      // 2. Zapisz token w localStorage
      localStorage.setItem('token', token);
      
      // 3. Przekieruj do panelu głównego
      navigate('/dashboard');
    } else {
      // Jeśli brak tokena, wróć do logowania
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">Logowanie powiodło się...</h2>
        <p className="text-gray-500">Przekierowywanie do aplikacji.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;