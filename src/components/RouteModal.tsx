import { X, Check } from 'lucide-react';
import { useWhatsApp } from '../hooks';
import { Route } from '../types';

interface RouteModalProps {
  route: Route | null;
  onClose: () => void;
}

export default function RouteModal({ route, onClose }: RouteModalProps) {
  const { handleWhatsAppClick } = useWhatsApp();

  if (!route) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">{route.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Sobre o roteiro</h4>
            <p className="text-gray-600">{route.description}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Itinerário</h4>
            <ol className="space-y-2">
              {route.itinerary.map((step, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="bg-emerald-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm font-semibold mr-3 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Inclui</h4>
              <p className="text-gray-600 text-sm">{route.includes}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Não inclui</h4>
              <p className="text-gray-600 text-sm">{route.notIncludes}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">O que levar</h4>
            <ul className="grid grid-cols-2 gap-2">
              {route.whatToBring.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-600 text-sm">
                  <Check className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              handleWhatsAppClick(route.name);
              onClose();
            }}
            className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
          >
            Reservar pelo WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
