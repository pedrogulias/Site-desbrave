import { ROUTES, FAQS, WHATSAPP_E164 } from '../constants';

export default function JSONLDSchema() {
  const schema = {
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
          "telephone": WHATSAPP_E164,
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
        "mainEntity": FAQS.map(faq => ({
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
  };

  return (
    <script 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  );
}
