import { useState, useEffect } from 'react';
import { Shield, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl px-8 h-16 flex justify-between items-center z-[5000] rounded-2xl transition-all duration-500 border ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] px-10' : 'bg-transparent border-transparent'}`}>
      <Link to="/" className="flex items-center gap-2 font-bold text-white tracking-tighter text-xl group">
        <div className="relative">
          <Shield size={22} className="text-cyan-400 relative z-10" strokeWidth={2.5} />
          <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-cyan-400 transition-all duration-500">DEEPSHIELD AI</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-1">
        {[
          { name: 'How It Works', path: '/how-it-works' },
          { name: 'About Us', path: '/about' },
          { name: 'History', path: '/history' },
          { name: 'Check Voice', path: '/check-voice', highlight: true }
        ].map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`px-4 py-2 text-[9px] font-mono tracking-widest uppercase transition-all duration-300 rounded-lg ${
              location.pathname === item.path 
                ? 'text-white bg-white/10' 
                : item.highlight ? 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-xs font-bold uppercase">
              {user.email?.charAt(0) || 'U'}
            </div>
            <button 
              onClick={handleSignOut}
              className="text-[9px] font-mono tracking-widest uppercase text-gray-400 hover:text-red-400 transition-colors px-4 flex items-center gap-2"
            >
              <LogOut size={14} /> Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-[9px] font-mono tracking-widest uppercase text-gray-400 hover:text-white transition-colors px-4">
            Login
          </Link>
        )}
        <Link to="/check-voice" className="glass-btn text-[9px] font-mono tracking-widest uppercase px-6 py-2.5 rounded-xl border-cyan-500/30">
          Verify Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
