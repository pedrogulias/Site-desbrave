import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, MapPin, Clock, TrendingUp, Phone, Mail, Instagram, Check } from 'lucide-react';

const WHATSAPP_NUMBER = '5551999999999';
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
    duration: 'Meio período',
    difficulty: 'Iniciante',
    terrain: 'Campo e cidades históricas',
    includes: 'Guia, briefing, paradas culturais',
    notIncludes: 'Bicicleta, alimentação',
    nextDate: 'Próximo sábado',
    description: 'Percurso tranquilo por cidadezinhas germânicas, com arquitetura europeia, cafés coloniais e muito charme.',
    itinerary: ['Saída de Gramado', 'Pedalada pelo Vale do Quilombo', 'Parada em Nova Petrópolis', 'Visita ao centro histórico', 'Café colonial (opcional)'],
    whatToBring: ['Câmera/celular', 'Água', 'Dinheiro para compras', 'Protetor solar', 'Capacete']
  },
  {
    id: 'cascatas-montanhas',
    name: 'Cascatas e Montanhas',
    mood: ['Aventura', 'Natureza'],
    distance: '30–40 km',
    duration: 'Dia leve',
    difficulty: 'Intermediário',
    terrain: 'Serra',
    includes: 'Guia, briefing, suporte técnico',
    notIncludes: 'Bicicleta, alimentação, transporte',
    nextDate: '15/11',
    description: 'Riozinho, Rolante e São Francisco de Paula: um dia inteiro explorando as cachoeiras mais lindas da região.',
    itinerary: ['Partida de Riozinho', 'Subida para Rolante', 'Banho de cachoeira', 'Travessia para São Francisco', 'Retorno com pôr do sol'],
    whatToBring: ['Roupa de banho', 'Toalha pequena', 'Água', 'Lanche', 'Repelente', 'Câmera à prova d\'água']
  },
  {
    id: 'bikepacking-pombas',
    name: 'Bikepacking Praia das Pombas',
    mood: ['Liberdade', 'Aventura'],
    distance: '40–80 km',
    duration: '1–2 dias',
    difficulty: 'Iniciante/Intermediário',
    terrain: 'Litoral e dunas',
    includes: 'Guia, briefing, suporte completo, pernoite (camping)',
    notIncludes: 'Bicicleta, alimentação, barraca',
    nextDate: 'Sob demanda',
    description: 'Experiência completa de bikepacking: pedala até a praia, acampa sob as estrelas e volta renovado.',
    itinerary: ['Dia 1: Partida, 40 km até Praia das Pombas', 'Montagem de acampamento', 'Pôr do sol na praia', 'Dia 2: Café da manhã, retorno tranquilo'],
    whatToBring: ['Barraca e saco de dormir', 'Lanterna', 'Kit higiene', 'Roupas para 2 dias', 'Comida leve', 'Protetor solar']
  },
  {
    id: 'porto-alegre-entorno',
    name: 'Porto Alegre e Entorno',
    mood: ['Socialização', 'Proatividade'],
    distance: '18–25 km',
    duration: 'Meio período',
    difficulty: 'Iniciante',
    terrain: 'Urbano e parques',
    includes: 'Guia, briefing, paradas culturais',
    notIncludes: 'Bicicleta, alimentação',
    nextDate: 'Todo domingo',
    description: 'Descobre a capital gaúcha sobre duas rodas: parques, orla do Guaíba, Redenção e muito verde.',
    itinerary: ['Encontro no Parque Redenção', 'Pedalada pela orla do Guaíba', 'Parada no Gasômetro', 'Volta pelo Centro Histórico'],
    whatToBring: ['Água', 'Lanche leve', 'Dinheiro', 'Capacete', 'Óculos de sol']
  }
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<typeof ROUTES[0] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    city: '',
    lgpdConsent: false
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

  const handleLeadFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('lead_submit', { interest: leadFormData.interest });
    setLeadFormSubmitted(true);

    setTimeout(() => {
      const message = `Olá! Acabei de baixar o mini-guia e gostaria de saber mais sobre ${leadFormData.interest || 'cicloturismo'}. Meu nome é ${leadFormData.name}.`;
      window.open(buildWhatsAppLink(message, 'lead_magnet'), '_blank');
    }, 1500);
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
      participants: customRouteData.participants
    });

    setCustomRouteSubmitted(true);

    setTimeout(() => {
      const message = `Olá, vim do site da Desbrave. Quero uma ROTA PERSONALIZADA:\n\n${summary}`;
      window.open(buildWhatsAppLink(message, 'custom_route'), '_blank');
    }, 1500);
  };

  const openRouteModal = (route: typeof ROUTES[0]) => {
    setSelectedRoute(route);
    trackEvent('route_card_open', { route: route.name });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
    if (openFaq !== index) {
      trackEvent('faq_open', { question: index });
    }
  };

  const faqs = [
    {
      q: 'Preciso ter experiência em ciclismo?',
      a: 'Não! Nossos roteiros são pensados para todos os níveis. Se tu sabes andar de bicicleta e gostas de natureza, já é suficiente. Cada passeio indica o nível de dificuldade (Iniciante, Intermediário ou Avançado) e fazemos um briefing antes de sair para garantir que todos se sintam confortáveis.'
    },
    {
      q: 'Posso alugar bicicleta e capacete?',
      a: 'Sim! Trabalhamos com parceiros de confiança que oferecem bikes convencionais e elétricas. Basta indicar no formulário ou conversar conosco no WhatsApp. O aluguel não está incluído no valor do passeio, mas facilitamos tudo para ti.'
    },
    {
      q: 'Como é definido o nível de dificuldade?',
      a: 'Seguimos uma classificação técnica baseada na ABNT NBR 15509-2, que considera distância, tipo de terreno, desnível e ritmo. Iniciante: até 25 km em terreno plano ou levemente ondulado. Intermediário: 25–50 km com subidas moderadas. Avançado: acima de 50 km ou terrenos técnicos.'
    },
    {
      q: 'O passeio acontece com chuva?',
      a: 'Depende da intensidade. Chuva leve não impede, mas monitoramos a previsão e avisamos com antecedência caso seja necessário reagendar. Tua segurança vem sempre em primeiro lugar.'
    },
    {
      q: 'Como funcionam cancelamentos e reembolsos?',
      a: 'Cancelamentos com até 7 dias de antecedência têm reembolso de 100%. Entre 3 e 7 dias, 50%. Menos de 3 dias, não há reembolso, mas podes remarcar para outra data. Consulta nossa Política de Cancelamento completa no rodapé.'
    }
  ];

  return (
    <>
      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "name": "Desbrave Cicloturismo",
            "url": "https://desbravecicloturismo.com.br",
            "logo": "https://desbravecicloturismo.com.br/logo.png",
            "description": "Roteiros guiados de cicloturismo na Serra Gaúcha e litoral do RS. pedais inesquecíveis com segurança e leveza.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Porto Alegre",
              "addressRegion": "RS",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-51-99999-9999",
              "contactType": "Customer Service",
              "availableLanguage": "Portuguese"
            },
            "sameAs": [
              "https://instagram.com/desbravecicloturismo"
            ]
          },
          {
            "@type": "LocalBusiness",
            "name": "Desbrave Cicloturismo",
            "image": "https://desbravecicloturismo.com.br/hero.jpg",
            "priceRange": "$$",
            "servesCuisine": "Outdoor Recreation",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Serra Gaúcha",
              "addressRegion": "RS",
              "addressCountry": "BR"
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          },
          ...ROUTES.map(route => ({
            "@type": "Product",
            "name": route.name,
            "description": route.description,
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "BRL"
            }
          }))
        ]
      })}} />

      {/* Header */}
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
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
                  className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
                >
                  Chamar no WhatsApp
                </button>
                <a
                  href="#roteiros"
                  className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-full hover:bg-emerald-50 transition-all font-semibold text-lg text-center"
                >
                  Ver roteiros
                </a>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Check className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 font-medium">Condutor credenciado</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Check className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 font-medium">Briefing pré-saída</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Check className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 font-medium">Grupos pequenos</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Check className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
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

      {/* Lead Magnet Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-emerald-600">
        <div className="max-w-4xl mx-auto">
          {!leadFormSubmitted ? (
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
                      placeholder="+55 51 99999-9999"
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

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
                >
                  Quero meu mini-guia
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <Check className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Obrigado!</h3>
              <p className="text-lg text-gray-600">
                Já recebemos teus dados. Para agilizar, te atendo no WhatsApp agora.
              </p>
            </div>
          )}
        </div>
      </section>

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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROUTES.map((route) => (
              <div key={route.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-emerald-400 to-sky-500 relative">
                  <img
                    src={`https://images.pexels.com/photos/${route.id === 'caminho-ouro' ? '3763847' : route.id === 'rota-romantica' ? '1642161' : route.id === 'cascatas-montanhas' ? '417074' : route.id === 'bikepacking-pombas' ? '1230302' : '919606'}/pexels-photo-${route.id === 'caminho-ouro' ? '3763847' : route.id === 'rota-romantica' ? '1642161' : route.id === 'cascatas-montanhas' ? '417074' : route.id === 'bikepacking-pombas' ? '1230302' : '919606'}.jpeg?auto=compress&cs=tinysrgb&w=800`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Route Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedRoute(null)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{selectedRoute.name}</h3>
              <button
                onClick={() => setSelectedRoute(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Fechar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Sobre o roteiro</h4>
                <p className="text-gray-600">{selectedRoute.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Itinerário</h4>
                <ol className="space-y-2">
                  {selectedRoute.itinerary.map((step, idx) => (
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
                  <p className="text-gray-600 text-sm">{selectedRoute.includes}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Não inclui</h4>
                  <p className="text-gray-600 text-sm">{selectedRoute.notIncludes}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">O que levar</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedRoute.whatToBring.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <Check className="h-4 w-4 text-emerald-600 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  handleWhatsAppClick(selectedRoute.name);
                  setSelectedRoute(null);
                }}
                className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg"
              >
                Reservar pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
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

      {/* Custom Route Form */}
      <section id="rota-personalizada" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-sky-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Solicite uma rota personalizada</h2>
            <p className="text-xl text-gray-600">
              Conta pra gente o que tu imaginas e montamos um roteiro sob medida.
            </p>
          </div>

          {!customRouteSubmitted ? (
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
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <Check className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Proposta em andamento!</h3>
              <p className="text-lg text-gray-600">
                Recebemos tua solicitação. Vamos te atender no WhatsApp agora com uma proposta personalizada.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas frequentes</h2>
            <p className="text-xl text-gray-600">
              Tudo o que precisas saber antes de pedalar conosco
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === idx ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
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

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-emerald-400" />
                <span className="ml-2 text-xl font-bold">Desbrave</span>
              </div>
              <p className="text-gray-400 text-sm">
                pedais inesquecíveis na Serra Gaúcha, litoral e Porto Alegre.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-3 text-sm">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  (51) 99999-9999
                </a>
                <a href="mailto:contato@desbravecicloturismo.com.br" className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors">
                  <Mail className="h-4 w-4 mr-2" />
                  contato@desbravecicloturismo.com.br
                </a>
                <a href="https://instagram.com/desbravecicloturismo" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors">
                  <Instagram className="h-4 w-4 mr-2" />
                  @desbravecicloturismo
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Informações</h4>
              <div className="space-y-2 text-sm">
                <a href="#seguranca" className="block text-gray-400 hover:text-emerald-400 transition-colors">Política de Segurança</a>
                <a href="#riscos" className="block text-gray-400 hover:text-emerald-400 transition-colors">Termo de Riscos</a>
                <a href="#cancelamento" className="block text-gray-400 hover:text-emerald-400 transition-colors">Cancelamento</a>
                <a href="#privacidade" className="block text-gray-400 hover:text-emerald-400 transition-colors">LGPD / Privacidade</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <p className="text-sm text-gray-400 mb-2">
                Segunda a sábado: 8h às 20h<br />
                Domingo: 9h às 18h
              </p>
              <p className="text-xs text-gray-500 mt-4">
                CNPJ: 00.000.000/0001-00<br />
                Porto Alegre, RS
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 text-center">
              Atividades recreativas com riscos avaliados e controlados. Recomendamos uso de capacete e briefing obrigatório.
            </p>
            <p className="text-sm text-gray-500 text-center mt-4">
              © 2025 Desbrave Cicloturismo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-700 transition-all transform hover:scale-110"
        aria-label="Chamar no WhatsApp"
      >
        <Phone className="h-6 w-6" />
      </button>
    </>
  );
}

export default App;
