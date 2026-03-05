import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="text-sm mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2 text-gray-400">&rsaquo;</span>}
          {item.href ? (
            <Link href={item.href} className="!text-[#A5A3A4] hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-black font-bold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
