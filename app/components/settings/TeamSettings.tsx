"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MoreVertical, 
  UserPlus, 
  Mail, 
  Shield, 
  UserX,
  Edit,
  Key
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'owner' | 'admin' | 'member'
  status: 'active' | 'invited' | 'disabled'
  avatar?: string
  lastActive?: Date
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    status: "active",
    lastActive: new Date(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active",
    lastActive: new Date(Date.now() - 3600000),
  },
  {
    id: "3",
    email: "pending@example.com",
    name: "Pending User",
    role: "member",
    status: "invited",
  },
]

const rolePermissions = {
  owner: [
    "Full system access",
    "Manage team members",
    "Billing management",
    "API access",
  ],
  admin: [
    "Create and edit all records",
    "View reports and analytics",
    "Manage team members",
  ],
  member: [
    "Create and edit own records",
    "View assigned reports",
  ],
}

export function TeamSettings() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers)
  const [showInvite, setShowInvite] = useState(false)
  const [showPermissions, setShowPermissions] = useState(false)
  const [selectedRole, setSelectedRole] = useState<keyof typeof rolePermissions>('member')

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementation for inviting team member
    setShowInvite(false)
  }

  const handleUpdateRole = (memberId: string, newRole: TeamMember['role']) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    ))
  }

  const handleResendInvite = (email: string) => {
    console.log('Resending invite to:', email)
  }

  const handleRevokeAccess = (memberId: string) => {
    setMembers(members.map(member =>
      member.id === memberId ? { ...member, status: 'disabled' } : member
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage your team members and their access levels
          </p>
        </div>
        <Dialog open={showInvite} onOpenChange={setShowInvite}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your team
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInvite}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select onValueChange={(value: any) => setSelectedRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Permissions</label>
                  <ul className="mt-2 space-y-2">
                    {rolePermissions[selectedRole].map((permission, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button type="submit">Send Invitation</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      member.status === 'active' ? 'default' :
                      member.status === 'invited' ? 'secondary' : 'destructive'
                    }
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {member.lastActive 
                    ? new Date(member.lastActive).toLocaleDateString()
                    : 'Never'
                  }
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {member.status === 'invited' ? (
                        <DropdownMenuItem
                          onClick={() => handleResendInvite(member.email)}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Resend Invite
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Key className="h-4 w-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleRevokeAccess(member.id)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Revoke Access
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium">Role Permissions</h4>
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(rolePermissions) as Array<keyof typeof rolePermissions>).map((role) => (
            <div key={role} className="rounded-lg border p-4">
              <h5 className="font-medium capitalize mb-2">{role}</h5>
              <ul className="space-y-2">
                {rolePermissions[role].map((permission, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {permission}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 