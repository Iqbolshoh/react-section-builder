import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ArrowLeftIcon, EyeIcon, ArrowDownTrayIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline'

import SectionSidebar from '../../components/builder/SectionSidebar'
import SectionItem from '../../components/builder/SectionItem'
import SectionEditor from '../../components/builder/SectionEditor'

export default function WebsiteBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [website, setWebsite] = useState(null)
  const [sections, setSections] = useState([])
  const [availableSections, setAvailableSections] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [exporting, setExporting] = useState(false)
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchData()
  }, [id])

  const fetchData = async () => {
    try {
      const [websiteRes, sectionsRes, categoriesRes] = await Promise.all([
        axios.get(`/api/sites/${id}`),
        axios.get(`/api/sites/${id}/sections`),
        axios.get('/api/admin/categories')
      ])
      
      setWebsite(websiteRes.data)
      setSections(sectionsRes.data)
      setCategories(categoriesRes.data)
      
      // Fetch available sections
      const availableSectionsRes = await axios.get('/api/admin/sections')
      setAvailableSections(availableSectionsRes.data)
    } catch (error) {
      toast.error('Failed to load website data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    
    if (active.id !== over.id) {
      // Find the indices of the items
      const oldIndex = sections.findIndex(section => section.id === active.id)
      const newIndex = sections.findIndex(section => section.id === over.id)
      
      // Reorder the sections
      const newSections = arrayMove(sections, oldIndex, newIndex)
      
      // Update the order property of each section
      const updatedSections = newSections.map((section, index) => ({
        ...section,
        order: index
      }))
      
      // Update the state
      setSections(updatedSections)
      
      // Update the order in the database
      try {
        await axios.patch(`/api/sites/${id}/sections/${active.id}`, {
          order: newIndex
        })
      } catch (error) {
        toast.error('Failed to update section order')
        console.error(error)
        // Revert to the original order
        fetchData()
      }
    }
  }

  const handleAddSection = async (sectionData) => {
    try {
      // Determine the order for the new section
      const order = sections.length
      
      // Add the section to the website
      const res = await axios.post(`/api/sites/${id}/sections`, {
        section_id: sectionData.id,
        order
      })
      
      // Add the new section to the state
      setSections([...sections, res.data])
      toast.success('Section added successfully')
    } catch (error) {
      toast.error('Failed to add section')
      console.error(error)
    }
  }

  const handleUpdateSection = async (sectionId, customData) => {
    try {
      const res = await axios.patch(`/api/sites/${id}/sections/${sectionId}`, {
        custom_data: customData
      })
      
      // Update the section in the state
      const updatedSections = sections.map(section => 
        section.id === sectionId ? res.data : section
      )
      
      setSections(updatedSections)
      toast.success('Section updated successfully')
    } catch (error) {
      toast.error('Failed to update section')
      console.error(error)
    }
  }

  const handleDeleteSection = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this section?')) return
    
    try {
      await axios.delete(`/api/sites/${id}/sections/${sectionId}`)
      
      // Remove the section from the state
      const updatedSections = sections.filter(section => section.id !== sectionId)
      
      // Update the order of the remaining sections
      const reorderedSections = updatedSections.map((section, index) => ({
        ...section,
        order: index
      }))
      
      setSections(reorderedSections)
      
      // If the deleted section was selected, clear the selection
      if (selectedSection && selectedSection.id === sectionId) {
        setSelectedSection(null)
      }
      
      toast.success('Section deleted successfully')
    } catch (error) {
      toast.error('Failed to delete section')
      console.error(error)
    }
  }

  const handleMoveSection = async (sectionId, direction) => {
    const sectionIndex = sections.findIndex(section => section.id === sectionId)
    
    if ((direction === 'up' && sectionIndex === 0) || 
        (direction === 'down' && sectionIndex === sections.length - 1)) {
      return
    }
    
    const newIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1
    const newSections = arrayMove(sections, sectionIndex, newIndex)
    
    // Update the order property of each section
    const updatedSections = newSections.map((section, index) => ({
      ...section,
      order: index
    }))
    
    // Update the state
    setSections(updatedSections)
    
    // Update the order in the database
    try {
      await axios.patch(`/api/sites/${id}/sections/${sectionId}`, {
        order: newIndex
      })
    } catch (error) {
      toast.error('Failed to update section order')
      console.error(error)
      // Revert to the original order
      fetchData()
    }
  }

  const handlePublish = async () => {
    setPublishing(true)
    
    try {
      await axios.post(`/api/sites/${id}/publish`)
      toast.success('Website published successfully')
      fetchData() // Refresh data to get updated published status
    } catch (error) {
      toast.error('Failed to publish website')
      console.error(error)
    } finally {
      setPublishing(false)
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
      {/* Builder Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="mr-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <h1 className="text-lg font-medium text-gray-900">{website.name}</h1>
          {website.published_at && (
            <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Published
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(`/preview/${id}`)}
            className="btn-secondary flex items-center"
          >
            <EyeIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            Preview
          </button>
          
          <button
            onClick={handleExport}
            disabled={exporting || sections.length === 0}
            className="btn-secondary flex items-center"
          >
            {exporting ? (
              <div className="h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-1"></div>
            ) : (
              <ArrowDownTrayIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            )}
            Export
          </button>
          
          <button
            onClick={handlePublish}
            disabled={publishing || sections.length === 0}
            className="btn-primary flex items-center"
          >
            {publishing ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
            ) : (
              'Publish'
            )}
          </button>
        </div>
      </div>

      {/* Builder Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SectionSidebar
          categories={categories}
          sections={availableSections}
          onAddSection={handleAddSection}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-50 p-4">
          {sections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">No sections yet</h2>
                <p className="mt-2 text-gray-500">Add sections from the sidebar to start building your website.</p>
                <button
                  onClick={() => setShowSidebar(true)}
                  className="mt-6 btn-primary flex items-center mx-auto"
                >
                  <PlusIcon className="h-5 w-5 mr-1" aria-hidden="true" />
                  Add Section
                </button>
              </div>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map(section => section.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {sections.map((section) => (
                    <SectionItem
                      key={section.id}
                      section={section}
                      isSelected={selectedSection?.id === section.id}
                      onSelect={() => setSelectedSection(section)}
                      onDelete={() => handleDeleteSection(section.id)}
                      onMoveUp={() => handleMoveSection(section.id, 'up')}
                      onMoveDown={() => handleMoveSection(section.id, 'down')}
                      isFirst={section.order === 0}
                      isLast={section.order === sections.length - 1}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Editor Panel */}
        {selectedSection && (
          <SectionEditor
            section={selectedSection}
            onClose={() => setSelectedSection(null)}
            onUpdate={(customData) => handleUpdateSection(selectedSection.id, customData)}
          />
        )}
      </div>
    </div>
  )
}