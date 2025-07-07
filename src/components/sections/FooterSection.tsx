import React from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface Link {
  title: string;
  url: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

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
    links: Link[];
    socialLinks: SocialLink[];
  };
  isEditing: boolean;
  onChange: (content: any) => void;
  theme?: ThemeConfig;
}

const FooterSection: React.FC<FooterSectionProps> = ({ content, isEditing, onChange, theme }) => {
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

  const addLink = () => {
    handleChange('links', [...content.links, { title: 'New Link', url: '#' }]);
  };

  const removeLink = (index: number) => {
    const updatedLinks = content.links.filter((_, i) => i !== index);
    handleChange('links', updatedLinks);
  };

  const addSocialLink = () => {
    handleChange('socialLinks', [...content.socialLinks, { platform: 'New Platform', url: '#' }]);
  };

  const removeSocialLink = (index: number) => {
    const updatedSocialLinks = content.socialLinks.filter((_, i) => i !== index);
    handleChange('socialLinks', updatedSocialLinks);
  };

  return (
    <footer 
      className="py-16"
      style={{ 
        backgroundColor: theme?.colors?.text || '#1f2937',
        fontFamily: theme?.fonts?.primary
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={content.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="text-2xl font-bold mb-4 bg-transparent border-2 border-dashed rounded-lg p-2 text-white"
                  style={{ 
                    borderColor: `${theme?.colors?.primary}50`,
                    fontFamily: theme?.fonts?.primary
                  }}
                  placeholder="Company Name"
                />
              ) : (
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ 
                    color: theme?.colors?.surface || '#ffffff',
                    fontFamily: theme?.fonts?.primary
                  }}
                >
                  {content.companyName}
                </h3>
              )}
              <p 
                className="mb-6"
                style={{ 
                  color: `${theme?.colors?.textSecondary}80` || '#9ca3af',
                  fontFamily: theme?.fonts?.secondary
                }}
              >
                Building beautiful websites made simple.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {content.links.map((link, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1 text-white text-sm"
                          style={{ 
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Link title"
                        />
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1 text-white text-sm"
                          style={{ borderColor: `${theme?.colors?.primary}50` }}
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={link.url}
                        className="transition-colors"
                        style={{ 
                          color: `${theme?.colors?.textSecondary}80` || '#9ca3af',
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = `${theme?.colors?.textSecondary}80` || '#9ca3af';
                        }}
                      >
                        {link.title}
                      </a>
                    )}
                  </li>
                ))}
                {isEditing && (
                  <li>
                    <button
                      onClick={addLink}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: theme?.colors?.primary }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 
                className="text-lg font-semibold mb-4"
                style={{ 
                  color: theme?.colors?.surface || '#ffffff',
                  fontFamily: theme?.fonts?.primary
                }}
              >
                Follow Us
              </h4>
              <div className="space-y-2">
                {content.socialLinks.map((social, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={social.platform}
                          onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1 text-white text-sm"
                          style={{ 
                            borderColor: `${theme?.colors?.primary}50`,
                            fontFamily: theme?.fonts?.secondary
                          }}
                          placeholder="Platform"
                        />
                        <input
                          type="url"
                          value={social.url}
                          onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                          className="flex-1 bg-transparent border-2 border-dashed rounded-lg p-1 text-white text-sm"
                          style={{ borderColor: `${theme?.colors?.primary}50` }}
                          placeholder="URL"
                        />
                        <button
                          onClick={() => removeSocialLink(index)}
                          className="w-4 h-4 text-white rounded-full flex items-center justify-center text-xs"
                          style={{ backgroundColor: theme?.colors?.error }}
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </>
                    ) : (
                      <a
                        href={social.url}
                        className="transition-colors"
                        style={{ 
                          color: `${theme?.colors?.textSecondary}80` || '#9ca3af',
                          fontFamily: theme?.fonts?.secondary
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = theme?.colors?.surface || '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = `${theme?.colors?.textSecondary}80` || '#9ca3af';
                        }}
                      >
                        {social.platform}
                      </a>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addSocialLink}
                    className="flex items-center gap-2 text-sm"
                    style={{ color: theme?.colors?.primary }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Social Link
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="border-t mt-12 pt-8"
          style={{ borderColor: `${theme?.colors?.border}50` || '#374151' }}
        >
          <div className="text-center">
            <p 
              style={{ 
                color: `${theme?.colors?.textSecondary}80` || '#9ca3af',
                fontFamily: theme?.fonts?.secondary
              }}
            >
              &copy; {new Date().getFullYear()} {content.companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;