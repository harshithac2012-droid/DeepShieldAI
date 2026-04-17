import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Mic, StopCircle, RefreshCw, ShieldAlert, CheckCircle, Info, Save, Loader2, Flag, ExternalLink, X, AlertTriangle } from 'lucide-react';
import { ElegantShape } from '../components/ui/shape-landing-hero';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { settings } from '../lib/config';

interface PredictionResponse {
  result: 'HUMAN' | 'AI' | 'INAUDIBLE';
  verdict: string;
  confidence: number;
  risk_level: string;
  technical_analysis: string[];
  recommendations?: string[];
  is_legitimate?: boolean;
}

interface MultiChunkResponse extends PredictionResponse {
  overall_result: 'HUMAN' | 'AI' | 'INAUDIBLE';
  overall_verdict: string;
  overall_confidence: number;
  chunks_analyzed: number;
  chunk_results: any[];
}

const CheckVoice = () => {
  const { user } = useAuth();
  const [method, setMethod] = useState<'upload' | 'record' | 'live' | null>(null);
  const [status, setStatus] = useState<'idle' | 'recording' | 'analyzing' | 'done'>('idle');
  const [result, setResult] = useState<{
    verdict: string;
    confidence: number;
    risk: string;
    markers: string[];
    recommendations: string[];
    isMulti?: boolean;
    chunksAnalyzed?: number;
  } | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [deepScan, setDeepScan] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      startAnalysis(e.target.files[0]);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const extension = mimeType.includes('wav') ? 'wav' : (mimeType.includes('ogg') ? 'ogg' : 'webm');
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const recordedFile = new File([audioBlob], `recording_${Date.now()}.${extension}`, { type: mimeType });
        setFile(recordedFile);
        startAnalysis(recordedFile);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setStatus('recording');
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 59) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const startAnalysis = async (audioFile?: File) => {
    const fileToProcess = audioFile || file;
    if (!fileToProcess) return;

    setStatus('analyzing');
    setSaved(false);
    
    try {
      const formData = new FormData();
      formData.append('file', fileToProcess);
      const isLong = fileToProcess.size > 500000;
      const endpoint = (deepScan || isLong) ? '/predict/multi' : '/predict';
      
      const response = await fetch(`${settings.API_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || 'Inference failed');
      }

      const data = await response.json();
      setApiResponse(data);
      
      if (endpoint === '/predict/multi') {
        const multiData = data as MultiChunkResponse;
        setResult({
          verdict: multiData.overall_verdict || (multiData.overall_result === 'AI' ? 'AI DETECTED' : 'HUMAN VERIFIED'),
          confidence: multiData.overall_confidence,
          risk: multiData.risk_level,
          markers: multiData.technical_analysis || [],
          recommendations: multiData.recommendations || [],
          isMulti: true,
          chunksAnalyzed: multiData.chunks_analyzed
        });
      } else {
        const singleData = data as PredictionResponse;
        setResult({
          verdict: singleData.verdict || (singleData.result === 'AI' ? 'AI DETECTED' : 'HUMAN VERIFIED'),
          confidence: singleData.confidence,
          risk: singleData.risk_level,
          markers: singleData.technical_analysis || [],
          recommendations: singleData.recommendations || [],
          isMulti: false
        });
      }
      setStatus('done');
    } catch (error: any) {
      console.error('API Error:', error);
      setStatus('idle');
      alert(`Analysis error: ${error.message || 'The audio format might not be supported or the file is corrupted.'}`);
    }
  };

  const saveResult = async () => {
    if (!apiResponse || !file) return;
    setSaving(true);
    try {
      const filename = file.name || `scan_${Date.now()}.wav`;
      const storagePath = `scans/${Date.now()}_${filename}`;
      await supabase.storage.from('voice-samples').upload(storagePath, file, { contentType: file.type });
      const { error: dbError } = await supabase.from('history').insert({
        file_name: filename,
        storage_path: storagePath,
        result: apiResponse.overall_result || apiResponse.result,
        confidence: apiResponse.overall_confidence || apiResponse.confidence,
        risk_level: apiResponse.risk_level,
        technical_analysis: apiResponse.technical_analysis || [],
      });
      if (dbError) throw dbError;
      setSaved(true);
    } catch (err: any) {
      console.error('Save error:', err);
      alert('Failed to save result: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReportSubmit = async () => {
    if (!user || !apiResponse) {
      alert("Please login to report this scam.");
      return;
    }
    setReporting(true);
    try {
      const response = await fetch(`${settings.API_URL}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_email: user.email,
          analysis_result: apiResponse,
          report_details: `Automated report. Verdict: ${apiResponse.verdict || apiResponse.overall_verdict}, Confidence: ${apiResponse.confidence || apiResponse.overall_confidence}%`
        })
      });
      if (!response.ok) throw new Error('Report failed');
      setReported(true);
      setTimeout(() => {
        setReported(false);
        setShowReportModal(false);
      }, 3000);
    } catch (err: any) {
      alert(`Report Error: ${err.message}`);
    } finally {
      setReporting(false);
    }
  };

  const reset = () => {
    setMethod(null);
    setStatus('idle');
    setResult(null);
    setFile(null);
    setApiResponse(null);
    setSaved(false);
  };

  const renderContent = () => {
    if (status === 'analyzing') {
      return (
        <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-12 max-w-md mx-auto relative">
             <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-cyan-500 w-1/2 shadow-[0_0_20px_#00f2ff]" />
          </div>
          <h3 className="text-3xl font-bold uppercase mb-2 animate-pulse">{deepScan ? "Deep Spectral Analysis" : "Decoding Signal"}</h3>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">NEURAL LAYERS PROCESSING...</p>
        </motion.div>
      );
    }

    if (status === 'done' && result) {
      const res = result;
      return (
        <motion.div key="done" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full py-10 px-8">
          <div className="mb-10">
             {res.verdict === 'AI DETECTED' ? (
               <div className="w-24 h-24 bg-red-600/10 border border-red-600/50 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                  <ShieldAlert size={48} className="text-red-600" />
               </div>
             ) : (
               <div className="w-24 h-24 bg-emerald-600/10 border border-emerald-600/50 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <CheckCircle size={48} className="text-emerald-500" />
               </div>
             )}
          </div>
          
          <h2 className={`text-6xl font-black mb-2 tracking-tighter uppercase ${res.verdict === 'AI DETECTED' ? 'text-red-600' : 'text-emerald-500'}`}>
            {res.verdict}
          </h2>
          <div className="font-mono text-2xl uppercase tracking-[0.3em] mb-4">
            CONFIDENCE: {res.confidence}%
          </div>
          
          {res.isMulti && (
            <div className="mb-8 text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
              Analyzed across {res.chunksAnalyzed} temporal segments
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-12 text-left">
             <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                <h4 className="text-[10px] font-mono text-gray-400 uppercase mb-4 tracking-widest border-b border-white/5 pb-2">Technical Artifacts</h4>
                <ul className="space-y-3">
                  {res.markers.map((m, i) => (
                    <li key={i} className="text-[9px] font-mono uppercase tracking-widest text-cyan-400/80 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1 shadow-[0_0_5px_cyan]"></span>
                      {m}
                    </li>
                  ))}
                </ul>
             </div>
             <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                <h4 className="text-[10px] font-mono text-gray-400 uppercase mb-4 tracking-widest border-b border-white/5 pb-2">Recommendations</h4>
                <ul className="space-y-3">
                  {res.recommendations.map((r, i) => (
                    <li key={i} className="text-[9px] font-mono uppercase tracking-widest text-gray-500 flex items-start gap-2">
                       <div className="w-1.5 h-1.5 border border-gray-700 mt-1"></div>
                       {r}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

           <div className="flex flex-wrap gap-4 justify-center">
             <button onClick={reset} className="glass-btn px-10 py-3 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2 rounded-lg">
               <RefreshCw size={14} /> Analyze New Voice
             </button>
             <button 
               onClick={saveResult} 
               disabled={saving || saved}
               className={`glass-btn px-10 py-3 uppercase text-[10px] font-mono tracking-widest rounded-lg flex items-center gap-2 ${saved ? 'border-emerald-500/30 text-emerald-400' : ''} disabled:opacity-60`}
             >
               {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : saved ? <><CheckCircle size={14} /> Saved</> : <><Save size={14} /> Save Result</>}
             </button>

             {res.verdict === 'AI DETECTED' && res.confidence > 80 && (
               <button onClick={() => setShowReportModal(true)} className="glass-btn px-10 py-3 uppercase text-[10px] font-mono tracking-widest rounded-lg flex items-center gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                 <ShieldAlert size={14} /> Report Scam
               </button>
             )}
           </div>
        </motion.div>
      );
    }

    if (!method) {
      return (
        <motion.div key="selector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-3xl flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <button onClick={() => setMethod('upload')} className="p-8 border border-white/5 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] transition-all group flex flex-col items-center gap-4 relative overflow-hidden h-48 justify-center">
              <Upload className="text-gray-400 group-hover:text-cyan-400 z-10" size={32} />
              <span className="font-bold uppercase tracking-widest text-[10px] z-10">Upload Audio</span>
            </button>
            <button onClick={() => setMethod('record')} className="p-8 border border-white/5 rounded-2xl hover:border-red-500/50 hover:bg-red-500/[0.02] transition-all group flex flex-col items-center gap-4 relative overflow-hidden h-48 justify-center">
              <Mic className="text-gray-400 group-hover:text-red-500 z-10" size={32} />
              <span className="font-bold uppercase tracking-widest text-[10px] z-10">Record Voice</span>
            </button>
            <button className="p-8 border border-white/5 rounded-2xl opacity-40 cursor-not-allowed group flex flex-col items-center gap-4 relative overflow-hidden h-48 justify-center">
              <ExternalLink className="text-gray-600" size={32} />
              <span className="font-bold uppercase tracking-widest text-[10px]">Live Stream</span>
              <div className="absolute top-2 right-2 bg-white/5 px-2 py-0.5 rounded-full text-[6px] text-gray-400 font-mono tracking-tighter">BETA_PENDING</div>
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 p-4 border border-white/5 rounded-2xl bg-white/[0.02]">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest font-bold">Deep Scan Mode</span>
              <span className="text-[8px] font-mono text-gray-600 uppercase">Multi-layer chunk analysis</span>
            </div>
            <button onClick={() => setDeepScan(!deepScan)} className={`w-12 h-6 rounded-full transition-colors relative ${deepScan ? 'bg-cyan-500' : 'bg-gray-800'}`}>
              <motion.div animate={{ x: deepScan ? 24 : 4 }} className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-lg" />
            </button>
          </div>
        </motion.div>
      );
    }

    if (method === 'upload') {
      return (
        <motion.div key="upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="audio/*" />
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 cursor-pointer hover:border-cyan-500" onClick={() => fileInputRef.current?.click()}>
            <Upload className="text-cyan-500" />
          </div>
          <h3 className="text-2xl font-bold uppercase mb-2">Select Your File</h3>
          <p className="text-gray-500 font-mono text-xs uppercase mb-8">MAX SIZE: 50MB | WAV, MP3, M4A</p>
          <button onClick={reset} className="glass-btn px-8 py-3 text-[10px] font-mono uppercase tracking-[0.2em] rounded-lg">Cancel</button>
        </motion.div>
      );
    }

    if (method === 'record') {
      return (
        <motion.div key="record" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center w-full">
          {status === 'idle' && (
             <>
              <button onClick={startRecording} className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105">
                <Mic fill="currentColor" />
              </button>
              <h3 className="text-2xl font-bold uppercase mb-2">Ready to Record</h3>
              <p className="text-gray-500 font-mono text-xs uppercase mb-8 tracking-widest">TAP TO BEGIN LIVE SPECTRAL CAPTURE</p>
             </>
          )}
          {status === 'recording' && (
             <>
              <div className="flex justify-center items-end gap-1 mb-12 h-20">
                {[...Array(20)].map((_, i) => (
                  <motion.div key={i} animate={{ height: [10, 80, 10] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }} className="w-1 bg-red-500 rounded-full" />
                ))}
              </div>
              <button onClick={stopRecording} className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <StopCircle className="text-red-500" fill="currentColor" />
              </button>
              <h3 className="text-2xl font-bold uppercase mb-2">Recording...</h3>
              <p className="text-red-500 font-mono text-xs uppercase mb-8 font-bold animate-pulse tracking-widest">
                [{String(Math.floor(recordingTime / 60)).padStart(2, '0')}:{String(recordingTime % 60).padStart(2, '0')} / 01:00]
              </p>
             </>
          )}
          {status === 'idle' && <button onClick={reset} className="glass-btn px-6 py-2 text-[10px] font-mono uppercase tracking-widest rounded-lg">Go Back</button>}
        </motion.div>
      );
    }

    return null;
  };

  return (
    <div className="pt-32 pb-20 px-[5%] bg-black text-white min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-cyan-500/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-emerald-500/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 leading-none">
            Check <span className="text-cyan-500">Voice</span>
          </h1>
          <p className="text-gray-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase flex items-center justify-center md:justify-start gap-2">
            <Info size={14} className="text-cyan-500" /> AASIST v3 Neural Interface Core
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03),transparent_70%)] pointer-events-none"></div>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
        
        <div className="mt-8 p-6 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl flex gap-4 items-start">
           <Info className="text-yellow-600 shrink-0" size={20} />
           <p className="text-[10px] font-mono text-yellow-600/60 uppercase leading-relaxed tracking-widest">
             AI Signal Analysis requires at least 3 seconds of continuous audio. Results are probabilistic based on known synthetic voice patterns and should be treated as high-precision estimates.
           </p>
        </div>
      </div>

      <AnimatePresence>
        {showReportModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[6000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-2xl w-full relative shadow-[0_0_100px_rgba(220,38,38,0.15)]">
              <button onClick={() => setShowReportModal(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={24} /></button>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center border border-red-500/20"><Flag className="text-red-500" /></div>
                <div>
                  <h2 className="text-2xl font-bold uppercase tracking-tighter">Cyber Crime Reporting</h2>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Process: Indian National Cyber Portal</p>
                </div>
              </div>
              <div className="space-y-6 text-gray-400">
                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl">
                  <p className="text-xs text-red-500/80 font-mono uppercase mb-2 flex items-center gap-2"><AlertTriangle size={14} /> Immediate Action Required</p>
                  <p className="text-sm">This sample has been flagged as a <strong>High Confidence AI Deepfake</strong> ({result?.confidence}% match).</p>
                </div>
                <div className="grid gap-4">
                  {["Visit cybercrime.gov.in", "Select 'Report Cyber Crime'", "Choose Financial Fraud", "Upload this report", "Call 1930 Helpline"].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono shrink-0">{i+1}</span>
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-3">
                <button onClick={handleReportSubmit} disabled={reporting || reported} className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2">
                  {reporting ? <Loader2 className="animate-spin" /> : reported ? <CheckCircle /> : <><Flag size={18} /> File Official Report</>}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckVoice;
