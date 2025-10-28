import { useState, useEffect } from 'react';
import { enviarLead } from '../leadService';
import { LeadFormData, CustomRouteData, Route } from '../types';
import { createEmptyLeadForm, WHATSAPP_LINK } from '../constants';

// Analytics Hook
export const useAnalytics = () => {
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

  return { trackEvent };
};

// WhatsApp Hook
export const useWhatsApp = () => {
  const { trackEvent } = useAnalytics();

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

  return { handleWhatsAppClick, buildWhatsAppLink };
};

// Lead Form Hook
export const useLeadForm = () => {
  const [leadFormData, setLeadFormData] = useState<LeadFormData>(createEmptyLeadForm);
  const [leadFormLoading, setLeadFormLoading] = useState(false);
  const [leadFormError, setLeadFormError] = useState<string | null>(null);
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const { trackEvent } = useAnalytics();
  const { buildWhatsAppLink } = useWhatsApp();

  const handleLeadFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadFormError(null);
    setLeadFormLoading(true);

    try {
      await enviarLead({
        nomeCompleto: leadFormData.name,
        email: leadFormData.email,
        whatsapp: leadFormData.phone,
        interessePrincipal: leadFormData.interest,
        cidadeUF: leadFormData.city,
      });

      trackEvent('lead_submit', { interest: leadFormData.interest });
      setLeadFormSubmitted(true);
      const nextMessage = `Olá! Acabei de baixar o mini-guia e gostaria de saber mais sobre ${leadFormData.interest || 'cicloturismo'}. Meu nome é ${leadFormData.name}.`;

      setLeadFormData(createEmptyLeadForm());

      setTimeout(() => {
        window.open(buildWhatsAppLink(nextMessage, 'lead_magnet'), '_blank');
      }, 1500);
    } catch (error) {
      console.error('Erro ao enviar lead', error);
      const message = error instanceof Error ? error.message : 'Não foi possível enviar os teus dados agora. Tenta novamente em instantes.';
      setLeadFormError(message);
    } finally {
      setLeadFormLoading(false);
    }
  };

  return {
    leadFormData,
    setLeadFormData,
    leadFormLoading,
    leadFormError,
    leadFormSubmitted,
    handleLeadFormSubmit,
  };
};

// Custom Route Hook
export const useCustomRoute = () => {
  const [customRouteData, setCustomRouteData] = useState<CustomRouteData>({
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
  const [customRouteSubmitted, setCustomRouteSubmitted] = useState(false);
  const { trackEvent } = useAnalytics();
  const { buildWhatsAppLink } = useWhatsApp();

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

  return {
    customRouteData,
    setCustomRouteData,
    customRouteSubmitted,
    handleCustomRouteSubmit,
  };
};

// Route Modal Hook
export const useRouteModal = () => {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const { trackEvent } = useAnalytics();

  const openRouteModal = (route: Route) => {
    setSelectedRoute(route);
    trackEvent('route_card_open', { route: route.name });
  };

  const closeRouteModal = () => {
    setSelectedRoute(null);
  };

  return {
    selectedRoute,
    openRouteModal,
    closeRouteModal,
  };
};

// FAQ Hook
export const useFAQ = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { trackEvent } = useAnalytics();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
    if (openFaq !== index) {
      trackEvent('faq_open', { question: index });
    }
  };

  return {
    openFaq,
    toggleFaq,
  };
};