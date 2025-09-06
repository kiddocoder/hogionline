import { CheckCircle } from "lucide-react";

const DomainPricing = () => {
    const domains = [
        { extension: ".bi", price: "60.000", color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
        { extension: ".com", price: "107.380", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
        { extension: ".net", price: "107.380", color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
        { extension: ".org", price: "107.380", color: "text-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
        { extension: ".info", price: "94.000", color: "text-cyan-600", bgColor: "bg-cyan-50", borderColor: "border-cyan-200" },
        { extension: ".biz", price: "170.000", color: "text-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
        { extension: ".app", price: "75.000", color: "text-emerald-600", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" }
    ];

    return (
        <section id="domaines" className="py-20 bg-gradient-subtle">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient">Extensions de domaines</span>
                        <br />
                        <span className="text-foreground">disponibles</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Choisissez parmi nos extensions de domaines populaires avec des prix compétitifs
                        et un service client exceptionnel.
                    </p>
                </div>

                {/* Domain Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-12">
                    {domains.map((domain, index) => (
                        <div
                            key={domain.extension}
                            className={`card-modern group cursor-pointer hover:scale-105 ${domain.bgColor} ${domain.borderColor} border-2`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-center">
                                <div className={`text-3xl font-bold mb-2 ${domain.color}`}>
                                    {domain.extension}
                                </div>
                                <div className="text-2xl font-bold text-foreground mb-1">
                                    {domain.price}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    FBU/an
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Features */}
                <div className="bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-soft)]">
                    <h3 className="text-2xl font-bold text-center mb-8">
                        Inclus avec tous les domaines
                    </h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            "Protection de la vie privée WHOIS",
                            "DNS management gratuit",
                            "Transfert de domaine gratuit",
                            "Support technique 24/7"
                        ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-foreground font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <p className="text-lg text-muted-foreground mb-6">
                        Prêt à réserver votre domaine ?
                    </p>
                    <button className="btn-hero">
                        Rechercher maintenant
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DomainPricing;