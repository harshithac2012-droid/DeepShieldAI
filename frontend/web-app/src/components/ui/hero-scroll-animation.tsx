'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef } from 'react';

import { ElegantShape } from './shape-landing-hero';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky font-semibold top-0 h-screen bg-black flex flex-col items-center justify-center text-white overflow-hidden'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

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
      </div>

      <h1 className='relative z-10 2xl:text-7xl text-6xl px-8 font-bold text-center tracking-tight leading-[120%] uppercase'>
        Why Detection Matters<br /> <span className='text-cyan-400'>In a Synthetic Reality.</span>
      </h1>
      <p className='relative z-10 mt-8 text-gray-500 font-mono text-sm tracking-widest max-w-2xl text-center px-10'>
        AI voice clones have weaponized trust. Our mission is to verify the resonance of truth in an era of digital deception.
      </p>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-gradient-to-t to-[#0d0d0d] from-[#000000] text-white overflow-hidden'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00f2ff11_1px,transparent_1px),linear-gradient(to_bottom,#00f2ff11_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'></div>
      <article className='container mx-auto relative z-10 px-6'>
        <h1 className='text-6xl leading-[100%] py-20 font-bold tracking-tighter uppercase text-center'>
          The Shadows of <br /> Synthetic Voices
        </h1>
        <div className='grid grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {/* Card 1: Threat Counter */}
          <div className='relative group p-6 bg-white/[0.02] border border-white/5 rounded-lg hover:border-cyan-500/30 transition-all duration-500'>
            <div className='text-[8px] font-mono text-cyan-500/60 uppercase tracking-[0.3em] mb-6'>// threat_landscape</div>
            <div className='text-5xl font-bold tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent'>3.1M</div>
            <div className='text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-6'>Deepfake attacks in 2024</div>
            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-[8px] font-mono text-gray-600 uppercase tracking-widest'>Voice Cloning</span>
                <span className='text-[8px] font-mono text-red-500'>+340%</span>
              </div>
              <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                <div className='h-full w-[85%] bg-gradient-to-r from-red-500/80 to-red-500/20 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[8px] font-mono text-gray-600 uppercase tracking-widest'>Financial Fraud</span>
                <span className='text-[8px] font-mono text-red-500'>+210%</span>
              </div>
              <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                <div className='h-full w-[62%] bg-gradient-to-r from-red-500/60 to-red-500/10 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[8px] font-mono text-gray-600 uppercase tracking-widest'>Identity Theft</span>
                <span className='text-[8px] font-mono text-red-500'>+175%</span>
              </div>
              <div className='w-full h-1 bg-white/5 rounded-full overflow-hidden'>
                <div className='h-full w-[48%] bg-gradient-to-r from-red-500/50 to-red-500/10 rounded-full'></div>
              </div>
            </div>
          </div>

          {/* Card 2: Attack Types */}
          <div className='relative group p-6 bg-white/[0.02] border border-white/5 rounded-lg hover:border-red-500/30 transition-all duration-500 mt-12'>
            <div className='text-[8px] font-mono text-red-500/60 uppercase tracking-[0.3em] mb-6'>// attack_vectors</div>
            <div className='space-y-4'>
              {[
                { type: 'CEO Fraud Calls', severity: 'CRITICAL', icon: '⚡' },
                { type: 'Bank Impersonation', severity: 'HIGH', icon: '🏦' },
                { type: 'Ransom Deepfakes', severity: 'HIGH', icon: '🔒' },
                { type: 'Social Engineering', severity: 'MEDIUM', icon: '🎭' },
                { type: 'KYC Bypass', severity: 'CRITICAL', icon: '🛡️' },
              ].map((item, i) => (
                <div key={i} className='flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg border border-white/5 group-hover:border-white/10 transition-all'>
                  <span className='text-lg'>{item.icon}</span>
                  <div className='flex-1'>
                    <div className='text-[10px] font-mono uppercase tracking-widest'>{item.type}</div>
                  </div>
                  <span className={`text-[7px] font-mono px-2 py-0.5 rounded-full uppercase tracking-widest ${item.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : item.severity === 'HIGH' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Live Feed */}
          <div className='relative group p-6 bg-white/[0.02] border border-white/5 rounded-lg hover:border-cyan-500/30 transition-all duration-500'>
            <div className='text-[8px] font-mono text-cyan-500/60 uppercase tracking-[0.3em] mb-4'>// real_time_intel</div>
            <div className='flex items-center gap-2 mb-6'>
              <div className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'></div>
              <span className='text-[8px] font-mono text-emerald-500 uppercase tracking-widest'>System Online</span>
            </div>
            <div className='space-y-3'>
              {[
                { time: '00:03', msg: 'Voice clone blocked — Mumbai, IN', status: 'blocked' },
                { time: '00:07', msg: 'Suspicious pattern flagged — NY, US', status: 'flagged' },
                { time: '00:12', msg: 'Authentic voice verified — London, UK', status: 'verified' },
                { time: '00:18', msg: 'AI synthesis detected — Seoul, KR', status: 'blocked' },
                { time: '00:24', msg: 'Biometric mismatch — Dubai, AE', status: 'flagged' },
                { time: '00:31', msg: 'Voice authenticated — Tokyo, JP', status: 'verified' },
              ].map((item, i) => (
                <div key={i} className='flex items-start gap-3'>
                  <span className='text-[8px] font-mono text-gray-700 mt-0.5 shrink-0'>{item.time}s</span>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1 shrink-0 ${item.status === 'blocked' ? 'bg-red-500' : item.status === 'flagged' ? 'bg-yellow-500' : 'bg-emerald-500'}`}></div>
                  <span className='text-[9px] font-mono text-gray-500 leading-relaxed'>{item.msg}</span>
                </div>
              ))}
            </div>
            <div className='mt-6 pt-4 border-t border-white/5'>
              <div className='flex justify-between'>
                <span className='text-[8px] font-mono text-gray-700 uppercase tracking-widest'>Threats blocked today</span>
                <span className='text-[10px] font-mono text-cyan-500 font-bold'>14,827</span>
              </div>
            </div>
          </div>

          {/* Card 4: Capabilities */}
          <div className='relative group p-6 bg-white/[0.02] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all duration-500 mt-12'>
            <div className='text-[8px] font-mono text-emerald-500/60 uppercase tracking-[0.3em] mb-6'>// core_modules</div>
            <div className='space-y-4'>
              {[
                { module: 'AASIST v3', desc: 'Graph attention-based spectral-temporal analysis', status: 'ACTIVE' },
                { module: 'VAD Engine', desc: 'Voice activity detection with silence filtering', status: 'ACTIVE' },
                { module: 'Pre-Emphasis', desc: 'Signal sharpening for vocal tract resonance', status: 'ACTIVE' },
                { module: 'Chunk Analysis', desc: 'Multi-segment temporal scanning', status: 'ACTIVE' },
                { module: 'Risk Scoring', desc: 'Probabilistic threat classification', status: 'ACTIVE' },
              ].map((item, i) => (
                <div key={i} className='p-3 bg-white/[0.02] rounded-lg border border-white/5'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-[10px] font-mono uppercase tracking-widest font-bold'>{item.module}</span>
                    <span className='text-[7px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest'>{item.status}</span>
                  </div>
                  <p className='text-[8px] font-mono text-gray-600 leading-relaxed'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </motion.section>
  );
};

const HeroScrollAnimation = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <main ref={container} className='relative h-[200vh] bg-black'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <footer className='group bg-black relative overflow-hidden'>
             <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent'></div>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-bold text-center bg-gradient-to-b from-gray-700 to-black bg-clip-text text-transparent transition-all ease-linear'>
            SHIELD
          </h1>
          <div className='bg-black text-white h-40 relative z-10 grid place-content-center text-sm font-mono tracking-widest rounded-tr-full rounded-tl-full border-t border-cyan-900/30'>
          </div>
        </footer>
      </main>
    </>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
