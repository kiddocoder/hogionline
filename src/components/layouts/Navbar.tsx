"use client";

import { useEffect, useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/cropped-cropped-logo_hogi_online_0001.png"
import Image from "next/image";
import { redirect } from "next/navigation";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navItems = [
        { name: "Accueil", href: "#accueil" },
        { name: "Domaines", href: "#domaines" },
        { name: "Hébergement", href: "#hebergement" },
        { name: "À propos", href: "#apropos" },
        { name: "Contact", href: "#contact" },
    ];

    // check if user is scrolling and set the state to true
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    })

    return (
        <header className={`sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md ${isScrolled ? "border-b" : "shadow-none"} border-border`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={300}
                            height={150}
                            className="w-32 h-auto"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-foreground hover:text-primary transition-colors font-medium"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">SSL Gratuit</span>
                        <Button onClick={() => redirect("/hpanel/")} className="btn-hero">Mon Compte</Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden border-t border-border bg-background">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-border">
                                <Button onClick={() => redirect("/hpanel/")} className="btn-hero w-full">Mon Compte</Button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;