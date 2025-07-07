import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface AddSectionButtonProps {
  onAdd: () => void;
  position: 'above' | 'below';
  className?: string;
  theme?: ThemeConfig;
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({ 
  onAdd, 
  position, 
  className = "",
  theme
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg shadow-lg transition-colors font-medium"
          style={{ 
            backgroundColor: theme?.colors?.primary || '#10b981'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme?.colors?.secondary || '#06b6d4';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#10b981';
          }}
        >
          <Plus className="w-4 h-4" />
          Add Section {position === 'above' ? 'Above' : 'Below'}
        </motion.button>
      </div>
      
      {/* Hover area */}
      <div 
        className="h-8 w-full bg-transparent group-hover:border-2 group-hover:border-dashed rounded-lg transition-all duration-200"
        style={{
          '--hover-bg': `${theme?.colors?.primary}10`,
          '--hover-border': `${theme?.colors?.primary}50`
        } as React.CSSProperties}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}10` || '#dcfce7';
          e.currentTarget.style.borderColor = `${theme?.colors?.primary}50` || '#86efac';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'transparent';
        }}
      ></div>
    </div>
  );
};

export default AddSectionButton;