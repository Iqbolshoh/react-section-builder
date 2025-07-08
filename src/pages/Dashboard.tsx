import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  SortDesc,
  MoreVertical,
  Folder,
  Calendar,
  BarChart3
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
  const [filterBy, setFilterBy] = useState<'all' | 'recent' | 'favorites'>('all');

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
    { label: 'Total Websites', value: projects.length, icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Projects', value: projects.length, icon: Zap, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Total Pages', value: projects.reduce((acc, p) => acc + p.pages.length, 0), icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'This Month', value: projects.filter(p => new Date(p.createdAt).getMonth() === new Date().getMonth()).length, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="min-h-screen platform-bg-secondary">
      {/* Header */}
      <div className="platform-bg-primary border-b platform-border sticky top-0 z-40 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 platform-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold platform-gradient-primary bg-clip-text text-transparent platform-font-primary">
                  templates.uz
                </h1>
                <p className="text-sm platform-text-secondary platform-font-secondary">Professional Website Builder</p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 platform-text-tertiary w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search your websites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-80 input focus-ring"
                />
              </div>

              <div className="flex items-center gap-2 platform-bg-tertiary rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'platform-bg-primary brand-primary platform-shadow-sm' 
                      : 'platform-text-secondary hover:platform-text-primary'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'platform-bg-primary brand-primary platform-shadow-sm' 
                      : 'platform-text-secondary hover:platform-text-primary'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setShowSetupModal(true)}
                className="btn-primary"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Website</span>
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
            <div className="inline-flex items-center gap-2 platform-bg-primary px-4 py-2 rounded-full platform-shadow-sm mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium platform-text-secondary">All systems operational</span>
            </div>
            
            <h2 className="text-5xl font-bold platform-text-primary mb-4 platform-font-primary">
              Welcome back! 👋
            </h2>
            <p className="text-xl platform-text-secondary max-w-3xl mx-auto platform-font-secondary leading-relaxed">
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
                className="card-elevated text-center"
              >
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold platform-text-primary mb-1">{stat.value}</div>
                <div className="text-sm platform-text-secondary font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create New Project */}
        <motion.button
          whileHover={{ scale: 1.01, y: -4 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setShowSetupModal(true)}
          className="w-full mb-12 border-2 border-dashed border-indigo-200 rounded-3xl p-12 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-300 group platform-bg-primary"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 platform-gradient-primary rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 platform-shadow-lg">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold platform-text-primary group-hover:brand-primary transition-colors mb-3 platform-font-primary">
              Create Your Next Masterpiece
            </h3>
            <p className="platform-text-secondary group-hover:platform-text-primary transition-colors text-lg platform-font-secondary">
              Start building your beautiful website with our advanced drag-and-drop builder
            </p>
          </div>
        </motion.button>

        {/* Projects Section */}
        {filteredProjects.length > 0 ? (
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold platform-text-primary platform-font-primary">Your Websites</h3>
                <p className="platform-text-secondary platform-font-secondary">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'website' : 'websites'} • 
                  Last updated {new Date().toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="input w-auto"
                >
                  <option value="updated">Last Updated</option>
                  <option value="created">Date Created</option>
                  <option value="name">Name</option>
                </select>

                <button className="btn-ghost">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className={`grid gap-8 ${
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
                  className={`card-elevated cursor-pointer group ${
                    viewMode === 'list' ? 'flex items-center gap-6' : ''
                  }`}
                  onClick={() => navigate(`/editor/${project.id}`)}
                >
                  {/* Project Preview */}
                  <div className={`relative overflow-hidden rounded-2xl ${
                    viewMode === 'list' ? 'w-32 h-24 flex-shrink-0' : 'h-48 mb-6'
                  }`}>
                    <div className="absolute inset-0 platform-gradient-primary opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 platform-bg-primary rounded-2xl flex items-center justify-center platform-shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Palette className="w-8 h-8 brand-primary" />
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
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold platform-text-primary mb-2 group-hover:brand-primary transition-colors platform-font-primary">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm platform-text-secondary platform-font-secondary">
                          <div className="flex items-center gap-1">
                            <Folder className="w-4 h-4" />
                            {project.pages.length} pages
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
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 hover:platform-bg-tertiary rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 platform-text-tertiary" />
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
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors text-sm font-semibold"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/preview/${project.id}`);
                        }}
                        className="flex items-center gap-2 px-4 py-2 platform-bg-tertiary platform-text-secondary rounded-xl hover:platform-bg-primary hover:platform-text-primary transition-colors text-sm font-semibold"
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
            <div className="w-32 h-32 platform-bg-tertiary rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Palette className="w-16 h-16 platform-text-tertiary" />
            </div>
            <h3 className="text-3xl font-bold platform-text-primary mb-4 platform-font-primary">
              {searchTerm ? 'No websites found' : 'No websites yet'}
            </h3>
            <p className="platform-text-secondary mb-8 max-w-md mx-auto text-lg platform-font-secondary">
              {searchTerm 
                ? 'Try adjusting your search term to find your projects' 
                : 'Create your first website to get started with our powerful builder'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowSetupModal(true)}
                className="btn-primary text-lg px-8 py-4"
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