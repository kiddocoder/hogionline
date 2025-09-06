"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, User } from "lucide-react"

interface Contact {
    id: string
    firstName: string
    lastName: string
    company?: string
    nif?: string
    email: string
    phone: string
    phoneSecondary?: string
    address1: string
    address2?: string
    address3?: string
    city: string
    postalCode: string
    country: string
    state?: string
    status: "active" | "inactive"
}

export default function AccountContacts() {
    const [contacts, setContacts] = useState<Contact[]>([
        {
            id: "1",
            firstName: "Marie",
            lastName: "Ndayisenga",
            company: "Tech Solutions Ltd",
            email: "marie@techsolutions.bi",
            phone: "+257 22 456 789",
            address1: "Avenue de l'Indépendance 45",
            city: "Bujumbura",
            postalCode: "1000",
            country: "BI",
            status: "active",
        },
        {
            id: "2",
            firstName: "Pierre",
            lastName: "Nkurunziza",
            email: "pierre.n@example.com",
            phone: "+257 79 987 654",
            address1: "Quartier Rohero",
            city: "Bujumbura",
            postalCode: "1000",
            country: "BI",
            status: "active",
        },
    ])

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingContact, setEditingContact] = useState<Contact | null>(null)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        company: "",
        nif: "",
        email: "",
        phone: "",
        phoneSecondary: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        postalCode: "",
        country: "BI",
        state: "",
    })

    const handleAddContact = () => {
        setEditingContact(null)
        setFormData({
            firstName: "",
            lastName: "",
            company: "",
            nif: "",
            email: "",
            phone: "",
            phoneSecondary: "",
            address1: "",
            address2: "",
            address3: "",
            city: "",
            postalCode: "",
            country: "BI",
            state: "",
        })
        setIsDialogOpen(true)
    }

    const handleEditContact = (contact: Contact) => {
        setEditingContact(contact)
        setFormData({
            firstName: contact.firstName,
            lastName: contact.lastName,
            company: contact.company || "",
            nif: contact.nif || "",
            email: contact.email,
            phone: contact.phone,
            phoneSecondary: contact.phoneSecondary || "",
            address1: contact.address1,
            address2: contact.address2 || "",
            address3: contact.address3 || "",
            city: contact.city,
            postalCode: contact.postalCode,
            country: contact.country,
            state: contact.state || "",
        })
        setIsDialogOpen(true)
    }

    const handleSaveContact = () => {
        if (editingContact) {
            // Update existing contact
            setContacts(contacts.map((c) => (c.id === editingContact.id ? { ...editingContact, ...formData } : c)))
        } else {
            // Add new contact
            const newContact: Contact = {
                id: Date.now().toString(),
                ...formData,
                status: "active",
            }
            setContacts([...contacts, newContact])
        }
        setIsDialogOpen(false)
    }

    const handleDeleteContact = (id: string) => {
        setContacts(contacts.filter((c) => c.id !== id))
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Contacts / Sous-comptes</h1>
                    <p className="text-muted-foreground mt-1">Gérez vos contacts et informations de sous-comptes</p>
                </div>
                <Button onClick={handleAddContact} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un contact
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des contacts</CardTitle>
                    <CardDescription>Tous vos contacts enregistrés</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Entreprise</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead>Ville</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            {contact.firstName} {contact.lastName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{contact.company || "-"}</TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{contact.city}</TableCell>
                                    <TableCell>
                                        <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                                            {contact.status === "active" ? "Actif" : "Inactif"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => handleEditContact(contact)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => handleDeleteContact(contact.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{editingContact ? "Modifier le contact" : "Ajouter un contact"}</DialogTitle>
                        <DialogDescription>
                            {editingContact ? "Modifiez les informations du contact" : "Ajoutez un nouveau contact à votre compte"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Prénom *</Label>
                                <Input
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Nom *</Label>
                                <Input
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="company">Nom de l&apos;entreprise</Label>
                                <Input
                                    id="company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nif">NIF</Label>
                                <Input
                                    id="nif"
                                    value={formData.nif}
                                    onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address1">Adresse principale *</Label>
                            <Input
                                id="address1"
                                value={formData.address1}
                                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="address2">Adresse 2</Label>
                                <Input
                                    id="address2"
                                    value={formData.address2}
                                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address3">Adresse 3</Label>
                                <Input
                                    id="address3"
                                    value={formData.address3}
                                    onChange={(e) => setFormData({ ...formData, address3: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="city">Ville *</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Code postal *</Label>
                                <Input
                                    id="postalCode"
                                    value={formData.postalCode}
                                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Pays *</Label>
                                <Select
                                    value={formData.country}
                                    onValueChange={(value) => setFormData({ ...formData, country: value })}
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
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone principal *</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+257 XX XXX XXX"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneSecondary">Téléphone secondaire</Label>
                                <Input
                                    id="phoneSecondary"
                                    value={formData.phoneSecondary}
                                    onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                                    placeholder="+257 XX XXX XXX"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Annuler
                            </Button>
                            <Button onClick={handleSaveContact} className="bg-accent hover:bg-accent/90">
                                Valider
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
