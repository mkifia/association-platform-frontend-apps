'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  DocumentTextIcon,
  CogIcon,
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Associations', href: '/associations', icon: BuildingOfficeIcon },
  { name: 'Members', href: '/members', icon: UserGroupIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Plans', href: '/plans', icon: DocumentTextIcon },
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
        <h2 className="text-lg font-semibold text-gray-900">
          Association Platform
        </h2>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={classNames(
                isActive
                  ? 'bg-admin-50 border-admin-500 text-admin-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-3 py-2 text-sm font-medium border-l-4 transition-colors duration-150 ease-in-out'
              )}
            >
              <item.icon
                className={classNames(
                  isActive
                    ? 'text-admin-500'
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
    </div>
  )
}
