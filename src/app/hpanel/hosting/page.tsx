"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Server,
    Search,
    MoreHorizontal,
    RefreshCw,
    Plus,
    Calendar,
    HardDrive,
    Wifi,
    Database,
    AlertTriangle,
    ExternalLink,
    Settings,
    BarChart3,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface HostingService {
    id: string
    name: string
    plan: string
    domain: string
    status: "active" | "suspended" | "expired" | "pending"
    startDate: string
    expirationDate: string
    daysUntilExpiration: number
    diskUsage: number
    diskLimit: number
    bandwidthUsage: number
    bandwidthLimit: number
    price: number
    autoRenew: boolean
}

export default function HostingPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const [hostingServices] = useState<HostingService[]>([
        {
            id: "1",
            name: "Site Web Principal",
            plan: "Hébergement Plus",
            domain: "example.com",
            status: "active",
            startDate: "2023-06-15",
            expirationDate: "2024-06-15",
            daysUntilExpiration: 120,
            diskUsage: 2.5,
            diskLimit: 10,
            bandwidthUsage: 45.2,
            bandwidthLimit: 100,
            price: 29.99,
            autoRenew: true,
        },
        {
            id: "2",
            name: "Blog Personnel",
            plan: "Hébergement Basique",
            domain: "myblog.bi",
            status: "active",
            startDate: "2023-12-01",
            expirationDate: "2024-02-25",
            daysUntilExpiration: 15,
            diskUsage: 0.8,
            diskLimit: 5,
            bandwidthUsage: 12.5,
            bandwidthLimit: 50,
            price: 15.99,
            autoRenew: false,
        },
        {
            id: "3",
            name: "Site E-commerce",
            plan: "Hébergement Pro",
            domain: "mystore.com",
            status: "active",
            startDate: "2023-09-10",
            expirationDate: "2024-09-10",
            daysUntilExpiration: 200,
            diskUsage: 8.2,
            diskLimit: 25,
            bandwidthUsage: 180.5,
            bandwidthLimit: 250,
            price: 59.99,
            autoRenew: true,
        },
    ])

    const filteredServices = hostingServices.filter((service) => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.plan.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || service.status === statusFilter
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

    // const getUsageColor = (usage: number, limit: number) => {
    //     const percentage = (usage / limit) * 100
    //     if (percentage >= 90) return "bg-destructive"
    //     if (percentage >= 75) return "bg-yellow-500"
    //     return "bg-secondary"
    // }

    const handleToggleAutoRenew = (serviceId: string, currentAutoRenew: boolean) => {
        toast(
            `Le renouvellement automatique a été ${currentAutoRenew ? "désactivé" : "activé"} avec succès.`,
            {
                toasterId: currentAutoRenew ? "Renouvellement automatique désactivé" : "Renouvellement automatique activé",
            }
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Mes services d'hébergement</h1>
                    <p className="text-muted-foreground">Gérez tous vos services d'hébergement web</p>
                </div>
                <div className="flex space-x-2">
                    <Button asChild variant="outline">
                        <Link href="/hpanel/hosting/renew">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Renouveler
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/hpanel/hosting/order">
                            <Plus className="mr-2 h-4 w-4" />
                            Commander
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
                                    placeholder="Rechercher un service..."
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

            {/* Services requiring attention */}
            {hostingServices.some((s) => s.daysUntilExpiration <= 30 && s.status === "active") && (
                <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                    <CardHeader>
                        <CardTitle className="flex items-center text-yellow-800 dark:text-yellow-200">
                            <AlertTriangle className="mr-2 h-5 w-5" />
                            Services nécessitant votre attention
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {hostingServices
                                .filter((s) => s.daysUntilExpiration <= 30 && s.status === "active")
                                .map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                                    >
                                        <div>
                                            <span className="font-medium">{service.name}</span>
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                expire dans {service.daysUntilExpiration} jour{service.daysUntilExpiration > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <Button size="sm" asChild>
                                            <Link href="/dashboard/hosting/renew">
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

            {/* Services Overview Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Services actifs</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{hostingServices.filter((s) => s.status === "active").length}</div>
                        <p className="text-xs text-muted-foreground">
                            {hostingServices.filter((s) => s.daysUntilExpiration <= 30).length} à renouveler bientôt
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Utilisation totale</CardTitle>
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {hostingServices.reduce((sum, s) => sum + s.diskUsage, 0).toFixed(1)} GB
                        </div>
                        <p className="text-xs text-muted-foreground">
                            sur {hostingServices.reduce((sum, s) => sum + s.diskLimit, 0)} GB disponibles
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Coût mensuel</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${hostingServices.reduce((sum, s) => sum + s.price, 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Total pour tous les services</p>
                    </CardContent>
                </Card>
            </div>

            {/* Services Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Liste des services ({filteredServices.length})</CardTitle>
                    <CardDescription>Tous vos services d'hébergement et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Utilisation</TableHead>
                                <TableHead>Expiration</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{service.name}</div>
                                            <div className="text-sm text-muted-foreground flex items-center">
                                                <ExternalLink className="mr-1 h-3 w-3" />
                                                {service.domain}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{service.plan}</Badge>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(service.status, service.daysUntilExpiration)}</TableCell>
                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs">
                                                <span>
                                                    Disque: {service.diskUsage}GB / {service.diskLimit}GB
                                                </span>
                                                <span>{Math.round((service.diskUsage / service.diskLimit) * 100)}%</span>
                                            </div>
                                            <Progress
                                                value={(service.diskUsage / service.diskLimit) * 100}
                                                className="h-1"
                                            // className={`h-1 ${getUsageColor(service.diskUsage, service.diskLimit)}`}
                                            />
                                            <div className="flex items-center justify-between text-xs">
                                                <span>
                                                    Bande: {service.bandwidthUsage}GB / {service.bandwidthLimit}GB
                                                </span>
                                                <span>{Math.round((service.bandwidthUsage / service.bandwidthLimit) * 100)}%</span>
                                            </div>
                                            <Progress
                                                value={(service.bandwidthUsage / service.bandwidthLimit) * 100}
                                                className="h-1"
                                            // className={`h-1 ${getUsageColor(service.bandwidthUsage, service.bandwidthLimit)}`}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm">{service.expirationDate}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {service.daysUntilExpiration > 0
                                                        ? `Dans ${service.daysUntilExpiration} jours`
                                                        : `Expiré depuis ${Math.abs(service.daysUntilExpiration)} jours`}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">${service.price}/mois</div>
                                        <div className="text-xs text-muted-foreground">
                                            {service.autoRenew ? "Auto-renouvelé" : "Manuel"}
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
                                                    <Link href={`/dashboard/hosting/${service.id}/manage`}>
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        Gérer le service
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href="/dashboard/hosting/renew">
                                                        <RefreshCw className="mr-2 h-4 w-4" />
                                                        Renouveler
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleToggleAutoRenew(service.id, service.autoRenew)}>
                                                    {service.autoRenew ? "Désactiver auto-renouvellement" : "Activer auto-renouvellement"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`https://${service.domain}`} target="_blank">
                                                        <ExternalLink className="mr-2 h-4 w-4" />
                                                        Visiter le site
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/hosting/${service.id}/stats`}>
                                                        <BarChart3 className="mr-2 h-4 w-4" />
                                                        Statistiques
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

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Accès rapide aux fonctionnalités d'hébergement</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                            <Link href="/dashboard/hosting/order">
                                <Plus className="h-6 w-6" />
                                <span className="text-sm">Nouveau service</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent" asChild>
                            <Link href="/dashboard/hosting/renew">
                                <RefreshCw className="h-6 w-6" />
                                <span className="text-sm">Renouveler</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <Database className="h-6 w-6" />
                            <span className="text-sm">Bases de données</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <Wifi className="h-6 w-6" />
                            <span className="text-sm">DNS Manager</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
