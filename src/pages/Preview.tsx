import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit3, Download, Share2, ExternalLink } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import SectionRenderer from '../components/SectionRenderer';

const Preview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, setCurrentProject } = useProject();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    if (id) {
      const project = projects.find(p => p.id === id);
      if (project) {
        setCurrentProject(project);
      }
    }
  }, [id, projects, setCurrentProject]);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePublish = () => {
    // In a real app, this would deploy the site
    alert(`Your website has been published! 🎉\n\nYou can access it at: ${currentProject?.name.toLowerCase().replace(/\s+/g, '-')}.templates.uz`);
  };

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Floating Header */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showHeader ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 right-4 z-50 bg-white rounded-2xl shadow-lg border border-gray-200"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{currentProject.name}</h1>
              <p className="text-sm text-gray-500">Live Preview</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/editor/${currentProject.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Publish
            </button>
            
            <button
              onClick={() => {
                navigator.share?.({
                  title: currentProject.name,
                  text: `Check out my website: ${currentProject.name}`,
                  url: window.location.href
                });
              }}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* Website Content */}
      <div className="pt-20">
        {currentProject.sections.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your website is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some sections to see your website come to life
              </p>
              <button
                onClick={() => navigate(`/editor/${currentProject.id}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Building
              </button>
            </div>
          </div>
        ) : (
          currentProject.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                isSelected={false}
                onSelect={() => {}}
                isPreview={true}
              />
            ))
        )}
      </div>

      {/* Success Message */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Preview Mode Active
        </motion.div>
      </div>
    </div>
  );
};

export default Preview;