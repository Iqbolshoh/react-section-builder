import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/editor/:id?" element={<Editor />} />
              <Route path="/preview/:id" element={<Preview />} />
            </Routes>
          </DndProvider>
        </ProjectProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;