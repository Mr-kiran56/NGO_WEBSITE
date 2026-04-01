import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', to: '/home' },
  { label: 'About', to: '/about' },
  { label: 'Our Works', to: '/works' },
  { label: 'Teams', to: '/works#teams' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

interface NavbarProps {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/home'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'

  return (
    <motion.header
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', navBg)}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container flex h-16 items-center justify-between max-w-7xl mx-auto px-4">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-full bg-saffron-gradient flex items-center justify-center shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" fill="white" />
              {[0,45,90,135,180,225,270,315].map((deg, i) => (
                <line
                  key={i}
                  x1="12" y1="12"
                  x2={12 + 9 * Math.cos((deg - 90) * Math.PI / 180)}
                  y2={12 + 9 * Math.sin((deg - 90) * Math.PI / 180)}
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ))}
            </svg>
          </div>
          <div className="leading-tight">
            <span className={cn(
              'text-lg font-bold font-display transition-colors',
              isHome && !scrolled ? 'text-white' : 'text-foreground'
            )}>
              SUN Foundation
            </span>
            <span className={cn(
              'block text-[10px] font-body tracking-widest uppercase transition-colors',
              isHome && !scrolled ? 'text-white/70' : 'text-muted-foreground'
            )}>
              Student Union for Nation
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => cn(
                'px-3 py-1.5 rounded-md text-sm font-medium font-body transition-colors',
                isHome && !scrolled
                  ? isActive
                    ? 'text-golden bg-white/10'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                  : isActive
                    ? 'text-saffron-500 bg-saffron-50 dark:bg-saffron-950'
                    : 'text-foreground hover:text-saffron-500 hover:bg-muted'
              )}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={cn(
              'p-2 rounded-md transition-colors',
              isHome && !scrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
            )}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Button asChild variant="saffron" size="sm" className="hidden sm:flex gap-1.5">
            <Link to="/donate">
              <Heart className="w-3.5 h-3.5" />
              Donate
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors',
                  isHome && !scrolled ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted'
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                  <div className="w-8 h-8 rounded-full bg-saffron-gradient flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="white" />
                      {[0,45,90,135,180,225,270,315].map((deg, i) => (
                        <line key={i} x1="12" y1="12"
                          x2={12 + 9 * Math.cos((deg - 90) * Math.PI / 180)}
                          y2={12 + 9 * Math.sin((deg - 90) * Math.PI / 180)}
                          stroke="white" strokeWidth="2" strokeLinecap="round"
                        />
                      ))}
                    </svg>
                  </div>
                  <span className="font-bold font-display text-foreground">SUN Foundation</span>
                </div>
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => cn(
                        'px-4 py-2.5 rounded-md text-sm font-medium font-body transition-colors',
                        isActive
                          ? 'bg-saffron-50 text-saffron-600 dark:bg-saffron-950 dark:text-saffron-400'
                          : 'text-foreground hover:bg-muted hover:text-saffron-500'
                      )}
                    >
                      {link.label}
                    </NavLink>
                  </SheetClose>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <Button asChild variant="saffron" className="w-full gap-2">
                    <SheetClose asChild>
                      <Link to="/donate">
                        <Heart className="w-4 h-4" />
                        Donate Now
                      </Link>
                    </SheetClose>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
