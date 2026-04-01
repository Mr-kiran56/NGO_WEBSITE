import { Link } from 'react-router-dom'
import { MessageCircle, Heart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Works', to: '/works' },
  { label: 'Events', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
  { label: 'Volunteer', to: '/volunteer' },
  { label: 'Donate', to: '/donate' },
]

const teams = [
  'Feeding Hands',
  'Life Saviours',
  'Tech Saala',
  'Elite Queens',
  'Visual Vibes',
  'Guiding Lights',
]

export default function Footer() {
  return (
    <footer className="bg-foreground/95 text-background/90 pt-16 pb-6">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-saffron-gradient flex items-center justify-center shadow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
              <div>
                <p className="font-bold font-display text-white text-sm">SUN Foundation</p>
                <p className="text-[10px] text-white/50 tracking-widest uppercase">Est. 2014</p>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed mb-4">
              Student Union for Nation — empowering underprivileged communities through education,
              healthcare, and sustainable economic opportunities across India.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: 'https://instagram.com/student_union_for_nation', icon: '📸' },
                { label: 'Facebook', href: 'https://facebook.com/Student-Union-for-Nation', icon: '👥' },
                { label: 'YouTube', href: '#', icon: '▶' },
                { label: 'WhatsApp', href: 'https://wa.me/919494808589', icon: '💬' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-saffron-500 transition-colors text-sm"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-background/60 hover:text-saffron-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-saffron-500 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Teams */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Our Teams</h3>
            <ul className="space-y-2">
              {teams.map((team) => (
                <li key={team}>
                  <Link
                    to="/works#teams"
                    className="text-sm text-background/60 hover:text-saffron-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-forest-500 flex-shrink-0" />
                    {team}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm tracking-wide uppercase">Stay Connected</h3>
            <p className="text-sm text-background/60 mb-4 leading-relaxed">
              Get updates on our latest projects, events, and impact stories.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-saffron-500"
              />
              <Button variant="saffron" size="sm" type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-xs text-background/50">
                <span className="text-saffron-400 font-semibold">Email:</span>{' '}
                studentunionfornation@gmail.com
              </p>
              <p className="text-xs text-background/50 mt-1">
                <span className="text-saffron-400 font-semibold">Phone:</span>{' '}
                +91 94948 08589
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40 text-center md:text-left">
            © {new Date().getFullYear()} SUN Foundation. Registered under Indian Trust Act.
            Reg. No: AP/2014/0012345
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-saffron-500 fill-saffron-500" /> for India
          </p>
        </div>
      </div>
    </footer>
  )
}
