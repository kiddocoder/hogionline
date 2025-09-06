"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Globe,
    Search,
    MoreHorizontal,
    RefreshCw,
    ArrowRightLeft,
    Lock,
    Unlock,
    Key,
    Eye,
    EyeOff,
    Plus,
    Calendar,
    AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Domain {
    id: string
    name: string
    status: "active" | "expired" | "pending" | "suspended"
    registrar: string
    expirationDate: string
    autoRenew: boolean
    locked: boolean
    whoisPrivacy: boolean
    daysUntilExpiration: number
}

export default function DomainsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null)
    const [showEppDialog, setShowEppDialog] = useState(false)
    const [eppCode, setEppCode] = useState("")

    const [domains] = useState<Domain[]>([
        {
            id: "1",
            name: "example.com",
            status: "active",
            registrar: "Hogi Online",
            expirationDate: "2024-12-15",
            autoRenew: true,
            locked: true,
            whoisPrivacy: true,
            daysUntilExpiration: 45,
        },
        {
            id: "2",
            name: "mysite.bi",
            status: "active",
            registrar: "Hogi Online",
            expirationDate: "2024-02-20",
            autoRenew: false,
            locked: false,
            whoisPrivacy: false,
            daysUntilExpiration: 7,
        },
        {
            id: "3",
            name: "oldsite.org",
            status: "expired",
            registrar: "Hogi Online",
            expirationDate: "2024-01-10",
            autoRenew: false,
            locked: false,
            whoisPrivacy: false,
            daysUntilExpiration: -5,
        },
    ])

    const filteredDomains = domains.filter((domain) => {
        const matchesSearch = domain.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || domain.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string, daysUntilExpiration: number) => {
        if (status === "expired") {
            return <Badge variant="destructive">Expiré</Badge>
        }
        if (status === "suspended") {
            return <Badge variant="destructive">Suspendu</Badge>
        }
        if (status === "pending") {
            return <Badge variant="secondary">En attente</Badge>
        }
        if (daysUntilExpiration <= 7) {
            return <Badge variant="destructive">Expire bientôt</Badge>
        }
        if (daysUntilExpiration <= 30) {
            return <Badge variant="secondary">À renouveler</Badge>
        }
        return <Badge variant="default">Actif</Badge>
    }

    const handleGenerateEppCode = (domain: Domain) => {
        setSelectedDomain(domain)
        // Simulate EPP code generation
        setEppCode("ABC123XYZ789")
        setShowEppDialog(true)
    }

    const handleToggleLock = (domainId: string, currentLocked: boolean) => {
        toast(currentLocked ? "Domaine déverrouillé" : "Domaine verrouillé",
            {
                toasterId: `Le domaine a été ${currentLocked ? "déverrouillé" : "verrouillé"} avec succès.`,
            })
    }

    const handleToggleWhoisPrivacy = (domainId: string, currentPrivacy: boolean) => {
        toast(currentPrivacy ? "Protection WHOIS désactivée" : "Protection WHOIS activée",
            {
                toasterId: `La protection WHOIS a été ${currentPrivacy ? "désactivée" : "activée"} avec succès.`,
            })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mes domaines</h1>
                    <p className="text-muted-foreground">Gérez tous vos noms de domaine en un seul endroit</p>
                </div>
                <div className="flex space-x-2">
                    <Button asChild variant="outline">
                        <Link href="/hpanel/domains/register">
                            <Plus className="mr-2 h-4 w-4" />
                            Enregistrer
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/hpanel/domains/transfer">
                            <ArrowRightLeft className="mr-2 h-4 w-4" />
                            Transférer
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher un domaine..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filtrer par statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="active">Actifs</SelectItem>
                                <SelectItem value="expired">Expirés</SelectItem>
                                <SelectItem value="pending">En attente</SelectItem>
                                <SelectItem value="suspended">Suspendus</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Domains requiring attention */}
            {domains.some((d) => d.daysUntilExpiration <= 30 && d.status === "active") && (
                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                    <CardHeader>
                        <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                            <AlertTriangle className="mr-2 h-5 w-5" />
                            Domaines nécessitant votre attention
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {domains
                                .filter((d) => d.daysUntilExpiration <= 30 && d.status === "active")
                                .map((domain) => (
                                    <div
                                        key={domain.id}
                                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div>
                                            <span className="font-medium">{domain.name}</span>
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                expire dans {domain.daysUntilExpiration} jour{domain.daysUntilExpiration > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <Button size="sm" asChild>
                                            <Link href="/hpanel/domains/renew">
                                                <RefreshCw className="mr-2 h-4 w-4" />
                                                Renouveler
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Domains Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des domaines ({filteredDomains.length})</CardTitle>
                    <CardDescription>Tous vos noms de domaine et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom de domaine</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date d&apos;expiration</TableHead>
                                <TableHead>Registrar</TableHead>
                                <TableHead>Protection</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDomains.map((domain) => (
                                <TableRow key={domain.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {domain.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(domain.status, domain.daysUntilExpiration)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div>{domain.expirationDate}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {domain.daysUntilExpiration > 0
                                                        ? `Dans ${domain.daysUntilExpiration} jours`
                                                        : `Expiré depuis ${Math.abs(domain.daysUntilExpiration)} jours`}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{domain.registrar}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className="flex items-center">
                                                {domain.locked ? (
                                                    <Lock className="h-4 w-4 text-secondary" />
                                                ) : (
                                                    <Unlock className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                {domain.whoisPrivacy ? (
                                                    <EyeOff className="h-4 w-4 text-secondary" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/hpanel/domains`} as={`/hpanel/domains/${domain.id}/manage`} >Gérer le domaine</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/hpanel/domains/renew">
                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                        Renouveler
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleToggleLock(domain.id, domain.locked)}>
                                                    {domain.locked ? (
                                                        <>
                                                            <Unlock className="mr-2 h-4 w-4" />
                                                            Déverrouiller
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Lock className="mr-2 h-4 w-4" />
                                                            Verrouiller
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleGenerateEppCode(domain)}>
                                                    <Key className="mr-2 h-4 w-4" />
                                                    Code EPP
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleToggleWhoisPrivacy(domain.id, domain.whoisPrivacy)}>
                                                    {domain.whoisPrivacy ? (
                                                        <>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Désactiver WHOIS Privacy
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff className="mr-2 h-4 w-4" />
                                                            Activer WHOIS Privacy
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link href="/hpanel/domains/transfer">
                                                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                                                        Transférer
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* EPP Code Dialog */}
            <Dialog open={showEppDialog} onOpenChange={setShowEppDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Code EPP pour {selectedDomain?.name}</DialogTitle>
                        <DialogDescription>
                            Utilisez ce code pour transférer votre domaine vers un autre registrar
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-lg">{eppCode}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(eppCode)
                                        toast("Code copié", { toasterId: "Le code EPP a été copié dans le presse-papiers." })
                                    }}
                                >
                                    Copier
                                </Button>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Ce code est valide pendant 30 jours. Gardez-le confidentiel et ne le partagez qu&apos;avec votre nouveau
                            registrar.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setShowEppDialog(false)}>Fermer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
