import { useState } from 'react'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const mockPosts = [
  { id: '1', title: 'How Tech Saala Is Bridging the Digital Divide', category: 'Technology', status: 'published' as const, date: 'Mar 25, 2026', author: 'Pavan Kumar' },
  { id: '2', title: '52 Sundays, 52,000 Meals: The Feeding Hands Story', category: 'Food', status: 'published' as const, date: 'Mar 18, 2026', author: 'Yashwanth' },
  { id: '3', title: 'Draft: Upcoming Health Camp Preview', category: 'Healthcare', status: 'draft' as const, date: 'Apr 1, 2026', author: 'Admin' },
]

type Post = typeof mockPosts[0]

export default function AdminBlog() {
  const [posts, setPosts] = useState(mockPosts)
  const [editorOpen, setEditorOpen] = useState(false)
  const [editPost, setEditPost] = useState<Partial<Post> | null>(null)

  const handleNew = () => {
    setEditPost({ title: '', category: '', status: 'draft' })
    setEditorOpen(true)
  }

  const handleEdit = (post: Post) => {
    setEditPost(post)
    setEditorOpen(true)
  }

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id))
    toast.success('Post deleted')
  }

  const handleSave = () => {
    if (!editPost?.title) {
      toast.error('Title is required')
      return
    }
    if (editPost.id) {
      setPosts(prev => prev.map(p => p.id === editPost.id ? { ...p, ...editPost } as Post : p))
      toast.success('Post updated')
    } else {
      setPosts(prev => [...prev, { ...editPost, id: Date.now().toString(), date: new Date().toLocaleDateString('en-IN'), author: 'Admin' } as Post])
      toast.success('Post created')
    }
    setEditorOpen(false)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm font-body">{posts.length} posts total</p>
        </div>
        <Button variant="saffron" size="sm" onClick={handleNew} className="gap-1.5 self-start">
          <Plus className="w-4 h-4" /> New Post
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y">
            {posts.map((post) => (
              <div key={post.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={post.status === 'published' ? 'forest' : 'saffron'} className="text-xs">{post.status}</Badge>
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </div>
                  <p className="font-semibold font-body text-foreground mt-1 truncate">{post.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">By {post.author} • {post.date}</p>
                </div>
                <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                  <button
                    onClick={() => window.open('/blog/slug', '_blank')}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                    aria-label="Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors"
                    aria-label="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-1.5 text-muted-foreground hover:text-destructive rounded-md transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Editor Dialog */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">{editPost?.id ? 'Edit Post' : 'New Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={editPost?.title || ''}
                onChange={e => setEditPost(p => ({ ...p, title: e.target.value }))}
                placeholder="Post title..."
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={editPost?.category || ''}
                  onValueChange={v => setEditPost(p => ({ ...p, category: v }))}
                >
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Women Empowerment">Women Empowerment</SelectItem>
                    <SelectItem value="Impact">Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={editPost?.status || 'draft'}
                  onValueChange={v => setEditPost(p => ({ ...p, status: v as 'draft' | 'published' }))}
                >
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Content</Label>
              <Textarea
                placeholder="Write your blog content here..."
                className="mt-1 min-h-[200px]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditorOpen(false)}>Cancel</Button>
              <Button variant="saffron" onClick={handleSave}>Save Post</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
