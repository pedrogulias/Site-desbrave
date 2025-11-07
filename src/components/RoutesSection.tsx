import { MapPin, Clock, TrendingUp } from 'lucide-react';
import { useWhatsApp } from '../hooks';
import { ROUTES, getRouteImage } from '../constants';
import { Route } from '../types';

interface RoutesSectionProps {
  onRouteClick: (route: Route) => void;
}

export default function RoutesSection({ onRouteClick }: RoutesSectionProps) {
  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <section id="roteiros" className="py-20 px-4 sm:px-6 lg:px-8 bg-branco-natural">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos roteiros</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolhe a experiência que combina contigo. Todos os passeios incluem condutor credenciado,
            briefing de segurança e o cuidado que tu mereces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ROUTES.map((route) => (
            <div key={route.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-laranja-400 to-azul-400 relative">
                <img
                  src={getRouteImage(route.id)}
                  alt={route.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-laranja-400">
                  {route.difficulty}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{route.name}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {route.mood.map((m) => (
                    <span key={m} className="bg-amarelo-300 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {m}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{route.description}</p>

                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-laranja-400" />
                    <span>{route.distance} • {route.terrain}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-laranja-400" />
                    <span>{route.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-laranja-400" />
                    <span>Próxima saída: {route.nextDate}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleWhatsAppClick(route.name)}
                    className="w-full bg-laranja-400 text-white px-6 py-3 rounded-full hover:bg-laranja-500 transition-all transform hover:scale-105 font-semibold"
                  >
                    Chamar no WhatsApp
                  </button>
                  <button
                    onClick={() => onRouteClick(route)}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-all font-semibold"
                  >
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
