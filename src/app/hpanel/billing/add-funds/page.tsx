"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Wallet, Smartphone, DollarSign, Plus, AlertCircle, CheckCircle } from "lucide-react"

interface PaymentMethod {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    fees: number
    available: boolean
}

export default function AddFunds() {
    const [amount, setAmount] = useState("")
    const [selectedMethod, setSelectedMethod] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const paymentMethods: PaymentMethod[] = [
        {
            id: "credit",
            name: "Crédit compte",
            description: "Utiliser le solde disponible sur votre compte",
            icon: <Wallet className="h-5 w-5" />,
            fees: 0,
            available: true,
        },
        {
            id: "cash",
            name: "Cash",
            description: "Paiement en espèces dans nos bureaux",
            icon: <DollarSign className="h-5 w-5" />,
            fees: 0,
            available: true,
        },
        {
            id: "efeza",
            name: "eFeza",
            description: "Paiement mobile via eFeza",
            icon: <Smartphone className="h-5 w-5" />,
            fees: 2.5,
            available: true,
        },
        {
            id: "flutterwave",
            name: "Flutter Wave",
            description: "Paiements internationaux par carte bancaire",
            icon: <CreditCard className="h-5 w-5" />,
            fees: 3.5,
            available: true,
        },
    ]

    const quickAmounts = [10, 25, 50, 100, 200, 500]
    const currentBalance = 247.5

    const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedMethod)
    const numericAmount = Number.parseFloat(amount) || 0
    const fees = selectedPaymentMethod ? (numericAmount * selectedPaymentMethod.fees) / 100 : 0
    const totalAmount = numericAmount + fees

    const handleQuickAmount = (quickAmount: number) => {
        setAmount(quickAmount.toString())
    }

    const handleAddFunds = async () => {
        if (!amount || !selectedMethod) {
            setMessage({ type: "error", text: "Veuillez saisir un montant et sélectionner une méthode de paiement" })
            return
        }

        if (numericAmount < 5) {
            setMessage({ type: "error", text: "Le montant minimum est de $5" })
            return
        }

        setIsProcessing(true)
        setMessage(null)

        // Simulation du processus de paiement
        setTimeout(() => {
            setMessage({
                type: "success",
                text: `$${numericAmount.toFixed(2)} ont été ajoutés avec succès à votre compte`,
            })
            setAmount("")
            setSelectedMethod("")
            setIsProcessing(false)
        }, 2000)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Ajouter des fonds</h1>
                    <p className="text-muted-foreground mt-1">Rechargez votre solde pour payer vos services</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Solde actuel</CardTitle>
                            <CardDescription>Votre crédit disponible</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                                    <Wallet className="h-6 w-6 text-accent" />
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">${currentBalance.toFixed(2)}</div>
                                    <p className="text-sm text-muted-foreground">Crédit disponible</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Montant à ajouter</CardTitle>
                            <CardDescription>Saisissez le montant que vous souhaitez ajouter</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Montant (USD) *</Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="0.00"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="pl-10"
                                        min="5"
                                        step="0.01"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">Montant minimum: $5.00</p>
                            </div>

                            <div>
                                <Label className="text-sm font-medium">Montants rapides</Label>
                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    {quickAmounts.map((quickAmount) => (
                                        <Button
                                            key={quickAmount}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleQuickAmount(quickAmount)}
                                            className="bg-transparent"
                                        >
                                            ${quickAmount}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Méthode de paiement</CardTitle>
                            <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === method.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                                                } ${!method.available ? "opacity-50 cursor-not-allowed" : ""}`}
                                            onClick={() => method.available && setSelectedMethod(method.id)}
                                        >
                                            <RadioGroupItem value={method.id} id={method.id} disabled={!method.available} />
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted">
                                                    {method.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{method.name}</span>
                                                        {method.fees > 0 && (
                                                            <span className="text-xs text-muted-foreground">+{method.fees}% frais</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">{method.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {message && (
                        <Alert className={message.type === "error" ? "border-destructive" : "border-accent"}>
                            {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                Résumé de la transaction
                            </CardTitle>
                            <CardDescription>Vérifiez les détails avant de confirmer</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {numericAmount > 0 && selectedPaymentMethod ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Montant à ajouter:</span>
                                            <span>${numericAmount.toFixed(2)}</span>
                                        </div>

                                        {fees > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span>Frais ({selectedPaymentMethod.fees}%):</span>
                                                <span>${fees.toFixed(2)}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-sm">
                                            <span>Méthode de paiement:</span>
                                            <span>{selectedPaymentMethod.name}</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-2">
                                        <div className="flex justify-between font-medium">
                                            <span>Total à payer:</span>
                                            <span>${totalAmount.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>Nouveau solde:</span>
                                            <span>${(currentBalance + numericAmount).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleAddFunds}
                                        disabled={isProcessing}
                                        className="w-full bg-accent hover:bg-accent/90"
                                    >
                                        {isProcessing ? (
                                            "Traitement en cours..."
                                        ) : (
                                            <>
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Ajouter les fonds
                                            </>
                                        )}
                                    </Button>
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-8">
                                    <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                    <p>Saisissez un montant et sélectionnez une méthode de paiement</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Informations importantes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p>Les fonds ajoutés sont immédiatement disponibles sur votre compte.</p>
                            </div>

                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p>Les paiements par eFeza et Flutter Wave peuvent prendre quelques minutes à être traités.</p>
                            </div>

                            <div className="flex items-start gap-2">
                                <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p>Vous recevrez un email de confirmation une fois le paiement effectué.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
