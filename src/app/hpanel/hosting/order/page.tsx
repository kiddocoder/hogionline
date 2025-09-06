"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Check, X, HardDrive, Wifi, Database, Shield, Globe, ShoppingCart, CreditCard } from "lucide-react"
import { toast } from "sonner"


interface HostingPlan {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    popular: boolean
    features: {
        diskSpace: string
        bandwidth: string
        domains: string
        databases: string
        email: string
        ssl: boolean
        backup: boolean
        support: string
        uptime: string
    }
    limitations?: string[]
}

interface OrderSummary {
    plan: HostingPlan | null
    domain: string
    period: number
    addons: {
        ssl: boolean
        backup: boolean
        priority: boolean
    }
}

export default function OrderHostingPage() {
    const [selectedPlan, setSelectedPlan] = useState<HostingPlan | null>(null)
    const [orderSummary, setOrderSummary] = useState<OrderSummary>({
        plan: null,
        domain: "",
        period: 12,
        addons: {
            ssl: false,
            backup: false,
            priority: false,
        },
    })

    const hostingPlans: HostingPlan[] = [
        {
            id: "basic",
            name: "Hébergement Basique",
            description: "Parfait pour les sites personnels et blogs",
            price: 700.000,
            popular: false,
            features: {
                diskSpace: "5 GB SSD",
                bandwidth: "50 GB/mois",
                domains: "1 domaine",
                databases: "1 base MySQL",
                email: "5 comptes email",
                ssl: true,
                backup: false,
                support: "Email",
                uptime: "99.5%",
            },
            limitations: ["Pas de sauvegarde automatique", "Support par email uniquement"],
        },
        {
            id: "plus",
            name: "Hébergement Plus",
            description: "Idéal pour les sites d'entreprise",
            price: 300.000,
            originalPrice: 39.99,
            popular: true,
            features: {
                diskSpace: "10 GB SSD",
                bandwidth: "100 GB/mois",
                domains: "5 domaines",
                databases: "5 bases MySQL",
                email: "25 comptes email",
                ssl: true,
                backup: true,
                support: "Email + Chat",
                uptime: "99.9%",
            },
        },
        {
            id: "pro",
            name: "Hébergement Pro",
            description: "Pour les sites à fort trafic",
            price: 400.000,
            popular: false,
            features: {
                diskSpace: "25 GB SSD",
                bandwidth: "250 GB/mois",
                domains: "Illimités",
                databases: "Illimitées",
                email: "Illimités",
                ssl: true,
                backup: true,
                support: "24/7 Prioritaire",
                uptime: "99.99%",
            },
        },
        {
            id: "business",
            name: "Hébergement Business",
            description: "Solution complète pour entreprises",
            price: 500.000,
            popular: false,
            features: {
                diskSpace: "50 GB SSD",
                bandwidth: "500 GB/mois",
                domains: "Illimités",
                databases: "Illimitées",
                email: "Illimités",
                ssl: true,
                backup: true,
                support: "24/7 Dédié",
                uptime: "99.99%",
            },
        },
    ]

    const handleSelectPlan = (plan: HostingPlan) => {
        setSelectedPlan(plan)
        setOrderSummary((prev) => ({ ...prev, plan }))
    }

    const handleUpdateOrder = (field: keyof OrderSummary, value: any) => {
        setOrderSummary((prev) => ({ ...prev, [field]: value }))
    }

    const handleUpdateAddons = (addon: keyof OrderSummary["addons"], value: boolean) => {
        setOrderSummary((prev) => ({
            ...prev,
            addons: { ...prev.addons, [addon]: value },
        }))
    }

    const calculateTotal = () => {
        if (!orderSummary.plan) return 0

        let total = orderSummary.plan.price * orderSummary.period

        // Add addon costs
        if (orderSummary.addons.ssl) total += 9.99 * orderSummary.period
        if (orderSummary.addons.backup) total += 4.99 * orderSummary.period
        if (orderSummary.addons.priority) total += 14.99 * orderSummary.period

        // Apply discounts for longer periods
        if (orderSummary.period >= 24)
            total *= 0.8 // 20% discount
        else if (orderSummary.period >= 12) total *= 0.9 // 10% discount

        return total
    }

    const handlePlaceOrder = () => {
        if (!orderSummary.plan) {
            toast("Plan requis",
                {
                    id: "Plan requis",
                    toasterId: "Veuillez sélectionner un plan d'hébergement.",
                },
            )
            return
        }

        if (!orderSummary.domain) {
            toast("Domaine requis",
                {
                    id: "Domaine requis",
                    toasterId: "Veuillez saisir un nom de domaine.",
                },
            )
            return
        }

        toast("Commande initiée",
            {
                id: `Commande pour ${orderSummary.plan.name} - ${orderSummary.domain}`,
            }
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Commander un hébergement</h1>
                    <p className="text-muted-foreground">Choisissez le plan d&apos;hébergement parfait pour votre projet</p>
                </div>
            </div>

            <Tabs defaultValue="plans" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="plans">Plans d&apos;hébergement</TabsTrigger>
                    <TabsTrigger value="configure" disabled={!selectedPlan}>
                        Configuration
                    </TabsTrigger>
                    <TabsTrigger value="summary" disabled={!selectedPlan}>
                        Résumé
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="plans" className="space-y-6">
                    {/* Hosting Plans */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {hostingPlans.map((plan) => (
                            <Card
                                key={plan.id}
                                className={`relative cursor-pointer transition-all hover:shadow-lg ${selectedPlan?.id === plan.id ? "ring-2 ring-primary" : ""
                                    } ${plan.popular ? "border-primary" : ""}`}
                                onClick={() => handleSelectPlan(plan)}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-primary">Populaire</Badge>
                                    </div>
                                )}
                                <CardHeader className="text-center">
                                    <CardTitle className="flex items-center justify-center">
                                        <Server className="mr-2 h-5 w-5" />
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div className="pt-4">
                                        <div className="text-3xl font-bold">
                                            {plan.price} FBU
                                            {plan.originalPrice && (
                                                <span className="text-lg text-muted-foreground line-through ml-2">{plan.originalPrice} FBU</span>
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">/mois</div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                            <HardDrive className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {plan.features.diskSpace}
                                        </div>
                                        <div className="flex items-center">
                                            <Wifi className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {plan.features.bandwidth}
                                        </div>
                                        <div className="flex items-center">
                                            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {plan.features.domains}
                                        </div>
                                        <div className="flex items-center">
                                            <Database className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {plan.features.databases}
                                        </div>
                                        <div className="flex items-center">
                                            {plan.features.ssl ? (
                                                <Check className="mr-2 h-4 w-4 text-secondary" />
                                            ) : (
                                                <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            SSL gratuit
                                        </div>
                                        <div className="flex items-center">
                                            {plan.features.backup ? (
                                                <Check className="mr-2 h-4 w-4 text-secondary" />
                                            ) : (
                                                <X className="mr-2 h-4 w-4 text-muted-foreground" />
                                            )}
                                            Sauvegarde auto
                                        </div>
                                        <div className="flex items-center">
                                            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {plan.features.uptime} uptime
                                        </div>
                                    </div>

                                    {plan.limitations && (
                                        <div className="pt-2 border-t">
                                            <div className="text-xs text-muted-foreground space-y-1">
                                                {plan.limitations.map((limitation, index) => (
                                                    <div key={index}>• {limitation}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Button className="w-full" variant={selectedPlan?.id === plan.id ? "default" : "outline"}>
                                        {selectedPlan?.id === plan.id ? "Sélectionné" : "Choisir ce plan"}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Features Comparison */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Comparaison des fonctionnalités</CardTitle>
                            <CardDescription>Toutes les fonctionnalités incluses dans nos plans</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm space-y-2">
                                <p>
                                    • <strong>SSD haute performance:</strong> Stockage rapide pour tous les plans
                                </p>
                                <p>
                                    • <strong>Panneau de contrôle:</strong> Interface intuitive pour gérer votre hébergement
                                </p>
                                <p>
                                    • <strong>Support technique:</strong> Équipe d&apos;experts disponible selon votre plan
                                </p>
                                <p>
                                    • <strong>Garantie uptime:</strong> Disponibilité garantie selon le plan choisi
                                </p>
                                <p>
                                    • <strong>Migration gratuite:</strong> Nous transférons votre site existant gratuitement
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="configure" className="space-y-6">
                    {selectedPlan && (
                        <>
                            {/* Domain Configuration */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuration du domaine</CardTitle>
                                    <CardDescription>Associez un domaine à votre hébergement</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="domain">Nom de domaine</Label>
                                        <Input
                                            id="domain"
                                            value={orderSummary.domain}
                                            onChange={(e) => handleUpdateOrder("domain", e.target.value)}
                                            placeholder="exemple.com"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Saisissez un domaine existant ou commandez-en un nouveau
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Billing Period */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Période de facturation</CardTitle>
                                    <CardDescription>Choisissez la durée de votre abonnement</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Select
                                        value={orderSummary.period.toString()}
                                        onValueChange={(value) => handleUpdateOrder("period", Number.parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 mois - ${selectedPlan.price}/mois</SelectItem>
                                            <SelectItem value="3">3 mois - ${selectedPlan.price}/mois</SelectItem>
                                            <SelectItem value="6">6 mois - ${selectedPlan.price}/mois</SelectItem>
                                            <SelectItem value="12">1 an - ${selectedPlan.price}/mois (-10%)</SelectItem>
                                            <SelectItem value="24">2 ans - ${selectedPlan.price}/mois (-20%)</SelectItem>
                                            <SelectItem value="36">3 ans - ${selectedPlan.price}/mois (-20%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </CardContent>
                            </Card>

                            {/* Add-ons */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Options supplémentaires</CardTitle>
                                    <CardDescription>Améliorez votre hébergement avec ces options</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={orderSummary.addons.ssl}
                                                onCheckedChange={(checked) => handleUpdateAddons("ssl", checked as boolean)}
                                            />
                                            <div>
                                                <div className="font-medium">Certificat SSL Premium</div>
                                                <div className="text-sm text-muted-foreground">Sécurité renforcée et garantie</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">+$9.99/mois</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={orderSummary.addons.backup}
                                                onCheckedChange={(checked) => handleUpdateAddons("backup", checked as boolean)}
                                            />
                                            <div>
                                                <div className="font-medium">Sauvegarde quotidienne</div>
                                                <div className="text-sm text-muted-foreground">Sauvegarde automatique tous les jours</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">+$4.99/mois</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                checked={orderSummary.addons.priority}
                                                onCheckedChange={(checked) => handleUpdateAddons("priority", checked as boolean)}
                                            />
                                            <div>
                                                <div className="font-medium">Support prioritaire</div>
                                                <div className="text-sm text-muted-foreground">Réponse garantie sous 1h</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">+$14.99/mois</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </TabsContent>

                <TabsContent value="summary" className="space-y-6">
                    {selectedPlan && (
                        <>
                            {/* Order Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Résumé de la commande
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                            <div>
                                                <div className="font-medium">{selectedPlan.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {orderSummary.period} mois - {orderSummary.domain}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium">${(selectedPlan.price * orderSummary.period).toFixed(2)}</div>
                                            </div>
                                        </div>

                                        {orderSummary.addons.ssl && (
                                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                                <div>SSL Premium</div>
                                                <div>${(9.99 * orderSummary.period).toFixed(2)}</div>
                                            </div>
                                        )}

                                        {orderSummary.addons.backup && (
                                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                                <div>Sauvegarde quotidienne</div>
                                                <div>${(4.99 * orderSummary.period).toFixed(2)}</div>
                                            </div>
                                        )}

                                        {orderSummary.addons.priority && (
                                            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                                <div>Support prioritaire</div>
                                                <div>${(14.99 * orderSummary.period).toFixed(2)}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="flex items-center justify-between text-lg font-semibold">
                                            <span>Total:</span>
                                            <span>${calculateTotal().toFixed(2)}</span>
                                        </div>
                                        {orderSummary.period >= 12 && (
                                            <div className="text-sm text-secondary mt-1">
                                                Remise de {orderSummary.period >= 24 ? "20%" : "10%"} appliquée
                                            </div>
                                        )}
                                    </div>

                                    <Alert>
                                        <CreditCard className="h-4 w-4" />
                                        <AlertDescription>
                                            Votre service sera activé immédiatement après le paiement. Vous recevrez les informations de
                                            connexion par email.
                                        </AlertDescription>
                                    </Alert>

                                    <Button onClick={handlePlaceOrder} className="w-full bg-primary hover:bg-primary/90">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Finaliser la commande (${calculateTotal().toFixed(2)})
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* What's Next */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Prochaines étapes</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="text-sm space-y-2">
                                        <p>
                                            1. <strong>Paiement:</strong> Votre commande sera traitée immédiatement
                                        </p>
                                        <p>
                                            2. <strong>Activation:</strong> Votre hébergement sera activé dans les 5 minutes
                                        </p>
                                        <p>
                                            3. <strong>Configuration:</strong> Vous recevrez les informations de connexion par email
                                        </p>
                                        <p>
                                            4. <strong>Migration:</strong> Notre équipe peut migrer votre site existant gratuitement
                                        </p>
                                        <p>
                                            5. <strong>Support:</strong> Notre équipe est disponible pour vous accompagner
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
