import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from './contexts/DndContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProjectProvider } from './contexts/ProjectContext';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import './index.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ProjectProvider>
          <DndProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/editor/:id?" element={<Editor />} />
                <Route path="/preview/:id" element={<Preview />} />
              </Routes>
            </div>
          </DndProvider>
        </ProjectProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;