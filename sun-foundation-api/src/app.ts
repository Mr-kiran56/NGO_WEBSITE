import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import { generalRateLimit } from './middleware/rateLimit.middleware'
import { errorHandler, notFoundHandler } from './middleware/error.middleware'

import authRoutes from './routes/auth.routes'
import volunteerRoutes from './routes/volunteer.routes'
import donationRoutes from './routes/donation.routes'
import blogRoutes from './routes/blog.routes'
import galleryRoutes from './routes/gallery.routes'
import eventRoutes from './routes/event.routes'
import contactRoutes from './routes/contact.routes'
import statsRoutes from './routes/stats.routes'

const app = express()

// ─── Security & Logging ───────────────────────────────────────────────────────
app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  })
)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// ─── Global Rate Limit ────────────────────────────────────────────────────────
app.use('/api', generalRateLimit)

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/donations', donationRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/stats', statsRoutes)

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

export default app
