/* CineMania - MovieCard Component */
/* Design: Luxo Cinematográfico - Card elegante com efeito spotlight e glow */

import { Link } from 'wouter';
import { Star, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <a className="group">
        <div className="rounded-lg overflow-hidden bg-card hover:shadow-2xl transition-smooth duration-300 cursor-pointer h-full flex flex-col">
          {/* Poster Image */}
          <div className="relative overflow-hidden h-64 md:h-72 bg-secondary">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth duration-300"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth duration-300"></div>

            {/* Badge */}
            <div className="absolute top-3 right-3">
              {movie.inTheaters && (
                <span className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Em Cartaz
                </span>
              )}
              {movie.upcomingRelease && (
                <span className="inline-block bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Estreia
                </span>
              )}
            </div>

            {/* Rating Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/80 backdrop-blur px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground font-bold text-sm">{movie.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-foreground font-bold text-lg line-clamp-2 mb-2">
                {movie.title}
              </h3>
              <p className="text-muted text-xs mb-3">
                {movie.genre.join(', ')}
              </p>
              <p className="text-muted text-xs line-clamp-2">
                {movie.synopsis}
              </p>
            </div>

            {/* Button */}
            <Button
              className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Ticket className="w-4 h-4" />
              Reservar
            </Button>
          </div>
        </div>
      </a>
    </Link>
  );
}
