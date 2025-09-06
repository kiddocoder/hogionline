"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, X } from "lucide-react"

export default function AccountProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "Jean",
        lastName: "Dupont",
        company: "Ma Société SARL",
        nif: "123456789",
        email: "jean.dupont@example.com",
        address1: "123 Rue de la Paix",
        address2: "Appartement 4B",
        address3: "",
        city: "Bujumbura",
        postalCode: "1000",
        country: "BI",
        state: "Bujumbura Mairie",
        phone: "+257 22 123 456",
        phoneSecondary: "+257 79 123 456",
        fax: "",
        language: "fr",
        renewalPeriod: "30",
        creditAlert: "50",
    })

    const handleSave = () => {
        // Logique de sauvegarde
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        // Reset form data
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Informations du compte</h1>
                    <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et préférences</p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>Modifier</Button>
                ) : (
                    <div className="flex gap-2">
                        <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
                            <Save className="h-4 w-4 mr-2" />
                            Valider
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-2" />
                            Annuler
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Informations personnelles</CardTitle>
                        <CardDescription>Vos informations de base et d&apos;entreprise</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="company">Nom de l&apos;entreprise</Label>
                            <Input
                                id="company"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nif">NIF</Label>
                            <Input
                                id="nif"
                                value={formData.nif}
                                onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Coordonnées</CardTitle>
                        <CardDescription>Vos informations de contact et adresse</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address1">Adresse principale *</Label>
                            <Input
                                id="address1"
                                value={formData.address1}
                                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address2">Adresse 2</Label>
                            <Input
                                id="address2"
                                value={formData.address2}
                                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address3">Adresse 3</Label>
                            <Input
                                id="address3"
                                value={formData.address3}
                                onChange={(e) => setFormData({ ...formData, address3: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ville *</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Code postal *</Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays *</Label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                                    disabled={!isEditing}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BI">Burundi</SelectItem>
                                        <SelectItem value="RW">Rwanda</SelectItem>
                                        <SelectItem value="CD">RD Congo</SelectItem>
                                        <SelectItem value="TZ">Tanzanie</SelectItem>
                                        <SelectItem value="KE">Kenya</SelectItem>
                                        <SelectItem value="UG">Ouganda</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">État/Région</Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Télécommunications</CardTitle>
                        <CardDescription>Vos numéros de téléphone et fax</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone principal *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                disabled={!isEditing}
                                placeholder="+257 XX XXX XXX"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phoneSecondary">Téléphone secondaire</Label>
                            <Input
                                id="phoneSecondary"
                                value={formData.phoneSecondary}
                                onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                                disabled={!isEditing}
                                placeholder="+257 XX XXX XXX"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="fax">Fax</Label>
                            <Input
                                id="fax"
                                value={formData.fax}
                                onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Préférences</CardTitle>
                        <CardDescription>Vos préférences de compte et notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="language">Langue préférée *</Label>
                            <Select
                                value={formData.language}
                                onValueChange={(value) => setFormData({ ...formData, language: value })}
                                disabled={!isEditing}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fr">Français</SelectItem>
                                    <SelectItem value="en">Anglais</SelectItem>
                                    <SelectItem value="sw">Swahili</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="renewalPeriod">Période de renouvellement automatique des domaines</Label>
                            <Select
                                value={formData.renewalPeriod}
                                onValueChange={(value) => setFormData({ ...formData, renewalPeriod: value })}
                                disabled={!isEditing}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 jours</SelectItem>
                                    <SelectItem value="30">30 jours</SelectItem>
                                    <SelectItem value="60">60 jours</SelectItem>
                                    <SelectItem value="90">90 jours</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="creditAlert">Alerte du minimum de crédit *</Label>
                            <Input
                                id="creditAlert"
                                type="number"
                                value={formData.creditAlert}
                                onChange={(e) => setFormData({ ...formData, creditAlert: e.target.value })}
                                disabled={!isEditing}
                                placeholder="Montant en USD"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
