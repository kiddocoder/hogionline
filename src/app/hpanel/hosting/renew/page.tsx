"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface HostingService {
    id: string
    name: string
    plan: string
    domain: string
    expirationDate: string
    daysUntilExpiration: number
    renewalPrice: number
    selected: boolean
    renewalPeriod: number
}

export default function RenewHostingPage() {
    const [services, setServices] = useState<HostingService[]>([
        {
            id: "1",
            name: "Site Web Principal",
            plan: "Hébergement Plus",
            domain: "example.com",
            expirationDate: "2024-06-15",
            daysUntilExpiration: 120,
            renewalPrice: 29.99,
            selected: false,
            renewalPeriod: 12,
        },
        {
            id: "2",
            name: "Blog Personnel",
            plan: "Hébergement Basique",
            domain: "myblog.bi",
            expirationDate: "2024-02-25",
            daysUntilExpiration: 15,
            renewalPrice: 15.99,
            selected: true,
            renewalPeriod: 12,
        },
        {
            id: "3",
            name: "Site E-commerce",
            plan: "Hébergement Pro",
            domain: "mystore.com",
            expirationDate: "2024-09-10",
            daysUntilExpiration: 200,
            renewalPrice: 59.99,
            selected: false,
            renewalPeriod: 12,
        },
    ])

    const handleServiceSelection = (serviceId: string, selected: boolean) => {
        setServices((prev) => prev.map((service) => (service.id === serviceId ? { ...service, selected } : service)))
    }

    const handleRenewalPeriodChange = (serviceId: string, period: number) => {
        setServices((prev) =>
            prev.map((service) => (service.id === serviceId ? { ...service, renewalPeriod: period } : service)),
        )
    }

    const selectedServices = services.filter((service) => service.selected)
    const totalCost = selectedServices.reduce((sum, service) => {
        const monthlyPrice = service.renewalPrice
        return sum + monthlyPrice * service.renewalPeriod
    }, 0)

    const handleRenewServices = () => {
        if (selectedServices.length === 0) {
            toast("Aucun service sélectionné",
                {
                    toasterId: "Veuillez sélectionner au moins un service à renouveler.",
                    id: "destructive",
                })
            return
        }

        toast("Renouvellement initié",
            {
                toasterId: `${selectedServices.length} service(s) en cours de renouvellement.`,
            })
    }

    const getUrgencyBadge = (daysUntilExpiration: number) => {
        if (daysUntilExpiration <= 7) {
            return <Badge variant="destructive">Urgent</Badge>
        }
        if (daysUntilExpiration <= 30) {
            return <Badge variant="secondary">Bientôt</Badge>
        }
        return <Badge variant="outline">Normal</Badge>
    }

    const getPeriodLabel = (months: number) => {
        if (months === 1) return "1 mois"
        if (months === 3) return "3 mois"
        if (months === 6) return "6 mois"
        if (months === 12) return "1 an"
        if (months === 24) return "2 ans"
        if (months === 36) return "3 ans"
        return `${months} mois`
    }

    const getPeriodDiscount = (months: number) => {
        if (months >= 24) return 20 // 20% discount for 2+ years
        if (months >= 12) return 10 // 10% discount for 1+ year
        if (months >= 6) return 5 // 5% discount for 6+ months
        return 0
    }

    const calculateDiscountedPrice = (basePrice: number, months: number) => {
        const discount = getPeriodDiscount(months)
        const discountedMonthlyPrice = basePrice * (1 - discount / 100)
        return discountedMonthlyPrice * months
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Renouvellement d'hébergement</h1>
                    <p className="text-muted-foreground">Renouvelez vos services d'hébergement avant leur expiration</p>
                </div>
            </div>

            {/* Urgent Renewals Alert */}
            {services.some((s) => s.daysUntilExpiration <= 7) && (
                <Alert className="border-destructive bg-destructive/10">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Action requise:</strong> Certains services expirent dans moins de 7 jours. Renouvelez-les maintenant
                        pour éviter toute interruption de service.
                    </AlertDescription>
                </Alert>
            )}

            {/* Services to Renew */}
            <Card>
                <CardHeader>
                    <CardTitle>Services à renouveler</CardTitle>
                    <CardDescription>
                        Sélectionnez les services que vous souhaitez renouveler et choisissez la durée
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Date d'expiration</TableHead>
                                <TableHead>Urgence</TableHead>
                                <TableHead>Durée de renouvellement</TableHead>
                                <TableHead className="text-right">Prix</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => {
                                const discountedPrice = calculateDiscountedPrice(service.renewalPrice, service.renewalPeriod)
                                const discount = getPeriodDiscount(service.renewalPeriod)

                                return (
                                    <TableRow key={service.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={service.selected}
                                                onCheckedChange={(checked) => handleServiceSelection(service.id, checked as boolean)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{service.name}</div>
                                                <div className="text-sm text-muted-foreground">{service.domain}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{service.plan}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div>{service.expirationDate}</div>
                                                    <div className="text-xs text-muted-foreground">Dans {service.daysUntilExpiration} jours</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getUrgencyBadge(service.daysUntilExpiration)}</TableCell>
                                        <TableCell>
                                            <Select
                                                value={service.renewalPeriod.toString()}
                                                onValueChange={(value) => handleRenewalPeriodChange(service.id, Number.parseInt(value))}
                                                disabled={!service.selected}
                                            >
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 mois</SelectItem>
                                                    <SelectItem value="3">3 mois</SelectItem>
                                                    <SelectItem value="6">6 mois (-5%)</SelectItem>
                                                    <SelectItem value="12">1 an (-10%)</SelectItem>
                                                    <SelectItem value="24">2 ans (-20%)</SelectItem>
                                                    <SelectItem value="36">3 ans (-20%)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div>
                                                <div className="font-medium">${discountedPrice.toFixed(2)}</div>
                                                {discount > 0 && (
                                                    <div className="text-xs text-muted-foreground line-through">
                                                        ${(service.renewalPrice * service.renewalPeriod).toFixed(2)}
                                                    </div>
                                                )}
                                                <div className="text-xs text-muted-foreground">
                                                    ${service.renewalPrice}/mois
                                                    {discount > 0 && <span className="text-secondary ml-1">(-{discount}%)</span>}
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Renewal Summary */}
            {selectedServices.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5 text-secondary" />
                            Résumé du renouvellement
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid gap-4">
                                {selectedServices.map((service) => {
                                    const discountedPrice = calculateDiscountedPrice(service.renewalPrice, service.renewalPeriod)
                                    const discount = getPeriodDiscount(service.renewalPeriod)

                                    return (
                                        <div key={service.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <div>
                                                <span className="font-medium">{service.name}</span>
                                                <span className="ml-2 text-sm text-muted-foreground">
                                                    - {getPeriodLabel(service.renewalPeriod)}
                                                    {discount > 0 && <span className="text-secondary ml-1">(-{discount}%)</span>}
                                                </span>
                                            </div>
                                            <span className="font-medium">${discountedPrice.toFixed(2)}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span>Total à payer:</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                                {selectedServices.some((s) => getPeriodDiscount(s.renewalPeriod) > 0) && (
                                    <div className="text-sm text-secondary mt-1">
                                        Économies incluses grâce aux remises sur les renouvellements longs
                                    </div>
                                )}
                            </div>

                            <Alert>
                                <CreditCard className="h-4 w-4" />
                                <AlertDescription>
                                    Le paiement sera débité de votre solde de compte ou de votre méthode de paiement par défaut.
                                </AlertDescription>
                            </Alert>

                            <div className="flex space-x-2">
                                <Button onClick={handleRenewServices} className="bg-primary hover:bg-primary/90">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Renouveler maintenant (${totalCost.toFixed(2)})
                                </Button>
                                <Button variant="outline">Ajouter au panier</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Renewal Benefits */}
            <Card>
                <CardHeader>
                    <CardTitle>Avantages du renouvellement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                        <p>
                            • <strong>Remises progressives:</strong> Jusqu'à 20% de réduction sur les renouvellements longs
                        </p>
                        <p>
                            • <strong>Continuité de service:</strong> Aucune interruption de votre site web
                        </p>
                        <p>
                            • <strong>Renouvellement automatique:</strong> Activez l'option pour éviter les oublis
                        </p>
                        <p>
                            • <strong>Support prioritaire:</strong> Assistance technique incluse pendant toute la durée
                        </p>
                        <p>
                            • <strong>Sauvegardes automatiques:</strong> Vos données sont protégées quotidiennement
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
