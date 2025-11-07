export default function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Quem já pedalou com a gente</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Maria"
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Maria Santos</p>
                <p className="text-sm text-gray-500">Porto Alegre</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Experiência incrível! Eu tinha medo de não conseguir acompanhar, mas o ritmo foi perfeito.
              O guia foi super atencioso e as paisagens, inesquecíveis."
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Carlos"
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Carlos Ferreira</p>
                <p className="text-sm text-gray-500">Caxias do Sul</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Fiz o Caminho do Ouro e já estou planejando o próximo. Organização impecável,
              grupo super legal e aquela sensação de liberdade que só pedalando a gente sente."
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Ana"
                loading="lazy"
                className="h-12 w-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">Ana Costa</p>
                <p className="text-sm text-gray-500">Gramado</p>
              </div>
            </div>
            <p className="text-gray-600">
              "Pedalar pela Rota Romântica foi um sonho realizado. Cada parada tinha uma história,
              e voltei para casa cheia de energia e boas memórias."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img
            src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Pedal 1"
            loading="lazy"
            className="rounded-lg shadow-md h-48 w-full object-cover"
          />
          <img
            src="https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Pedal 2"
            loading="lazy"
            className="rounded-lg shadow-md h-48 w-full object-cover"
          />
          <img
            src="https://images.pexels.com/photos/1642161/pexels-photo-1642161.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Pedal 3"
            loading="lazy"
            className="rounded-lg shadow-md h-48 w-full object-cover"
          />
          <img
            src="https://images.pexels.com/photos/919606/pexels-photo-919606.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt="Pedal 4"
            loading="lazy"
            className="rounded-lg shadow-md h-48 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
