"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, FileText, Download, Eye, CreditCard, Calendar, DollarSign, AlertCircle, Plus } from "lucide-react"

interface Invoice {
    id: string
    number: string
    date: string
    dueDate: string
    amount: number
    status: "paid" | "pending" | "overdue" | "cancelled"
    description: string
    items: InvoiceItem[]
    paymentMethod?: string
    paidDate?: string
}

interface InvoiceItem {
    description: string
    quantity: number
    unitPrice: number
    total: number
}

export default function BillingPage() {
    const [invoices] = useState<Invoice[]>([
        {
            id: "1",
            number: "INV-2024-001",
            date: "2024-01-15",
            dueDate: "2024-02-15",
            amount: 45.99,
            status: "paid",
            description: "Hébergement Web Plus - Janvier 2024",
            items: [
                { description: "Hébergement Web Plus", quantity: 1, unitPrice: 19.99, total: 19.99 },
                { description: "Domaine example.com", quantity: 1, unitPrice: 12.99, total: 12.99 },
                { description: "Protection WHOIS", quantity: 1, unitPrice: 5.99, total: 5.99 },
                { description: "Certificat SSL", quantity: 1, unitPrice: 7.02, total: 7.02 },
            ],
            paymentMethod: "Crédit compte",
            paidDate: "2024-01-16",
        },
        {
            id: "2",
            number: "INV-2024-002",
            date: "2024-01-20",
            dueDate: "2024-02-20",
            amount: 25.0,
            status: "paid",
            description: "Domaine mysite.bi - Renouvellement",
            items: [{ description: "Renouvellement domaine mysite.bi", quantity: 1, unitPrice: 25.0, total: 25.0 }],
            paymentMethod: "Cash",
            paidDate: "2024-01-21",
        },
        {
            id: "3",
            number: "INV-2024-003",
            date: "2024-02-01",
            dueDate: "2024-03-01",
            amount: 89.97,
            status: "pending",
            description: "Hébergement VPS - Février 2024",
            items: [
                { description: "Hébergement VPS-1", quantity: 1, unitPrice: 49.99, total: 49.99 },
                { description: "Sauvegardes automatiques", quantity: 1, unitPrice: 9.99, total: 9.99 },
                { description: "Support prioritaire", quantity: 1, unitPrice: 29.99, total: 29.99 },
            ],
        },
        {
            id: "4",
            number: "INV-2024-004",
            date: "2024-01-05",
            dueDate: "2024-01-20",
            amount: 15.99,
            status: "overdue",
            description: "Domaine testsite.org - Renouvellement",
            items: [{ description: "Renouvellement domaine testsite.org", quantity: 1, unitPrice: 15.99, total: 15.99 }],
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
    const [invoiceDialog, setInvoiceDialog] = useState(false)

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "paid":
                return <Badge className="bg-accent">Payée</Badge>
            case "pending":
                return <Badge className="bg-secondary">En attente</Badge>
            case "overdue":
                return <Badge variant="destructive">En retard</Badge>
            case "cancelled":
                return <Badge variant="outline">Annulée</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice)
        setInvoiceDialog(true)
    }

    const handlePayInvoice = (invoiceId: string) => {
        alert(`Redirection vers le paiement de la facture ${invoiceId}`)
    }

    const handleDownloadInvoice = (invoiceNumber: string) => {
        alert(`Téléchargement de la facture ${invoiceNumber}`)
    }

    const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const paidAmount = filteredInvoices
        .filter((invoice) => invoice.status === "paid")
        .reduce((sum, invoice) => sum + invoice.amount, 0)
    const pendingAmount = filteredInvoices
        .filter((invoice) => invoice.status === "pending" || invoice.status === "overdue")
        .reduce((sum, invoice) => sum + invoice.amount, 0)

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mes factures</h1>
                    <p className="text-muted-foreground mt-1">Consultez et gérez toutes vos factures</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90" asChild>
                    <a href="/hpanel/billing/add-funds">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter des fonds
                    </a>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total factures</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">{filteredInvoices.length} factures</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Montant payé</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-accent">${paidAmount.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {invoices.filter((i) => i.status === "paid").length} factures payées
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">En attente</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-secondary">${pendingAmount.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {invoices.filter((i) => i.status === "pending" || i.status === "overdue").length} factures
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Crédit disponible</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$247.50</div>
                        <p className="text-xs text-muted-foreground">Solde du compte</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filtres et recherche</CardTitle>
                    <CardDescription>Recherchez et filtrez vos factures</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher une facture..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="paid">Payée</SelectItem>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="overdue">En retard</SelectItem>
                                <SelectItem value="cancelled">Annulée</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des factures ({filteredInvoices.length})</CardTitle>
                    <CardDescription>Toutes vos factures et leur statut</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Numéro</TableHead>
                                <TableHead>Date d'émission</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Échéance</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInvoices.map((invoice) => {
                                const isOverdue = new Date(invoice.dueDate) < new Date() && invoice.status !== "paid"
                                return (
                                    <TableRow key={invoice.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{invoice.number}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{invoice.date}</TableCell>
                                        <TableCell>
                                            <div className="max-w-[200px] truncate">{invoice.description}</div>
                                        </TableCell>
                                        <TableCell className="font-medium">${invoice.amount.toFixed(2)}</TableCell>
                                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div>{invoice.dueDate}</div>
                                                {isOverdue && (
                                                    <div className="flex items-center gap-1 text-xs text-destructive">
                                                        <AlertCircle className="h-3 w-3" />
                                                        En retard
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button size="sm" variant="outline" onClick={() => handleViewInvoice(invoice)}>
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" onClick={() => handleDownloadInvoice(invoice.number)}>
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                {(invoice.status === "pending" || invoice.status === "overdue") && (
                                                    <Button
                                                        size="sm"
                                                        className="bg-accent hover:bg-accent/90"
                                                        onClick={() => handlePayInvoice(invoice.id)}
                                                    >
                                                        <CreditCard className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={invoiceDialog} onOpenChange={setInvoiceDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Facture {selectedInvoice?.number}</DialogTitle>
                        <DialogDescription>Détails de la facture</DialogDescription>
                    </DialogHeader>

                    {selectedInvoice && (
                        <div className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Informations de facturation</h4>
                                    <div className="text-sm space-y-1">
                                        <div className="flex justify-between">
                                            <span>Numéro:</span>
                                            <span className="font-medium">{selectedInvoice.number}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date d&apos;émission:</span>
                                            <span>{selectedInvoice.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Date d&apos;échéance:</span>
                                            <span>{selectedInvoice.dueDate}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Statut:</span>
                                            <span>{getStatusBadge(selectedInvoice.status)}</span>
                                        </div>
                                        {selectedInvoice.paidDate && (
                                            <div className="flex justify-between">
                                                <span>Date de paiement:</span>
                                                <span>{selectedInvoice.paidDate}</span>
                                            </div>
                                        )}
                                        {selectedInvoice.paymentMethod && (
                                            <div className="flex justify-between">
                                                <span>Méthode de paiement:</span>
                                                <span>{selectedInvoice.paymentMethod}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium">Informations client</h4>
                                    <div className="text-sm space-y-1">
                                        <div>Jean Dupont</div>
                                        <div>Ma Société SARL</div>
                                        <div>123 Rue de la Paix</div>
                                        <div>Bujumbura, 1000</div>
                                        <div>Burundi</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Détails de la facture</h4>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Qté</TableHead>
                                            <TableHead>Prix unitaire</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedInvoice.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                                                <TableCell>${item.total.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Separator className="my-4" />

                                <div className="flex justify-end">
                                    <div className="space-y-2 text-right">
                                        <div className="flex justify-between gap-8">
                                            <span>Sous-total:</span>
                                            <span>${selectedInvoice.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between gap-8 text-lg font-bold">
                                            <span>Total:</span>
                                            <span>${selectedInvoice.amount.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setInvoiceDialog(false)}>
                                    Fermer
                                </Button>
                                <Button variant="outline" onClick={() => handleDownloadInvoice(selectedInvoice.number)}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Télécharger PDF
                                </Button>
                                {(selectedInvoice.status === "pending" || selectedInvoice.status === "overdue") && (
                                    <Button className="bg-accent hover:bg-accent/90" onClick={() => handlePayInvoice(selectedInvoice.id)}>
                                        <CreditCard className="h-4 w-4 mr-2" />
                                        Payer maintenant
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
