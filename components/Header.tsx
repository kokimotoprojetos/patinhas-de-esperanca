'use client';

import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="px-8 md:px-12 py-8 flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#2D2926]/10 bg-[#F9F7F2] sticky top-0 z-50">
      <div className="flex flex-col mb-4 md:mb-0">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-60 leading-none mb-1">Vaquinha Solidária</span>
        <span className="font-serif italic text-2xl leading-none text-[#2D2926]">Patinhas de Esperança</span>
      </div>
      <nav className="flex gap-6 md:gap-10 text-[10px] font-bold uppercase tracking-widest text-[#2D2926]/80">
        <a href="#" className="hover:text-[#C2410C] transition-colors">Nossa Missão</a>
        <a href="#historia" className="hover:text-[#C2410C] transition-colors">Relatos</a>
        <a href="#doar" className="hover:text-[#C2410C] transition-colors border-b border-[#2D2926]">Como Ajudar</a>
      </nav>
    </header>
  );
}
