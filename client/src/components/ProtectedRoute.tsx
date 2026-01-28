import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                // Weryfikacja tokenu przez próbę pobrania danych użytkownika
                await axios.get('http://localhost:3000/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsAuthenticated(true);
            } catch (error) {
                // Token nieprawidłowy lub wygasły
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        };

        verifyAuth();
    }, []);

    // Ładowanie - pokazuj loader
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-[#f0e6d2] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1e1e]"></div>
            </div>
        );
    }

    // Nieautoryzowany - przekieruj na login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Autoryzowany - renderuj chroniony komponent
    return <>{children}</>;
};

export default ProtectedRoute;
