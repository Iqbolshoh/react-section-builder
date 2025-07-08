import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PlusIcon, PencilIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Sections() {
  const [sections, setSections] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showVariantForm, setShowVariantForm] = useState(false)
  const [currentSection, setCurrentSection] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    default_data: '',
    thumbnail: null
  })
  const [variantFormData, setVariantFormData] = useState({
    label: '',
    variant_data: '',
    thumbnail: null
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [sectionsRes, categoriesRes] = await Promise.all([
        axios.get('/api/admin/sections'),
        axios.get('/api/admin/categories')
      ])
      
      setSections(sectionsRes.data)
      setCategories(categoriesRes.data)
    } catch (error) {
      toast.error('Failed to load data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    
    if (name === 'thumbnail' && files.length > 0) {
      setFormData({
        ...formData,
        thumbnail: files[0]
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleVariantChange = (e) => {
    const { name, value, files } = e.target
    
    if (name === 'thumbnail' && files.length > 0) {
      setVariantFormData({
        ...variantFormData,
        thumbnail: files[0]
      })
    } else {
      setVariantFormData({
        ...variantFormData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Create FormData object for file upload
      const data = new FormData()
      data.append('name', formData.name)
      data.append('category_id', formData.category_id)
      data.append('default_data', formData.default_data)
      
      if (formData.thumbnail) {
        data.append('thumbnail', formData.thumbnail)
      }
      
      const res = await axios.post('/api/admin/sections', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setSections([...sections, res.data])
      toast.success('Section created successfully')
      resetForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save section')
      console.error(error)
    }
  }

  const handleAddVariant = async (e) => {
    e.preventDefault()
    
    try {
      // Create FormData object for file upload
      const data = new FormData()
      data.append('label', variantFormData.label)
      data.append('variant_data', variantFormData.variant_data)
      
      if (variantFormData.thumbnail) {
        data.append('thumbnail', variantFormData.thumbnail)
      }
      
      const res = await axios.post(`/api/admin/sections/${currentSection.id}/variants`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      // Update the sections list with the new variant
      const updatedSections = sections.map(section => {
        if (section.id === currentSection.id) {
          return {
            ...section,
            variants: [...(section.variants || []), res.data]
          }
        }
        return section
      })
      
      setSections(updatedSections)
      toast.success('Variant added successfully')
      resetVariantForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add variant')
      console.error(error)
    }
  }

  const openVariantForm = (section) => {
    setCurrentSection(section)
    setShowVariantForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      default_data: '',
      thumbnail: null
    })
    setShowForm(false)
  }

  const resetVariantForm = () => {
    setVariantFormData({
      label: '',
      variant_data: '',
      thumbnail: null
    })
    setShowVariantForm(false)
    setCurrentSection(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sections</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage section templates that users can add to their websites.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Section
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add New Section
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="category_id" className="form-label">
                  Category
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                  className="form-input"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="default_data" className="form-label">
                  Default Data (JSON)
                </label>
                <textarea
                  name="default_data"
                  id="default_data"
                  rows={10}
                  value={formData.default_data}
                  onChange={handleChange}
                  required
                  className="form-input font-mono text-sm"
                  placeholder='{"title": "Section Title", "content": "Section content goes here"}'
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter the default JSON data for this section.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="thumbnail" className="form-label">
                  Thumbnail Image (optional)
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={handleChange}
                  accept="image/*"
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showVariantForm && currentSection && (
        <div className="mt-8 card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Add Variant for "{currentSection.name}"
          </h2>
          <form onSubmit={handleAddVariant}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="label" className="form-label">
                  Variant Label
                </label>
                <input
                  type="text"
                  name="label"
                  id="label"
                  value={variantFormData.label}
                  onChange={handleVariantChange}
                  required
                  className="form-input"
                  placeholder="e.g., Dark Mode, Alternative Layout"
                />
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="variant_data" className="form-label">
                  Variant Data (JSON)
                </label>
                <textarea
                  name="variant_data"
                  id="variant_data"
                  rows={10}
                  value={variantFormData.variant_data}
                  onChange={handleVariantChange}
                  required
                  className="form-input font-mono text-sm"
                  placeholder={`// Start with the default data and modify as needed\n${JSON.stringify(JSON.parse(currentSection.default_data), null, 2)}`}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter the JSON data for this variant. You can start with the default data and modify it.
                </p>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="thumbnail" className="form-label">
                  Thumbnail Image (optional)
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  onChange={handleVariantChange}
                  accept="image/*"
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={resetVariantForm}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
              >
                Add Variant
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No sections found. Create your first section to get started.
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{section.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Category: {section.category_name}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => openVariantForm(section)}
                    className="text-primary-600 hover:text-primary-900"
                    title="Add Variant"
                  >
                    <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    className="text-primary-600 hover:text-primary-900"
                    title="Edit Section"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    title="Delete Section"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Default Data:</h4>
                <div className="mt-2 bg-gray-50 p-3 rounded-md">
                  <pre className="text-xs overflow-auto max-h-32">
                    {JSON.stringify(JSON.parse(section.default_data), null, 2)}
                  </pre>
                </div>
              </div>
              
              {section.variants && section.variants.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Variants ({section.variants.length}):</h4>
                  <ul className="mt-2 space-y-2">
                    {section.variants.map((variant) => (
                      <li key={variant.id} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        {variant.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-4 text-sm text-gray-500">
                Created by: {section.created_by_name}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}