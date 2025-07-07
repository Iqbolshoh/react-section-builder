import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IconSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  currentIcon?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({ isOpen, onClose, onSelect, currentIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Get all available Lucide icons
  const allIcons = Object.keys(LucideIcons).filter(name => 
    name !== 'default' && 
    name !== 'createLucideIcon' &&
    typeof (LucideIcons as any)[name] === 'function'
  );

  // Categorize icons for better organization
  const iconCategories = {
    'Business & Finance': [
      'Briefcase', 'Building', 'Building2', 'Calculator', 'Calendar', 'ChartBar', 'ChartLine', 
      'ChartPie', 'Coins', 'CreditCard', 'DollarSign', 'Euro', 'FileText', 'Handshake', 
      'LineChart', 'PieChart', 'Receipt', 'Target', 'TrendingUp', 'Wallet'
    ],
    'Technology & Development': [
      'Code', 'Code2', 'CodeSquare', 'Computer', 'Cpu', 'Database', 'Globe', 'HardDrive', 
      'Laptop', 'Monitor', 'MousePointer', 'Rocket', 'Server', 'Smartphone', 'Tablet', 
      'Terminal', 'Wifi', 'Zap', 'Bug', 'GitBranch'
    ],
    'Communication & Social': [
      'AtSign', 'Bell', 'BellRing', 'Hash', 'Heart', 'Mail', 'MessageCircle', 'MessageSquare', 
      'Phone', 'PhoneCall', 'Send', 'Share', 'Share2', 'ThumbsUp', 'Users', 'Users2', 
      'UserCheck', 'UserPlus', 'Video', 'Mic'
    ],
    'Design & Creative': [
      'Brush', 'Camera', 'ColorPalette', 'Crop', 'Edit', 'Edit2', 'Edit3', 'Image', 'Layers', 
      'Move', 'Paintbrush', 'Palette', 'Pen', 'PenTool', 'Scissors', 'Sparkles', 'Type', 
      'Wand', 'Wand2', 'Aperture'
    ],
    'Navigation & Interface': [
      'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ChevronDown', 'ChevronLeft', 
      'ChevronRight', 'ChevronUp', 'ChevronsDown', 'ChevronsLeft', 'ChevronsRight', 
      'ChevronsUp', 'Home', 'Menu', 'MoreHorizontal', 'MoreVertical', 'Navigation', 
      'Plus', 'Minus', 'X'
    ],
    'Media & Entertainment': [
      'Film', 'Headphones', 'Music', 'Music2', 'Music3', 'Music4', 'Pause', 'Play', 
      'PlayCircle', 'Radio', 'Repeat', 'Shuffle', 'SkipBack', 'SkipForward', 'Speaker', 
      'Volume', 'Volume1', 'Volume2', 'VolumeX', 'Youtube'
    ],
    'Health & Medical': [
      'Activity', 'Bandage', 'Cross', 'Dna', 'Heart', 'HeartHandshake', 'Pill', 'Plus', 
      'Stethoscope', 'Syringe', 'Thermometer', 'Zap', 'Shield', 'ShieldCheck', 'Smile', 
      'Frown', 'Meh', 'Baby', 'User'
    ],
    'Shopping & E-commerce': [
      'Bag', 'ShoppingBag', 'ShoppingCart', 'Store', 'Tag', 'Tags', 'Package', 'Package2', 
      'PackageCheck', 'PackageMinus', 'PackagePlus', 'PackageSearch', 'PackageX', 'Gift', 
      'GiftCard', 'Truck', 'CreditCard', 'Banknote'
    ],
    'Travel & Transportation': [
      'Car', 'Plane', 'Train', 'Bus', 'Bike', 'Ship', 'Truck', 'MapPin', 'Map', 'Navigation', 
      'Navigation2', 'Compass', 'Route', 'Road', 'Fuel', 'Luggage', 'Passport', 'Ticket', 
      'Clock', 'Calendar'
    ],
    'Food & Dining': [
      'Apple', 'Beef', 'Beer', 'Cake', 'Cherry', 'Coffee', 'Cookie', 'Croissant', 'Egg', 
      'Fish', 'Grape', 'IceCream', 'Lemon', 'Milk', 'Pizza', 'Salad', 'Sandwich', 'Soup', 
      'UtensilsCrossed', 'Wine', 'ChefHat'
    ],
    'Weather & Nature': [
      'Cloud', 'CloudDrizzle', 'CloudLightning', 'CloudRain', 'CloudSnow', 'Sun', 'Moon', 
      'Star', 'Sunrise', 'Sunset', 'Thermometer', 'Umbrella', 'Wind', 'Leaf', 'Tree', 
      'TreePine', 'Flower', 'Flower2', 'Mountain', 'Waves'
    ],
    'Security & Safety': [
      'Shield', 'ShieldAlert', 'ShieldCheck', 'ShieldX', 'Lock', 'LockKeyhole', 'Unlock', 
      'Key', 'Eye', 'EyeOff', 'Fingerprint', 'Scan', 'ScanLine', 'AlertTriangle', 
      'AlertCircle', 'AlertOctagon', 'Ban', 'CheckCircle'
    ],
    'Sports & Fitness': [
      'Activity', 'Dumbbell', 'Bike', 'Football', 'Trophy', 'Award', 'Medal', 'Target', 
      'Zap', 'Timer', 'Stopwatch', 'Flag', 'FlagTriangleRight', 'Mountain', 'Waves', 
      'Flame', 'Heart', 'Footprints', 'MapPin', 'Route'
    ],
    'Education & Learning': [
      'Book', 'BookOpen', 'BookMarked', 'GraduationCap', 'School', 'Library', 'Pencil', 
      'PenTool', 'Calculator', 'Ruler', 'Compass', 'Globe', 'Languages', 'Lightbulb', 
      'Brain', 'Microscope', 'TestTube', 'Atom', 'FlaskConical'
    ],
    'General & Miscellaneous': [
      'Star', 'Sparkles', 'Award', 'Badge', 'Bookmark', 'Flag', 'Gift', 'HelpCircle', 
      'Info', 'Lightbulb', 'Puzzle', 'Search', 'Settings', 'Sliders', 'Tool', 'Wrench', 
      'Hammer', 'Screwdriver', 'Cog', 'Settings2'
    ]
  };

  // Filter icons based on search term
  const filteredIcons = searchTerm 
    ? allIcons.filter(icon => 
        icon.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allIcons;

  const handleIconSelect = (iconName: string) => {
    onSelect(iconName);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl system-bg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="system-bg-primary text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Choose an Icon</h2>
              <p className="mt-1 text-white text-opacity-90">
                Select from over 1000+ beautiful icons
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white hover:bg-opacity-20 rounded-xl transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 w-5 h-5" />
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] system-bg">
          {searchTerm ? (
            // Search Results
            <div>
              <h3 className="text-lg font-bold system-text mb-4">
                Search Results ({filteredIcons.length})
              </h3>
              <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                {filteredIcons.map((iconName) => {
                  const Icon = (LucideIcons as any)[iconName];
                  return (
                    <motion.button
                      key={iconName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleIconSelect(iconName)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        currentIcon === iconName
                          ? 'system-bg-primary text-white border-transparent'
                          : 'bg-white system-border hover:border-gray-400'
                      }`}
                      title={iconName}
                    >
                      <Icon className="w-6 h-6 mx-auto" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Categorized Icons
            <div className="space-y-8">
              {Object.entries(iconCategories).map(([category, icons]) => (
                <div key={category}>
                  <h3 className="text-lg font-bold system-text mb-4 flex items-center gap-2">
                    <div className="w-2 h-2 system-bg-primary rounded-full"></div>
                    {category}
                    <span className="text-sm system-text-light">({icons.length})</span>
                  </h3>
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
                    {icons.map((iconName) => {
                      const Icon = (LucideIcons as any)[iconName];
                      if (!Icon) return null;
                      
                      return (
                        <motion.button
                          key={iconName}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleIconSelect(iconName)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            currentIcon === iconName
                              ? 'system-bg-primary text-white border-transparent'
                              : 'bg-white system-border hover:border-gray-400'
                          }`}
                          title={iconName}
                        >
                          <Icon className="w-6 h-6 mx-auto" />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IconSelector;