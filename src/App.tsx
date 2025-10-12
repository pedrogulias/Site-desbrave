import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Clock, TrendingUp, Phone, Mail, Instagram, Check } from 'lucide-react';
import { enviarLead } from './leadService';

const WHATSAPP_NUMBER = '5551981516983';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const ROUTES = [
  {
    id: 'caminho-ouro',
    name: 'Caminho do Ouro — Maquiné',
    mood: ['Aventura', 'Fuga'],
    distance: '25–35 km',
    duration: '4–5h',
    difficulty: 'Intermediário',
    terrain: 'Serra e vales',
    includes: 'Guia credenciado, briefing de segurança, paradas estratégicas',
    notIncludes: 'Bicicleta (aluguel disponível), alimentação',
    nextDate: 'Sob demanda',
    description: 'Pedala pela história do caminho dos tropeiros, com vistas de tirar o fôlego e paradas em cachoeiras escondidas.',
    itinerary: ['Partida de Maquiné', 'Subida suave pela serra', 'Parada na Cascata do Ouro', 'Descida técnica pelos vales', 'Chegada com vista panorâmica'],
    whatToBring: ['Mochila leve (até 5L)', 'Água (1,5L mínimo)', 'Lanche energético', 'Protetor solar', 'Óculos de sol', 'Roupa confortável']
  },
    {
    id: 'rota-romantica',
    name: 'Rota Romântica',
    mood: ['Socialização', 'Descanso'],
    distance: '20–30 km',
  },
];

function App() {
    const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    city: '',
    lgpdConsent: false,
  });
  const [customRouteData, setCustomRouteData] = useState({
    experienceType: '',
    distance: '',
    pace: '',
    terrain: '',
    needBike: '',
    bikeType: '',
    needTransfer: '',
    groupLevel: '',
    participants: '',
    dateWindow: '',
    originCity: '',
    healthNotes: '',
    riskConsent: false,
    cancelConsent: false
  });
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [leadFormSending, setLeadFormSending] = useState(false);
  const [leadFormError, setLeadFormError] = useState<string | null>(null);
  const [customRouteSubmitted, setCustomRouteSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view');
    }
  }, []);

  const trackEvent = (eventName: string, params?: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }
    console.log('Analytics Event:', eventName, params);
  };

  const buildWhatsAppLink = (message: string, campaign = 'landing') => {
    const utm = `utm_source=site&utm_medium=cta&utm_campaign=${campaign}`;
    const encodedMessage = encodeURIComponent(message);
    return `${WHATSAPP_LINK}?text=${encodedMessage}&${utm}`;
  };

  const handleWhatsAppClick = (route?: string) => {
    const message = route
      ? `Olá, vim do site da Desbrave. Quero informações sobre ${route}.`
      : 'Olá, vim do site da Desbrave. Gostaria de informações sobre os roteiros de cicloturismo.';

    trackEvent('cta_whatsapp_click', { route: route || 'geral' });
    window.open(buildWhatsAppLink(message), '_blank');
  };

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('lead_submit', { interest: leadFormData.interest });
    setLeadFormSubmitted(true);

    setTimeout(() => {
      const message = `Olá! Acabei de baixar o mini-guia e gostaria de saber mais sobre ${leadFormData.interest || 'cicloturismo'}. Meu nome é ${leadFormData.name}.`;
      window.open(buildWhatsAppLink(message, 'lead_magnet'), '_blank');
    }, 1500);
    setLeadFormError(null);
    setLeadFormSending(true);

    try {
      const ok = await enviarLead({
        nomeCompleto: leadFormData.name,
        email: leadFormData.email,
        whatsapp: leadFormData.phone,
        interessePrincipal: leadFormData.interest,
        cidadeUF: leadFormData.city,
      });

      if (!ok) {
        throw new Error('Resposta inválida do Apps Script');
      }

      trackEvent('lead_submit', { interest: leadFormData.interest });
      setLeadFormSubmitted(true);

      setTimeout(() => {
        const message = `Olá! Acabei de baixar o mini-guia e gostaria de saber mais sobre ${leadFormData.interest || 'cicloturismo'}. Meu nome é ${leadFormData.name}.`;
        window.open(buildWhatsAppLink(message, 'lead_magnet'), '_blank');
      }, 1500);
    } catch (error) {
      console.error('Erro ao enviar lead', error);
      setLeadFormError('Não conseguimos enviar teus dados agora. Tenta novamente em instantes.');
    } finally {
      setLeadFormSending(false);
    }
  };

 const handleCustomRouteSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const summary = `
Tipo: ${customRouteData.experienceType}
Distância: ${customRouteData.distance}
Ritmo: ${customRouteData.pace}
Terreno: ${customRouteData.terrain}
Bike: ${customRouteData.needBike === 'sim' ? 'Preciso (' + customRouteData.bikeType + ')' : 'Tenho'}
Transfer: ${customRouteData.needTransfer}
Nível: ${customRouteData.groupLevel}
Participantes: ${customRouteData.participants}
Datas: ${customRouteData.dateWindow}
Origem: ${customRouteData.originCity}
${customRouteData.healthNotes ? 'Obs: ' + customRouteData.healthNotes : ''}
  `.trim();

  trackEvent('custom_route_submit', {
    experienceType: customRouteData.experienceType,
    participants: customRouteData.participants,
  });

  setCustomRouteSubmitted(true);

  // opcional: abre WhatsApp com o resumo
  window.open(buildWhatsAppLink(summary, 'custom_route'), '_blank');
};
return (
    <>
      {/* Routes Section */}
      <section id="roteiros" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos roteiros</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolhe a experiência que combina contigo. Todos os passeios incluem condutor credenciado,
              briefing de segurança e o cuidado que tu mereces.
            </p>
          </div>
          {/* ...todo o restante do seu JSX que hoje está fora de qualquer função... */}
        </div>
      </section>
    </>
  );
  } // fecha o componente

export default App;
