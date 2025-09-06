import { Check, Star, Zap, Shield, HardDrive, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HostingPlans = () => {
    const plans = [
        {
            name: "Starter",
            price: "25.000",
            period: "/mois",
            description: "Parfait pour débuter",
            popular: false,
            icon: Users,
            features: [
                "1 Site Web",
                "10 GB Espace disque",
                "100 GB Bande passante",
                "5 Comptes email",
                "SSL gratuit",
                "Support 24/7"
            ]
        },
        {
            name: "Business",
            price: "50.000",
            period: "/mois",
            description: "Pour les entreprises en croissance",
            popular: true,
            icon: Zap,
            features: [
                "Sites illimités",
                "50 GB Espace disque",
                "Bande passante illimitée",
                "Comptes email illimités",
                "SSL gratuit",
                "Support prioritaire",
                "Sauvegarde automatique",
                "CDN gratuit"
            ]
        },
        {
            name: "Premium",
            price: "100.000",
            period: "/mois",
            description: "Performance maximale",
            popular: false,
            icon: Shield,
            features: [
                "Sites illimités",
                "100 GB Espace disque",
                "Bande passante illimitée",
                "Comptes email illimités",
                "SSL gratuit",
                "Support dédié",
                "Sauvegarde quotidienne",
                "CDN premium",
                "Staging environment",
                "Performance optimisée"
            ]
        }
    ];

    return (
        <section id="hebergement" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <HardDrive className="w-4 h-4" />
                        <span>Plans d'hébergement</span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient">Choisissez votre</span>
                        <br />
                        <span className="text-foreground">plan d'hébergement</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Des solutions d'hébergement adaptées à tous vos besoins, de la startup
                        à l'entreprise établie. Performance et fiabilité garanties.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`card-pricing group ${plan.popular ? 'ring-2 ring-primary scale-105' : ''}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                                        <Star className="w-3 h-3" />
                                        <span>Plus populaire</span>
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="text-center mb-6">
                                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-gradient-primary' : 'bg-primary/10'
                                    }`}>
                                    <plan.icon className={`w-8 h-8 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                <p className="text-muted-foreground">{plan.description}</p>
                            </div>

                            {/* Pricing */}
                            <div className="text-center mb-8">
                                <div className="flex items-baseline justify-center space-x-1">
                                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                                    <span className="text-lg text-muted-foreground">FBU</span>
                                </div>
                                <p className="text-muted-foreground">{plan.period}</p>
                            </div>

                            {/* Features */}
                            <div className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center space-x-3">
                                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Button
                                className={`w-full ${plan.popular ? 'btn-hero' : 'btn-outline'}`}
                            >
                                {plan.popular ? 'Commencer maintenant' : 'Choisir ce plan'}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Guarantee */}
                <div className="text-center">
                    <div className="inline-flex items-center space-x-3 bg-green-50 text-green-800 px-6 py-3 rounded-full">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Garantie de remboursement 30 jours</span>
                    </div>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Essayez nos services sans risque. Si vous n'êtes pas satisfait dans les 30 premiers jours,
                        nous vous remboursons intégralement.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HostingPlans;