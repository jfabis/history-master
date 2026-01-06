import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Strona główna to Logowanie */}
        <Route path="/" element={<Login />} />
        
        {/* Callback z Google */}
        <Route path="/auth/success" element={<AuthSuccess />} />
        
        {/* Panel główny (dla zalogowanych) */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Fallback dla nieznanych tras */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;