import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Header1Props {
  logo?: string;
  companyName: string;
  menuItems: { title: string; url: string }[];
  ctaButton?: { text: string; url: string };
  customData?: any;
}

const Header1: React.FC<Header1Props> = ({
  logo,
  companyName,
  menuItems,
  ctaButton,
  customData
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const bgColor = customData?.bgColor || 'white';
  const textColor = customData?.textColor || '#1f2937';
  const accentColor = customData?.accentColor || '#3b82f6';
  
  return (
    <header 
      className="sticky top-0 z-50 w-full shadow-sm"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {logo && (
              <img 
                src={logo} 
                alt={companyName} 
                className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
              />
            )}
            <span 
              className="text-lg lg:text-xl font-bold"
              style={{ color: accentColor }}
            >
              {companyName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="transition-colors font-medium"
                style={{ color: textColor }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textColor;
                }}
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          {ctaButton && (
            <a
              href={ctaButton.url}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: accentColor }}
            >
              {ctaButton.text}
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: textColor }}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: mobileMenuOpen ? 'auto' : 0,
            opacity: mobileMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden"
          style={{ borderTop: mobileMenuOpen ? `1px solid #e5e7eb` : 'none' }}
        >
          <nav className="flex flex-col space-y-4 py-4">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="py-2 transition-colors font-medium"
                style={{ color: textColor }}
              >
                {item.title}
              </a>
            ))}
            {ctaButton && (
              <a
                href={ctaButton.url}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-medium transition-colors mt-4"
                style={{ backgroundColor: accentColor }}
              >
                {ctaButton.text}
              </a>
            )}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};

export default Header1;