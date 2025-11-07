import { Menu, X, MapPin } from 'lucide-react';
import { useWhatsApp } from '../hooks';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-emerald-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Desbrave</span>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#roteiros" className="text-gray-700 hover:text-emerald-600 transition-colors">Roteiros</a>
            <a href="#sobre" className="text-gray-700 hover:text-emerald-600 transition-colors">Sobre</a>
            <a href="#contato" className="text-gray-700 hover:text-emerald-600 transition-colors">Contato</a>
            <a href="#rota-personalizada" className="text-gray-700 hover:text-emerald-600 transition-colors">Solicite sua rota</a>
            <button
              onClick={() => handleWhatsAppClick()}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-md"
            >
              Chamar no WhatsApp
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#roteiros" className="text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Roteiros</a>
              <a href="#sobre" className="text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Sobre</a>
              <a href="#contato" className="text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contato</a>
              <a href="#rota-personalizada" className="text-gray-700 hover:text-emerald-600 transition-colors" onClick={() => setMobileMenuOpen(false)}>Solicite sua rota</a>
              <button
                onClick={() => {
                  handleWhatsAppClick();
                  setMobileMenuOpen(false);
                }}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-all text-center"
              >
                Chamar no WhatsApp
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
