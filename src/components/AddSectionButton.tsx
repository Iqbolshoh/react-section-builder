import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface AddSectionButtonProps {
  onAdd: () => void;
  position: 'above' | 'below';
  className?: string;
}

const AddSectionButton: React.FC<AddSectionButtonProps> = ({ 
  onAdd, 
  position, 
  className = "" 
}) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <motion.button
          onClick={onAdd}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg shadow-lg hover:bg-emerald-600 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Section {position === 'above' ? 'Above' : 'Below'}
        </motion.button>
      </div>
      
      {/* Hover area */}
      <div className="h-8 w-full bg-transparent group-hover:bg-emerald-50 group-hover:border-2 group-hover:border-dashed group-hover:border-emerald-300 rounded-lg transition-all duration-200"></div>
    </div>
  );
};

export default AddSectionButton;