import { Route, LeadFormData, FAQ } from '../types';

// WhatsApp Configuration
export const WHATSAPP_NUMBER = '5551981516983';
export const WHATSAPP_E164 = '+5551981516983';
export const WHATSAPP_DISPLAY_NUMBER = '+55 51 98151-6983';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// Lead Form Factory
export const createEmptyLeadForm = (): LeadFormData => ({
  name: '',
  email: '',
  phone: '',
  interest: '',
  city: '',
  lgpdConsent: false,
});

// Routes Data
export const ROUTES: Route[] = [
  {
    id: 'caminho-ouro',
    name: 'Caminho do Ouro — Maquiné',
    mood: ['Aventura', 'Fuga'],
    distance: '40 km',
    duration: 'Dia inteiro',
    difficulty: 'Iniciante/Intermediário',
    terrain: 'Estrada de terra',
    includes: 'Guia de cicloturismo, hidratação, entrada em todas experiências, almoço',
    notIncludes: 'Bicicleta (aluguel disponível), e-bike (aluguel disponível), translado até Maquiné',
    nextDate: 'Sob demanda',
    description: 'Uma pedalada acessível de ~40 km — sem subida de serra e em ritmo tranquilo — que reúne natureza, bem-estar e sabores locais: meliponicultura com meditação, almoço caseiro, visita a pequeno produtor, banho na Cachoeira da Forqueta e tour ecológico; guiada e ideal para iniciantes e ciclistas ocasionais.',
    itinerary: ['Partida na igreja matriz de Maquiné', 'Pedal leve até Sítio Recanto da Fonte - Meliponário e Meditação Guiada', 'Almoço na pousada Refúgio Verde', 'Banho na cachoeira da Forqueta', 'Visita a Escola de Sustentabilidade Bandeira Branca'],
    whatToBring: ['Mochila leve (até 5L)', 'Água/Isotônico', 'Lanches pessoais', 'Protetor solar e repelente', 'Óculos de sol', 'Roupa confortável']
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

// Image Configuration
export const ROUTE_IMAGE_OVERRIDES: Record<string, string> = {
  'caminho-ouro': '/logo-caminho-ouro.jpg',
};

export const ROUTE_PEXELS_IMAGE_IDS: Record<string, string> = {
  'rota-romantica': '1642161',
  'cascatas-montanhas': '417074',
  'bikepacking-pombas': '1230302',
  'porto-alegre-entorno': '919606',
};

export const DEFAULT_ROUTE_IMAGE_ID = '919606';

// Image Helper Functions
export const buildPexelsImageUrl = (imageId: string) =>
  `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&w=800`;

export const getRouteImage = (routeId: string) => {
  const overrideImage = ROUTE_IMAGE_OVERRIDES[routeId];
  if (overrideImage) {
    return overrideImage;
  }

  const imageId = ROUTE_PEXELS_IMAGE_IDS[routeId] || DEFAULT_ROUTE_IMAGE_ID;
  return buildPexelsImageUrl(imageId);
};

// FAQ Data
export const FAQS: FAQ[] = [
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
