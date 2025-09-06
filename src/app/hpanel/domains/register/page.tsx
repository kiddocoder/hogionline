"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Globe, ShoppingCart, Check, X, AlertCircle, Plus } from "lucide-react"
import { toast } from "sonner"

interface DomainResult {
    name: string
    tld: string
    available: boolean
    price: number
    premium: boolean
    selected: boolean
}

interface CartItem extends DomainResult {
    registrationPeriod: number
    whoisPrivacy: boolean
}

export default function RegisterDomainsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState<DomainResult[]>([])
    const [cart, setCart] = useState<CartItem[]>([])

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            toast("Nom de domaine requis",
                {
                    description: "Veuillez saisir un nom de domaine à rechercher.",
                    id: "destructive",
                })
            return
        }

        setIsSearching(true)

        // Simulate search
        setTimeout(() => {
            const baseName = searchTerm.replace(/\.(com|org|net|bi|info)$/i, "")
            const results: DomainResult[] = [
                { name: `${baseName}.com`, tld: ".com", available: true, price: 15.99, premium: false, selected: false },
                { name: `${baseName}.org`, tld: ".org", available: false, price: 18.5, premium: false, selected: false },
                { name: `${baseName}.net`, tld: ".net", available: true, price: 16.99, premium: false, selected: false },
                { name: `${baseName}.bi`, tld: ".bi", available: true, price: 25.0, premium: false, selected: false },
                { name: `${baseName}.info`, tld: ".info", available: true, price: 12.99, premium: false, selected: false },
                { name: `${baseName}pro.com`, tld: ".com", available: true, price: 15.99, premium: false, selected: false },
                { name: `get${baseName}.com`, tld: ".com", available: true, price: 15.99, premium: false, selected: false },
                { name: `${baseName}online.com`, tld: ".com", available: true, price: 15.99, premium: false, selected: false },
            ]
            setSearchResults(results)
            setIsSearching(false)
        }, 1500)
    }

    const handleAddToCart = (domain: DomainResult) => {
        if (!domain.available) return

        const cartItem: CartItem = {
            ...domain,
            registrationPeriod: 1,
            whoisPrivacy: false,
            selected: true,
        }

        setCart((prev) => [...prev, cartItem])
        toast("Ajouté au panier",
            {
                description: `${domain.name} a été ajouté à votre panier.`,
            })
    }

    const handleRemoveFromCart = (domainName: string) => {
        setCart((prev) => prev.filter((item) => item.name !== domainName))
        toast("Retiré du panier",
            {
                description: "Le domaine a été retiré de votre panier.",
            })
    }

    const handleUpdateCartItem = (domainName: string, field: keyof CartItem, value: any) => {
        setCart((prev) => prev.map((item) => (item.name === domainName ? { ...item, [field]: value } : item)))
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const domainCost = item.price * item.registrationPeriod
            const privacyCost = item.whoisPrivacy ? 9.99 * item.registrationPeriod : 0
            return total + domainCost + privacyCost
        }, 0)
    }

    const handleCheckout = () => {
        if (cart.length === 0) {
            toast("Panier vide",
                {
                    description: "Ajoutez des domaines à votre panier avant de procéder au paiement.",
                    id: "destructive",
                })
            return
        }

        toast("Redirection vers le paiement",
            {
                description: `${cart.length} domaine(s) - Total: $${calculateTotal().toFixed(2)}`,
            })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Enregistrer un domaine</h1>
                    <p className="text-muted-foreground">Trouvez et enregistrez le nom de domaine parfait pour votre projet</p>
                </div>
                {cart.length > 0 && (
                    <Button className="bg-primary hover:bg-primary/90">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Panier ({cart.length})
                    </Button>
                )}
            </div>

            {/* Domain Search */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Search className="mr-2 h-5 w-5" />
                        Recherche de domaine
                    </CardTitle>
                    <CardDescription>Saisissez le nom de domaine souhaité pour vérifier sa disponibilité</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="exemple.com"
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            />
                        </div>
                        <Button onClick={handleSearch} disabled={isSearching}>
                            {isSearching ? "Recherche..." : "Vérifier la disponibilité"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Résultats de la recherche</CardTitle>
                        <CardDescription>Domaines disponibles et suggestions alternatives</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nom de domaine</TableHead>
                                    <TableHead>Disponibilité</TableHead>
                                    <TableHead>Prix/an</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {searchResults.map((domain) => (
                                    <TableRow key={domain.name}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center">
                                                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                                {domain.name}
                                                {domain.premium && (
                                                    <Badge variant="secondary" className="ml-2">
                                                        Premium
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {domain.available ? (
                                                <Badge variant="default" className="bg-secondary">
                                                    <Check className="mr-1 h-3 w-3" />
                                                    Disponible
                                                </Badge>
                                            ) : (
                                                <Badge variant="destructive">
                                                    <X className="mr-1 h-3 w-3" />
                                                    Indisponible
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-medium">${domain.price}</span>
                                            <span className="text-muted-foreground">/an</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {domain.available ? (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleAddToCart(domain)}
                                                    disabled={cart.some((item) => item.name === domain.name)}
                                                >
                                                    {cart.some((item) => item.name === domain.name) ? (
                                                        "Ajouté"
                                                    ) : (
                                                        <>
                                                            <Plus className="mr-1 h-3 w-3" />
                                                            Ajouter
                                                        </>
                                                    )}
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" disabled>
                                                    Indisponible
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* Shopping Cart */}
            {cart.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Panier ({cart.length} domaine{cart.length > 1 ? "s" : ""})
                        </CardTitle>
                        <CardDescription>Configurez vos domaines avant l'enregistrement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.name} className="p-4 border rounded-lg space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => handleRemoveFromCart(item.name)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Durée d&apos;enregistrement</label>
                                        <Select
                                            value={item.registrationPeriod.toString()}
                                            onValueChange={(value) =>
                                                handleUpdateCartItem(item.name, "registrationPeriod", Number.parseInt(value))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1 an - ${item.price}</SelectItem>
                                                <SelectItem value="2">2 ans - ${(item.price * 2).toFixed(2)}</SelectItem>
                                                <SelectItem value="3">3 ans - ${(item.price * 3).toFixed(2)}</SelectItem>
                                                <SelectItem value="5">5 ans - ${(item.price * 5).toFixed(2)}</SelectItem>
                                                <SelectItem value="10">10 ans - ${(item.price * 10).toFixed(2)}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Protection WHOIS</label>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={item.whoisPrivacy}
                                                onCheckedChange={(checked) => handleUpdateCartItem(item.name, "whoisPrivacy", checked)}
                                            />
                                            <span className="text-sm">+$9.99/an</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Total</label>
                                        <div className="text-lg font-semibold">
                                            $
                                            {(
                                                item.price * item.registrationPeriod +
                                                (item.whoisPrivacy ? 9.99 * item.registrationPeriod : 0)
                                            ).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4">
                            <div className="flex items-center justify-between text-lg font-semibold">
                                <span>Total à payer:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Les domaines .bi nécessitent un délai d&apos;activation de 30 minutes après l&apos;enregistrement. Vous recevrez
                                une confirmation par email une fois l&apos;activation terminée.
                            </AlertDescription>
                        </Alert>

                        <div className="flex space-x-2">
                            <Button onClick={handleCheckout} className="flex-1 bg-primary hover:bg-primary/90">
                                Procéder au paiement (${calculateTotal().toFixed(2)})
                            </Button>
                            <Button variant="outline" onClick={() => setCart([])}>
                                Vider le panier
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Domain Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Informations sur l&apos;enregistrement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                        <p>
                            • <strong>Activation immédiate:</strong> La plupart des domaines sont activés instantanément
                        </p>
                        <p>
                            • <strong>Domaines .bi:</strong> Délai d&apos;activation de 30 minutes requis
                        </p>
                        <p>
                            • <strong>Protection WHOIS:</strong> Masque vos informations personnelles dans la base WHOIS
                        </p>
                        <p>
                            • <strong>Renouvellement:</strong> Configurez le renouvellement automatique dans les paramètres
                        </p>
                        <p>
                            • <strong>DNS gratuit:</strong> Serveurs DNS inclus avec chaque enregistrement
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
