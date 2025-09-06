"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Globe, Server, CreditCard, HelpCircle, User, Settings, ChevronLeft, ChevronRight } from "lucide-react"

const navigation = [
    {
        name: "Tableau de bord",
        href: "/hpanel",
        icon: Home,
    },
    {
        name: "Domaines",
        href: "/hpanel/domains",
        icon: Globe,
        children: [
            { name: "Mes domaines", href: "/hpanel/domains" },
            { name: "Renouveler", href: "/hpanel/domains/renew" },
            { name: "Transférer", href: "/hpanel/domains/transfer" },
            { name: "Enregistrer", href: "/hpanel/domains/register" },
        ],
    },
    {
        name: "Hébergement",
        href: "/hpanel/hosting",
        icon: Server,
        children: [
            { name: "Mes services", href: "/hpanel/hosting" },
            { name: "Renouveler", href: "/hpanel/hosting/renew" },
            { name: "Commander", href: "/hpanel/hosting/order" },
        ],
    },
    {
        name: "Facturation",
        href: "/hpanel/billing",
        icon: CreditCard,
        children: [
            { name: "Mes factures", href: "/hpanel/billing" },
            { name: "Ajouter des fonds", href: "/hpanel/billing/add-funds" },
            { name: "Historique", href: "/hpanel/billing/history" }
        ],
    },
    {
        name: "Support",
        href: "/hpanel/support",
        icon: HelpCircle,
        children: [
            { name: "Mes tickets", href: "/hpanel/support" },
            { name: "Nouveau ticket", href: "/hpanel/support/new" },
        ],
    },
    {
        name: "Compte",
        href: "/hpanel/account",
        icon: User,
        children: [
            { name: "Informations", href: "/hpanel/account" },
            { name: "Contacts", href: "/hpanel/account/contacts" },
            { name: "Historique email", href: "/hpanel/account/email-history" },
            { name: "Mot de passe", href: "/hpanel/account/password" },
            { name: "Sécurité", href: "/hpanel/account/security" },
        ],
    },
]

interface SidebarProps {
    className?: string
}

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const [expandedItems, setExpandedItems] = useState<string[]>([])

    const toggleExpanded = (name: string) => {
        setExpandedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
    }

    return (
        <div
            className={cn(
                "fixed left-0  h-screen overflow-y-auto flex-col border-r bg-sidebar transition-all duration-300",
                collapsed ? "w-16" : "w-64",
                className,
            )}
        >
            {/* Header */}
            <div className="fixed flex h-16 items-center justify-between px-4 border-b">
                {!collapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">H</span>
                        </div>
                        <span className="font-semibold text-sidebar-foreground">Hogi Panel</span>
                    </div>
                )}
                <Button variant="ghost" size="sm" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8 p-0">
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </Button>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 px-3 py-4">
                <nav className="space-y-2">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                        const isExpanded = expandedItems.includes(item.name)
                        const hasChildren = item.children && item.children.length > 0

                        return (
                            <div key={item.name}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start h-10",
                                        collapsed && "justify-center px-2",
                                        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                                    )}
                                    asChild={!hasChildren}
                                    onClick={hasChildren ? () => toggleExpanded(item.name) : undefined}
                                >
                                    {hasChildren ? (
                                        <div className="flex items-center w-full">
                                            <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                                            {!collapsed && (
                                                <>
                                                    <span className="flex-1 text-left">{item.name}</span>
                                                    <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <Link href={item.href} className="flex items-center w-full">
                                            <item.icon className={cn("h-4 w-4", !collapsed && "mr-3")} />
                                            {!collapsed && <span>{item.name}</span>}
                                        </Link>
                                    )}
                                </Button>

                                {/* Submenu */}
                                {hasChildren && isExpanded && !collapsed && (
                                    <div className="ml-4 mt-2 space-y-1">
                                        {item.children?.map((child) => {
                                            const isChildActive = pathname === child.href
                                            return (
                                                <Button
                                                    key={child.href}
                                                    variant={isChildActive ? "secondary" : "ghost"}
                                                    size="sm"
                                                    className={cn(
                                                        "w-full justify-start h-8 text-sm",
                                                        isChildActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                                                    )}
                                                    asChild
                                                >
                                                    <Link href={child.href}>{child.name}</Link>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </nav>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t p-4">
                <Button variant="ghost" className={cn("w-full justify-start h-10", collapsed && "justify-center px-2")}>
                    <Settings className={cn("h-4 w-4", !collapsed && "mr-3")} />
                    {!collapsed && <span>Paramètres</span>}
                </Button>
            </div>
        </div>
    )
}
