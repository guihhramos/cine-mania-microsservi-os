/* CineMania - Profile Page */

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/authStore';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Profile() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  if (!user) {
    setLocation('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const handleSave = () => {
    // Mock save - em produção seria uma chamada à API
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-20">
        <div className="container max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
            <div className="h-1 w-20 bg-primary rounded-full"></div>
          </div>

          {/* Profile Card */}
          <Card className="p-8 bg-card border border-border mb-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted">{user.email}</p>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted text-sm">Email</p>
                  <p className="text-foreground font-bold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-muted text-sm">Membro desde</p>
                  <p className="text-foreground font-bold">
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Section */}
            {isEditing ? (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-foreground text-sm font-bold mb-2">Nome</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Salvar
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-border"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                variant="outline"
                className="border-border text-foreground hover:bg-secondary mb-8"
              >
                Editar Perfil
              </Button>
            )}

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </Card>

          {/* Booking History */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Histórico de Reservas</h2>
            <Card className="p-8 bg-card border border-border text-center">
              <p className="text-muted">Nenhuma reserva encontrada</p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
