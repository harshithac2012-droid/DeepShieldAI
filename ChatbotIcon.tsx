import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Bot, Shield, Loader2 } from 'lucide-react';

const ChatbotIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-32 right-8 w-[95vw] md:w-[450px] h-[600px] max-h-[70vh] z-[5000] flex flex-col"
          >
            {/* Window Container */}
            <div className="flex-1 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_20px_rgba(6,182,212,0.1)] flex flex-col relative">
              
              {/* Header */}
              <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500 blur-md opacity-20 animate-pulse"></div>
                    <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20 relative z-10">
                      <Bot size={18} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Neural AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[7px] font-mono tracking-widest text-emerald-500 uppercase">System: Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 w-full bg-black relative">
                {/* Fallback Loading State */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-700">
                  <Loader2 className="animate-spin text-cyan-900" size={24} />
                  <span className="text-[8px] font-mono uppercase tracking-widest">Initalizing Interface...</span>
                </div>
                
                {/* Embed */}
                <div className="absolute inset-0 z-10">
                  <zapier-interfaces-chatbot-embed 
                    is-popup='false' 
                    chatbot-id='cmo15b3yr002lomgmrc06wvyp' 
                    height='100%' 
                    width='100%' 
                  ></zapier-interfaces-chatbot-embed>
                </div>
              </div>

              {/* Status Bar */}
              <div className="p-2 px-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
                <span className="text-[7px] font-mono text-gray-600 uppercase tracking-widest">Secure_Protocol_v3.1</span>
                <Shield size={10} className="text-gray-700" />
              </div>
            </div>

            {/* Pointer Decor */}
            <div className="absolute bottom-[-10px] right-10 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-white/10 border-r-[10px] border-r-transparent"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div 
        className="fixed bottom-10 right-8 z-[5000] cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
           <div className={`absolute inset-0 bg-cyan-500 blur-2xl opacity-40 transition-opacity duration-500 ${isOpen ? 'opacity-60' : 'animate-pulse'}`}></div>
           <div className={`glass-btn p-5 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.4)] relative z-10 transition-all flex items-center justify-center ${isOpen ? 'bg-cyan-500 text-black' : 'text-cyan-400'}`}>
              {isOpen ? <X size={28} strokeWidth={2.5} /> : <MessageSquareText size={28} strokeWidth={2.5} />}
           </div>
           
           {!isOpen && (
             <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#0A0A0A] border border-white/10 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none duration-300">
                <span className="text-[10px] font-mono whitespace-nowrap uppercase tracking-widest text-cyan-400">Ask Neural AI</span>
             </div>
           )}
        </motion.div>
      </div>

      <style>{`
        zapier-interfaces-chatbot-embed {
          border: none !important;
          height: 100% !important;
          width: 100% !important;
          display: block;
        }
      `}</style>
    </>
  );
};

export default ChatbotIcon;
