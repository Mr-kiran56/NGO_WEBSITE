import { useState } from 'react'
import { Download, Search } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockDonations = [
  { id: '1', name: 'Anonymous', email: 'anon@email.com', phone: '9876543210', amount: 5000, pan: '', paymentId: 'pay_abc123', status: 'completed' as const, date: 'Apr 1, 2026' },
  { id: '2', name: 'Priya Menon', email: 'priya@email.com', phone: '9876543211', amount: 1000, pan: 'ABCDE1234F', paymentId: 'pay_def456', status: 'completed' as const, date: 'Mar 31, 2026' },
  { id: '3', name: 'Ramesh T.', email: 'ramesh@email.com', phone: '9876543212', amount: 500, pan: '', paymentId: 'pay_ghi789', status: 'completed' as const, date: 'Mar 30, 2026' },
  { id: '4', name: 'Corporate XYZ', email: 'csr@xyz.com', phone: '9876543213', amount: 50000, pan: 'XYZAB1234G', paymentId: 'pay_jkl012', status: 'completed' as const, date: 'Mar 29, 2026' },
]

export default function AdminDonations() {
  const [search, setSearch] = useState('')

  const filtered = mockDonations.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.email.toLowerCase().includes(search.toLowerCase()) ||
    d.paymentId.toLowerCase().includes(search.toLowerCase())
  )

  const total = filtered.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Donations</h1>
          <p className="text-muted-foreground text-sm font-body">
            Total shown: <span className="text-saffron-500 font-bold">₹{total.toLocaleString('en-IN')}</span>
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 self-start">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, payment ID..."
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
                <th className="text-left p-4 font-semibold text-foreground">Donor</th>
                <th className="text-left p-4 font-semibold text-foreground hidden md:table-cell">Payment ID</th>
                <th className="text-left p-4 font-semibold text-foreground hidden lg:table-cell">PAN</th>
                <th className="text-left p-4 font-semibold text-foreground">Amount</th>
                <th className="text-left p-4 font-semibold text-foreground">Date</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-foreground">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.email}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{d.paymentId}</code>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-muted-foreground text-xs">
                    {d.pan || <span className="italic">Not provided</span>}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-saffron-500">₹{d.amount.toLocaleString('en-IN')}</span>
                  </td>
                  <td className="p-4 text-muted-foreground text-xs">{d.date}</td>
                  <td className="p-4">
                    <Badge variant="forest" className="text-xs capitalize">{d.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-muted-foreground font-body">No donations found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
