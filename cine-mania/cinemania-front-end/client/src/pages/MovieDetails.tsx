/* CineMania - MovieDetails Page - Integrado com API Gateway */

import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Clock, Users, Calendar, Play } from 'lucide-react';
import { movieService } from '@/services/api';
import type { Movie } from '@/types';

export default function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await movieService.getById(params.id || '1');
        setMovie(response.data);
      } catch (err) {
        console.error('Erro ao buscar filme:', err);
        setError('Filme não encontrado');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMovie();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted">Carregando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">{error || 'Filme não encontrado'}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="container">
          {/* Banner */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-12">
            <img
              src={movie.banner}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="p-6 bg-card border border-border sticky top-20">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full rounded-lg mb-6"
                />
                <Button
                  onClick={() => alert('Redirecionando para reserva de ingressos...')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3"
                >
                  Reservar Ingressos
                </Button>
                <Button
                  onClick={() => setShowTrailer(true)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Ver Trailer
                </Button>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Title and Rating */}
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-foreground mb-3">{movie.title}</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-lg">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-foreground font-bold">{(movie.rating || 0).toFixed(1)}</span>
                  </div>
                  <span className="text-muted">{movie.classification}</span>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted text-sm">Duração</span>
                  </div>
                  <p className="text-foreground font-bold">{movie.duration} minutos</p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-muted text-sm">Lançamento</span>
                  </div>
                  <p className="text-foreground font-bold">
                    {new Date(movie.releaseDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary text-sm">🎬</span>
                    <span className="text-muted text-sm">Diretor</span>
                  </div>
                  <p className="text-foreground font-bold">{movie.director}</p>
                </div>

                <div className="p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted text-sm">Gênero</span>
                  </div>
                  <p className="text-foreground font-bold">{movie.genre.join(', ')}</p>
                </div>
              </div>

              {/* Synopsis */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Sinopse</h2>
                <p className="text-muted leading-relaxed">{movie.synopsis}</p>
              </div>

              {/* Cast */}
              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Elenco</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {movie.cast.map((actor, i) => (
                      <div key={i} className="p-4 bg-secondary rounded-lg">
                        <p className="text-foreground font-bold">{actor}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-4xl">
            <iframe
              width="100%"
              height="600"
              src={movie.trailer}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="mt-4 w-full px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
