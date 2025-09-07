'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  BanknotesIcon,
  ChartBarIcon,
  CogIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Members', href: '/members', icon: UserGroupIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Contributions', href: '/contributions', icon: BanknotesIcon },
  { name: 'Reports', href: '/reports', icon: ChartBarIcon },
  { name: 'Membership Types', href: '/membership-types', icon: DocumentTextIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-association-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Association
            </h2>
            <p className="text-xs text-gray-500">Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                isActive
                  ? 'bg-association-50 border-association-500 text-association-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-150 ease-in-out'
              )}
            >
              <item.icon
                className={classNames(
                  isActive
                    ? 'text-association-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6'
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Association Info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">AS</span>
            </div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Sample Association
            </p>
            <p className="text-xs text-gray-500 truncate">
              Tenant ID: tenant-123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
