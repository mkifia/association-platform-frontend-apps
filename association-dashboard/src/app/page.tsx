'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  UserGroupIcon,
  CalendarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'

interface DashboardStats {
  members: {
    total: number
    active: number
    new: number
  }
  events: {
    total: number
    upcoming: number
    thisMonth: number
  }
  contributions: {
    total: number
    thisMonth: number
    thisYear: number
  }
  memberships: {
    total: number
    expiringThisMonth: number
  }
}

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await axios.get('/api/dashboard/stats')
      return response.data
    },
  })

  const { data: recentActivities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: async () => {
      const response = await axios.get('/api/dashboard/recent-activities')
      return response.data
    },
  })

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-red-800 font-medium">Error loading dashboard</h3>
        <p className="text-red-700 text-sm mt-1">
          Unable to connect to the Association BFF service.
        </p>
      </div>
    )
  }

  const statisticsCards = [
    {
      title: 'Total Members',
      value: stats?.members.total || 0,
      subtitle: `${stats?.members.active || 0} active`,
      icon: UserGroupIcon,
      color: 'text-blue-600 bg-blue-100',
      change: `+${stats?.members.new || 0} this month`,
    },
    {
      title: 'Events',
      value: stats?.events.upcoming || 0,
      subtitle: 'upcoming events',
      icon: CalendarIcon,
      color: 'text-green-600 bg-green-100',
      change: `${stats?.events.thisMonth || 0} this month`,
    },
    {
      title: 'Contributions',
      value: `€${stats?.contributions.thisMonth || 0}`,
      subtitle: 'this month',
      icon: BanknotesIcon,
      color: 'text-yellow-600 bg-yellow-100',
      change: `€${stats?.contributions.thisYear || 0} this year`,
    },
    {
      title: 'Memberships',
      value: stats?.memberships.total || 0,
      subtitle: 'total memberships',
      icon: ArrowTrendingUpIcon,
      color: 'text-purple-600 bg-purple-100',
      change: `${stats?.memberships.expiringThisMonth || 0} expiring`,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-700">
          Overview of your association management
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statisticsCards.map((card, index) => (
          <div
            key={card.title}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden border border-gray-200"
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
              <p className="ml-2 text-sm text-gray-500">
                {card.subtitle}
              </p>
            </dd>
            <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm text-gray-500">
                {card.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
          <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-sm hover:border-association-500 hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <UserGroupIcon className="mx-auto h-8 w-8 text-association-600" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Add Member
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Register a new member
                  </p>
                </div>
              </button>

              <button className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-sm hover:border-association-500 hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <CalendarIcon className="mx-auto h-8 w-8 text-association-600" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Create Event
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Schedule new event
                  </p>
                </div>
              </button>

              <button className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-sm hover:border-association-500 hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <BanknotesIcon className="mx-auto h-8 w-8 text-association-600" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Record Payment
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Log contribution
                  </p>
                </div>
              </button>

              <button className="relative bg-white p-6 border border-gray-300 rounded-lg shadow-sm hover:border-association-500 hover:shadow-md transition-all duration-200">
                <div className="text-center">
                  <ArrowTrendingUpIcon className="mx-auto h-8 w-8 text-association-600" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    View Reports
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Analytics & insights
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activities
          </h3>
          <div className="mt-5">
            {recentActivities && recentActivities.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentActivities.map((activity: any, index: number) => (
                  <li key={index} className="py-4 flex">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">{activity.title}</h3>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      {activity.member && (
                        <p className="text-xs text-gray-400">Member: {activity.member}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No recent activities found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
