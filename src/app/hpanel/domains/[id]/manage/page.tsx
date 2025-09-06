"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Edit, Calendar, ArrowRightLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Domain {
    id: string
    name: string
    status: "active" | "expired" | "pending"
    expirationDate: string
    registrar: string
    autoRenew: boolean
    locked: boolean
    whoisPrivacy: boolean
    dnsProvider: string
}



const ManageDomainPage = ({ domain = {
    id: '1',
    name: `example${1}.com`,
    status: "active",
    registrar: "Hogi Online",
    expirationDate: "2024-02-15",
    dnsProvider: "Hogi DNS",
    locked: false,
    whoisPrivacy: false,
    autoRenew: true,
} }: { domain: Domain }) => {
    const [managementDialog, setManagementDialog] = useState(true);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-accent">Actif</Badge>
            case "expired":
                return <Badge variant="destructive">Expiré</Badge>
            case "pending":
                return <Badge variant="secondary">En attente</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <Dialog open={managementDialog} onOpenChange={setManagementDialog}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Gérer le domaine: {domain.name}</DialogTitle>
                    <DialogDescription>
                        Configurez les paramètres de votre domaine
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Informations générales
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Statut:</span>
                                    <span>{getStatusBadge(domain.status)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">Expiration:</span>
                                    <span className="text-sm">{domain.expirationDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-medium">DNS:</span>
                                    <span className="text-sm">{domain.dnsProvider}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Paramètres de sécurité
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium">
                                            Verrouillage du domaine
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            Empêche les transferts non autorisés
                                        </p>
                                    </div>
                                    <Switch checked={domain.locked} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium">
                                            Protection WHOIS
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            Cache vos informations personnelles
                                        </p>
                                    </div>
                                    <Switch checked={domain.whoisPrivacy} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <Label className="text-sm font-medium">
                                            Renouvellement automatique
                                        </Label>
                                        <p className="text-xs text-muted-foreground">
                                            Renouvelle automatiquement le domaine
                                        </p>
                                    </div>
                                    <Switch checked={domain.autoRenew} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Actions avancées</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 md:grid-cols-2">
                                <Button
                                    variant="outline"
                                    className="justify-start bg-transparent"
                                >
                                    <Key className="h-4 w-4 mr-2" />
                                    Générer code EPP
                                </Button>
                                <Button
                                    variant="outline"
                                    className="justify-start bg-transparent"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Modifier les détails
                                </Button>
                                <Button
                                    variant="outline"
                                    className="justify-start bg-transparent"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Renouveler maintenant
                                </Button>
                                <Button
                                    variant="outline"
                                    className="justify-start bg-transparent"
                                >
                                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                                    Transférer le domaine
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setManagementDialog(false)}
                        >
                            Fermer
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90">
                            Sauvegarder les modifications
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ManageDomainPage;
