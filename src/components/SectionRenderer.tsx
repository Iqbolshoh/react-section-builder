import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit3, Trash2, Copy, GripVertical } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import PricingSection from './sections/PricingSection';
import TestimonialsSection from './sections/TestimonialsSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';
import HeaderSection from './sections/HeaderSection';
import SliderSection from './sections/SliderSection';
import FeaturesSection from './sections/FeaturesSection';
import PortfolioSection from './sections/PortfolioSection';
import FAQSection from './sections/FAQSection';
import TimelineSection from './sections/TimelineSection';
import StatsSection from './sections/StatsSection';
import NewsletterSection from './sections/NewsletterSection';
import CTASection from './sections/CTASection';
import GallerySection from './sections/GallerySection';

interface ThemeConfig {
  fonts: {
    primary: string;
  };
  colors: {
    primary: string;
    secondary: string;
  };
}

interface SectionRendererProps {
  section: any;
  isSelected: boolean;
  onSelect: () => void;
  isPreview?: boolean;
  theme?: ThemeConfig;
  isEditing?: boolean;
  onEdit: (editing: boolean) => void;
}

const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  isSelected,
  onSelect,
  isPreview = false,
  theme,
  isEditing = false,
  onEdit
}) => {
  const { deleteSection, updateSection } = useProject();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 1
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this section?')) {
      deleteSection(section.id);
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would duplicate the section
    console.log('Duplicate section:', section.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(true);
  };

  const renderSection = () => {
    const commonProps = {
      content: section.content,
      isEditing: isEditing,
      onChange: (content: any) => updateSection(section.id, content),
      theme
    };

    // Handle all section types including new ones
    const sectionType = section.type.split('-')[0]; // Get base type (e.g., 'hero' from 'hero-split')
    
    switch (sectionType) {
      case 'header':
        return <HeaderSection {...commonProps} variant={section.type} />;
      case 'hero':
        return <HeroSection {...commonProps} variant={section.type} />;
      case 'slider':
        return <SliderSection {...commonProps} variant={section.type} />;
      case 'about':
        return <AboutSection {...commonProps} variant={section.type} />;
      case 'services':
        return <ServicesSection {...commonProps} variant={section.type} />;
      case 'features':
        return <FeaturesSection {...commonProps} variant={section.type} />;
      case 'pricing':
        return <PricingSection {...commonProps} variant={section.type} />;
      case 'testimonials':
        return <TestimonialsSection {...commonProps} variant={section.type} />;
      case 'portfolio':
        return <PortfolioSection {...commonProps} variant={section.type} />;
      case 'contact':
        return <ContactSection {...commonProps} variant={section.type} />;
      case 'footer':
        return <FooterSection {...commonProps} variant={section.type} />;
      case 'faq':
        return <FAQSection {...commonProps} variant={section.type} />;
      case 'timeline':
        return <TimelineSection {...commonProps} variant={section.type} />;
      case 'stats':
        return <StatsSection {...commonProps} variant={section.type} />;
      case 'newsletter':
        return <NewsletterSection {...commonProps} variant={section.type} />;
      case 'cta':
        return <CTASection {...commonProps} variant={section.type} />;
      case 'gallery':
        return <GallerySection {...commonProps} variant={section.type} />;
      default:
        return <div>Unknown section type: {section.type}</div>;
    }
  };

  if (isPreview) {
    return <div>{renderSection()}</div>;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      onClick={onSelect}
    >
      {/* Section Content */}
      <div className={`${isSelected ? 'ring-4 ring-emerald-400 ring-opacity-50' : 'hover:ring-2 hover:ring-gray-300'} transition-all duration-200 rounded-lg overflow-hidden`}>
        {renderSection()}
      </div>

      {/* Section Controls - Only show when selected */}
      {!isPreview && isSelected && (
        <div className="absolute -top-3 -right-3 flex items-center gap-2 z-10">
          {/* Drag Handle */}
          <button
            {...attributes}
            {...listeners}
            className="p-2 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-grab active:cursor-grabbing hover:border-emerald-400"
          >
            <GripVertical className="w-4 h-4 text-gray-600" />
          </button>

          {/* Edit Button */}
          <button
            onClick={handleEdit}
            className="p-2 bg-emerald-500 border-2 border-emerald-500 rounded-xl shadow-lg hover:shadow-xl transition-all text-white hover:bg-emerald-600"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Duplicate Button */}
          <button
            onClick={handleDuplicate}
            className="p-2 bg-blue-500 border-2 border-blue-500 rounded-xl shadow-lg hover:shadow-xl transition-all text-white hover:bg-blue-600"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 bg-red-500 border-2 border-red-500 rounded-xl shadow-lg hover:shadow-xl transition-all text-white hover:bg-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Section Label */}
      {isSelected && !isPreview && (
        <div className="absolute -top-8 left-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-t-xl text-sm font-semibold shadow-lg">
          {section.type.charAt(0).toUpperCase() + section.type.slice(1).replace('-', ' ')} Section
        </div>
      )}

      {/* Editing Mode Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-emerald-500 bg-opacity-10 border-4 border-emerald-500 border-dashed rounded-lg pointer-events-none">
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Editing Mode
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionRenderer;