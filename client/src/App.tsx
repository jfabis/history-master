import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import DrillMode from './pages/DrillMode';
import StudyMode from './pages/StudyMode';
import TimelineMode from './pages/TimelineMode'; // <--- NOWY IMPORT

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/drill" element={<DrillMode />} />
        <Route path="/study" element={<StudyMode />} />
        
        {/* Nowa trasa osi czasu */}
        <Route path="/timeline" element={<TimelineMode />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;