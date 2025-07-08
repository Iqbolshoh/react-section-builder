import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ArrowLeftIcon, PencilIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export default function WebsitePreview() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [website, setWebsite] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [websiteRes, sectionsRes] = await Promise.all([
        axios.get(`/api/sites/${id}`),
        axios.get(`/api/sites/${id}/sections`)
      ])
      
      setWebsite(websiteRes.data)
      setSections(sectionsRes.data)
    } catch (error) {
      toast.error('Failed to load website data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    setExporting(true)
    
    try {
      const response = await axios.get(`/api/sites/${id}/export`, {
        responseType: 'blob'
      })
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${website.slug}-export.zip`)
      document.body.appendChild(link)
      link.click()
      
      // Clean up
      link.parentNode.removeChild(link)
      window.URL.revokeObjectURL(url)
      
      toast.success('Website exported successfully')
    } catch (error) {
      toast.error('Failed to export website')
      console.error(error)
    } finally {
      setExporting(false)
    }
  }

  const renderSectionPreview = (section) => {
    // Combine data from default_data, variant_data, and custom_data
    const sectionData = {
      ...JSON.parse(section.default_data),
      ...(section.variant_data ? JSON.parse(section.variant_data) : {}),
      ...(section.custom_data || {})
    }
    
    // Render different section types
    switch (section.category_slug) {
      case 'header':
        return (
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  {sectionData.logo && (
                    <img src={sectionData.logo} alt={sectionData.title} className="h-8 w-auto mr-3" />
                  )}
                  <h1 className="text-xl font-bold text-gray-900">{sectionData.title}</h1>
                </div>
                <nav className="hidden md:flex space-x-10">
                  {sectionData.menuItems?.map((item, index) => (
                    <a key={index} href={item.url} className="text-base font-medium text-gray-500 hover:text-gray-900">
                      {item.label}
                    </a>
                  ))}
                </nav>
                {sectionData.ctaButton && (
                  <div className="hidden md:flex">
                    <a href={sectionData.ctaButton.url} className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700">
                      {sectionData.ctaButton.label}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
        
      case 'hero':
        return (
          <div className="relative bg-gray-50 overflow-hidden">
            {sectionData.backgroundImage && (
              <div className="absolute inset-0">
                <img className="w-full h-full object-cover" src={sectionData.backgroundImage} alt="Background" />
                <div className="absolute inset-0 bg-gray-600 opacity-50"></div>
              </div>
            )}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
              <div className="text-center">
                <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl ${sectionData.backgroundImage ? 'text-white' : 'text-gray-900'}`}>
                  {sectionData.headline}
                </h1>
                <p className={`mt-6 max-w-md mx-auto text-lg sm:text-xl md:mt-8 md:max-w-3xl ${sectionData.backgroundImage ? 'text-white text-opacity-80' : 'text-gray-500'}`}>
                  {sectionData.subheadline}
                </p>
                <div className="mt-10 sm:flex sm:justify-center">
                  {sectionData.ctaButton && (
                    <div className="rounded-md shadow">
                      <a href={sectionData.ctaButton.url} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10">
                        {sectionData.ctaButton.label}
                      </a>
                    </div>
                  )}
                  {sectionData.secondaryButton && (
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a href={sectionData.secondaryButton.url} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                        {sectionData.secondaryButton.label}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
        
      // Add more section type renderers as needed
        
      default:
        return (
          <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
                  {section.category_name}
                </h2>
                <p className="mt-2 text-3xl font-extrabold text-gray-900">
                  {section.section_name}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                  Section preview not implemented for this type
                </p>
                <pre className="mt-6 text-left bg-gray-50 p-4 rounded-md overflow-auto text-xs">
                  {JSON.stringify(sectionData, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!website) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Website not found</h2>
        <p className="mt-2 text-gray-500">The website you're looking for doesn't exist or you don't have access to it.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 btn-primary"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/builder/${id}`)}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">
            Preview: {website.name}
          </h1>
          {website.published_at && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Published
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/builder/${id}`)}
            className="btn-secondary flex items-center"
          >
            <PencilIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Edit
          </button>
          
          <button
            onClick={handleExport}
            disabled={exporting || sections.length === 0}
            className="btn-primary flex items-center"
          >
            {exporting ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
            ) : (
              <ArrowDownTrayIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            )}
            Export
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto">
        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">No sections yet</h2>
              <p className="mt-2 text-gray-500">Add sections to your website to see a preview.</p>
              <button
                onClick={() => navigate(`/builder/${id}`)}
                className="mt-6 btn-primary"
              >
                Start Building
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-full">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <div key={section.id}>
                  {renderSectionPreview(section)}
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}