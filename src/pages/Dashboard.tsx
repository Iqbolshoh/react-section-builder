import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Eye, Trash2, Search, Grid, List, Palette, Sparkles } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import WebsiteSetupModal from '../components/WebsiteSetupModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSetupModal, setShowSetupModal] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  templates.uz
                </h1>
                <p className="text-xs text-gray-500">Website Builder</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white/50 backdrop-blur-sm"
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
              Welcome back! 👋
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create stunning websites with our powerful drag-and-drop builder. 
              Choose from beautiful themes and customize everything to match your brand.
            </p>
          </motion.div>
        </div>

        {/* Create New Project */}
        <motion.button
          whileHover={{ scale: 1.01, y: -2 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setShowSetupModal(true)}
          className="w-full mb-8 border-2 border-dashed border-blue-300 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group bg-white/50 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
              Create New Website
            </h3>
            <p className="text-gray-600 group-hover:text-blue-500 transition-colors">
              Start building your beautiful website with our advanced builder
            </p>
          </div>
        </motion.button>

        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Websites</h3>
              <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'website' : 'websites'}
              </span>
            </div>
            
            <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
              }`}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-white/50 ${viewMode === 'list' ? 'flex' : ''
                    }`}
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  {/* Project Preview */}
                  <div className={`bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 ${viewMode === 'list' ? 'w-32 h-24' : 'h-48'
                    } flex items-center justify-center relative overflow-hidden`}>
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Palette className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-400 rounded-full opacity-40"></div>
                    <div className="absolute top-1/2 left-2 w-1 h-1 bg-pink-400 rounded-full opacity-50"></div>
                  </div>

                  {/* Project Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {project.sections.length} sections • Updated {new Date(project.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Active
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editor/${project.id}`);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors text-sm font-semibold"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${project.id}`);
                        }}
                        className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>

                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors text-sm font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {searchTerm ? 'No projects found' : 'No websites yet'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? 'Try adjusting your search term to find your projects' 
                : 'Create your first website to get started with our powerful builder'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowSetupModal(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg"
              >
                Create Your First Website
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Website Setup Modal */}
      <WebsiteSetupModal 
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
      />
    </div>
  );
};

export default Dashboard;