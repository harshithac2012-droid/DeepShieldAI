
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import HowItWorks from './pages/HowItWorks';
import CheckVoice from './pages/CheckVoice';
import History from './pages/History';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ScrollToTop from './components/ScrollToTop';
import ChatbotIcon from './components/ChatbotIcon';
import { AuthProvider } from './context/AuthContext';
function AppContent() {
  return (
    <div className="relative bg-black text-white selection:bg-cyan-500 selection:text-black min-h-screen flex flex-col">
      {/* Global Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[10] opacity-[0.03]" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      <Navbar />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/check-voice" element={<CheckVoice />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <ChatbotIcon />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
