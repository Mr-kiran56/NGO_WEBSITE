import { useState } from 'react'
import { CheckCircle, XCircle, Download, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockVolunteers = [
  { id: '1', fullName: 'Aisha Rahman', email: 'aisha@email.com', phone: '9876543210', team: 'Elite Queens', cityState: 'Vijayawada, AP', date: 'Apr 1, 2026', status: 'pending' as const },
  { id: '2', fullName: 'Ravi Shankar', email: 'ravi@email.com', phone: '9876543211', team: 'Tech Saala', cityState: 'Guntur, AP', date: 'Mar 30, 2026', status: 'approved' as const },
  { id: '3', fullName: 'Sunita Devi', email: 'sunita@email.com', phone: '9876543212', team: 'Life Saviours', cityState: 'Nellore, AP', date: 'Mar 29, 2026', status: 'pending' as const },
  { id: '4', fullName: 'Karthik Rao', email: 'karthik@email.com', phone: '9876543213', team: 'Guiding Lights', cityState: 'Vijayawada, AP', date: 'Mar 28, 2026', status: 'approved' as const },
  { id: '5', fullName: 'Meena Iyer', email: 'meena@email.com', phone: '9876543214', team: 'Feeding Hands', cityState: 'Visakhapatnam, AP', date: 'Mar 27, 2026', status: 'rejected' as const },
]

type Status = 'pending' | 'approved' | 'rejected'

export default function AdminVolunteers() {
  const [search, setSearch] = useState('')
  const [volunteers, setVolunteers] = useState(mockVolunteers)

  const filtered = volunteers.filter(v =>
    v.fullName.toLowerCase().includes(search.toLowerCase()) ||
    v.email.toLowerCase().includes(search.toLowerCase()) ||
    v.team.toLowerCase().includes(search.toLowerCase())
  )

  const updateStatus = (id: string, status: Status) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v))
    toast.success(`Volunteer ${status}`)
  }

  const badgeVariant = (status: Status) => {
    if (status === 'approved') return 'forest' as const
    if (status === 'rejected') return 'destructive' as const
    return 'saffron' as const
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Volunteers</h1>
          <p className="text-muted-foreground text-sm font-body">{volunteers.filter(v => v.status === 'pending').length} pending approval</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 self-start">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, team..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-semibold text-foreground">Name</th>
                <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Phone</th>
                <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">Team</th>
                <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">City</th>
                <th className="text-left p-4 font-semibold text-foreground">Date</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
                <th className="text-left p-4 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-foreground">{v.fullName}</p>
                    <p className="text-xs text-muted-foreground">{v.email}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell text-muted-foreground">{v.phone}</td>
                  <td className="p-4 hidden lg:table-cell">
                    <Badge variant="saffron" className="text-xs">{v.team}</Badge>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground">{v.cityState}</td>
                  <td className="p-4 text-muted-foreground text-xs">{v.date}</td>
                  <td className="p-4">
                    <Badge variant={badgeVariant(v.status)} className="text-xs capitalize">{v.status}</Badge>
                  </td>
                  <td className="p-4">
                    {v.status === 'pending' && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateStatus(v.id, 'approved')}
                          className="p-1.5 rounded-md text-forest-500 hover:bg-forest-50 dark:hover:bg-forest-950 transition-colors"
                          aria-label="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(v.id, 'rejected')}
                          className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {v.status !== 'pending' && (
                      <button
                        onClick={() => updateStatus(v.id, 'pending')}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Reset
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">No volunteers found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
