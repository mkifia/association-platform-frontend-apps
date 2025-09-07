'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  CalendarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

interface DashboardStats {
  associations: number
  members: number
  events: number
  plans: number
}

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await axios.get('/api/dashboard/stats')
      return response.data
    },
  })

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/recent-activity')
      return response.data
    },
  })

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
        <p className="text-red-700 text-sm mt-1">
          Unable to connect to the API. Please check the BFF service.
        </p>
      </div>
    )
  }

  const statisticsCards = [
    {
      title: 'Total Associations',
      value: stats?.associations || 0,
      icon: BuildingOfficeIcon,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Total Members',
      value: stats?.members || 0,
      icon: UserGroupIcon,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Upcoming Events',
      value: stats?.events || 0,
      icon: CalendarIcon,
      color: 'text-yellow-600 bg-yellow-100',
    },
    {
      title: 'Active Plans',
      value: stats?.plans || 0,
      icon: DocumentTextIcon,
      color: 'text-purple-600 bg-purple-100',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your association platform
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statisticsCards.map((card, index) => (
          <div
            key={card.title}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {card.title}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? (
                  <div className="animate-pulse h-8 w-16 bg-gray-200 rounded"></div>
                ) : (
                  card.value
                )}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-5">
            {isLoadingActivity ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentActivity && recentActivity.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentActivity.map((activity: any, index: number) => (
                  <li key={index} className="py-4">
                    <div className="flex space-x-3">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-500">{activity.time}</p>
                        </div>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No recent activity found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
