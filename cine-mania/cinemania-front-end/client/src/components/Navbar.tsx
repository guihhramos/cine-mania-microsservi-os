/* CineMania - Navbar Component */
/* Design: Luxo Cinematográfico - Barra de navegação elegante com logo e menu */

import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🎬</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">CineMania</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/movies">
            <a className="text-foreground hover:text-primary transition-smooth">Filmes</a>
          </Link>
          <Link href="/sessions">
            <a className="text-foreground hover:text-primary transition-smooth">Sessões</a>
          </Link>
          <Link href="/about">
            <a className="text-foreground hover:text-primary transition-smooth">Sobre</a>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex hover:bg-secondary"
          >
            <Search className="w-5 h-5 text-foreground" />
          </Button>

          {/* Auth Section */}
          {isAuthenticated() ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link href="/profile">
                <a className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-smooth">
                  <User className="w-5 h-5 text-foreground" />
                  <span className="text-foreground text-sm">{user?.name}</span>
                </a>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <a>
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </a>
              </Link>
              <Link href="/register">
                <a>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Cadastro
                  </Button>
                </a>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-smooth"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="/movies">
              <a className="text-foreground hover:text-primary transition-smooth py-2">
                Filmes
              </a>
            </Link>
            <Link href="/sessions">
              <a className="text-foreground hover:text-primary transition-smooth py-2">
                Sessões
              </a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-primary transition-smooth py-2">
                Sobre
              </a>
            </Link>

            <div className="border-t border-border pt-4">
              {isAuthenticated() ? (
                <div className="flex flex-col gap-2">
                  <Link href="/profile">
                    <a className="text-foreground hover:text-primary transition-smooth py-2">
                      Meu Perfil
                    </a>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link href="/login">
                    <a>
                      <Button variant="ghost" className="w-full justify-start">
                        Entrar
                      </Button>
                    </a>
                  </Link>
                  <Link href="/register">
                    <a>
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Cadastro
                      </Button>
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
