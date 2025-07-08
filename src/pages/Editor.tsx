import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  ArrowLeft,
  Plus,
  Settings,
  Eye,
  Download,
  Save,
  Menu,
  X,
  Check,
  Sparkles,
  Palette,
  Layers,
  Code,
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useTheme } from '../contexts/ThemeContext';
import SectionSelector from '../components/SectionSelector';
import SectionRenderer from '../components/SectionRenderer';
import ThemeCustomizer from '../components/ThemeCustomizer';
import { generateCompleteHTML } from '../utils/htmlExporter';
import AddSectionButton from '../components/AddSectionButton';

const Editor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject, reorderSections } = useProject();
  const { currentTheme } = useTheme();
  const [showSectionSelector, setShowSectionSelector] = useState(false);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [id, projects, setCurrentProject]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !currentProject) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      const sections = [...currentProject.sections];
      const activeIndex = sections.findIndex(section => section.id === activeId);
      const overIndex = sections.findIndex(section => section.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const [removed] = sections.splice(activeIndex, 1);
        sections.splice(overIndex, 0, removed);

        const updatedSections = sections.map((section, index) => ({
          ...section,
          order: index
        }));

        reorderSections(updatedSections);
      }
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    setTimeout(() => {
      setIsSaving(false);
      setEditingSection(null);
    }, 1000);
  };

  const handleExport = () => {
    if (currentProject && currentTheme) {
      const htmlContent = generateCompleteHTML(currentProject, currentTheme);
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${currentProject.name.replace(/\s+/g, '-').toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Show success message
      alert('Website exported successfully! The HTML file has been downloaded.');
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 100);
    }
  };

  const generateHTMLExport = (project: any, theme: any) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <h1>Website: ${project.name}</h1>
    <p>Sections: ${project.sections.length}</p>
    <!-- Website content would be rendered here -->
</body>
</html>`;
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen platform-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="platform-text-secondary text-lg">Loading your project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen platform-bg-secondary flex flex-col">
      {/* Mobile Header */}
      <div className="platform-bg-primary border-b platform-border px-4 py-4 lg:hidden platform-shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:platform-bg-tertiary rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 platform-text-secondary" />
            </button>
            <div>
              <h1 className="text-lg font-bold platform-text-primary truncate max-w-32 platform-font-primary">{currentProject.name}</h1>
              <p className="text-xs platform-text-secondary platform-font-secondary">{currentProject.sections.length} sections</p>
            </div>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 hover:platform-bg-tertiary rounded-xl transition-colors"
          >
            {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4"
            >
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setShowSectionSelector(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 platform-gradient-primary text-white rounded-xl hover:opacity-90 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>

                <button
                  onClick={() => {
                    setShowThemeCustomizer(true);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Palette className="w-4 h-4" />
                  Theme
                </button>

                <button
                  onClick={() => navigate(`/preview/${currentProject.id}`)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-semibold platform-shadow-md"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 text-sm font-semibold platform-shadow-md"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : editingSection ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {isSaving ? 'Saving...' : editingSection ? 'Done' : 'Save'}
                </button>
              </div>

              <button
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all text-sm font-semibold platform-shadow-md"
              >
                <Download className="w-4 h-4" />
                Export HTML
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block platform-bg-primary border-b platform-border px-6 py-5 platform-shadow-md backdrop-blur-xl bg-white/95">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-3 hover:platform-bg-tertiary rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 platform-text-secondary" />
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 platform-gradient-primary rounded-2xl flex items-center justify-center platform-shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold platform-text-primary platform-font-primary">{currentProject.name}</h1>
                <p className="text-sm platform-text-secondary platform-font-secondary">
                  {currentProject.sections.length} sections • Last saved {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSectionSelector(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>

            <button
              onClick={() => setShowThemeCustomizer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-semibold platform-shadow-lg"
            >
              <Palette className="w-4 h-4" />
              Customize
            </button>

            <button
              onClick={() => navigate(`/preview/${currentProject.id}`)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold platform-shadow-lg"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 font-semibold platform-shadow-lg"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : editingSection ? (
                <Check className="w-4 h-4" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? 'Saving...' : editingSection ? 'Done Editing' : 'Save'}
            </button>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-semibold platform-shadow-lg"
            >
              <Code className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex">
        {/* Canvas */}
        <div className="flex-1 overflow-auto">
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={currentProject.sections.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="min-h-full" style={{ fontFamily: currentTheme?.fonts?.primary }}>
                {currentProject.sections.length === 0 ? (
                  <div className="h-full flex items-center justify-center p-8">
                    <div className="text-center max-w-lg">
                      <div className="relative mb-8">
                        <div className="w-24 h-24 platform-gradient-primary rounded-3xl flex items-center justify-center mx-auto platform-shadow-xl">
                          <Layers className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold platform-text-primary mb-4 platform-font-primary">
                        Ready to Build Something Amazing?
                      </h3>
                      <p className="platform-text-secondary mb-8 text-lg platform-font-secondary leading-relaxed">
                        Start by adding your first section. Choose from headers, heroes, content blocks, and more to create your perfect website.
                      </p>
                      <button
                        onClick={() => setShowSectionSelector(true)}
                        className="btn-primary text-lg px-8 py-4"
                      >
                        <Plus className="w-5 h-5" />
                        Add Your First Section
                      </button>
                    </div>
                  </div>
                ) : (
                  currentProject.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                      <React.Fragment key={section.id}>
                        {index === 0 && (
                          <AddSectionButton 
                            onAdd={() => {
                              setShowSectionSelector(true);
                              setSelectedSection(null);
                            }}
                            position="above"
                            theme={currentTheme}
                          />
                        )}
                        <SectionRenderer
                          section={section}
                          isSelected={selectedSection === section.id}
                          onSelect={() => setSelectedSection(section.id)}
                          theme={currentTheme}
                          isEditing={editingSection === section.id}
                          onEdit={(editing) => {
                            if (editing) {
                              setEditingSection(section.id);
                            } else {
                              setEditingSection(null);
                            }
                          }}
                        />
                        <AddSectionButton 
                          onAdd={() => {
                            setShowSectionSelector(true);
                            setSelectedSection(null);
                          }}
                          position="below"
                          theme={currentTheme}
                        />
                      </React.Fragment>
                    ))
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Modals */}
      {showSectionSelector && (
        <SectionSelector
          onClose={() => setShowSectionSelector(false)}
          onSelect={() => setShowSectionSelector(false)}
        />
      )}

      {showThemeCustomizer && (
        <ThemeCustomizer
          onClose={() => setShowThemeCustomizer(false)}
        />
      )}
    </div>
  );
};

export default Editor;