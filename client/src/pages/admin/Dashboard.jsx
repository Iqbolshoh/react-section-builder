import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    sections: 0,
    websites: 0,
    users: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoriesRes, sectionsRes, websitesRes, usersRes] = await Promise.all([
          axios.get('/api/admin/categories'),
          axios.get('/api/admin/sections'),
          axios.get('/api/admin/websites'),
          axios.get('/api/admin/users')
        ])
        
        setStats({
          categories: categoriesRes.data.length,
          sections: sectionsRes.data.length,
          websites: websitesRes.data.length,
          users: usersRes.data.length
        })
      } catch (error) {
        toast.error('Failed to load dashboard data')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStats()
  }, [])

  const cards = [
    { name: 'Categories', value: stats.categories, href: '/admin/categories', color: 'bg-blue-500' },
    { name: 'Sections', value: stats.sections, href: '/admin/sections', color: 'bg-green-500' },
    { name: 'Websites', value: stats.websites, href: '/admin/websites', color: 'bg-purple-500' },
    { name: 'Users', value: stats.users, href: '/admin/users', color: 'bg-orange-500' }
  ]

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.name} className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`h-12 w-12 rounded-md ${card.color} flex items-center justify-center`}>
                    <span className="text-white text-lg font-bold">{card.value}</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{card.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link to={card.href} className="font-medium text-primary-600 hover:text-primary-500">
                  View all
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white shadow p-6">
            <h3 className="text-base font-semibold text-gray-900">Add New Section</h3>
            <p className="mt-1 text-sm text-gray-500">Create a new section template for users to add to their websites.</p>
            <div className="mt-4">
              <Link to="/admin/sections" className="btn-primary inline-flex">
                Create Section
              </Link>
            </div>
          </div>
          <div className="rounded-lg bg-white shadow p-6">
            <h3 className="text-base font-semibold text-gray-900">Add New Category</h3>
            <p className="mt-1 text-sm text-gray-500">Create a new category to organize sections.</p>
            <div className="mt-4">
              <Link to="/admin/categories" className="btn-primary inline-flex">
                Create Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}