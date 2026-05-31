/* CineMania - Footer Component */
/* Design: Luxo Cinematográfico - Rodapé elegante com links e informações */

import { Link } from 'wouter';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">🎬</span>
              </div>
              <span className="text-xl font-bold text-foreground">CineMania</span>
            </div>
            <p className="text-muted text-sm">
              Descubra, reserve e desfrute dos melhores filmes em cartaz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/movies">
                  <a className="text-muted hover:text-primary transition-smooth text-sm">
                    Filmes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/sessions">
                  <a className="text-muted hover:text-primary transition-smooth text-sm">
                    Sessões
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/my-tickets">
                  <a className="text-muted hover:text-primary transition-smooth text-sm">
                    Meus Ingressos
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-muted hover:text-primary transition-smooth text-sm">
                    Sobre
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted hover:text-primary transition-smooth text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-smooth text-sm">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-smooth text-sm">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-muted hover:text-primary transition-smooth text-sm">
                  Termos de Serviço
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@cinemania.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 3000-0000</span>
              </li>
              <li className="flex items-center gap-2 text-muted text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>São Paulo, SP</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {currentYear} CineMania. Todos os direitos reservados.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-primary/10 transition-smooth"
            >
              <Facebook className="w-5 h-5 text-muted hover:text-primary" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-primary/10 transition-smooth"
            >
              <Twitter className="w-5 h-5 text-muted hover:text-primary" />
            </a>
            <a
              href="#"
              className="p-2 rounded-lg hover:bg-primary/10 transition-smooth"
            >
              <Instagram className="w-5 h-5 text-muted hover:text-primary" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
