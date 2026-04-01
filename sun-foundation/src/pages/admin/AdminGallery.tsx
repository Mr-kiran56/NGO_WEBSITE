import { useState, useRef } from 'react'
import { Upload, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&q=80', caption: 'Feeding Hands distribution', category: 'Events' },
  { id: '2', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&q=80', caption: 'Health camp 2024', category: 'Healthcare' },
  { id: '3', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80', caption: 'Guiding Lights mentorship', category: 'Education' },
  { id: '4', url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&q=80', caption: 'Elite Queens workshop', category: 'Events' },
  { id: '5', url: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=300&q=80', caption: 'Tech Saala coding class', category: 'Education' },
  { id: '6', url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=300&q=80', caption: 'Visual Vibes shoot', category: 'Team' },
]

export default function AdminGallery() {
  const [images, setImages] = useState(mockImages)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleDelete = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
    toast.success('Image deleted')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    toast.success(`${files.length} image(s) would be uploaded (demo mode)`)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Gallery</h1>
          <p className="text-muted-foreground text-sm font-body">{images.length} images</p>
        </div>
        <Button variant="saffron" size="sm" onClick={() => fileRef.current?.click()} className="gap-1.5">
          <Plus className="w-4 h-4" /> Upload Images
        </Button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) toast.success(`${e.target.files.length} image(s) selected (demo)`)
        }}
      />

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragOver ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/20' : 'border-border'
        }`}
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground font-body text-sm">
          Drag & drop images here, or{' '}
          <button onClick={() => fileRef.current?.click()} className="text-saffron-500 hover:underline">
            browse files
          </button>
        </p>
        <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP up to 5MB each</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={image.url}
                alt={image.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(image.id)}
                className="w-7 h-7 bg-destructive rounded-full flex items-center justify-center shadow-md"
                aria-label="Delete image"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="mt-2 space-y-1">
              <Input
                value={image.caption}
                onChange={e => setImages(prev => prev.map(img => img.id === image.id ? { ...img, caption: e.target.value } : img))}
                className="h-7 text-xs"
                placeholder="Caption..."
              />
              <Select
                value={image.category}
                onValueChange={v => setImages(prev => prev.map(img => img.id === image.id ? { ...img, category: v } : img))}
              >
                <SelectTrigger className="h-7 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Team">Team</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
