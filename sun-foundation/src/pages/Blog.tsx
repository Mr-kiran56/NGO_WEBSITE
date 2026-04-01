import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Clock, Calendar, ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const blogPosts = [
  {
    slug: 'how-tech-saala-is-bridging-digital-divide',
    title: 'How Tech Saala Is Bridging the Digital Divide in Rural AP',
    excerpt: 'Inside the journey of 45 young educators who are teaching Python and internet skills to kids who\'ve never owned a computer.',
    category: 'Technology',
    featuredImage: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80',
    author: { name: 'Pavan Kumar', initials: 'PK', role: 'Co-Founder' },
    date: 'Mar 25, 2026',
    readTime: 5,
    badge: 'secondary' as const,
  },
  {
    slug: 'feeding-hands-52-sundays',
    title: '52 Sundays, 52,000 Meals: The Feeding Hands Story',
    excerpt: 'How a small group of volunteers turned a single Sunday distribution into a year-round mission of fighting hunger in Vijayawada.',
    category: 'Food & Nutrition',
    featuredImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    author: { name: 'Yashwanth', initials: 'YR', role: 'Co-Founder' },
    date: 'Mar 18, 2026',
    readTime: 7,
    badge: 'saffron' as const,
  },
  {
    slug: 'meeras-story-elite-queens',
    title: 'Meera\'s Story: From Homemaker to Entrepreneur in 6 Months',
    excerpt: 'How the Elite Queens team empowered Meera Devi from Krishna district to launch her own tailoring business.',
    category: 'Women Empowerment',
    featuredImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    author: { name: 'Krishnaprasad', initials: 'KP', role: 'Co-Founder' },
    date: 'Mar 10, 2026',
    readTime: 6,
    badge: 'golden' as const,
  },
  {
    slug: 'annual-health-camp-2025-report',
    title: 'Annual Health Camp 2025: 800 Patients, 3 Days, One Mission',
    excerpt: 'A field report from our biggest healthcare event — what we achieved, what we learned, and what\'s next.',
    category: 'Healthcare',
    featuredImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    author: { name: 'Life Saviours Team', initials: 'LS', role: 'Healthcare Team' },
    date: 'Feb 28, 2026',
    readTime: 8,
    badge: 'saffron' as const,
  },
  {
    slug: '10-years-of-sun-foundation',
    title: '10 Years of SUN Foundation: What We\'ve Learned About Grassroots Change',
    excerpt: 'On our 10th anniversary, the three founders reflect on failures, breakthroughs, and the lessons that can help any changemaker.',
    category: 'Impact',
    featuredImage: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=80',
    author: { name: 'Yashwanth', initials: 'YR', role: 'Co-Founder' },
    date: 'Feb 15, 2026',
    readTime: 12,
    badge: 'forest' as const,
  },
  {
    slug: 'guiding-lights-mentorship-success',
    title: 'From Village to IIT: How Guiding Lights Changed Arjun\'s Life',
    excerpt: 'Arjun Kumar, from a small village in Guntur, just cleared his JEE Advanced. His mentor says it was all about believing before he did.',
    category: 'Education',
    featuredImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    author: { name: 'Guiding Lights Team', initials: 'GL', role: 'Education Team' },
    date: 'Jan 30, 2026',
    readTime: 5,
    badge: 'forest' as const,
  },
]

const categories = ['All', 'Technology', 'Food & Nutrition', 'Women Empowerment', 'Healthcare', 'Education', 'Impact']

export default function Blog() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 6

  const filtered = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchesCat = category === 'All' || post.category === category
    return matchesSearch && matchesCat
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <Helmet>
        <title>Blog — SUN Foundation</title>
        <meta name="description" content="Stories, field reports, and insights from SUN Foundation's work across Andhra Pradesh." />
      </Helmet>

      <PageHero
        title="Stories of Change"
        subtitle="Field reports, impact stories, and insights from the ground — written by those living the mission."
        breadcrumbs={[{ label: 'Home', to: '/home' }, { label: 'Blog' }]}
      />

      <section className="section-padding">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1) }}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={post.badge} className="text-xs">{post.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 flex flex-col h-[calc(100%-192px)]">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime} min read</span>
                    </div>
                    <h3 className="font-bold font-display text-foreground text-base mb-2 leading-tight line-clamp-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs bg-saffron-100 dark:bg-saffron-950 text-saffron-600 dark:text-saffron-400">
                            {post.author.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-semibold text-foreground">{post.author.name}</p>
                          <p className="text-xs text-muted-foreground">{post.author.role}</p>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm" className="text-saffron-500 p-0 h-auto gap-1 hover:text-saffron-600">
                        <Link to={`/blog/${post.slug}`}>
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg">No posts match your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setCategory('All') }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? 'saffron' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
