"use client";

import { useState } from "react";
import { Search, Shield, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroServers from "@/assets/clou_server_processing.png";
import Image from "next/image";

const HeroSection = () => {
    const [domain, setDomain] = useState("");

    const handleSearch = () => {
        if (domain.trim()) {
            // Domain search logic would go here
            console.log("Searching for domain:", domain);
        }
    };

    const features = [
        { icon: Shield, label: "SSL Gratuit", desc: "Sécurité incluse" },
        { icon: Zap, label: "Performance", desc: "Vitesse optimisée" },
        { icon: Clock, label: "99.9% Uptime", desc: "Disponibilité garantie" }
    ];

    return (
        <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-subtle overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent-orange/20"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                            <Shield className="w-4 h-4" />
                            <span>Certificat SSL GRATUIT</span>
                        </div>

                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                <span className="text-gradient">Une Plateforme Unique.</span>
                                <br />
                                <span className="text-foreground">Des options d'hébergement</span>
                                <br />
                                <span className="text-foreground">multiples.</span>
                            </h1>

                            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                                Nous sommes plus qu'une société d'hébergement. Obtenez tout un ensemble
                                d'outils d'exception pour les professionnels du web et pour les entreprises
                                de toutes tailles.
                            </p>
                        </div>

                        {/* Domain Search */}
                        <div className="bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-soft)]">
                            <h3 className="text-lg font-semibold mb-4">Trouvez votre nom de domaine</h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Input
                                        type="text"
                                        placeholder="Tapez votre domaine ici"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        className="pl-4 pr-12 py-3 text-lg border-2 border-input focus:border-primary rounded-xl"
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    className="btn-hero whitespace-nowrap px-8"
                                >
                                    Rechercher
                                </Button>
                            </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <feature.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{feature.label}</p>
                                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative lg:pl-8">
                        <div className="relative animate-float">
                            <Image
                                src={heroServers}
                                alt="Infrastructure serveurs modernes Hogi Online"
                                className="w-full rounded-3xl shadow-[var(--shadow-strong)] animate-glow"
                                width={1000}
                                height={1000}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-3xl"></div>
                        </div>

                        {/* Floating stats */}
                        <div className="absolute -top-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-medium)] animate-fade-in-up">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-green-600">99.9%</p>
                                    <p className="text-xs text-muted-foreground">Uptime</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-[var(--shadow-medium)] animate-fade-in-up">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-accent-orange" />
                                </div>
                                <div>
                                    <p className="font-bold text-accent-orange">Depuis</p>
                                    <p className="text-xs text-muted-foreground">2015</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;