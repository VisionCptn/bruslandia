import { Suspense } from 'react'
import { ResetForm } from './ResetForm'

export default function ResetPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Suspense fallback={null}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  )
}
