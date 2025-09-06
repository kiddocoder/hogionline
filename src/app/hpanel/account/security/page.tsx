"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Smartphone, Key, AlertCircle, Check, RefreshCw } from "lucide-react"

export default function SecuritySettings() {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [showSetup, setShowSetup] = useState(false)
    const [qrCode] = useState("JBSWY3DPEHPK3PXP") // Exemple de code secret
    const [backupCodes] = useState(["123456789", "987654321", "456789123", "789123456", "321654987"])
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const handleToggle2FA = () => {
        if (!twoFactorEnabled) {
            setShowSetup(true)
        } else {
            // Désactiver 2FA
            setTwoFactorEnabled(false)
            setShowSetup(false)
            setMessage({ type: "success", text: "Authentification à deux facteurs désactivée" })
        }
    }

    const handleVerifyCode = () => {
        if (verificationCode.length === 6) {
            setTwoFactorEnabled(true)
            setShowSetup(false)
            setVerificationCode("")
            setMessage({ type: "success", text: "Authentification à deux facteurs activée avec succès" })
        } else {
            setMessage({ type: "error", text: "Code de vérification incorrect" })
        }
    }

    const handleResendCode = () => {
        setMessage({ type: "success", text: "Un nouveau code de vérification a été envoyé" })
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Paramètres de sécurité</h1>
                    <p className="text-muted-foreground mt-1">Renforcez la sécurité de votre compte</p>
                </div>
            </div>

            <div className="max-w-2xl space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Authentification à deux facteurs (2FA)
                        </CardTitle>
                        <CardDescription>Ajoutez une couche supplémentaire de sécurité à votre compte</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base font-medium">Activer l&apos;authentification à deux facteurs</Label>
                                <p className="text-sm text-muted-foreground">
                                    {twoFactorEnabled
                                        ? "L'authentification à deux facteurs est activée"
                                        : "Protégez votre compte avec un code de vérification"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {twoFactorEnabled && (
                                    <Badge variant="default" className="bg-accent">
                                        <Check className="h-3 w-3 mr-1" />
                                        Activé
                                    </Badge>
                                )}
                                <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                            </div>
                        </div>

                        {showSetup && !twoFactorEnabled && (
                            <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
                                <h4 className="font-medium flex items-center gap-2">
                                    <Smartphone className="h-4 w-4" />
                                    Configuration de l&apos;authentification à deux facteurs
                                </h4>

                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        1. Téléchargez une application d&apos;authentification comme Google Authenticator ou Authy
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        2. Scannez le code QR ou saisissez manuellement ce code secret:
                                    </p>

                                    <div className="bg-background p-3 rounded border font-mono text-sm">{qrCode}</div>

                                    <p className="text-sm text-muted-foreground">
                                        3. Saisissez le code de vérification généré par votre application:
                                    </p>

                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Code à 6 chiffres"
                                            value={verificationCode}
                                            onChange={(e) => setVerificationCode(e.target.value)}
                                            maxLength={6}
                                            className="max-w-[150px]"
                                        />
                                        <Button onClick={handleVerifyCode} disabled={verificationCode.length !== 6}>
                                            Confirmer
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {twoFactorEnabled && (
                            <div className="space-y-4 p-4 border rounded-lg bg-accent/10">
                                <h4 className="font-medium flex items-center gap-2">
                                    <Key className="h-4 w-4" />
                                    Codes de sauvegarde
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Conservez ces codes en lieu sûr. Ils vous permettront d&apos;accéder à votre compte si vous perdez votre
                                    appareil.
                                </p>

                                <div className="grid grid-cols-2 gap-2">
                                    {backupCodes.map((code, index) => (
                                        <div key={index} className="bg-background p-2 rounded border font-mono text-sm text-center">
                                            {code}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handleResendCode}
                                    variant="outline" size="sm">
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Générer de nouveaux codes
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sessions actives</CardTitle>
                        <CardDescription>Gérez les appareils connectés à votre compte</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-1">
                                    <p className="font-medium">Session actuelle</p>
                                    <p className="text-sm text-muted-foreground">Chrome sur Windows • Bujumbura, BI</p>
                                    <p className="text-xs text-muted-foreground">Dernière activité: maintenant</p>
                                </div>
                                <Badge variant="default">Actuel</Badge>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="space-y-1">
                                    <p className="font-medium">Mobile Safari</p>
                                    <p className="text-sm text-muted-foreground">iPhone • Bujumbura, BI</p>
                                    <p className="text-xs text-muted-foreground">Dernière activité: il y a 2 heures</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    Déconnecter
                                </Button>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full mt-4 bg-transparent">
                            Déconnecter tous les autres appareils
                        </Button>
                    </CardContent>
                </Card>

                {message && (
                    <Alert className={message.type === "error" ? "border-destructive" : "border-accent"}>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{message.text}</AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    )
}
