import { Check } from 'lucide-react';
import { useCustomRoute } from '../hooks';

export default function CustomRouteForm() {
  const {
    customRouteData,
    setCustomRouteData,
    customRouteSubmitted,
    handleCustomRouteSubmit,
  } = useCustomRoute();

  if (customRouteSubmitted) {
    return (
      <section id="rota-personalizada" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Check className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Proposta em andamento!</h3>
            <p className="text-lg text-gray-600">
              Recebemos tua solicitação. Vamos te atender no WhatsApp agora com uma proposta personalizada.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rota-personalizada" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-sky-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Solicite uma rota personalizada</h2>
          <p className="text-xl text-gray-600">
            Conta pra gente o que tu imaginas e montamos um roteiro sob medida.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleCustomRouteSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="experienceType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de experiência *
                </label>
                <select
                  id="experienceType"
                  required
                  value={customRouteData.experienceType}
                  onChange={(e) => setCustomRouteData({...customRouteData, experienceType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="meio-periodo">Meio período</option>
                  <option value="dia-inteiro">Dia inteiro</option>
                  <option value="2-dias">2 dias (bikepacking)</option>
                </select>
              </div>

              <div>
                <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                  Distância desejada *
                </label>
                <select
                  id="distance"
                  required
                  value={customRouteData.distance}
                  onChange={(e) => setCustomRouteData({...customRouteData, distance: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="ate-20km">Até 20 km</option>
                  <option value="20-40km">20–40 km</option>
                  <option value="40-60km">40–60 km</option>
                  <option value="60km-mais">Mais de 60 km</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="pace" className="block text-sm font-medium text-gray-700 mb-2">
                  Ritmo *
                </label>
                <select
                  id="pace"
                  required
                  value={customRouteData.pace}
                  onChange={(e) => setCustomRouteData({...customRouteData, pace: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="relax">Relax (muitas paradas)</option>
                  <option value="moderado">Moderado</option>
                </select>
              </div>

              <div>
                <label htmlFor="terrain" className="block text-sm font-medium text-gray-700 mb-2">
                  Terreno preferido *
                </label>
                <select
                  id="terrain"
                  required
                  value={customRouteData.terrain}
                  onChange={(e) => setCustomRouteData({...customRouteData, terrain: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="urbano">Urbano</option>
                  <option value="serra">Serra</option>
                  <option value="interior">Interior/campo</option>
                  <option value="praia">Praia</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="needBike" className="block text-sm font-medium text-gray-700 mb-2">
                  Preciso de bike? *
                </label>
                <select
                  id="needBike"
                  required
                  value={customRouteData.needBike}
                  onChange={(e) => setCustomRouteData({...customRouteData, needBike: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="nao">Não, tenho a minha</option>
                  <option value="sim">Sim, preciso alugar</option>
                </select>
              </div>

              {customRouteData.needBike === 'sim' && (
                <div>
                  <label htmlFor="bikeType" className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de bike *
                  </label>
                  <select
                    id="bikeType"
                    required
                    value={customRouteData.bikeType}
                    onChange={(e) => setCustomRouteData({...customRouteData, bikeType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Escolhe</option>
                    <option value="convencional">Convencional</option>
                    <option value="eletrica">Elétrica</option>
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="needTransfer" className="block text-sm font-medium text-gray-700 mb-2">
                  Preciso de transfer? *
                </label>
                <select
                  id="needTransfer"
                  required
                  value={customRouteData.needTransfer}
                  onChange={(e) => setCustomRouteData({...customRouteData, needTransfer: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="nao">Não preciso</option>
                  <option value="sim">Sim, preciso</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="groupLevel" className="block text-sm font-medium text-gray-700 mb-2">
                  Nível do grupo *
                </label>
                <select
                  id="groupLevel"
                  required
                  value={customRouteData.groupLevel}
                  onChange={(e) => setCustomRouteData({...customRouteData, groupLevel: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Escolhe</option>
                  <option value="iniciante">Iniciante</option>
                  <option value="intermediario">Intermediário</option>
                  <option value="avancado">Avançado</option>
                </select>
              </div>

              <div>
                <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-2">
                  Nº de participantes *
                </label>
                <input
                  type="number"
                  id="participants"
                  required
                  min="1"
                  max="20"
                  value={customRouteData.participants}
                  onChange={(e) => setCustomRouteData({...customRouteData, participants: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dateWindow" className="block text-sm font-medium text-gray-700 mb-2">
                  Janela de datas *
                </label>
                <input
                  type="text"
                  id="dateWindow"
                  required
                  value={customRouteData.dateWindow}
                  onChange={(e) => setCustomRouteData({...customRouteData, dateWindow: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Ex: primeira quinzena de dezembro"
                />
              </div>

              <div>
                <label htmlFor="originCity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade de origem *
                </label>
                <input
                  type="text"
                  id="originCity"
                  required
                  value={customRouteData.originCity}
                  onChange={(e) => setCustomRouteData({...customRouteData, originCity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  placeholder="Porto Alegre/RS"
                />
              </div>
            </div>

            <div>
              <label htmlFor="healthNotes" className="block text-sm font-medium text-gray-700 mb-2">
                Observações de saúde relevantes (opcional)
              </label>
              <textarea
                id="healthNotes"
                rows={3}
                value={customRouteData.healthNotes}
                onChange={(e) => setCustomRouteData({...customRouteData, healthNotes: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                placeholder="Alguma condição que devemos saber? (alergias, limitações físicas, etc.)"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="riskConsent"
                  required
                  checked={customRouteData.riskConsent}
                  onChange={(e) => setCustomRouteData({...customRouteData, riskConsent: e.target.checked})}
                  className="mt-1 h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="riskConsent" className="ml-3 text-sm text-gray-600">
                  Li e aceito o <a href="#riscos" className="text-emerald-600 underline">Termo de Conhecimento de Riscos</a>. *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="cancelConsent"
                  required
                  checked={customRouteData.cancelConsent}
                  onChange={(e) => setCustomRouteData({...customRouteData, cancelConsent: e.target.checked})}
                  className="mt-1 h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                />
                <label htmlFor="cancelConsent" className="ml-3 text-sm text-gray-600">
                  Li e aceito a <a href="#cancelamento" className="text-emerald-600 underline">Política de Cancelamento</a>. *
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
            >
              Receber proposta no WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
