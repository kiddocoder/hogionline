import { Target, Heart, Code, Lightbulb } from "lucide-react";

const AboutSection = () => {
    const values = [
        {
            icon: Target,
            title: "Performance",
            description: "Nous optimisons chaque aspect de nos services pour vous offrir les meilleures performances."
        },
        {
            icon: Heart,
            title: "Passion",
            description: "Notre équipe est passionnée par l'informatique et dédiée à votre réussite en ligne."
        },
        {
            icon: Code,
            title: "Expertise",
            description: "Développeurs expérimentés, nous comprenons les besoins techniques de nos clients."
        },
        {
            icon: Lightbulb,
            title: "Innovation",
            description: "Nous adoptons les dernières technologies pour rester à la pointe du secteur."
        }
    ];

    return (
        <section id="apropos" className="py-20 bg-gradient-subtle">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <Heart className="w-4 h-4" />
                                <span>Depuis 2015</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                <span className="text-foreground">Nous parions sur</span>
                                <br />
                                <span className="text-gradient">votre réussite</span>
                            </h2>

                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    <strong className="text-foreground">Nous vous garantissons 99.9% de temps de disponibilité</strong>
                                    de vos projets. Cette promesse n'est pas juste un chiffre, c'est notre engagement envers votre succès.
                                </p>

                                <p>
                                    Nous sommes des <strong className="text-foreground">professionnels passionnés par l'informatique</strong>.
                                    En tant que développeurs, nous avons nous-mêmes consommé des ressources machines et connaissons
                                    toutes les frustrations du secteur.
                                </p>

                                <p>
                                    Nous sommes déterminés à changer la face de l'hébergement web en offrant des services orientés
                                    <strong className="text-foreground"> aide, performances et budget</strong>.
                                    Notre mission ? Connecter des vies et favoriser le déploiement des services en ligne.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="btn-hero">
                                Voir nos offres d'hébergement
                            </button>
                            <button className="btn-outline">
                                Nous contacter
                            </button>
                        </div>
                    </div>

                    {/* Stats & Image */}
                    <div className="relative">
                        <div className="bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-soft)]">
                            <div className="grid grid-cols-2 gap-8">
                                {[
                                    { number: "9+", label: "Années d'expérience", suffix: "ans" },
                                    { number: "99.9%", label: "Disponibilité garantie", suffix: "" },
                                    { number: "1000+", label: "Sites hébergés", suffix: "sites" },
                                    { number: "24/7", label: "Support technique", suffix: "" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-gradient mb-2">
                                            {stat.number}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                        Nos valeurs fondamentales
                    </h3>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Ce qui nous guide dans notre mission de vous offrir les meilleurs services d'hébergement.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="card-modern text-center group hover:scale-105"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-gradient-primary transition-[var(--transition-smooth)]">
                                <value.icon className="w-8 h-8 text-primary group-hover:text-white transition-[var(--transition-smooth)]" />
                            </div>

                            <h4 className="text-xl font-bold text-foreground mb-4">{value.title}</h4>
                            <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;