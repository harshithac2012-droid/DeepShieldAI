
import { motion } from 'framer-motion';
import { Upload, BarChart3, Fingerprint, Brain, CheckCircle2 } from 'lucide-react';

const StepCard = ({ num, title, desc, icon: Icon, details, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative flex flex-col md:flex-row gap-12 items-center mb-40"
    >
      <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-12 h-12 bg-cyan-500 text-black flex items-center justify-center font-bold text-xl rounded-lg">
            {num}
          </div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter">{title}</h2>
        </div>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">{desc}</p>
        <div className="grid grid-cols-2 gap-4">
          {details.map((d: string, i: number) => (
            <div key={i} className="flex items-center gap-3 text-xs font-mono text-gray-500 uppercase tracking-widest">
              <div className="w-1 h-1 bg-cyan-500"></div>
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className={`flex-1 flex justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
        <div className="relative group w-full max-w-sm aspect-square bg-[#0A0A0A] border border-white/5 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent"></div>
          <Icon size={120} strokeWidth={1} className="text-cyan-500 transition-transform duration-500 group-hover:scale-110" />
        </div>
      </div>
    </motion.div>
  );
}

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Audio Input",
      desc: "Submit any audio for analysis via file upload, live recording, or URL ingestion.",
      icon: Upload,
      details: ["WAV, MP3, FLAC Support", "Up to 10 min duration", "3s Minimum sample", "Multipart stream"]
    },
    {
      num: "02",
      title: "Waveform Extraction",
      desc: "Converting audio into analyzable neural formats through sample rate normalization and isolation.",
      icon: BarChart3,
      details: ["16kHz Normalization", "Noise Reduction", "Activity Detection", "Segment Isolation"]
    },
    {
      num: "03",
      title: "Spectrogram Generation",
      desc: "Visualizing frequency patterns over time to identify spectral gaps left by AI encoders.",
      icon: Fingerprint,
      details: ["MFCC Extraction", "Formant Tracking", "Harmonic Analysis", "Spectral Envelopes"]
    },
    {
      num: "04",
      title: "AI Deep Analysis",
      desc: "Multiple ensemble models analyze micro-pauses, breathing artifacts, and emotional inflection.",
      icon: Brain,
      details: ["ResNet Classification", "Transformer Attention", "Wav2Vec Embeddings", "Artifact Detector"]
    },
    {
      num: "05",
      title: "Comprehensive Results",
      desc: "A detailed verdict with explainable AI insights and specific risk benchmarks.",
      icon: CheckCircle2,
      details: ["Binary Verdict", "Confidence %", "Risk Level (L/M/H)", "Detection Markers"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-[5%] bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-32">
          <h1 className="text-6xl font-bold uppercase tracking-tighter mb-6">The Science of <span className="text-cyan-400">Detection</span></h1>
          <p className="text-gray-500 font-mono tracking-widest uppercase">Advanced neural network analysis detecting synthetic voices with precision</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-20 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-cyan-500/10 to-transparent hidden md:block"></div>
          {steps.map((step, i) => <StepCard key={i} {...step} index={i} />)}
        </div>

        <section className="mt-20 py-20 bg-[#0A0A0A] border border-white/5 rounded-3xl p-12 text-center">
           <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">Built on Open Research</h2>
           <p className="text-gray-500 mb-12 max-w-2xl mx-auto">Our models are trained on 15M+ voice samples, continuously learning from the latest deepfake techniques like RVC, WaveNet, and custom GANs.</p>
           <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-2xl tracking-tighter">PyTorch</span>
              <span className="font-bold text-2xl tracking-tighter">HuggingFace</span>
              <span className="font-bold text-2xl tracking-tighter">AASIST</span>
              <span className="font-bold text-2xl tracking-tighter">FastAPI</span>
           </div>
        </section>
      </div>
    </div>
  );
};

export default HowItWorks;
