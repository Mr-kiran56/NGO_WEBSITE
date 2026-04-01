import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown, Heart, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCountUp } from '@/hooks/useCountUp'

const stats = [
  { value: 50000, label: 'Lives Touched', suffix: '+', icon: Heart },
  { value: 500, label: 'Volunteers', suffix: '+', icon: Users },
  { value: 150, label: 'K Raised', prefix: '₹', suffix: 'K', icon: null },
  { value: 15, label: 'Events', suffix: '+', icon: null },
]

function StatCounter({ value, label, suffix = '', prefix = '' }: {
  value: number; label: string; suffix?: string; prefix?: string
}) {
  const { count, ref } = useCountUp({ end: value, duration: 2200 })
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <p className="text-3xl md:text-4xl font-bold font-display text-white">
        {prefix}{count.toLocaleString('en-IN')}{suffix}
      </p>
      <p className="text-sm text-white/70 font-body mt-1">{label}</p>
    </div>
  )
}

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1920&q=80"
          alt="Community volunteers working together"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-saffron-900/20" />
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex items-center">
        <div className="container max-w-7xl mx-auto px-4 pt-16">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tag */}
            <motion.div
              className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-400/30 rounded-full px-4 py-1.5 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full bg-saffron-400 animate-pulse" />
              <span className="text-saffron-200 text-sm font-medium font-body">Empowering India Since 2014</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white leading-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Empowering{' '}
              <span className="text-golden">Communities,</span>
              <br />
              Transforming Lives
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Since 2014, SUN Foundation has touched{' '}
              <span className="text-golden font-semibold">50,000+ lives</span> across India
              through education, healthcare, and sustainable development.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button asChild variant="saffron" size="xl">
                <Link to="/volunteer">Join as Volunteer</Link>
              </Button>
              <Button asChild variant="white-outline" size="xl">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="relative bg-black/40 backdrop-blur-sm border-t border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="container max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-white/20">
            {stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-white/40 text-xs font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-4 h-4 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}
