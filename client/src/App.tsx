import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import DrillMode from './pages/DrillMode';
import StudyMode from './pages/StudyMode';
import TimelineMode from './pages/TimelineMode';
import Profile from './pages/Profile';
import AIMode from './pages/AIMode';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        <Route path="/drill" element={<ProtectedRoute><DrillMode /></ProtectedRoute>} />
        <Route path="/study" element={<ProtectedRoute><StudyMode /></ProtectedRoute>} />
        <Route path="/timeline" element={<ProtectedRoute><TimelineMode /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AIMode /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;