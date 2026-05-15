'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Soup, Pill, Home } from 'lucide-react';
import DonationModal from './DonationModal';

const donationOptions = [
  {
    amount: '30',
    title: 'Kit Alimentação',
    description: 'Fornece ração de qualidade para um pet por 15 dias.',
    icon: Soup,
  },
  {
    amount: '80',
    title: 'Kit Saúde',
    description: 'Cobre vacinas essenciais e vermífugos para um pet resgatado.',
    icon: Pill,
    popular: true
  },
  {
    amount: '150',
    title: 'Kit Resgate Total',
    description: 'Alimentação, saúde e o início do processo de castração.',
    icon: Home,
  }
];

export default function Donation() {
  const [selected, setSelected] = useState('80');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState<number | null>(null);

  return (
    <section id="doar" className="py-32 bg-[#E6E2D8]/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Content */}
            <div className="w-full md:w-1/3">
              <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#C2410C] mb-6 block">Contribuição</span>
              <h2 className="font-serif text-4xl md:text-5xl text-[#2D2926] mb-8 leading-tight">
                Torne-se o <br/><span className="italic">herói</span> de uma vida.
              </h2>
              <p className="text-[#2D2926]/60 mb-10 leading-relaxed">
                Escolha um dos nossos kits de impacto para doar via PIX. 100% dos recursos são destinados diretamente ao bem-estar e resgate animal.
              </p>
              
              <div className="space-y-4 pt-10 border-t border-[#2D2926]/10">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#2D2926]/40">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Pagamento Seguro
                </div>
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#2D2926]/40">
                  <Check className="w-4 h-4 text-green-600" />
                  Transparência Total
                </div>
              </div>
            </div>

            {/* Right: Donation Grid */}
            <div className="w-full md:w-2/3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                {donationOptions.map((option) => (
                  <motion.div
                    key={option.amount}
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setSelected(option.amount);
                    }}
                    className={`relative p-8 border transition-all cursor-pointer flex flex-col items-center text-center ${
                      selected === option.amount
                        ? 'bg-[#2D2926] border-[#2D2926] text-[#F9F7F2]' 
                        : 'bg-white border-[#2D2926]/10 text-[#2D2926] hover:border-[#2D2926]/30 shadow-sm'
                    }`}
                  >
                    {option.popular && (
                      <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full ${
                        selected === option.amount ? 'bg-[#C2410C] text-white' : 'bg-[#2D2926] text-white'
                      }`}>
                        Urgente
                      </span>
                    )}
                    
                    <option.icon className={`w-8 h-8 mb-6 ${selected === option.amount ? 'text-[#C2410C]' : 'text-[#2D2926]/30'}`} />
                    <h3 className="font-serif text-xl mb-4 italic">{option.title}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-[10px] font-bold opacity-60">R$</span>
                      <span className="text-4xl font-serif leading-none">{option.amount}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalValue(Number(option.amount));
                        setIsModalOpen(true);
                      }}
                      className={`w-full py-3 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${
                        selected === option.amount
                          ? 'bg-[#C2410C] text-white'
                          : 'bg-[#2D2926] text-white hover:bg-[#C2410C]'
                      }`}
                    >
                      Doar Agora
                    </button>

                    {selected === option.amount && (
                       <motion.div layoutId="check" className="absolute top-4 right-4 text-[#C2410C]">
                          <Check className="w-5 h-5" />
                       </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="text-center p-8 bg-white border border-[#2D2926]/5 rounded-3xl shadow-sm">
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2926]/40 mb-2">Impacto Real</p>
                <p className="font-serif italic text-[#2D2926]/60 text-sm">
                  "Cada kit doado representa dias de tranquilidade e saúde para um animal que antes não tinha nada."
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <DonationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialAmount={modalValue}
      />
    </section>
  );
}
