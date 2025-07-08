import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SectionEditor({ section, onClose, onUpdate }) {
  // Combine data from default_data, variant_data, and custom_data
  const defaultData = JSON.parse(section.default_data)
  const variantData = section.variant_data ? JSON.parse(section.variant_data) : {}
  const initialData = {
    ...defaultData,
    ...variantData,
    ...(section.custom_data || {})
  }
  
  const [formData, setFormData] = useState(initialData)
  const [saving, setSaving] = useState(false)
  
  // Reset form data when section changes
  useEffect(() => {
    setFormData({
      ...defaultData,
      ...variantData,
      ...(section.custom_data || {})
    })
  }, [section])
  
  const handleChange = (path, value) => {
    // Handle nested paths like "ctaButton.label"
    const pathParts = path.split('.')
    
    if (pathParts.length === 1) {
      setFormData({
        ...formData,
        [path]: value
      })
    } else {
      // Handle nested objects
      const newFormData = { ...formData }
      let current = newFormData
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {}
        }
        current = current[pathParts[i]]
      }
      
      current[pathParts[pathParts.length - 1]] = value
      setFormData(newFormData)
    }
  }
  
  const handleArrayChange = (path, index, value) => {
    const pathParts = path.split('.')
    const newFormData = { ...formData }
    let current = newFormData
    
    // Navigate to the parent object
    for (let i = 0; i < pathParts.length; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = []
      }
      current = current[pathParts[i]]
    }
    
    // Update the array item
    current[index] = value
    setFormData(newFormData)
  }
  
  const handleArrayItemChange = (path, index, key, value) => {
    const pathParts = path.split('.')
    const newFormData = { ...formData }
    let current = newFormData
    
    // Navigate to the parent object
    for (let i = 0; i < pathParts.length; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = []
      }
      current = current[pathParts[i]]
    }
    
    // Update the array item property
    current[index][key] = value
    setFormData(newFormData)
  }
  
  const handleAddArrayItem = (path, template) => {
    const pathParts = path.split('.')
    const newFormData = { ...formData }
    let current = newFormData
    
    // Navigate to the parent object
    for (let i = 0; i < pathParts.length; i++) {
      if (!current[pathParts[i]]) {
        current[pathParts[i]] = []
      }
      current = current[pathParts[i]]
    }
    
    // Add new item to the array
    current.push(template)
    setFormData(newFormData)
  }
  
  const handleRemoveArrayItem = (path, index) => {
    const pathParts = path.split('.')
    const newFormData = { ...formData }
    let current = newFormData
    
    // Navigate to the parent object
    for (let i = 0; i < pathParts.length; i++) {
      current = current[pathParts[i]]
    }
    
    // Remove the array item
    current.splice(index, 1)
    setFormData(newFormData)
  }
  
  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdate(formData)
    } catch (error) {
      console.error('Error saving section:', error)
    } finally {
      setSaving(false)
    }
  }
  
  // Render form fields based on section type
  const renderFormFields = () => {
    switch (section.category_slug) {
      case 'header':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Logo URL</label>
              <input
                type="text"
                value={formData.logo || ''}
                onChange={(e) => handleChange('logo', e.target.value)}
                className="form-input"
              />
              {formData.logo && (
                <div className="mt-2">
                  <img src={formData.logo} alt="Logo" className="h-8 w-auto" />
                </div>
              )}
            </div>
            
            <div>
              <label className="form-label">Menu Items</label>
              {formData.menuItems?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => handleArrayItemChange('menuItems', index, 'label', e.target.value)}
                    placeholder="Label"
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={item.url || ''}
                    onChange={(e) => handleArrayItemChange('menuItems', index, 'url', e.target.value)}
                    placeholder="URL"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem('menuItems', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem('menuItems', { label: 'New Item', url: '#' })}
                className="mt-2 text-sm text-primary-600 hover:text-primary-500"
              >
                + Add Menu Item
              </button>
            </div>
            
            {formData.ctaButton && (
              <div>
                <label className="form-label">CTA Button</label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={formData.ctaButton.label || ''}
                    onChange={(e) => handleChange('ctaButton.label', e.target.value)}
                    placeholder="Label"
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={formData.ctaButton.url || ''}
                    onChange={(e) => handleChange('ctaButton.url', e.target.value)}
                    placeholder="URL"
                    className="form-input"
                  />
                </div>
              </div>
            )}
          </div>
        )
        
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label">Headline</label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Subheadline</label>
              <textarea
                value={formData.subheadline || ''}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                rows={3}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="form-label">Background Image URL</label>
              <input
                type="text"
                value={formData.backgroundImage || ''}
                onChange={(e) => handleChange('backgroundImage', e.target.value)}
                className="form-input"
              />
              {formData.backgroundImage && (
                <div className="mt-2">
                  <img src={formData.backgroundImage} alt="Background" className="h-24 w-full object-cover rounded" />
                </div>
              )}
            </div>
            
            {formData.ctaButton && (
              <div>
                <label className="form-label">CTA Button</label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={formData.ctaButton.label || ''}
                    onChange={(e) => handleChange('ctaButton.label', e.target.value)}
                    placeholder="Label"
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={formData.ctaButton.url || ''}
                    onChange={(e) => handleChange('ctaButton.url', e.target.value)}
                    placeholder="URL"
                    className="form-input"
                  />
                </div>
              </div>
            )}
            
            {formData.secondaryButton && (
              <div>
                <label className="form-label">Secondary Button</label>
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    value={formData.secondaryButton.label || ''}
                    onChange={(e) => handleChange('secondaryButton.label', e.target.value)}
                    placeholder="Label"
                    className="form-input"
                  />
                  <input
                    type="text"
                    value={formData.secondaryButton.url || ''}
                    onChange={(e) => handleChange('secondaryButton.url', e.target.value)}
                    placeholder="URL"
                    className="form-input"
                  />
                </div>
              </div>
            )}
          </div>
        )
        
      // Add more section type editors as needed
        
      default:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">
                Advanced editor not implemented for this section type. You can edit the raw JSON data below.
              </p>
            </div>
            
            <div>
              <label className="form-label">Raw JSON Data</label>
              <textarea
                value={JSON.stringify(formData, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value)
                    setFormData(parsed)
                  } catch (error) {
                    // Don't update if JSON is invalid
                  }
                }}
                rows={20}
                className="form-input font-mono text-sm"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Edit Section</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-500">Section Type</div>
          <div className="mt-1 text-sm text-gray-900">{section.section_name}</div>
        </div>
        
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-500">Category</div>
          <div className="mt-1 text-sm text-gray-900">{section.category_name}</div>
        </div>
        
        {section.variant_label && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-500">Variant</div>
            <div className="mt-1 text-sm text-gray-900">{section.variant_label}</div>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-base font-medium text-gray-900 mb-4">Edit Content</h3>
          {renderFormFields()}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary w-full flex justify-center"
        >
          {saving ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  )
}