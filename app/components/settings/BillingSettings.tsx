"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  CreditCard, 
  Check, 
  Star,
  Download
} from "lucide-react"

interface BillingPlan {
  id: string
  name: string
  price: number
  interval: 'monthly' | 'yearly'
  features: string[]
  isPopular?: boolean
  isCurrent?: boolean
}

const plans: BillingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    interval: 'monthly',
    features: [
      'Up to 1,000 estimates/month',
      'Basic reporting',
      'Email support',
      '2 team members',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    interval: 'monthly',
    features: [
      'Up to 5,000 estimates/month',
      'Advanced reporting',
      'Priority support',
      '5 team members',
      'Custom branding',
    ],
    isPopular: true,
    isCurrent: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    interval: 'monthly',
    features: [
      'Unlimited estimates',
      'Custom reporting',
      '24/7 support',
      'Unlimited team members',
      'Custom branding',
      'API access',
    ],
  },
]

interface PaymentMethod {
  id: string
  type: 'card'
  last4: string
  expMonth: number
  expYear: number
  brand: string
  isDefault: boolean
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    expMonth: 12,
    expYear: 2024,
    brand: 'visa',
    isDefault: true,
  },
  {
    id: 'pm_2',
    type: 'card',
    last4: '5555',
    expMonth: 8,
    expYear: 2025,
    brand: 'mastercard',
    isDefault: false,
  },
]

interface Invoice {
  id: string
  date: Date
  amount: number
  status: 'paid' | 'pending' | 'failed'
  number: string
}

const invoices: Invoice[] = [
  {
    id: 'inv_1',
    date: new Date('2024-02-01'),
    amount: 79,
    status: 'paid',
    number: 'INV-2024-001',
  },
  {
    id: 'inv_2',
    date: new Date('2024-01-01'),
    amount: 79,
    status: 'paid',
    number: 'INV-2024-002',
  },
]

export function BillingSettings() {
  const [selectedInterval, setSelectedInterval] = useState<'monthly' | 'yearly'>('monthly')
  const [showAddCard, setShowAddCard] = useState(false)

  const handlePlanChange = (planId: string) => {
    console.log('Changing to plan:', planId)
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAddCard(false)
  }

  const handleSetDefaultCard = (cardId: string) => {
    console.log('Setting default card:', cardId)
  }

  const handleRemoveCard = (cardId: string) => {
    console.log('Removing card:', cardId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Billing & Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Manage your subscription plan and payment methods
        </p>
      </div>
      <Separator />

      <div className="space-y-8">
        {/* Current Plan */}
        <div>
          <h4 className="text-sm font-medium mb-4">Current Plan</h4>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium">Professional Plan</h5>
                <Badge>Current</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                $79/month • Renews on March 1, 2024
              </p>
            </div>
            <Button variant="outline">Cancel Subscription</Button>
          </div>
        </div>

        {/* Available Plans */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Available Plans</h4>
            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
              <Button
                variant={selectedInterval === 'monthly' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedInterval('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={selectedInterval === 'yearly' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedInterval('yearly')}
              >
                Yearly
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={plan.isPopular ? 'border-primary' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {plan.isPopular && (
                      <Badge variant="secondary">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    ${selectedInterval === 'yearly' 
                      ? Math.floor(plan.price * 0.8)
                      : plan.price
                    }/{selectedInterval === 'yearly' ? 'year' : 'month'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    variant={plan.isCurrent ? 'secondary' : 'default'}
                    disabled={plan.isCurrent}
                    onClick={() => handlePlanChange(plan.id)}
                  >
                    {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium">Payment Methods</h4>
            <Dialog open={showAddCard} onOpenChange={setShowAddCard}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>
                    Add a new credit or debit card
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCard}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit">Add Card</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5" />
                  <div>
                    <p className="font-medium capitalize">
                      {method.brand} •••• {method.last4}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expires {method.expMonth}/{method.expYear}
                    </p>
                  </div>
                  {method.isDefault && (
                    <Badge variant="outline">Default</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!method.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSetDefaultCard(method.id)}
                    >
                      Make Default
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCard(method.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <div>
          <h4 className="text-sm font-medium mb-4">Billing History</h4>
          <div className="rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {invoice.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {invoice.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${invoice.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                      >
                        {invoice.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 