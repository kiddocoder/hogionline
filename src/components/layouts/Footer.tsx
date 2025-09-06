import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const links = {
        services: [
            { name: "Hébergement Web", href: "#hebergement" },
            { name: "Noms de domaine", href: "#domaines" },
            { name: "Certificats SSL", href: "#ssl" },
            { name: "Support technique", href: "#support" }
        ],
        company: [
            { name: "À propos", href: "#apropos" },
            { name: "Notre équipe", href: "#equipe" },
            { name: "Carrières", href: "#carrieres" },
            { name: "Blog", href: "#blog" }
        ],
        support: [
            { name: "Centre d'aide", href: "#aide" },
            { name: "Documentation", href: "#docs" },
            { name: "Status serveurs", href: "#status" },
            { name: "Nous contacter", href: "#contact" }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Instagram, href: "#", label: "Instagram" }
    ];

    return (
        <footer className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Hogi Online</h3>
                                <p className="text-sm text-white/80">Depuis 2015</p>
                            </div>
                        </div>

                        <p className="text-white/80 leading-relaxed">
                            Votre partenaire de confiance pour l'hébergement web au Burundi.
                            Nous connectons vos idées au monde digital avec performance et fiabilité.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-white/80">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                <span>contact@hogionline.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-white/80">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                <span>+257 XX XXX XXX</span>
                            </div>
                            <div className="flex items-center space-x-3 text-white/80">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>Bujumbura, Burundi</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Services</h4>
                        <ul className="space-y-3">
                            {links.services.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Entreprise</h4>
                        <ul className="space-y-3">
                            {links.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Support</h4>
                        <ul className="space-y-3">
                            {links.support.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="bg-white/10 rounded-2xl p-6 mb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="text-xl font-semibold mb-2">Restez informé</h4>
                            <p className="text-white/80">
                                Recevez nos dernières actualités et offres spéciales
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/50 flex-1"
                            />
                            <button className="px-6 py-3 bg-accent-orange hover:bg-accent-orange-light rounded-lg font-medium transition-colors whitespace-nowrap">
                                S'inscrire
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Copyright */}
                        <p className="text-white/80 text-center md:text-left">
                            © {currentYear} Hogi Online. Tous droits réservés.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex items-center space-x-6 text-white/80 text-sm">
                            <a href="#privacy" className="hover:text-white transition-colors">
                                Politique de confidentialité
                            </a>
                            <a href="#terms" className="hover:text-white transition-colors">
                                Conditions d'utilisation
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;