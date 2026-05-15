'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Ticket } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const values = [20, 30, 50, 100, 150];

export default function DonationModal({ isOpen, onClose }: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', cpf: '' });
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qrcode: string; copyPaste: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSelectedAmount(null);
        setFormData({ name: '', cpf: '' });
        setPixData(null);
      }, 300);
    }
  }, [isOpen]);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAmount || !formData.name || !formData.cpf) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/checkout/lytron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedAmount,
          name: formData.name,
          cpf: formData.cpf,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPixData({
          qrcode: data.qrcode,
          copyPaste: data.copyPaste,
        });
        setStep(3);
      } else {
        alert(data.error || 'Erro ao gerar PIX');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#2D2926]/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#F9F7F2] rounded-3xl overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#2D2926]/5 transition-colors text-[#2D2926]/40"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 md:p-12">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="font-serif text-3xl text-[#2D2926] mb-2 italic">Escolha o impacto</h2>
                  <p className="text-sm text-[#2D2926]/60 mb-8">Selecione um valor para doar via PIX e salvar uma vida.</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {values.map((val) => (
                      <button
                        key={val}
                        onClick={() => setSelectedAmount(val)}
                        className={`py-4 rounded-xl border-2 transition-all font-bold text-lg ${
                          selectedAmount === val 
                            ? 'bg-[#C2410C] border-[#C2410C] text-white shadow-lg shadow-[#C2410C]/20' 
                            : 'bg-white border-[#2D2926]/5 text-[#2D2926] hover:border-[#2D2926]/20'
                        }`}
                      >
                        R$ {val}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={!selectedAmount}
                    onClick={() => setStep(2)}
                    className="w-full py-5 bg-[#2D2926] text-white rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#C2410C] transition-colors shadow-xl shadow-[#2D2926]/10"
                  >
                    Próximo Passo
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="font-serif text-3xl text-[#2D2926] mb-2 italic">Seus dados</h2>
                  <p className="text-sm text-[#2D2926]/60 mb-8">Precisamos identificar sua doação para segurança do processo.</p>
                  
                  <form onSubmit={handleDonate} className="space-y-4 mb-8">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#2D2926]/40 mb-2 tracking-widest">Nome Completo</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white border-2 border-[#2D2926]/5 rounded-xl px-5 py-4 focus:border-[#C2410C] outline-none transition-all font-medium"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-[#2D2926]/40 mb-2 tracking-widest">CPF</label>
                      <input 
                        required
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        className="w-full bg-white border-2 border-[#2D2926]/5 rounded-xl px-5 py-4 focus:border-[#C2410C] outline-none transition-all font-medium"
                        placeholder="000.000.000-00"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-[#C2410C] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#A1360A] transition-colors shadow-xl shadow-[#C2410C]/20 disabled:opacity-50"
                      >
                        {loading ? 'Gerando PIX...' : `Gerar PIX de R$ ${selectedAmount}`}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full py-4 text-[#2D2926]/40 text-[10px] font-bold uppercase tracking-widest mt-2 hover:text-[#2D2926] transition-colors"
                      >
                        Voltar
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && pixData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h2 className="font-serif text-3xl text-[#2D2926] mb-2 italic">Quase lá!</h2>
                  <p className="text-sm text-[#2D2926]/60 mb-8">Escaneie o QR Code abaixo ou copie a chave PIX.</p>
                  
                  <div className="bg-white p-6 rounded-3xl inline-block mb-8 shadow-inner border border-[#2D2926]/5">
                    {pixData.qrcode.startsWith('http') || pixData.qrcode.startsWith('data:image') ? (
                       <img src={pixData.qrcode} alt="PIX QR Code" className="w-48 h-48" />
                    ) : (
                      <div className="p-2 bg-white">
                        {/* If we have the library, we'd use QRCodeCanvas here */}
                        <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-[10px] text-gray-400 p-4 break-all">
                          {pixData.qrcode.substring(0, 50)}...
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(pixData.copyPaste);
                        alert('Copiado para a área de transferência!');
                      }}
                      className="w-full py-4 bg-[#2D2926] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C2410C] transition-colors"
                    >
                      Copiar Código PIX
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full py-4 text-[#2D2926]/40 text-[10px] font-bold uppercase tracking-widest hover:text-[#2D2926] transition-colors"
                    >
                      Já realizei o pagamento
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
