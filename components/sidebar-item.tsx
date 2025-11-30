'use client'

import Link from 'next/link'
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  active?: boolean
  isCollapsed: boolean
  slug: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active = false,
  isCollapsed,
  slug = '#',
}) => {
  return (
    <Link
      href={slug}
      className={cn(
        'group flex items-center rounded px-4 py-2 text-sm transition',
        active
          ? 'bg-black text-white'
          : 'text-gray-600 hover:bg-gray-200 hover:text-black',
      )}
    >
      <Icon
        className={cn(
          'size-4 shrink-0 transition-colors',
          active ? 'text-white' : 'text-gray-500 group-hover:text-black',
        )}
      />
      <span
        className={cn(
          'ml-4 font-medium transition-opacity duration-200',
          isCollapsed && 'hidden opacity-0',
        )}
      >
        {label}
      </span>
    </Link>
  )
}

export default SidebarItem

