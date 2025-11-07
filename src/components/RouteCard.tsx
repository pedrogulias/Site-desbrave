import { MapPin, Clock, TrendingUp } from "lucide-react";

interface Route {
  id: string;
  name: string;
  mood: string[];
  distance: string;
  duration: string;
  difficulty: string;
  terrain: string;
  includes: string;
  notIncludes: string;
  nextDate: string;
  description: string;
  itinerary: string[];
  whatToBring: string[];
}

interface RouteCardProps {
  route: Route;
  getRouteImage: (id: string) => string;
  handleWhatsAppClick: (name: string) => void;
  openRouteModal: (route: Route) => void;
}

export default function RouteCard({ route, getRouteImage, handleWhatsAppClick, openRouteModal }: RouteCardProps) {
  return (
    <div key={route.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-sky-500 relative">
        <img
          src={getRouteImage(route.id)}
          alt={route.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">
          {route.difficulty}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{route.name}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {route.mood.map((m) => (
            <span key={m} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
              {m}
            </span>
          ))}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{route.description}</p>

        <div className="space-y-2 mb-6 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{route.distance} • {route.terrain}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
            <span>{route.duration}</span>
          </div>
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-emerald-600" />
            <span>Próxima saída: {route.nextDate}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleWhatsAppClick(route.name)}
            className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 font-semibold"
          >
            Chamar no WhatsApp
          </button>
          <button
            onClick={() => openRouteModal(route)}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-all font-semibold"
          >
            Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}