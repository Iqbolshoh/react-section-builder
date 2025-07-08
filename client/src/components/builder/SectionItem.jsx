import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

export default function SectionItem({ 
  section, 
  isSelected, 
  onSelect, 
  onDelete, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id })
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  
  // Combine data from default_data, variant_data, and custom_data
  const sectionData = {
    ...JSON.parse(section.default_data),
    ...(section.variant_data ? JSON.parse(section.variant_data) : {}),
    ...(section.custom_data || {})
  }
  
  // Render a preview based on section type
  const renderPreview = () => {
    switch (section.category_slug) {
      case 'header':
        return (
          <div className="bg-white p-2 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center">
              <div className="font-medium text-sm">{sectionData.title}</div>
              <div className="flex space-x-2">
                {sectionData.menuItems?.slice(0, 3).map((item, index) => (
                  <div key={index} className="text-xs text-gray-500">{item.label}</div>
                ))}
              </div>
            </div>
          </div>
        )
        
      case 'hero':
        return (
          <div className="bg-gray-100 p-4 border border-gray-200 rounded-md">
            <div className="text-center">
              <div className="font-bold text-sm">{sectionData.headline}</div>
              <div className="text-xs text-gray-500 mt-1">{sectionData.subheadline}</div>
              {sectionData.ctaButton && (
                <div className="mt-2 inline-block bg-primary-600 text-white text-xs px-2 py-1 rounded">
                  {sectionData.ctaButton.label}
                </div>
              )}
            </div>
          </div>
        )
        
      // Add more section type previews as needed
        
      default:
        return (
          <div className="bg-white p-4 border border-gray-200 rounded-md">
            <div className="text-sm font-medium">{section.section_name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {section.category_name} Section
            </div>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`bg-white rounded-lg shadow-sm border-2 transition-all ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {/* Drag handle */}
            <div
              {...listeners}
              className="cursor-move p-1 mr-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">{section.section_name}</h3>
              <p className="text-xs text-gray-500">
                {section.category_name}
                {section.variant_label && ` • ${section.variant_label}`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMoveUp()
              }}
              disabled={isFirst}
              className={`p-1 rounded-md ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              <ArrowUpIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMoveDown()
              }}
              disabled={isLast}
              className={`p-1 rounded-md ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
            >
              <ArrowDownIcon className="h-4 w-4" aria-hidden="true" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
            >
              <TrashIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        
        {/* Section Preview */}
        <div onClick={onSelect} className="cursor-pointer">
          {renderPreview()}
        </div>
      </div>
    </div>
  )
}