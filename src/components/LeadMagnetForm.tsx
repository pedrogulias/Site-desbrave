import { Check } from 'lucide-react';
import { useLeadForm } from '../hooks';
import { WHATSAPP_DISPLAY_NUMBER } from '../constants';

export default function LeadMagnetForm() {
  const {
    leadFormData,
    setLeadFormData,
    leadFormLoading,
    leadFormError,
    leadFormSubmitted,
    handleLeadFormSubmit,
  } = useLeadForm();

  if (leadFormSubmitted) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <Check className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Obrigado!</h3>
            <p className="text-lg text-gray-600">
              Já recebemos teus dados. Para agilizar, te atendo no WhatsApp agora.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Recebe um mini-guia gratuito
          </h2>
          <p className="text-xl text-gray-600 mb-8 text-center">
            "Primeiro pedal de cicloturismo com zero perrengue"
          </p>

          <form onSubmit={handleLeadFormSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="lead-name"
                  required
                  value={leadFormData.name}
                  onChange={(e) => setLeadFormData({...leadFormData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Teu nome"
                />
              </div>
              <div>
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="lead-email"
                  required
                  value={leadFormData.email}
                  onChange={(e) => setLeadFormData({...leadFormData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="teu@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="lead-phone"
                  required
                  value={leadFormData.phone}
                  onChange={(e) => setLeadFormData({...leadFormData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder={WHATSAPP_DISPLAY_NUMBER}
                  pattern="^\+?[0-9\s\-()]+$"
                />
              </div>
              <div>
                <label htmlFor="lead-interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Interesse principal *
                </label>
                <select
                  id="lead-interest"
                  required
                  value={leadFormData.interest}
                  onChange={(e) => setLeadFormData({...leadFormData, interest: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Escolhe uma opção</option>
                  <option value="Serra Gaúcha">Serra Gaúcha</option>
                  <option value="Litoral">Litoral</option>
                  <option value="Porto Alegre">Porto Alegre e entorno</option>
                  <option value="Bikepacking">Bikepacking (vários dias)</option>
                  <option value="Iniciante">Sou iniciante, quero saber mais</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="lead-city" className="block text-sm font-medium text-gray-700 mb-2">
                Cidade/UF *
              </label>
              <input
                type="text"
                id="lead-city"
                required
                value={leadFormData.city}
                onChange={(e) => setLeadFormData({...leadFormData, city: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Porto Alegre/RS"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="lead-lgpd"
                required
                checked={leadFormData.lgpdConsent}
                onChange={(e) => setLeadFormData({...leadFormData, lgpdConsent: e.target.checked})}
                className="mt-1 h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="lead-lgpd" className="ml-3 text-sm text-gray-600">
                Aceito receber comunicações da Desbrave e concordo com a <a href="#privacidade" className="text-emerald-600 underline">Política de Privacidade</a>. *
              </label>
            </div>
            {leadFormError && (
              <p role="alert" aria-live="assertive" className="text-sm text-red-600">
                {leadFormError}
              </p>
            )}

            <button
              type="submit"
              disabled={leadFormLoading}
              className={`w-full bg-emerald-600 text-white px-8 py-4 rounded-full transition-all transform shadow-lg font-semibold text-lg ${leadFormLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-emerald-700 hover:scale-105'}`}
            >
              {leadFormLoading ? 'Enviando...' : 'Quero meu mini-guia'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
