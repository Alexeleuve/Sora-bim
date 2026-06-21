/**
 * navigation.ts
 *
 * Creates locale-aware navigation helpers using next-intl's createNavigation.
 * These replace the standard next/navigation hooks so that pathnames defined
 * in routing.ts are automatically translated when switching locales.
 *
 * Usage:
 *   import { useRouter, usePathname, Link } from '@/i18n/navigation'
 */
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
