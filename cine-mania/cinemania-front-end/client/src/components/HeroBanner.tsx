/* CineMania - HeroBanner Component */
/* Design: Luxo Cinematográfico - Banner hero com destaque cinematográfico */

import { Link } from 'wouter';
import { Play, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types';

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <div className="relative w-full h-96 md:h-screen overflow-hidden">
      {/* Background Banner */}
      <img
        src={movie.banner}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {movie.title}
          </h1>

          {/* Rating and Info */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-lg">
              <span className="text-primary text-2xl">⭐</span>
              <span className="text-foreground font-bold text-lg">{movie.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted text-sm">{movie.duration} min</span>
            <span className="text-muted text-sm">{movie.genre.join(', ')}</span>
            <span className="text-muted text-sm">Classificação: {movie.classification}</span>
          </div>

          {/* Synopsis */}
          <p className="text-muted text-lg mb-8 max-w-xl line-clamp-3">
            {movie.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Ver Trailer
            </Button>
            <Link href={`/booking/${movie.id}`}>
              <a>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
                >
                  <Ticket className="w-5 h-5" />
                  Reservar Ingressos
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
