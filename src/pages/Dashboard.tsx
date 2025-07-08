import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit3,
  Eye,
  Trash2,
  Search,
  Grid,
  List,
  Sparkles,
  Zap,
  Palette,
  Globe,
  Star,
  TrendingUp,
  Users,
  Clock,
  Filter,
  MoreVertical,
  Folder,
  Calendar,
  BarChart3,
  ChevronDown,
  LayoutTemplate
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import WebsiteSetupModal from '../components/WebsiteSetupModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'updated' | 'created'>('updated');
  // const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'favorites'>('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = projects
    .filter(project => project.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const stats = [
    { label: 'Total Websites', value: projects.length, icon: Globe, color: 'text-teal-500', bg: 'bg-teal-50' },
    { label: 'Active Projects', value: projects.length, icon: Zap, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'Total Sections', value: projects.reduce((acc, p) => acc + p.sections.length, 0), icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'This Month', value: projects.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' }
  ];

  const projectColors = [
    'bg-gradient-to-br from-teal-100 to-teal-50',
    'bg-gradient-to-br from-indigo-100 to-indigo-50',
    'bg-gradient-to-br from-purple-100 to-purple-50',
    'bg-gradient-to-br from-amber-100 to-amber-50',
    'bg-gradient-to-br from-blue-100 to-blue-50',
    'bg-gradient-to-br from-emerald-100 to-emerald-50'
  ];

  const getRandomColor = (id: string) => {
    const index = id.charCodeAt(0) % projectColors.length;
    return projectColors[index];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-xl bg-opacity-80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent font-sans">
                  templates.uz
                </h1>
                <p className="text-sm text-gray-500 font-medium">Professional Website Builder</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your websites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-80 bg-gray-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white focus:border-gray-200 transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                    ? 'bg-white shadow-sm text-teal-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                    ? 'bg-white shadow-sm text-teal-500'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowSetupModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-xl hover:from-teal-600 hover:to-indigo-700 transition-all duration-200 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">New Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">All systems operational</span>
            </div>

            <h2 className="text-5xl font-bold text-gray-900 mb-4 font-sans">
              Welcome back! 👋
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
              Create stunning, professional websites with our advanced drag-and-drop builder.
              Choose from beautiful themes and customize everything to match your brand perfectly.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create New Project */}
        <motion.button
          whileHover={{ scale: 1.01, y: -4 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setShowSetupModal(true)}
          className="w-full mb-12 border-2 border-dashed border-indigo-200 rounded-3xl p-12 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300 bg-white group"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-3 font-sans">
              Create Your Next Masterpiece
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors text-lg font-medium">
              Start building your beautiful website with our advanced drag-and-drop builder
            </p>
          </div>
        </motion.button>

        {/* Projects Section */}
        {filteredProjects.length > 0 ? (
          <div>
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 font-sans">Your Websites</h3>
                <p className="text-gray-500 font-medium">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'website' : 'websites'} •
                  Last updated {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Sort */}
                <div className="relative flex-1 sm:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'updated' | 'created')}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-full text-gray-700 font-medium"
                  >
                    <option value="updated">Last Updated</option>
                    <option value="created">Date Created</option>
                    <option value="name">Name</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-medium">
                  <Filter className="w-4 h-4" />
                  <span className="hidden sm:inline">Filter</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className={`grid gap-8 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group ${viewMode === 'list' ? 'flex items-center gap-6' : ''
                    }`}
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  {/* Project Preview */}
                  <div className={`relative overflow-hidden rounded-t-2xl ${getRandomColor(project.id)} ${viewMode === 'list' ? 'w-32 h-24 flex-shrink-0 rounded-l-2xl rounded-r-none' : 'h-48 mb-6'
                    }`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <LayoutTemplate className="w-8 h-8 text-teal-500" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-3 right-3 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-float"></div>
                    <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-3 w-1 h-1 bg-pink-400 rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>
                  </div>

                  {/* Project Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors font-sans">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Folder className="w-4 h-4" />
                            {project.sections.length} sections
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(project.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Active
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(selectedProject === project.id ? null : project.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editor/${project.id}`);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-xl hover:bg-teal-100 transition-colors text-sm font-semibold"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${project.id}`);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-semibold"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>

                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-colors text-sm font-semibold"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Context Menu */}
                  <AnimatePresence>
                    {selectedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-4 top-16 bg-white shadow-lg rounded-xl border border-gray-200 z-10 w-48 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          Add to favorites
                        </button>
                        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          Share
                        </button>
                        <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          Schedule
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id, e);
                            setSelectedProject(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Palette className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 font-sans">
              {searchTerm ? 'No websites found' : 'No websites yet'}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg font-medium">
              {searchTerm
                ? 'Try adjusting your search term to find your projects'
                : 'Create your first website to get started with our powerful builder'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowSetupModal(true)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-indigo-600 text-white rounded-xl hover:from-teal-600 hover:to-indigo-700 transition-all duration-200 shadow-sm text-lg font-medium mx-auto"
              >
                <Plus className="w-5 h-5" />
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