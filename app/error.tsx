'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            SYSTEM ERROR
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            Something went wrong. Our team has been notified.
          </p>
        </div>
        
        <div className="bg-secondary/40 border border-border/50 rounded-xl p-4 font-mono text-xs text-muted-foreground text-left">
          <div className="text-[#ECFF8A] mb-2">$ error --details</div>
          <div className="truncate">{error.message || 'Unknown error'}</div>
          {error.digest && (
            <div className="mt-1 text-muted-foreground/50">Digest: {error.digest}</div>
          )}
        </div>

        <button
          onClick={reset}
          className="btn-brand text-xs font-mono"
        >
          Retry →
        </button>
      </div>
    </div>
  )
}
