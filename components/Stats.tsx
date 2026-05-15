'use client';

import { motion } from 'motion/react';

const stats = [
  { label: 'Pets Resgatados', value: '1.2k' },
  { label: 'Adoções', value: '450' },
  { label: 'Voluntários', value: '150' },
  { label: 'Arrecadados', value: 'R$ 12k' },
];

export default function Stats() {
  return (
    <section className="py-20 bg-[#F9F7F2] border-b border-[#2D2926]/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="font-serif text-5xl md:text-6xl text-[#2D2926] mb-2 leading-none">
                {stat.value}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#2D2926]/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
