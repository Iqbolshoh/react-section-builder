import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit3, Eye, Trash2, Search, Grid, List, Palette } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, createProject, deleteProject } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreating, setIsCreating] = useState(false);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateProject = () => {
    setIsCreating(true);
    const newProject = createProject(`Website ${projects.length + 1}`);
    
    setTimeout(() => {
      setIsCreating(false);
      navigate(`/editor/${newProject.id}`);
    }, 1000);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">templates.uz</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Create and manage your beautiful websites</p>
        </div>

        {/* Create New Project */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCreateProject}
          disabled={isCreating}
          className="w-full mb-8 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
        >
          <div className="flex flex-col items-center justify-center">
            {isCreating ? (
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            ) : (
              <Plus className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-4 transition-colors" />
            )}
            <h3 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
              {isCreating ? 'Creating new project...' : 'Create New Website'}
            </h3>
            <p className="text-gray-500 group-hover:text-blue-500 transition-colors">
              Start building your beautiful website
            </p>
          </div>
        </motion.button>

        {/* Projects List */}
        {filteredProjects.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
                onClick={() => navigate(`/editor/${project.id}`)}
              >
                {/* Project Preview */}
                <div className={`bg-gradient-to-br from-blue-100 to-purple-100 ${
                  viewMode === 'list' ? 'w-32 h-24' : 'h-48'
                } flex items-center justify-center`}>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                
                {/* Project Info */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {project.sections.length} sections • Updated {new Date(project.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/editor/${project.id}`);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/preview/${project.id}`);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No projects found' : 'No projects yet'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search term' : 'Create your first website to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;