import { useId } from 'react'
import { getRandomRotationClass } from '../../utils/randomPosition'

type NavbarLink =
  | {
      type: string
      page: null | {
        slug?: string | null
        url?: string | null
      }
      url: string | null
      newTab: boolean
    }
  | {
      type: string
      page: string | null
      url: string | null
      newTab: boolean
    }

type NavbarChildItem = {
  id: string
  label: string
  link: NavbarLink
}

type NavbarMenuItem = {
  id: string
  label: string
  link: NavbarLink
  children?: NavbarChildItem[]
}

export type NavbarData = {
  id: number
  heading?: string | null
  menuItems: NavbarMenuItem[]
  updatedAt?: string
  createdAt?: string
  globalType?: string
}

type Props = {
  data: NavbarData
  currentPathname?: string
}

/**
 * A string to be converted into a slug.
 * It will be lowercased, trimmed, spaces will be replaced with hyphens,
 * and non-alphanumeric characters (except hyphens) will be removed.
 */
function slug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]+/gu, '')
}

function resolveLink(link: NavbarLink): {
  href: string
  target?: '_blank'
  rel?: string
} | null {
  const url = link.url?.trim() || null

  const pageUrl =
    link.type === 'page' && typeof link.page === 'object'
      ? link.page.url?.trim() || (link.page.slug ? `/${link.page.slug}` : null)
      : null

  const href = pageUrl || url
  if (!href) return null

  if (link.newTab) {
    return { href, target: '_blank', rel: 'noreferrer noopener' }
  }

  return { href }
}

function isCurrent(href: string, currentPathname?: string) {
  if (!currentPathname) return false

  const norm = (s: string) => (s.length > 1 ? s.replace(/\/+$/, '') : s)
  return norm(href) === norm(currentPathname)
}

const DEFAULT_MENU_ITEMS = {
  id: 1,
  heading: 'Vse sho je',
  menuItems: [
    {
      id: '6994c3afbf79542ae7cd4538',
      label: 'merch',
      children: [
        {
          id: '6994c3c6bf79542ae7cd453a',
          label: 't-shirts',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c3dbbf79542ae7cd453c',
          label: 'posters',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c3e3bf79542ae7cd453e',
          label: 'small & shiny',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
      ],
      link: {
        type: 'custom',
        page: '',
        url: '',
        newTab: false,
      },
    },
    {
      id: '6994c3f0bf79542ae7cd4540',
      label: 'gifts',
      children: [
        {
          id: '6994c3f7bf79542ae7cd4542',
          label: 'package paper',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c403bf79542ae7cd4544',
          label: 'package wraps',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c40ebf79542ae7cd4546',
          label: 'tisue',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c414bf79542ae7cd4548',
          label: 'letters',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
      ],
      link: {
        type: 'page',
        page: '',
        url: '',
        newTab: false,
      },
    },
    {
      id: '6994c41bbf79542ae7cd454a',
      label: 'Home rituals',
      children: [
        {
          id: '6994c425bf79542ae7cd454c',
          label: 'Textile',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c42dbf79542ae7cd454e',
          label: 'Baking forms',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
        {
          id: '6994c436bf79542ae7cd4550',
          label: 'About project',
          link: {
            type: 'page',
            page: '',
            url: '',
            newTab: false,
          },
        },
      ],
      link: {
        type: 'page',
        page: '',
        url: '',
        newTab: false,
      },
    },
  ],
  _status: '_status',
  updatedAt: '2026-02-17T19:58:00.531Z',
  createdAt: '2026-02-17T19:40:54.353Z',
  globalType: 'navbar',
}

export const MainMenuContent = ({ data, currentPathname }: Props) => {
  let localData = null

  if (!data || !data.menuItems || data.menuItems.length === 0) {
    localData = DEFAULT_MENU_ITEMS
  } else {
    localData = data
  }

  const navLabelId = useId()
  const heading = localData.heading ?? undefined

  return (
    <nav aria-labelledby={navLabelId} className="flex h-full flex-col font-medium">
      {heading ? (
        <h2
          id={navLabelId}
          className={`block pb-2 text-base font-bold ${getRandomRotationClass()}`}
        >
          {heading}
        </h2>
      ) : (
        <span id={navLabelId} className="sr-only">
          Menu
        </span>
      )}

      <div className="pl-2">
        {localData.menuItems.map((section) => {
          const sectionId = `${navLabelId}-${slug(section.label)}`
          const hasChildren = Boolean(section.children?.length)

          if (!hasChildren) {
            const link = resolveLink(section.link)
            const href = link?.href

            return (
              <div key={section.id} className="mb-4">
                {href ? (
                  <a
                    className={`block max-w-max hover:font-bold ${getRandomRotationClass()}`}
                    href={href}
                    target={link?.target}
                    rel={link?.rel}
                    aria-current={isCurrent(href, currentPathname) ? 'page' : undefined}
                  >
                    {section.label}
                  </a>
                ) : (
                  <span className={`block ${getRandomRotationClass()}`}>{section.label}</span>
                )}
              </div>
            )
          }

          return (
            <section key={section.id} className="mb-6" aria-labelledby={sectionId}>
              <h3 id={sectionId} className={`pb-1 text-base font-bold ${getRandomRotationClass()}`}>
                <a
                  className={`cursor-pointer block max-w-max hover:font-bold ${getRandomRotationClass()}`}
                  href={section.link.url}
                >
                  {section.label}
                </a>
              </h3>

              <ul className="pl-5">
                {section.children!.map((item) => {
                  const link = resolveLink(item.link)
                  const href = link?.href

                  return (
                    <li key={item.id}>
                      <a
                        className={`cursor-pointer block max-w-max hover:font-bold ${getRandomRotationClass()}`}
                        href={href}
                        target={link?.target}
                        rel={link?.rel}
                        aria-current={isCurrent(href, currentPathname) ? 'page' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </nav>
  )
}

//               _._     _,-'""`-._            /
//               (,-.`._,'(       |\`-/|       \
//                   `-.-' \ )-`( , o o)       |
//                         `-    \`_`"'-      /
//                                          *
