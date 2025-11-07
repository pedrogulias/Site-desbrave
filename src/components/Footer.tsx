import { MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_DISPLAY_NUMBER } from '../constants';

export default function Footer() {
  return (
    <footer id="contato" className="bg-preto-natural text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <MapPin className="h-8 w-8 text-laranja-400" />
              <span className="ml-2 text-xl font-bold">Desbrave</span>
            </div>
            <p className="text-gray-400 text-sm">
              pedais inesquecíveis na Serra Gaúcha, litoral e Porto Alegre.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-laranja-400 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                {WHATSAPP_DISPLAY_NUMBER}
              </a>
              <a href="mailto:contato@desbravecicloturismo.com.br" className="flex items-center text-gray-400 hover:text-laranja-400 transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                contato@desbravecicloturismo.com.br
              </a>
              <a href="https://instagram.com/desbravecicloturismo" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-laranja-400 transition-colors">
                <Instagram className="h-4 w-4 mr-2" />
                @desbravecicloturismo
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informações</h4>
            <div className="space-y-2 text-sm">
              <a href="#seguranca" className="block text-gray-400 hover:text-laranja-400 transition-colors">Política de Segurança</a>
              <a href="#riscos" className="block text-gray-400 hover:text-laranja-400 transition-colors">Termo de Riscos</a>
              <a href="#cancelamento" className="block text-gray-400 hover:text-laranja-400 transition-colors">Cancelamento</a>
              <a href="#privacidade" className="block text-gray-400 hover:text-laranja-400 transition-colors">LGPD / Privacidade</a>
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
  );
}
