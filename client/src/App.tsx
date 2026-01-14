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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/drill" element={<DrillMode />} />
        <Route path="/study" element={<StudyMode />} />
        <Route path="/timeline" element={<TimelineMode />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ai" element={<AIMode />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;