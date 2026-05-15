'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const stories = [
  {
    image: '/pet1.webp',
    title: 'O Guardião da Ponte',
    description: 'Encontrado sozinho em uma estrutura de concreto, ele espera por um olhar de compaixão que o tire do relento.',
    alt: 'Cachorro solitário em uma ponte (inspirado na imagem enviada)'
  },
  {
    image: '/pet2.webp',
    title: 'Solidão Silenciosa',
    description: 'Encolhido contra o frio do chão de pedra, este pequeno ser tenta passar despercebido por um mundo que o ignora.',
    alt: 'Cachorro encolhido no chão (inspirado na imagem enviada)'
  },
  {
    image: '/pet3.webp',
    title: 'Vínculos Eternos',
    description: 'Mesmo na mais absoluta escassez, a lealdade entre o homem e seu cão é o único calor que resta nas noites de frio.',
    alt: 'Homem e cachorro em situação de rua (inspirado na imagem enviada)'
  },
  {
    image: '/pet4.webp',
    title: 'Infância Interrompida',
    description: 'Filhotes que deveriam estar brincando em um lar seguro, buscam abrigo sob escombros para sobreviver.',
    alt: 'Dois filhotes buscando abrigo e calor (inspirado na imagem enviada)'
  },
  {
    image: '/pet.webp',
    title: 'Descanso no Cimento',
    description: 'A escada é o seu único refúgio. O cansaço vence o medo em meio ao vaivém indiferente da metrópole.',
    alt: 'Cachorro dormindo em uma escada (inspirado na imagem enviada)'
  }
];

export default function Story() {
  return (
    <section id="historia" className="py-32 bg-[#F9F7F2]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-[#2D2926]/10 pb-10">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-6xl text-[#2D2926] mb-6 leading-tight"
            >
              Realidades que <br/><span className="italic text-[#C2410C]">não podemos</span> ignorar.
            </motion.h2>
            <p className="text-[#2D2926]/60 text-lg leading-relaxed">
              Cada imagem abaixo representa uma alma que espera por uma chance de recomeçar. As ruas não perdoam, mas a sua bondade sim.
            </p>
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-40">
            Galeria de Impacto
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] w-full mb-8 overflow-hidden bg-[#E6E2D8]">
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border border-[#2D2926]/5 group-hover:border-white/20 transition-colors pointer-events-none" />
              </div>
              <div className="flex items-center gap-4 mb-3">
                 <div className="h-[1px] w-8 bg-[#C2410C] opacity-40 group-hover:w-12 transition-all" />
                 <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2410C]">Relato #{index + 1}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#2D2926] mb-3 group-hover:text-[#C2410C] transition-colors italic">{story.title}</h3>
              <p className="text-[#2D2926]/70 leading-relaxed text-sm lg:text-base">
                {story.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
