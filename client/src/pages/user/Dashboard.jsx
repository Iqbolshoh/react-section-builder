import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export default function UserDashboard() {
  const [websites, setWebsites] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: ''
  })

  useEffect(() => {
    fetchWebsites()
  }, [])

  const fetchWebsites = async () => {
    try {
      const res = await axios.get('/api/sites')
      setWebsites(res.data)
    } catch (error) {
      toast.error('Failed to load websites')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Auto-generate slug from name if slug field is empty
    if (name === 'name' && !formData.slug) {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      setFormData({
        ...formData,
        name: value,
        slug
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const res = await axios.post('/api/sites', formData)
      setWebsites([...websites, res.data])
      toast.success('Website created successfully')
      resetForm()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create website')
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this website?')) return
    
    try {
      // Delete website (not implemented in the API yet)
      toast.info('Deleting websites is not implemented yet')
    } catch (error) {
      toast.error('Failed to delete website')
      console.error(error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: ''
    })
    setShowForm(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
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
          <h1 className="text-2xl font-semibold text-gray-900">My Websites</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage your websites.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New Website
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mt-8 card">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Create New Website
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="name" className="form-label">
                  Website Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="My Awesome Website"
                />
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="slug" className="form-label">
                  Slug
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder="my-awesome-website"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  This will be the URL of your website.
                </p>
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
                Create Website
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {websites.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No websites found. Create your first website to get started.
          </div>
        ) : (
          websites.map((website) => (
            <div key={website.id} className="card">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{website.name}</h3>
                <div className="flex space-x-2">
                  <Link
                    to={`/preview/${website.id}`}
                    className="text-primary-600 hover:text-primary-900"
                    title="Preview Website"
                  >
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <Link
                    to={`/builder/${website.id}`}
                    className="text-primary-600 hover:text-primary-900"
                    title="Edit Website"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <button
                    onClick={() => handleDelete(website.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete Website"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              <div className="mt-2 text-sm text-gray-500">
                <span className="font-medium">URL:</span> {website.slug}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Sections:</span> {website.section_count || 0}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Created:</span> {formatDate(website.created_at)}
                </div>
              </div>
              
              <div className="mt-4">
                {website.published_at ? (
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Published: {formatDate(website.published_at)}
                    </span>
                    <button
                      className="text-sm text-primary-600 hover:text-primary-900 flex items-center"
                      title="Export Website"
                    >
                      <ArrowDownTrayIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                      Export
                    </button>
                  </div>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Draft
                  </span>
                )}
              </div>
              
              <div className="mt-6">
                <Link
                  to={`/builder/${website.id}`}
                  className="btn-primary w-full flex justify-center"
                >
                  {website.section_count > 0 ? 'Edit Website' : 'Start Building'}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}