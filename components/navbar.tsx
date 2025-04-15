import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { MobileNav } from "@/components/mobile-nav"
import { AuthStatus } from "@/components/auth-status"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Learning Dashboard</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/courses" className="transition-colors hover:text-foreground/80">
              Kursus
            </Link>
            <Link href="/forum" className="transition-colors hover:text-foreground/80">
              Forum
            </Link>
            <Link href="/resources" className="transition-colors hover:text-foreground/80">
              Sumber Daya
            </Link>
            <Link href="/leaderboard" className="transition-colors hover:text-foreground/80">
              Leaderboard
            </Link>
          </nav>
        </div>
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/search">
              <button className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
                <span className="hidden lg:inline-flex">Cari kursus...</span>
                <span className="inline-flex lg:hidden">Cari...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </button>
            </Link>
          </div>
          <nav className="flex items-center">
            <AuthStatus />
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
