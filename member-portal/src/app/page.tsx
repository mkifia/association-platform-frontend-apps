'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function HomePage() {
  const { data: associations, isLoading, error } = useQuery({
    queryKey: ['associations'],
    queryFn: async () => {
      const response = await axios.get('/api/associations')
      return response.data
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-red-800 font-medium">Error loading associations</h3>
        <p className="text-red-700 text-sm mt-1">
          Unable to connect to the API. Please check the BFF service.
        </p>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Association Platform
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Member Portal - Access your association information
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                My Associations
              </h3>
              <p className="text-gray-600">
                View and manage your association memberships
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Events
              </h3>
              <p className="text-gray-600">
                Browse upcoming association events
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Profile
              </h3>
              <p className="text-gray-600">
                Update your member profile information
              </p>
            </div>
          </div>

          {associations && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Available Associations</h2>
              <div className="text-sm text-gray-500">
                {JSON.stringify(associations, null, 2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
