"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Search, Key, CheckCircle, Clock, X, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface TransferRequest {
    id: string
    domainName: string
    status: "pending" | "in-progress" | "completed" | "failed"
    requestDate: string
    estimatedCompletion: string
}

export default function TransferDomainsPage() {
    const [domainName, setDomainName] = useState("")
    const [eppCode, setEppCode] = useState("")
    const [isValidating, setIsValidating] = useState(false)
    const [validationResult, setValidationResult] = useState<{
        isValid: boolean
        message: string
        canTransfer: boolean
    } | null>(null)

    const [transferRequests] = useState<TransferRequest[]>([
        {
            id: "1",
            domainName: "newsite.com",
            status: "in-progress",
            requestDate: "2024-01-10",
            estimatedCompletion: "2024-01-17",
        },
        {
            id: "2",
            domainName: "myblog.org",
            status: "completed",
            requestDate: "2024-01-05",
            estimatedCompletion: "2024-01-12",
        },
    ])

    const handleValidateTransfer = async () => {
        if (!domainName || !eppCode) {
            toast("Informations manquantes",
                {
                    toasterId: "Veuillez saisir le nom de domaine et le code EPP.",
                    id: "destructive",
                })
            return
        }

        setIsValidating(true)

        // Simulate validation
        setTimeout(() => {
            const isValid = eppCode === "ABC123XYZ789" // Mock validation
            setValidationResult({
                isValid,
                message: isValid
                    ? "Le code EPP est valide. Ce domaine peut être transféré."
                    : "Le code EPP est incorrect ou invalide. Veuillez vérifier et réessayer.",
                canTransfer: isValid,
            })
            setIsValidating(false)
        }, 2000)
    }

    const handleInitiateTransfer = () => {
        if (!validationResult?.canTransfer) return

        toast("Transfert initié",
            {
                testId: `Le transfert de ${domainName} a été initié avec succès.`,
            })

        // Reset form
        setDomainName("")
        setEppCode("")
        setValidationResult(null)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        En attente
                    </Badge>
                )
            case "in-progress":
                return (
                    <Badge variant="default">
                        <ArrowRightLeft className="mr-1 h-3 w-3" />
                        En cours
                    </Badge>
                )
            case "completed":
                return (
                    <Badge variant="default" className="bg-secondary">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Terminé
                    </Badge>
                )
            case "failed":
                return (
                    <Badge variant="destructive">
                        <X className="mr-1 h-3 w-3" />
                        Échec
                    </Badge>
                )
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Transfert de domaines</h1>
                    <p className="text-muted-foreground">Transférez vos domaines vers Hogi Online</p>
                </div>
            </div>

            <Tabs defaultValue="transfer" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="transfer">Nouveau transfert</TabsTrigger>
                    <TabsTrigger value="status">Statut des transferts</TabsTrigger>
                </TabsList>

                <TabsContent value="transfer" className="space-y-6">
                    {/* Transfer Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <ArrowRightLeft className="mr-2 h-5 w-5" />
                                Transférer un domaine
                            </CardTitle>
                            <CardDescription>Saisissez les informations de votre domaine pour initier le transfert</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="domainName">Nom de domaine *</Label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="domainName"
                                            value={domainName}
                                            onChange={(e) => setDomainName(e.target.value)}
                                            placeholder="exemple.com"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="eppCode">Code EPP/Autorisation *</Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="eppCode"
                                            value={eppCode}
                                            onChange={(e) => setEppCode(e.target.value)}
                                            placeholder="ABC123XYZ789"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={handleValidateTransfer}
                                disabled={isValidating || !domainName || !eppCode}
                                className="w-full md:w-auto"
                            >
                                {isValidating ? "Vérification..." : "Vérifier le code de transfert"}
                            </Button>

                            {/* Validation Result */}
                            {validationResult && (
                                <Alert
                                    className={
                                        validationResult.isValid
                                            ? "border-secondary bg-secondary/10"
                                            : "border-destructive bg-destructive/10"
                                    }
                                >
                                    {validationResult.isValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                                    <AlertDescription>{validationResult.message}</AlertDescription>
                                </Alert>
                            )}

                            {/* Transfer Details */}
                            {validationResult?.canTransfer && (
                                <Card className="border-secondary bg-secondary/5">
                                    <CardHeader>
                                        <CardTitle className="text-lg">Détails du transfert</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <Label className="text-sm font-medium">Domaine à transférer</Label>
                                                <p className="text-sm text-muted-foreground">{domainName}</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Prix du transfert</Label>
                                                <p className="text-sm text-muted-foreground">$15.99 (inclut 1 an de renouvellement)</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Durée estimée</Label>
                                                <p className="text-sm text-muted-foreground">5-7 jours ouvrables</p>
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Nouvelle date d&apos;expiration</Label>
                                                <p className="text-sm text-muted-foreground">Actuelle + 1 an</p>
                                            </div>
                                        </div>

                                        <Alert>
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                Le transfert inclut automatiquement un renouvellement d&apos;un an. Votre domaine sera transféré vers
                                                Hogi Online et sa date d&apos;expiration sera prolongée.
                                            </AlertDescription>
                                        </Alert>

                                        <Button onClick={handleInitiateTransfer} className="w-full bg-primary hover:bg-primary/90">
                                            Initier le transfert ($15.99)
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>

                    {/* Transfer Instructions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Comment obtenir votre code EPP ?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium">Connectez-vous à votre registrar actuel</p>
                                        <p className="text-muted-foreground">
                                            Accédez au panneau de contrôle de votre fournisseur de domaine actuel
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium">Déverrouillez votre domaine</p>
                                        <p className="text-muted-foreground">
                                            Assurez-vous que le domaine n&apos;est pas verrouillé pour le transfert
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium">Obtenez le code EPP</p>
                                        <p className="text-muted-foreground">
                                            Demandez le code d&apos;autorisation (EPP/Auth Code) dans les paramètres du domaine
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                                        4
                                    </div>
                                    <div>
                                        <p className="font-medium">Initiez le transfert</p>
                                        <p className="text-muted-foreground">
                                            Utilisez le code EPP ci-dessus pour démarrer le processus de transfert
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="status" className="space-y-6">
                    {/* Transfer Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Transferts en cours et historique</CardTitle>
                            <CardDescription>Suivez l&apos;état de vos demandes de transfert</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom de domaine</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Date de demande</TableHead>
                                        <TableHead>Fin estimée</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transferRequests.map((request) => (
                                        <TableRow key={request.id}>
                                            <TableCell className="font-medium">{request.domainName}</TableCell>
                                            <TableCell>{getStatusBadge(request.status)}</TableCell>
                                            <TableCell>{request.requestDate}</TableCell>
                                            <TableCell>{request.estimatedCompletion}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">
                                                    Voir détails
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Transfer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations sur le processus de transfert</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="text-sm space-y-2">
                                <p>
                                    • <strong>Durée:</strong> Les transferts prennent généralement 5-7 jours ouvrables
                                </p>
                                <p>
                                    • <strong>Renouvellement:</strong> Chaque transfert inclut automatiquement 1 an de renouvellement
                                </p>
                                <p>
                                    • <strong>Annulation:</strong> Vous pouvez annuler un transfert dans les 5 premiers jours
                                </p>
                                <p>
                                    • <strong>Notifications:</strong> Vous recevrez des emails de mise à jour tout au long du processus
                                </p>
                                <p>
                                    • <strong>Support:</strong> Notre équipe est disponible pour vous aider en cas de problème
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
