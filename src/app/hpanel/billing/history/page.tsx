"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Search,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Wallet,
    Smartphone,
    DollarSign,
    Download,
    Calendar,
} from "lucide-react"

interface Transaction {
    id: string
    date: string
    type: "credit" | "debit"
    category: "payment" | "refund" | "add_funds" | "service_charge"
    description: string
    amount: number
    balance: number
    method: string
    status: "completed" | "pending" | "failed"
    reference?: string
}

export default function TransactionHistory() {
    const [transactions] = useState<Transaction[]>([
        {
            id: "1",
            date: "2024-01-21 14:30",
            type: "credit",
            category: "add_funds",
            description: "Ajout de fonds via eFeza",
            amount: 100.0,
            balance: 347.5,
            method: "eFeza",
            status: "completed",
            reference: "EFZ-2024-001",
        },
        {
            id: "2",
            date: "2024-01-20 09:15",
            type: "debit",
            category: "payment",
            description: "Paiement facture INV-2024-002",
            amount: -25.0,
            balance: 247.5,
            method: "Crédit compte",
            status: "completed",
            reference: "PAY-2024-002",
        },
        {
            id: "3",
            date: "2024-01-16 16:45",
            type: "debit",
            category: "payment",
            description: "Paiement facture INV-2024-001",
            amount: -45.99,
            balance: 272.5,
            method: "Crédit compte",
            status: "completed",
            reference: "PAY-2024-001",
        },
        {
            id: "4",
            date: "2024-01-15 11:20",
            type: "credit",
            category: "add_funds",
            description: "Ajout de fonds via Cash",
            amount: 200.0,
            balance: 318.49,
            method: "Cash",
            status: "completed",
            reference: "CASH-2024-001",
        },
        {
            id: "5",
            date: "2024-01-10 08:30",
            type: "debit",
            category: "service_charge",
            description: "Frais de service hébergement VPS",
            amount: -49.99,
            balance: 118.49,
            method: "Crédit compte",
            status: "completed",
            reference: "SVC-2024-001",
        },
        {
            id: "6",
            date: "2024-01-05 13:15",
            type: "credit",
            category: "add_funds",
            description: "Ajout de fonds via Flutter Wave",
            amount: 150.0,
            balance: 168.48,
            method: "Flutter Wave",
            status: "completed",
            reference: "FLW-2024-001",
        },
        {
            id: "7",
            date: "2024-01-03 10:00",
            type: "credit",
            category: "refund",
            description: "Remboursement domaine annulé",
            amount: 12.99,
            balance: 18.48,
            method: "Crédit compte",
            status: "completed",
            reference: "REF-2024-001",
        },
        {
            id: "8",
            date: "2024-01-01 00:00",
            type: "credit",
            category: "add_funds",
            description: "Solde initial",
            amount: 5.49,
            balance: 5.49,
            method: "Crédit compte",
            status: "completed",
            reference: "INIT-2024",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesType = typeFilter === "all" || transaction.type === typeFilter
        const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
        const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
        return matchesSearch && matchesType && matchesCategory && matchesStatus
    })

    const getTypeIcon = (type: string) => {
        return type === "credit" ? (
            <ArrowUpRight className="h-4 w-4 text-accent" />
        ) : (
            <ArrowDownLeft className="h-4 w-4 text-destructive" />
        )
    }

    const getMethodIcon = (method: string) => {
        switch (method.toLowerCase()) {
            case "efeza":
                return <Smartphone className="h-4 w-4 text-muted-foreground" />
            case "flutter wave":
                return <CreditCard className="h-4 w-4 text-muted-foreground" />
            case "cash":
                return <DollarSign className="h-4 w-4 text-muted-foreground" />
            default:
                return <Wallet className="h-4 w-4 text-muted-foreground" />
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "completed":
                return <Badge className="bg-accent">Terminé</Badge>
            case "pending":
                return <Badge className="bg-secondary">En attente</Badge>
            case "failed":
                return <Badge variant="destructive">Échec</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case "payment":
                return "Paiement"
            case "refund":
                return "Remboursement"
            case "add_funds":
                return "Ajout de fonds"
            case "service_charge":
                return "Frais de service"
            default:
                return category
        }
    }

    const totalCredits = filteredTransactions.filter((t) => t.type === "credit").reduce((sum, t) => sum + t.amount, 0)
    const totalDebits = filteredTransactions
        .filter((t) => t.type === "debit")
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    const handleExportTransactions = () => {
        alert("Export des transactions en cours...")
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Historique des transactions</h1>
                    <p className="text-muted-foreground mt-1">Consultez l&apos;historique de toutes vos transactions</p>
                </div>
                <Button onClick={handleExportTransactions} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total crédits</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-accent">+${totalCredits.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {filteredTransactions.filter((t) => t.type === "credit").length} transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total débits</CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-destructive">-${totalDebits.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                            {filteredTransactions.filter((t) => t.type === "debit").length} transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Solde net</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${(totalCredits - totalDebits).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Période sélectionnée</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Solde actuel</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$247.50</div>
                        <p className="text-xs text-muted-foreground">Crédit disponible</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filtres et recherche</CardTitle>
                    <CardDescription>Filtrez vos transactions par type, catégorie ou statut</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher une transaction..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous</SelectItem>
                                <SelectItem value="credit">Crédit</SelectItem>
                                <SelectItem value="debit">Débit</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes</SelectItem>
                                <SelectItem value="payment">Paiement</SelectItem>
                                <SelectItem value="add_funds">Ajout de fonds</SelectItem>
                                <SelectItem value="refund">Remboursement</SelectItem>
                                <SelectItem value="service_charge">Frais de service</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous</SelectItem>
                                <SelectItem value="completed">Terminé</SelectItem>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="failed">Échec</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Historique des transactions ({filteredTransactions.length})</CardTitle>
                    <CardDescription>Toutes vos transactions financières</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Méthode</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Solde</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Référence</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span className="font-mono text-sm">{transaction.date}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(transaction.type)}
                                            <span className="capitalize">{transaction.type === "credit" ? "Crédit" : "Débit"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{getCategoryLabel(transaction.category)}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-[200px] truncate">{transaction.description}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getMethodIcon(transaction.method)}
                                            <span className="text-sm">{transaction.method}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`font-medium ${transaction.type === "credit" ? "text-accent" : "text-destructive"}`}
                                        >
                                            {transaction.type === "credit" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium">${transaction.balance.toFixed(2)}</TableCell>
                                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                    <TableCell>
                                        <span className="font-mono text-xs">{transaction.reference}</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
