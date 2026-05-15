'use client';

import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col md:flex-row border-b border-[#2D2926]/10">
      {/* Left Content */}
      <div className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center gap-10 bg-[#F9F7F2]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase opacity-60 mb-6 block">
            Vaquinha Solidária
          </span>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight text-[#2D2926] mb-8">
            O frio da <br/>noite não <br/><span className="italic text-[#C2410C]">escolhe</span> quem <br/>tem teto.
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-md text-[#2D2926]/80 mb-10">
            Mais de 2.000 animais vivem hoje nas ruas da nossa cidade sem acesso a comida ou abrigo. Sua doação é o único fio de esperança para que eles não passem mais um inverno sozinhos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <a 
              href="#doar"
              className="bg-[#2D2926] text-[#F9F7F2] px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#C2410C] transition-colors text-center shadow-lg shadow-[#2D2926]/10"
            >
              Doar Agora • R$ 25,00
            </a>
            <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-tight opacity-50 px-2">
               <span>PIX</span>
               <span className="w-1 h-1 bg-[#2D2926] rounded-full"></span>
               <span>Cartão</span>
               <span className="w-1 h-1 bg-[#2D2926] rounded-full"></span>
               <span>100% Repassado</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Visual Content */}
      <div className="w-full md:w-1/2 relative bg-[#E6E2D8] flex items-center justify-center p-8 md:p-20 overflow-hidden min-h-[500px]">
        <div className="w-full h-full border border-[#2D2926]/20 relative">
          <Image 
            src="https://picsum.photos/seed/editorial-stray-bridge/1200/1600"
            alt="Cachorro esperando em uma ponte, inspirado na imagem enviada"
            fill
            className="object-cover opacity-80 mix-blend-luminosity grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#2D2926]/5 mix-blend-multiply" />
          
          {/* Overlapping Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-6 md:bottom-12 -left-4 md:-left-12 bg-white p-6 shadow-2xl max-w-[280px] border border-[#2D2926]/5 z-20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#C2410C]/20 flex items-center justify-center text-[#C2410C]">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div className="text-[10px] font-bold leading-tight uppercase tracking-tight">
                Última doação há 2 min
              </div>
            </div>
            <p className="text-xs italic opacity-70 mb-4 font-serif leading-relaxed">
              "Para que o Max e outros como ele tenham uma chance de encontrar um lar quente."
            </p>
            <div className="text-[10px] font-bold uppercase opacity-40 tracking-widest">— Ana Beatriz, São Paulo</div>
          </motion.div>

          <div className="absolute inset-4 border border-white/20 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
