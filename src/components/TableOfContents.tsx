import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings?: TocItem[]
}

export default function TableOfContents({ headings = [] }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h4 className="text-sm font-semibold text-gray-900 mb-4">On this page</h4>
      <nav className="space-y-1">
        {headings.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`block text-sm transition-colors ${
              activeId === id
                ? 'text-primary-600 font-medium'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={{ paddingLeft: `${(level - 1) * 0.75}rem` }}
          >
            {text}
          </a>
        ))}
      </nav>
    </div>
  )
}