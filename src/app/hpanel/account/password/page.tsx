"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Shield, Check, X, AlertCircle } from "lucide-react"

export default function PasswordChange() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })

    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    })

    const [passwordStrength, setPasswordStrength] = useState(0)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const calculatePasswordStrength = (password: string) => {
        let strength = 0
        if (password.length >= 8) strength += 25
        if (/[A-Z]/.test(password)) strength += 25
        if (/[a-z]/.test(password)) strength += 25
        if (/[0-9]/.test(password)) strength += 12.5
        if (/[^A-Za-z0-9]/.test(password)) strength += 12.5
        return Math.min(strength, 100)
    }

    const handlePasswordChange = (value: string) => {
        setFormData({ ...formData, newPassword: value })
        setPasswordStrength(calculatePasswordStrength(value))
    }

    const getPasswordStrengthColor = () => {
        if (passwordStrength < 25) return "bg-destructive"
        if (passwordStrength < 50) return "bg-secondary"
        if (passwordStrength < 75) return "bg-primary"
        return "bg-accent"
    }

    const getPasswordStrengthText = () => {
        if (passwordStrength < 25) return "Très faible"
        if (passwordStrength < 50) return "Faible"
        if (passwordStrength < 75) return "Moyen"
        return "Fort"
    }

    const validateForm = () => {
        if (!formData.currentPassword) {
            setMessage({ type: "error", text: "Veuillez saisir votre mot de passe actuel" })
            return false
        }

        if (formData.newPassword.length < 8) {
            setMessage({ type: "error", text: "Le nouveau mot de passe doit contenir au moins 8 caractères" })
            return false
        }

        if (formData.newPassword !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" })
            return false
        }

        if (passwordStrength < 50) {
            setMessage({ type: "error", text: "Le mot de passe n'est pas assez fort" })
            return false
        }

        return true
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        // Simulate API call
        setTimeout(() => {
            setMessage({ type: "success", text: "Mot de passe modifié avec succès" })
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
            setPasswordStrength(0)
        }, 1000)
    }

    const passwordCriteria = [
        { text: "Au moins 8 caractères", met: formData.newPassword.length >= 8 },
        { text: "Une majuscule", met: /[A-Z]/.test(formData.newPassword) },
        { text: "Une minuscule", met: /[a-z]/.test(formData.newPassword) },
        { text: "Un chiffre", met: /[0-9]/.test(formData.newPassword) },
        { text: "Un caractère spécial", met: /[^A-Za-z0-9]/.test(formData.newPassword) },
    ]

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Modifier le mot de passe</h1>
                    <p className="text-muted-foreground mt-1">Changez votre mot de passe pour sécuriser votre compte</p>
                </div>
            </div>

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Sécurité du mot de passe
                        </CardTitle>
                        <CardDescription>
                            Assurez-vous que votre nouveau mot de passe respecte les critères de sécurité
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Mot de passe actuel *</Label>
                                <div className="relative">
                                    <Input
                                        id="currentPassword"
                                        type={showPasswords.current ? "text" : "password"}
                                        value={formData.currentPassword}
                                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                        placeholder="Saisissez votre mot de passe actuel"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                    >
                                        {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">Nouveau mot de passe *</Label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPasswords.new ? "text" : "password"}
                                        value={formData.newPassword}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        placeholder="Créez un nouveau mot de passe"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    >
                                        {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>

                                {formData.newPassword && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Force du mot de passe:</span>
                                            <span className="font-medium">{getPasswordStrengthText()}</span>
                                        </div>
                                        <Progress value={passwordStrength} className={`h-2 ${getPasswordStrengthColor()}`} />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe *</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showPasswords.confirm ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        placeholder="Répétez le nouveau mot de passe"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    >
                                        {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            {formData.newPassword && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-base">Critères de sécurité</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            {passwordCriteria.map((criterion, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                    {criterion.met ? (
                                                        <Check className="h-4 w-4 text-accent" />
                                                    ) : (
                                                        <X className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <span className={criterion.met ? "text-accent" : "text-muted-foreground"}>
                                                        {criterion.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {message && (
                                <Alert className={message.type === "error" ? "border-destructive" : "border-accent"}>
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{message.text}</AlertDescription>
                                </Alert>
                            )}

                            <div className="flex gap-2">
                                <Button type="submit" className="bg-accent hover:bg-accent/90">
                                    Sauvegarder les modifications
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                                        setPasswordStrength(0)
                                        setMessage(null)
                                    }}
                                >
                                    Annuler
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
