
import HeroScrollAnimation from '../components/ui/hero-scroll-animation';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ElegantShape } from '../components/ui/shape-landing-hero';

const Home = () => {
  return (
    <div className="bg-black relative min-h-screen overflow-hidden">
      {/* Elegant Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
            delay={0.3}
            width={600}
            height={140}
            rotate={12}
            gradient="from-cyan-500/[0.15]"
            className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
            delay={0.5}
            width={500}
            height={120}
            rotate={-15}
            gradient="from-emerald-500/[0.15]"
            className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
            delay={0.4}
            width={300}
            height={80}
            rotate={-8}
            gradient="from-cyan-500/[0.15]"
            className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
            delay={0.7}
            width={150}
            height={40}
            rotate={-25}
            gradient="from-emerald-500/[0.15]"
            className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <HeroScrollAnimation />


      {/* Feature Highlight */}
      <section className="py-40 px-[5%] relative z-10">
          <div className="max-w-7xl mx-auto">
             <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[10px] font-mono tracking-widest uppercase mb-8">
                    // Operational Status: 100%
                  </div>
                  <h2 className="text-6xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
                    The Grid <br /><span className="text-gray-600">is Scanning.</span>
                  </h2>
                  <p className="text-gray-500 mb-12 max-w-xl uppercase font-mono text-[10px] tracking-[0.3em] leading-loose">
                    We process millions of vocal tokens every second to ensure that the voice you hear is the voice you expect. No clones, no fakes, just resonance.
                  </p>
                  <div className="flex gap-4">
                     <Link to="/check-voice" className="glass-btn flex items-center gap-4 px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] rounded-xl group">
                        <Play size={14} fill="currentColor" className="group-hover:scale-125 transition-transform" /> 
                        Initial Scan
                     </Link>
                     <Link to="/about" className="px-10 py-5 font-bold uppercase text-[10px] tracking-[0.3em] border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                        Protocol Details
                     </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative">
                   <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full"></div>
                   {[
                     { label: 'Latency', value: '4.2ms', sub: 'Sub-cycle processing' },
                     { label: 'Accuracy', value: '99.9%', sub: 'Neural verification' },
                     { label: 'Monitored', value: '24/7', sub: 'Automated defense' },
                     { label: 'Nodes', value: '12.4k', sub: 'Global mesh network' }
                   ].map((stat, i) => (
                     <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm relative z-10 hover:border-cyan-500/30 transition-all group">
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest mb-4 group-hover:text-cyan-500 transition-colors">{stat.label}</div>
                        <div className="text-3xl font-bold tracking-tighter mb-1">{stat.value}</div>
                        <div className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">{stat.sub}</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
      </section>

    </div>
  );
};

export default Home;
