/* CineMania - SeatMap Component */
/* Design: Luxo Cinematográfico - Mapa de assentos interativo */

import { useState } from 'react';
import type { Seat } from '@/types';

interface SeatMapProps {
  seats: Seat[][];
  onSeatsSelect: (seats: Seat[]) => void;
  selectedSeats?: Seat[];
}

export default function SeatMap({ seats, onSeatsSelect, selectedSeats = [] }: SeatMapProps) {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isOccupied) return;

    const isSelected = selectedSeats.some(s => s.id === seat.id);
    const newSelection = isSelected
      ? selectedSeats.filter(s => s.id !== seat.id)
      : [...selectedSeats, seat];

    onSeatsSelect(newSelection);
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.some(s => s.id === seat.id)) {
      return 'bg-primary';
    }
    if (seat.isOccupied) {
      return 'bg-destructive';
    }
    if (hoveredSeat === seat.id) {
      return 'bg-primary/70';
    }
    return 'bg-muted';
  };

  return (
    <div className="w-full">
      {/* Screen */}
      <div className="text-center mb-8">
        <div className="inline-block w-full max-w-md h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mb-4"></div>
        <p className="text-muted text-sm">TELA</p>
      </div>

      {/* Seats Grid */}
      <div className="flex justify-center overflow-x-auto pb-4">
        <div className="inline-block">
          {seats.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 mb-2 justify-center">
              {/* Row Label */}
              <div className="w-8 flex items-center justify-center text-muted text-xs font-bold">
                {String.fromCharCode(65 + rowIndex)}
              </div>

              {/* Seats */}
              {row.map((seat, seatIndex) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  onMouseEnter={() => setHoveredSeat(seat.id)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  disabled={seat.isOccupied}
                  className={`w-8 h-8 rounded transition-smooth ${getSeatColor(seat)} ${
                    seat.isOccupied ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
                  } ${seat.isVIP ? 'ring-2 ring-primary' : ''} ${
                    seat.isAccessible ? 'border-2 border-primary' : ''
                  }`}
                  title={`Assento ${String.fromCharCode(65 + rowIndex)}${seatIndex + 1}`}
                />
              ))}

              {/* Row Label */}
              <div className="w-8 flex items-center justify-center text-muted text-xs font-bold">
                {String.fromCharCode(65 + rowIndex)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-muted rounded"></div>
          <span className="text-muted">Livre</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-destructive rounded"></div>
          <span className="text-muted">Ocupado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded"></div>
          <span className="text-muted">Selecionado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-muted rounded ring-2 ring-primary"></div>
          <span className="text-muted">VIP</span>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <p className="text-foreground font-bold mb-2">
            Assentos Selecionados ({selectedSeats.length}):
          </p>
          <p className="text-primary">
            {selectedSeats
              .map(s => `${s.row}${s.number}`)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
