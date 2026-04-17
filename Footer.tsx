
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-[5%] bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-cyan-400 tracking-tighter text-xl">
          <Shield size={20} strokeWidth={2.5} />
          DEEPSHIELD AI
        </div>
        <p className="text-gray-700 text-[10px] font-mono uppercase tracking-[0.5em]">
          © 2026 DEEPSHIELD AI // TRUTH VERIFIED
        </p>
        <div className="flex gap-8 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
           <span className="hover:text-cyan-500 cursor-pointer">Privacy</span>
           <span className="hover:text-cyan-500 cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
