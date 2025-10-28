import { ChevronDown } from 'lucide-react';
import { useFAQ } from '../hooks';
import { FAQS } from '../constants';

export default function FAQSection() {
  const { openFaq, toggleFaq } = useFAQ();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas frequentes</h2>
          <p className="text-xl text-gray-600">
            Tudo o que precisas saber antes de pedalar conosco
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
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
  );
}
