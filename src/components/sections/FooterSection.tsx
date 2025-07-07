import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ChevronRight, Heart, ArrowRight } from 'lucide-react';

interface ThemeConfig {
  fonts: {
    primary: string;
    secondary: string;
    accent: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    primary100: string;
    primary200: string;
    primary300: string;
    secondary100: string;
    secondary200: string;
    accent100: string;
    accent200: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface FooterSectionProps {
  content: {
    companyName: string;
    logo?: string;
    description?: string;
    links: { title: string; url: string }[];
    socialLinks: { platform: string; url: string }[];
    contactInfo?: { 
      address?: string;
      phone?: string;
      email?: string;
    };
    copyright?: string;
    newsletterEnabled?: boolean;
    newsletterTitle?: string;
    newsletterSubtitle?: string;
    linkGroups?: {
      title: string;
      links: { title: string; url: string }[];
    }[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
  variant?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  content, 
  isEditing, 
  onChange, 
  theme,
  variant = 'footer-comprehensive'
}) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...content.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    handleChange('links', updatedLinks);
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const updatedSocialLinks = [...content.socialLinks];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [field]: value };
    handleChange('socialLinks', updatedSocialLinks);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return null;
    }
  };

  // Comprehensive Footer
  const renderComprehensiveFooter = () => (
    <footer 
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        color: '#ffffff',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {content.logo && (
                <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
              )}
              <h3 
                className="text-xl font-bold text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.companyName}
              </h3>
            </div>
            
            {content.description && (
              <p 
                className="text-gray-400 mb-6"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.description}
              </p>
            )}
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="text-lg font-semibold mb-4 text-white"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {content.links.slice(0, 6).map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="text-lg font-semibold mb-4 text-white"
              style={{ fontFamily: theme?.fonts?.primary }}
            >
              Contact Us
            </h4>
            <ul className="space-y-4">
              {content.contactInfo?.address && (
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1" style={{ color: theme?.colors?.primary }} />
                  <span 
                    className="text-gray-400"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {content.contactInfo.address}
                  </span>
                </li>
              )}
              {content.contactInfo?.phone && (
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  <span 
                    className="text-gray-400"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {content.contactInfo.phone}
                  </span>
                </li>
              )}
              {content.contactInfo?.email && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                  <span 
                    className="text-gray-400"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    {content.contactInfo.email}
                  </span>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          {content.newsletterEnabled && (
            <div>
              <h4 
                className="text-lg font-semibold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.newsletterTitle || 'Newsletter'}
              </h4>
              <p 
                className="text-gray-400 mb-4"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.newsletterSubtitle || 'Subscribe to our newsletter for updates'}
              </p>
              <form className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-3 rounded-l-lg w-full"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: 'none',
                      fontFamily: theme?.fonts?.secondary
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-r-lg text-white"
                    style={{ 
                      backgroundColor: theme?.colors?.primary,
                      fontFamily: theme?.fonts?.secondary
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <p 
                  className="text-xs text-gray-500"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div 
          className="border-t mt-12 pt-8 text-center text-gray-400"
          style={{ 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            fontFamily: theme?.fonts?.secondary
          }}
        >
          <p>
            © {new Date().getFullYear()} {content.companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  // Minimal Footer
  const renderMinimalFooter = () => (
    <footer 
      className="py-8"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderTop: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {content.logo && (
              <img src={content.logo} alt={content.companyName} className="w-8 h-8 object-contain" />
            )}
            <span 
              className="text-sm font-semibold"
              style={{ 
                color: theme?.colors?.text,
                fontFamily: theme?.fonts?.primary
              }}
            >
              {content.companyName}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {content.links.slice(0, 5).map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-sm transition-colors"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                }}
              >
                {link.title}
              </a>
            ))}
          </div>
          
          <div className="flex gap-3">
            {content.socialLinks.slice(0, 4).map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ 
                  backgroundColor: `${theme?.colors?.primary}15`,
                  color: theme?.colors?.primary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                  e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                }}
              >
                {getSocialIcon(social.platform)}
              </a>
            ))}
          </div>
        </div>
        
        <div 
          className="text-center text-xs mt-6"
          style={{ 
            color: theme?.colors?.textSecondary,
            fontFamily: theme?.fonts?.secondary
          }}
        >
          <p>© {new Date().getFullYear()} {content.companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  // Newsletter Footer
  const renderNewsletterFooter = () => (
    <footer style={{ fontFamily: theme?.fonts?.primary }}>
      {/* Newsletter Section */}
      <div 
        className="py-12 lg:py-16"
        style={{ 
          background: `linear-gradient(135deg, ${theme?.colors?.primary}, ${theme?.colors?.secondary})`,
          color: '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 
                className="text-2xl sm:text-3xl font-bold mb-4"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                {content.newsletterTitle || 'Subscribe to Our Newsletter'}
              </h3>
              <p 
                className="text-white text-opacity-90"
                style={{ fontFamily: theme?.fonts?.secondary }}
              >
                {content.newsletterSubtitle || 'Get the latest news and updates delivered to your inbox'}
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                  style={{ fontFamily: theme?.fonts?.accent }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div 
        className="py-12 lg:py-16"
        style={{ 
          backgroundColor: theme?.colors?.text || '#1f2937',
          color: '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {content.logo && (
                  <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
                )}
                <h3 
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: theme?.fonts?.primary }}
                >
                  {content.companyName}
                </h3>
              </div>
              
              {content.description && (
                <p 
                  className="text-gray-400 mb-6"
                  style={{ fontFamily: theme?.fonts?.secondary }}
                >
                  {content.description}
                </p>
              )}
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 
                className="text-lg font-semibold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {content.links.slice(0, 6).map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      <ChevronRight className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 
                className="text-lg font-semibold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                Contact Us
              </h4>
              <ul className="space-y-4">
                {content.contactInfo?.address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1" style={{ color: theme?.colors?.primary }} />
                    <span 
                      className="text-gray-400"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      {content.contactInfo.address}
                    </span>
                  </li>
                )}
                {content.contactInfo?.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                    <span 
                      className="text-gray-400"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      {content.contactInfo.phone}
                    </span>
                  </li>
                )}
                {content.contactInfo?.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5" style={{ color: theme?.colors?.primary }} />
                    <span 
                      className="text-gray-400"
                      style={{ fontFamily: theme?.fonts?.secondary }}
                    >
                      {content.contactInfo.email}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 
                className="text-lg font-semibold mb-4 text-white"
                style={{ fontFamily: theme?.fonts?.primary }}
              >
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#terms"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a 
                    href="#cookies"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: theme?.fonts?.secondary }}
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div 
            className="border-t mt-12 pt-8 text-center text-gray-400"
            style={{ 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              fontFamily: theme?.fonts?.secondary
            }}
          >
            <p>
              © {new Date().getFullYear()} {content.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  // Social Footer
  const renderSocialFooter = () => (
    <footer 
      className="py-12"
      style={{ 
        backgroundColor: theme?.colors?.surface || '#ffffff',
        borderTop: `1px solid ${theme?.colors?.border}`,
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          {content.logo && (
            <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
          )}
          <h3 
            className="text-xl font-bold"
            style={{ 
              color: theme?.colors?.primary,
              fontFamily: theme?.fonts?.primary
            }}
          >
            {content.companyName}
          </h3>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {content.links.slice(0, 6).map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-sm transition-colors"
              style={{ 
                color: theme?.colors?.textSecondary,
                fontFamily: theme?.fonts?.secondary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
              }}
            >
              {link.title}
            </a>
          ))}
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
          {content.socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
              style={{ 
                backgroundColor: `${theme?.colors?.primary}15`,
                color: theme?.colors?.primary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
              }}
            >
              {getSocialIcon(social.platform)}
            </motion.a>
          ))}
        </div>
        
        <div 
          className="text-sm"
          style={{ 
            color: theme?.colors?.textSecondary,
            fontFamily: theme?.fonts?.secondary
          }}
        >
          <p className="mb-2">© {new Date().getFullYear()} {content.companyName}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4" style={{ color: theme?.colors?.error }} /> by {content.companyName}
          </p>
        </div>
      </div>
    </footer>
  );

  // Corporate Footer
  const renderCorporateFooter = () => (
    <footer style={{ fontFamily: theme?.fonts?.primary }}>
      {/* Main Footer */}
      <div 
        className="py-12 lg:py-16"
        style={{ 
          backgroundColor: theme?.colors?.background || '#f9fafb',
          color: theme?.colors?.text
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="md:col-span-3 lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {content.logo && (
                  <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
                )}
                <h3 
                  className="text-xl font-bold"
                  style={{ 
                    color: theme?.colors?.primary,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.companyName}
                </h3>
              </div>
              
              {content.description && (
                <p 
                  className="mb-6"
                  style={{ 
                    color: theme?.colors?.textSecondary,
                    fontFamily: theme?.fonts?.secondary
                  }}
                >
                  {content.description}
                </p>
              )}
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {content.contactInfo?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin 
                      className="w-5 h-5 mt-1" 
                      style={{ color: theme?.colors?.primary }}
                    />
                    <span 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.contactInfo.address}
                    </span>
                  </div>
                )}
                {content.contactInfo?.phone && (
                  <div className="flex items-center gap-3">
                    <Phone 
                      className="w-5 h-5" 
                      style={{ color: theme?.colors?.primary }}
                    />
                    <span 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.contactInfo.phone}
                    </span>
                  </div>
                )}
                {content.contactInfo?.email && (
                  <div className="flex items-center gap-3">
                    <Mail 
                      className="w-5 h-5" 
                      style={{ color: theme?.colors?.primary }}
                    />
                    <span 
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                    >
                      {content.contactInfo.email}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3">
                {content.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    style={{ 
                      backgroundColor: `${theme?.colors?.primary}15`,
                      color: theme?.colors?.primary
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                      e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                    }}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Groups */}
            {content.linkGroups?.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url}
                        className="transition-colors flex items-center gap-2"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                        }}
                      >
                        <ChevronRight className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* If no link groups are defined, show a single column of links */}
            {(!content.linkGroups || content.linkGroups.length === 0) && (
              <div>
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {content.links.slice(0, 6).map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url}
                        className="transition-colors flex items-center gap-2"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                        }}
                      >
                        <ChevronRight className="w-4 h-4" style={{ color: theme?.colors?.primary }} />
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div 
        className="py-6"
        style={{ 
          backgroundColor: theme?.colors?.text || '#1f2937',
          color: '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div 
              className="text-sm text-gray-400"
              style={{ fontFamily: theme?.fonts?.secondary }}
            >
              © {new Date().getFullYear()} {content.companyName}. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="#privacy"
                className="text-sm transition-colors"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="#terms"
                className="text-sm transition-colors"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                Terms of Service
              </a>
              <a 
                href="#cookies"
                className="text-sm transition-colors"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: theme?.fonts?.secondary
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  // Modern Footer
  const renderModernFooter = () => (
    <footer 
      className="py-12 lg:py-16"
      style={{ 
        backgroundColor: theme?.colors?.background || '#f9fafb',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {content.logo && (
                <img src={content.logo} alt={content.companyName} className="w-10 h-10 object-contain" />
              )}
              <h3 
                className="text-xl font-bold"
                style={{ 
                  color: theme?.colors?.primary,
                  fontFamily: theme?.fonts?.primary
                }}
              >
                {content.companyName}
              </h3>
            </div>
            
            {content.description && (
              <p 
                className="mb-6"
                style={{ 
                  color: theme?.colors?.textSecondary,
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                {content.description}
              </p>
            )}
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {content.socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                  style={{ 
                    backgroundColor: `${theme?.colors?.primary}15`,
                    color: theme?.colors?.primary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme?.colors?.primary || '#3b82f6';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme?.colors?.primary}15`;
                    e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                  }}
                >
                  {getSocialIcon(social.platform)}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Company
                </h4>
                <ul className="space-y-2">
                  {content.links.slice(0, 4).map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.url}
                        className="transition-colors"
                        style={{ 
                          color: theme?.colors?.textSecondary,
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                        }}
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#blog"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#help"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#guides"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Guides
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#events"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Events
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 
                  className="text-lg font-semibold mb-4"
                  style={{ 
                    color: theme?.colors?.text,
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#privacy"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#terms"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#cookies"
                      className="transition-colors"
                      style={{ 
                        color: theme?.colors?.textSecondary,
                        fontFamily: theme?.fonts?.secondary
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = theme?.colors?.primary || '#3b82f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = theme?.colors?.textSecondary || '#6b7280';
                      }}
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div 
          className="border-t mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ 
            borderColor: theme?.colors?.border,
            fontFamily: theme?.fonts?.secondary
          }}
        >
          <div 
            className="text-sm"
            style={{ color: theme?.colors?.textSecondary }}
          >
            © {new Date().getFullYear()} {content.companyName}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-2">
            <span 
              className="text-sm"
              style={{ color: theme?.colors?.textSecondary }}
            >
              Language:
            </span>
            <select 
              className="text-sm border rounded-lg px-2 py-1"
              style={{ 
                borderColor: theme?.colors?.border,
                color: theme?.colors?.text,
                backgroundColor: theme?.colors?.surface
              }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );

  // Initialize default content if needed
  React.useEffect(() => {
    if (variant === 'footer-newsletter' && !content.newsletterEnabled) {
      handleChange('newsletterEnabled', true);
      handleChange('newsletterTitle', 'Stay Updated');
      handleChange('newsletterSubtitle', 'Subscribe to our newsletter for the latest news and updates');
    }
    
    if (variant === 'footer-corporate' && !content.linkGroups) {
      handleChange('linkGroups', [
        {
          title: 'Company',
          links: [
            { title: 'About Us', url: '#about' },
            { title: 'Careers', url: '#careers' },
            { title: 'News', url: '#news' },
            { title: 'Contact', url: '#contact' }
          ]
        },
        {
          title: 'Services',
          links: [
            { title: 'Web Design', url: '#web-design' },
            { title: 'Development', url: '#development' },
            { title: 'Marketing', url: '#marketing' },
            { title: 'Consulting', url: '#consulting' }
          ]
        },
        {
          title: 'Legal',
          links: [
            { title: 'Privacy Policy', url: '#privacy' },
            { title: 'Terms of Service', url: '#terms' },
            { title: 'Cookie Policy', url: '#cookies' }
          ]
        }
      ]);
    }
  }, [variant]);

  switch (variant) {
    case 'footer-minimal':
      return renderMinimalFooter();
    case 'footer-newsletter':
      return renderNewsletterFooter();
    case 'footer-social':
      return renderSocialFooter();
    case 'footer-corporate':
      return renderCorporateFooter();
    default:
      return renderComprehensiveFooter();
  }
};

export default FooterSection;