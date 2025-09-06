"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Server, CreditCard, TrendingUp, AlertCircle, Plus, ExternalLink } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data
const domainData = [
    { name: "Jan", domains: 12 },
    { name: "Fév", domains: 15 },
    { name: "Mar", domains: 18 },
    { name: "Avr", domains: 22 },
    { name: "Mai", domains: 25 },
    { name: "Jun", domains: 28 },
]

const trafficData = [
    { name: "Lun", visits: 1200 },
    { name: "Mar", visits: 1900 },
    { name: "Mer", visits: 3000 },
    { name: "Jeu", visits: 2800 },
    { name: "Ven", visits: 3900 },
    { name: "Sam", visits: 4300 },
    { name: "Dim", visits: 3200 },
]

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Bonjour, kiddo!</h1>
                    <p className="text-muted-foreground">Voici un aperçu de vos services Hogi Online.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau service
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Domaines actifs</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-secondary">+3</span> ce mois
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Services d'hébergement</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-secondary">+1</span> ce mois
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Solde du compte</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$1,247.50</div>
                        <p className="text-xs text-muted-foreground">Dernière recharge il y a 3 jours</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Trafic mensuel</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45.2K</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-secondary">+12%</span> vs mois dernier
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Évolution des domaines</CardTitle>
                        <CardDescription>Nombre de domaines enregistrés par mois</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={domainData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="domains" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Trafic hebdomadaire</CardTitle>
                        <CardDescription>Visites sur vos sites web cette semaine</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trafficData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="visits" stroke="hsl(var(--secondary))" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Activité récente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-secondary rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Domaine example.com renouvelé</p>
                                <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Nouveau plan d'hébergement activé</p>
                                <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-2 h-2 bg-muted rounded-full"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">Facture #INV-2024-001 payée</p>
                                <p className="text-xs text-muted-foreground">Il y a 3 jours</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Alertes importantes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 bg-destructive/10 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Domaine expirant bientôt</p>
                                <p className="text-xs text-muted-foreground">mysite.com expire dans 7 jours</p>
                                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                                    Renouveler maintenant
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-secondary/10 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-secondary mt-0.5" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">Utilisation élevée</p>
                                <p className="text-xs text-muted-foreground">Votre site utilise 85% de la bande passante</p>
                                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                                    Voir les détails
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                    <CardDescription>Accès rapide aux fonctionnalités les plus utilisées</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <Globe className="h-6 w-6" />
                            <span className="text-sm">Nouveau domaine</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <Server className="h-6 w-6" />
                            <span className="text-sm">Hébergement</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <CreditCard className="h-6 w-6" />
                            <span className="text-sm">Ajouter des fonds</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                            <ExternalLink className="h-6 w-6" />
                            <span className="text-sm">Support</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
