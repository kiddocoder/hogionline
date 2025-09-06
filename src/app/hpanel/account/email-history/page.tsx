"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Reply, Forward, Archive, Paperclip, Eye } from "lucide-react"

interface EmailRecord {
    id: string
    date: string
    sender: string
    recipient: string
    subject: string
    content: string
    hasAttachment: boolean
    status: "read" | "unread" | "replied"
}

export default function EmailHistory() {
    const [emails] = useState<EmailRecord[]>([
        {
            id: "1",
            date: "2024-01-15 14:30",
            sender: "support@hogionline.com",
            recipient: "client@example.com",
            subject: "Confirmation de votre commande de domaine",
            content:
                "Bonjour, nous avons bien reçu votre commande pour le domaine example.com. Votre domaine sera activé dans les prochaines 24 heures...",
            hasAttachment: false,
            status: "read",
        },
        {
            id: "2",
            date: "2024-01-14 09:15",
            sender: "billing@hogionline.com",
            recipient: "client@example.com",
            subject: "Facture #INV-2024-001",
            content: "Voici votre facture pour les services du mois de janvier. Montant total: $45.00...",
            hasAttachment: true,
            status: "read",
        },
        {
            id: "3",
            date: "2024-01-12 16:45",
            sender: "client@example.com",
            recipient: "support@hogionline.com",
            subject: "Question sur l'hébergement",
            content: "Bonjour, j'aimerais savoir comment augmenter l'espace disque de mon hébergement...",
            hasAttachment: false,
            status: "replied",
        },
        {
            id: "4",
            date: "2024-01-10 11:20",
            sender: "noreply@hogionline.com",
            recipient: "client@example.com",
            subject: "Rappel: Renouvellement de domaine",
            content: "Votre domaine mysite.bi expire dans 30 jours. Pensez à le renouveler pour éviter toute interruption...",
            hasAttachment: false,
            status: "unread",
        },
    ])

    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterSender, setFilterSender] = useState("all")
    const [selectedEmail, setSelectedEmail] = useState<EmailRecord | null>(null)

    const filteredEmails = emails.filter((email) => {
        const matchesSearch =
            email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
            email.content.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === "all" || email.status === filterStatus
        const matchesSender = filterSender === "all" || email.sender.includes(filterSender)

        return matchesSearch && matchesStatus && matchesSender
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "unread":
                return <Badge variant="destructive">Non lu</Badge>
            case "replied":
                return <Badge variant="default">Répondu</Badge>
            default:
                return <Badge variant="secondary">Lu</Badge>
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Historique des emails</h1>
                    <p className="text-muted-foreground mt-1">Consultez l&apos;historique de vos communications par email</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Filtres et recherche</CardTitle>
                    <CardDescription>Filtrez vos emails par statut, expéditeur ou contenu</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher dans les emails..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="unread">Non lu</SelectItem>
                                <SelectItem value="read">Lu</SelectItem>
                                <SelectItem value="replied">Répondu</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterSender} onValueChange={setFilterSender}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Expéditeur" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les expéditeurs</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
                                <SelectItem value="billing">Facturation</SelectItem>
                                <SelectItem value="noreply">Notifications</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Liste des emails ({filteredEmails.length})</CardTitle>
                    <CardDescription>Historique de vos échanges par email</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date et Heure</TableHead>
                                <TableHead>Expéditeur</TableHead>
                                <TableHead>Destinataire</TableHead>
                                <TableHead>Objet</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmails.map((email) => (
                                <TableRow key={email.id}>
                                    <TableCell className="font-mono text-sm">{email.date}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            {email.sender}
                                        </div>
                                    </TableCell>
                                    <TableCell>{email.recipient}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {email.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                                            <span className="truncate max-w-[200px]">{email.subject}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(email.status)}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button size="sm" variant="outline" onClick={() => setSelectedEmail(email)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Reply className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Forward className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <Archive className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Lire le message</DialogTitle>
                        <DialogDescription>Email du {selectedEmail?.date}</DialogDescription>
                    </DialogHeader>

                    {selectedEmail && (
                        <div className="space-y-4">
                            <div className="grid gap-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">De:</span>
                                    <span>{selectedEmail.sender}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">À:</span>
                                    <span>{selectedEmail.recipient}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Objet:</span>
                                    <span>{selectedEmail.subject}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Date:</span>
                                    <span>{selectedEmail.date}</span>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-2">Contenu du message:</h4>
                                <div className="bg-muted p-4 rounded-lg">
                                    <p className="whitespace-pre-wrap">{selectedEmail.content}</p>
                                </div>
                            </div>

                            {selectedEmail.hasAttachment && (
                                <div className="border-t pt-4">
                                    <h4 className="font-medium mb-2">Pièces jointes:</h4>
                                    <div className="flex items-center gap-2 p-2 border rounded">
                                        <Paperclip className="h-4 w-4" />
                                        <span>facture.pdf</span>
                                        <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                                            Télécharger
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-end gap-2 pt-4">
                                <Button variant="outline" onClick={() => setSelectedEmail(null)}>
                                    Fermer
                                </Button>
                                <Button>
                                    <Reply className="h-4 w-4 mr-2" />
                                    Répondre
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
