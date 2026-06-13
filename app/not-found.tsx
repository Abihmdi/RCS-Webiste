import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center space-y-6 max-w-md px-4">
        <div className="space-y-2">
          <h1
            className="text-8xl font-black tracking-tight text-[#ECFF8A]"
            style={{ fontFamily: 'var(--font-bebas-neue)' }}
          >
            404
          </h1>
          <h2 className="text-2xl font-black tracking-tight" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
            PAGE NOT FOUND
          </h2>
          <p className="text-sm text-muted-foreground font-mono">
            The resource you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="bg-secondary/40 border border-border/50 rounded-xl p-4 font-mono text-xs text-muted-foreground text-left">
          <div className="text-[#ECFF8A] mb-2">$ rcs navigate --home</div>
          <div>Redirecting to main page...</div>
        </div>

        <Link
          href="/"
          className="btn-brand text-xs font-mono inline-flex"
        >
          Return Home →
        </Link>
      </div>
    </div>
  )
}
