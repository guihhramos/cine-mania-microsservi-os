/* CineMania - Movies Page - Integrado com API Gateway */

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { movieService } from '@/services/api';
import type { Movie } from '@/types';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await movieService.getAll();
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (err) {
        console.error('Erro ao buscar filmes:', err);
        setError('Erro ao carregar filmes');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let filtered = movies
      .filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(m => !selectedGenre || m.genre.includes(selectedGenre));

    if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(filtered);
  }, [searchTerm, selectedGenre, sortBy, movies]);

  const genres = ['Ação', 'Comédia', 'Drama', 'Ficção Científica', 'Terror', 'Romance'];

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-destructive">{error}</p>
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
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Catálogo de Filmes</h1>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <Input
                type="text"
                placeholder="Pesquisar filme..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre Filter */}
              <div>
                <label className="block text-foreground text-sm font-bold mb-3 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Gênero
                </label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setSelectedGenre('')}
                    variant={selectedGenre === '' ? 'default' : 'outline'}
                    className={selectedGenre === '' ? 'bg-primary' : 'border-border'}
                  >
                    Todos
                  </Button>
                  {genres.map(genre => (
                    <Button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      variant={selectedGenre === genre ? 'default' : 'outline'}
                      className={selectedGenre === genre ? 'bg-primary' : 'border-border'}
                    >
                      {genre}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-foreground text-sm font-bold mb-3">Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                >
                  <option value="popularity">Popularidade</option>
                  <option value="rating">Avaliação</option>
                  <option value="title">Título</option>
                </select>
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-muted">Carregando filmes...</p>
            </div>
          ) : filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted text-lg">Nenhum filme encontrado</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
