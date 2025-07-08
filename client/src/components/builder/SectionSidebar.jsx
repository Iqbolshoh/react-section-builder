import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function SectionSidebar({ categories, sections, onAddSection, showSidebar, setShowSidebar }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Group sections by category
  const sectionsByCategory = sections.reduce((acc, section) => {
    const categoryId = section.category_id
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(section)
    return acc
  }, {})
  
  // Filter sections by selected category
  const filteredSections = selectedCategory === 'all' 
    ? sections 
    : sections.filter(section => section.category_id === parseInt(selectedCategory))

  return (
    <div className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 overflow-hidden flex flex-col`}>
      {/* Toggle Button */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-24 left-0 bg-white border border-gray-200 rounded-r-md p-1 shadow-md z-10"
      >
        {showSidebar ? (
          <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {/* Sidebar Content */}
      {showSidebar && (
        <>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Add Sections</h2>
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop sections to build your website.
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="p-4 border-b border-gray-200">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Filter by Category
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sections List */}
          <div className="flex-1 overflow-auto p-4">
            {filteredSections.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No sections found in this category.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSections.map((section) => (
                  <div
                    key={section.id}
                    className="border border-gray-200 rounded-md p-3 hover:border-primary-500 hover:shadow-sm cursor-pointer transition-all"
                    onClick={() => onAddSection(section)}
                  >
                    <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      Category: {section.category_name}
                    </p>
                    {section.variants && section.variants.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">
                          {section.variants.length} variant{section.variants.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}