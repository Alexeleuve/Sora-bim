'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import type { BlogCategory } from '@/types'

interface CategoryItem {
  value: string
  label: string
  count?: number
}

interface BlogCategoryFilterProps {
  categories: CategoryItem[]
  activeCategory: string
  allLabel: string
}

export default function BlogCategoryFilter({
  categories,
  activeCategory,
  allLabel,
}: BlogCategoryFilterProps) {
  const router = useRouter()
  const locale = useLocale()
  const pathname = usePathname()

  const handleSelect = (value: string) => {
    if (value === 'all') {
      const isEs = locale === 'es'
      router.push(`/${locale}/blog`)
    } else {
      const isEs = locale === 'es'
      const catPath = isEs ? 'categoria' : 'category'
      router.push(`/${locale}/blog/${catPath}/${value}`)
    }
  }

  const allCategories = [{ value: 'all', label: allLabel }, ...categories]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filtrar por categoría"
    >
      {allCategories.map((cat) => (
        <button
          key={cat.value}
          role="tab"
          aria-selected={activeCategory === cat.value}
          onClick={() => handleSelect(cat.value)}
          className={cn(
            'inline-flex items-center gap-1.5',
            'font-display font-semibold text-[0.6875rem] tracking-[0.06em] uppercase',
            'px-4 py-2 rounded-sm border',
            'transition-all duration-150',
            'focus-visible:outline-[3px] focus-visible:outline-brand-300 focus-visible:outline-offset-[2px]',
            activeCategory === cat.value
              ? 'bg-brand-800 text-white border-brand-800'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-brand-400 hover:text-brand-600'
          )}
        >
          {cat.label}
          {cat.count !== undefined && (
            <span
              className={cn(
                'font-mono text-[0.5625rem] px-1.5 py-0.5 rounded-sm',
                activeCategory === cat.value
                  ? 'bg-white/20 text-white/80'
                  : 'bg-neutral-100 text-neutral-400'
              )}
            >
              {cat.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
