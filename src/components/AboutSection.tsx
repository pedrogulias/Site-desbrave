export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Equipe Desbrave"
              loading="lazy"
              className="rounded-2xl shadow-xl"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Somos especialistas no prazer da descoberta
            </h2>
            <div className="space-y-4 text-lg text-gray-600 mb-8">
              <p>
                A Desbrave nasceu da paixão por pedalar e compartilhar os melhores caminhos do Rio Grande do Sul.
                Operamos na Serra Gaúcha, litoral e Porto Alegre, sempre com grupos pequenos e atenção ao detalhe.
              </p>
              <p>
                Nossa abordagem de segurança se percebe a cada saída: briefing completo antes de cada roteiro,
                checagem de bicicletas, ritmo confortável para todos e condutores com formação técnica baseada
                na ABNT NBR ISO 21102 (condutor de ecoturismo).
              </p>
              <p className="font-semibold text-emerald-700">
                Aqui, tu pedala no teu ritmo, conhece gente bacana e volta renovado.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <a href="#seguranca" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-700">Política de Segurança</p>
              </a>
              <a href="#riscos" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-700">Termo de Riscos</p>
              </a>
              <a href="#cancelamento" className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="text-sm font-medium text-gray-700">Cancelamento</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
