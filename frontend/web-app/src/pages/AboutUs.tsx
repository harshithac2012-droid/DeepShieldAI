
import { motion } from 'framer-motion';
import { Target, Shield, Heart, Activity, Globe, Zap, Cpu, Lock } from 'lucide-react';

interface DetailCardProps {
  title: string;
  desc: string;
  icon: any; // Lucide icon type
  span?: string;
  delay?: number;
}

const DetailCard = ({ title, desc, icon: Icon, span = "", delay = 0 }: DetailCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className={`p-8 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group ${span}`}
  >
    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold uppercase tracking-tight mb-4">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const AboutUs = () => {
  return (
    <div className="pt-32 pb-20 px-[5%] bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed -top-20 -right-20 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full z-0"></div>
      <div className="fixed -bottom-20 -left-20 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[10px] font-mono tracking-widest uppercase mb-8"
          >
            Digital Identity Defense
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-bold uppercase tracking-tighter mb-8 max-w-4xl mx-auto leading-[0.9]"
          >
            A World of <span className="text-cyan-400">Total Vocal Integrity.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            DeepShield AI was founded on a singular premise: as AI shadows grow, the light of verification must shine brighter. 
          </motion.p>
        </div>

        {/* Bento Grid Details */}
        <section className="grid md:grid-cols-4 gap-6 mb-32">
          <DetailCard 
            title="The Mission"
            desc="To preserve the sanctity of the human voice through decentralized neural verification protocols. We fight the $1.2B voice cloning pandemic with precision."
            icon={Target}
            span="md:col-span-2"
          />
          <DetailCard 
            title="Pure AI"
            desc="Models trained on 150M+ verified human speech segments for unmatched accuracy."
            icon={Cpu}
            delay={0.1}
          />
          <DetailCard 
            title="Zero Trust"
            desc="Every signal is treated as synthetic until verified by our multi-layered ensemble grid."
            icon={Lock}
            delay={0.2}
          />
          <DetailCard 
            title="Global Access"
            desc="Democratizing deepfake defense for families and small businesses worldwide."
            icon={Globe}
            delay={0.3}
          />
          <DetailCard 
            title="Real-time Defense"
            desc="Our sub-500ms inference latency allows for immediate protection during live calls."
            icon={Zap}
            span="md:col-span-2"
            delay={0.4}
          />
          <DetailCard 
            title="Ethical AI"
            desc="Transparent detection markers explaining exactly why a voice is flagged."
            icon={Heart}
            delay={0.5}
          />
        </section>

        {/* Stats Summary */}
        <section className="py-20 border-t border-white/5 grid md:grid-cols-4 gap-12 text-center opacity-60 hover:opacity-100 transition-opacity">
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter">2.5M+</div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Signal Scans</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter">$50M+</div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Losses Prevented</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2 tracking-tighter">99.7%</div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Core Accuracy</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-cyan-500 mb-2 tracking-tighter">50ms</div>
              <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Latency Threshold</div>
            </div>
        </section>

        <div className="mt-32 text-center">
            <button className="glass-btn px-12 py-5 rounded-xl font-bold uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-4 mx-auto">
               View Whitepaper <Activity size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
