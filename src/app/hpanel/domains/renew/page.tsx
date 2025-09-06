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

interface Domain {
    id: string
    name: string
    expirationDate: string
    daysUntilExpiration: number
    renewalPrice: number
    selected: boolean
    renewalPeriod: number
}

export default function RenewDomainsPage() {
    const [domains, setDomains] = useState<Domain[]>([
        {
            id: "1",
            name: "example.com",
            expirationDate: "2024-12-15",
            daysUntilExpiration: 45,
            renewalPrice: 15.99,
            selected: false,
            renewalPeriod: 1,
        },
        {
            id: "2",
            name: "mysite.bi",
            expirationDate: "2024-02-20",
            daysUntilExpiration: 7,
            renewalPrice: 25.0,
            selected: true,
            renewalPeriod: 1,
        },
        {
            id: "3",
            name: "business.org",
            expirationDate: "2024-03-10",
            daysUntilExpiration: 28,
            renewalPrice: 18.5,
            selected: false,
            renewalPeriod: 1,
        },
    ])

    const handleDomainSelection = (domainId: string, selected: boolean) => {
        setDomains((prev) => prev.map((domain) => (domain.id === domainId ? { ...domain, selected } : domain)))
    }

    const handleRenewalPeriodChange = (domainId: string, period: number) => {
        setDomains((prev) => prev.map((domain) => (domain.id === domainId ? { ...domain, renewalPeriod: period } : domain)))
    }

    const selectedDomains = domains.filter((domain) => domain.selected)
    const totalCost = selectedDomains.reduce((sum, domain) => sum + domain.renewalPrice * domain.renewalPeriod, 0)

    const handleRenewDomains = () => {
        if (selectedDomains.length === 0) {
            toast("Aucun domaine sélectionné",
                {
                    description: "Veuillez sélectionner au moins un domaine à renouveler.",
                    id: "destructive",
                })
            return
        }

        toast("Renouvellement initié",
            {
                description: `${selectedDomains.length} domaine(s) en cours de renouvellement.`,
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Renouvellement de domaines</h1>
                    <p className="text-muted-foreground">Renouvelez vos domaines avant leur expiration</p>
                </div>
            </div>

            {/* Urgent Renewals Alert */}
            {domains.some((d) => d.daysUntilExpiration <= 7) && (
                <Alert className="border-destructive bg-destructive/10">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        <strong>Action requise:</strong> Certains domaines expirent dans moins de 7 jours. Renouvelez-les maintenant
                        pour éviter toute interruption de service.
                    </AlertDescription>
                </Alert>
            )}

            {/* Domains to Renew */}
            <Card>
                <CardHeader>
                    <CardTitle>Domaines à renouveler</CardTitle>
                    <CardDescription>
                        Sélectionnez les domaines que vous souhaitez renouveler et choisissez la durée
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead>Nom de domaine</TableHead>
                                <TableHead>Date d&apos;expiration</TableHead>
                                <TableHead>Urgence</TableHead>
                                <TableHead>Durée de renouvellement</TableHead>
                                <TableHead className="text-right">Prix</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {domains.map((domain) => (
                                <TableRow key={domain.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={domain.selected}
                                            onCheckedChange={(checked) => handleDomainSelection(domain.id, checked as boolean)}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{domain.name}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div>{domain.expirationDate}</div>
                                                <div className="text-xs text-muted-foreground">Dans {domain.daysUntilExpiration} jours</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getUrgencyBadge(domain.daysUntilExpiration)}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={domain.renewalPeriod.toString()}
                                            onValueChange={(value) => handleRenewalPeriodChange(domain.id, Number.parseInt(value))}
                                            disabled={!domain.selected}
                                        >
                                            <SelectTrigger className="w-32">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 an</SelectItem>
                                                <SelectItem value="2">2 ans</SelectItem>
                                                <SelectItem value="3">3 ans</SelectItem>
                                                <SelectItem value="5">5 ans</SelectItem>
                                                <SelectItem value="10">10 ans</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="font-medium">${(domain.renewalPrice * domain.renewalPeriod).toFixed(2)}</div>
                                        <div className="text-xs text-muted-foreground">${domain.renewalPrice}/an</div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Renewal Summary */}
            {selectedDomains.length > 0 && (
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
                                {selectedDomains.map((domain) => (
                                    <div key={domain.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                        <div>
                                            <span className="font-medium">{domain.name}</span>
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                - {domain.renewalPeriod} an{domain.renewalPeriod > 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        <span className="font-medium">${(domain.renewalPrice * domain.renewalPeriod).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between text-lg font-semibold">
                                    <span>Total à payer:</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                            </div>

                            <Alert>
                                <CreditCard className="h-4 w-4" />
                                <AlertDescription>
                                    Le paiement sera débité de votre solde de compte ou de votre méthode de paiement par défaut.
                                </AlertDescription>
                            </Alert>

                            <div className="flex space-x-2">
                                <Button onClick={handleRenewDomains} className="bg-primary hover:bg-primary/90">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Renouveler maintenant (${totalCost.toFixed(2)})
                                </Button>
                                <Button variant="outline">Ajouter au panier</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Renewal Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Informations importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                        <p>• Les domaines sont renouvelés immédiatement après le paiement</p>
                        <p>• La nouvelle date d&apos;expiration sera calculée à partir de la date d&apos;expiration actuelle</p>
                        <p>• Les domaines .bi nécessitent un délai d&apos;activation de 30 minutes</p>
                        <p>• Vous recevrez une confirmation par email une fois le renouvellement effectué</p>
                        <p>• Le renouvellement automatique peut être activé dans les paramètres du domaine</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
