import React from 'react';
import { motion } from 'framer-motion';

interface DevicePreviewProps {
  device: 'mobile' | 'tablet' | 'desktop';
  children: React.ReactNode;
}

const DevicePreview: React.FC<DevicePreviewProps> = ({ device, children }) => {
  const getDeviceStyles = () => {
    switch (device) {
      case 'mobile':
        return {
          width: '375px',
          minHeight: '667px',
          margin: '0 auto',
          border: '8px solid #1f2937',
          borderRadius: '24px',
          overflow: 'hidden'
        };
      case 'tablet':
        return {
          width: '768px',
          minHeight: '1024px',
          margin: '0 auto',
          border: '6px solid #1f2937',
          borderRadius: '16px',
          overflow: 'hidden'
        };
      case 'desktop':
        return {
          width: '100%',
          minHeight: '100vh',
          margin: '0 auto',
          overflow: 'hidden'
        };
      default:
        return {};
    }
  };

  const getContainerStyles = () => {
    switch (device) {
      case 'mobile':
        return 'p-2 sm:p-4 bg-gray-200 min-h-screen flex items-center justify-center';
      case 'tablet':
        return 'p-4 sm:p-6 bg-gray-200 min-h-screen flex items-center justify-center';
      case 'desktop':
        return 'bg-gray-100 min-h-screen';
      default:
        return '';
    }
  };

  return (
    <div className={getContainerStyles()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={getDeviceStyles()}
        className="bg-white shadow-xl"
      >
        <div className="w-full h-full overflow-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default DevicePreview;