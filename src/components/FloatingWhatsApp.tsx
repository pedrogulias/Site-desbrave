import { Phone } from 'lucide-react';
import { useWhatsApp } from '../hooks';

export default function FloatingWhatsApp() {
  const { handleWhatsAppClick } = useWhatsApp();

  return (
    <button
      onClick={() => handleWhatsAppClick()}
      className="fixed bottom-6 right-6 z-40 bg-laranja-400 text-white p-4 rounded-full shadow-2xl hover:bg-laranja-500 transition-all transform hover:scale-110"
      aria-label="Chamar no WhatsApp"
    >
      <Phone className="h-6 w-6" />
    </button>
  );
}
