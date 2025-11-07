import { Check } from 'lucide-react';
import { useWhatsApp } from '../hooks';

export default function HeroSection() {
  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-laranja-50 via-white to-azul-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              pedais inesquecíveis na Serra Gaúcha — com leveza, segurança e boas companhias
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Roteiros guiados, bike própria ou aluguel, grupos pequenos e paradas gostosas.
              Descobre os melhores caminhos do Rio Grande do Sul pedalando no teu ritmo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => handleWhatsAppClick()}
                className="bg-laranja-400 text-white px-8 py-4 rounded-full hover:bg-laranja-500 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
              >
                Chamar no WhatsApp
              </button>
              <a
                href="#roteiros"
                className="bg-white text-laranja-400 border-2 border-laranja-400 px-8 py-4 rounded-full hover:bg-laranja-50 transition-all font-semibold text-lg text-center"
              >
                Ver roteiros
              </a>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Check className="h-6 w-6 text-laranja-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 font-medium">Condutor credenciado</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Check className="h-6 w-6 text-laranja-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 font-medium">Briefing pré-saída</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Check className="h-6 w-6 text-laranja-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 font-medium">Grupos pequenos</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <Check className="h-6 w-6 text-laranja-400 mx-auto mb-2" />
                <p className="text-sm text-gray-700 font-medium">Equipamentos revisados</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Grupo de ciclistas pedalando na Serra Gaúcha"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
