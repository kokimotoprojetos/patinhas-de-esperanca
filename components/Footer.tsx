'use client';

import { Instagram, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D2926] text-[#F9F7F2] py-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <div className="flex flex-col mb-8">
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase opacity-60 leading-none mb-2">Vaquinha Solidária</span>
              <span className="font-serif italic text-3xl leading-none">Patinhas de Esperança</span>
            </div>
            <p className="text-[#F9F7F2]/60 leading-relaxed text-sm">
              Cada doação é um passo em direção a um mundo onde nenhum animal precise conhecer a solidão das ruas. Somos movidos pela compaixão e pela transparência.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Menu</h4>
              <ul className="space-y-4 text-[11px] font-bold uppercase tracking-[0.2em]">
                <li><a href="#" className="hover:text-[#C2410C] transition-colors">Nossa Missão</a></li>
                <li><a href="#historia" className="hover:text-[#C2410C] transition-colors">Nossos Relatos</a></li>
                <li><a href="#doar" className="hover:text-[#C2410C] transition-colors">Como Apoiar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-6">Social</h4>
              <div className="flex gap-6">
                <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C2410C] transition-all"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C2410C] transition-all"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="opacity-60 hover:opacity-100 hover:text-[#C2410C] transition-all"><Mail className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-[10px] uppercase font-bold tracking-widest opacity-30 text-center md:text-left order-2 md:order-1">
             © 2024 Patinhas de Esperança • Organização Sem Fins Lucrativos
           </div>
           
           <div className="w-full md:w-1/3 order-1 md:order-2">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 leading-none">Meta de Arrecadação</span>
                <span className="font-serif italic text-sm opacity-60 leading-none">62% concluído</span>
              </div>
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-[#C2410C] w-[62%] transition-all duration-1000"></div>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
