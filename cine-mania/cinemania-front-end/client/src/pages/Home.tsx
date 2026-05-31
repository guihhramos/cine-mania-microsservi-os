/* CineMania - Home Page - Integrado com API Gateway */

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { movieService } from '@/services/api';
import type { Movie } from '@/types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieService.getAll({ inTheaters: true });
        setMovies(response.data);
      } catch (err) {
        console.error('Erro ao buscar filmes:', err);
        setError('Erro ao carregar filmes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email ${email} inscrito na newsletter!`);
    setEmail('');
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive text-lg mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Banner */}
      {movies.length > 0 && <HeroBanner movie={movies[0]} />}

      {/* Main Content */}
      <main className="flex-1">
        {/* Em Cartaz Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Filmes em Cartaz
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <p className="text-muted">Carregando filmes...</p>
              </div>
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted">Nenhum filme disponível no momento</p>
              </div>
            )}
          </div>
        </section>

        {/* Categorias Section */}
        <section className="py-16 md:py-20 bg-secondary">
          <div className="container">
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Explore por Categoria
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance', 'Animação', 'Documentário'].map(
                genre => (
                  <button
                    key={genre}
                    className="p-6 bg-card rounded-lg hover:bg-primary/20 transition-smooth border border-border hover:border-primary"
                  >
                    <span className="text-foreground font-bold">{genre}</span>
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 md:py-20">
          <div className="container max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Fique por Dentro
              </h2>
              <p className="text-muted text-lg">
                Receba notificações sobre novos filmes, promoções e eventos especiais.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Inscrever</span>
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
