import { useEffect, useState } from 'react';
import { Clock, Loader2, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ScanRecord {
  id: string;
  created_at: string;
  file_name: string;
  result: string;
  confidence: number;
  risk_level: string;
}

const History = () => {
  const [records, setRecords] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (err) {
      console.error('History fetch error:', err);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await supabase.from('history').delete().eq('id', id);
      setRecords(records.filter(r => r.id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="pt-32 pb-20 px-[5%] bg-black text-white min-h-screen relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">Safety History</h1>
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
              <Clock size={14} className="text-cyan-500" /> Archives of Neural Verification
            </p>
          </div>
          <div className="flex gap-4">
             <button onClick={fetchHistory} className="px-6 py-2 border border-white/5 text-[10px] font-mono uppercase bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2">
               <RefreshCw size={12} /> Refresh
             </button>
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                <th className="p-6">ID</th>
                <th className="p-6">Date / Time</th>
                <th className="p-6">File Name</th>
                <th className="p-6 text-center">Result</th>
                <th className="p-6 text-center">Confidence</th>
                <th className="p-6 text-center">Risk</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs uppercase font-mono tracking-widest text-gray-400">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-20 text-center">
                    <Loader2 className="animate-spin mx-auto text-cyan-500 mb-4" size={32} />
                    Decoding Archives...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-20 text-center text-gray-600">No verification records found. Scan a voice sample first.</td>
                </tr>
              ) : (
                records.map((r, idx) => (
                  <tr key={r.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 text-gray-600">#{idx + 1}</td>
                    <td className="p-6">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="p-6 text-white">{r.file_name}</td>
                    <td className="p-6 text-center">
                      <span className={`px-3 py-1 rounded ${r.result === 'AI' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                        {r.result === 'AI' ? 'DEEPFAKE' : 'AUTHENTIC'}
                      </span>
                    </td>
                    <td className="p-6 text-center text-white">{r.confidence}%</td>
                    <td className="p-6 text-center">
                      <span className={`px-2 py-0.5 rounded text-[8px] ${
                        r.risk_level === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                        r.risk_level === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                        r.risk_level === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {r.risk_level}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex justify-end gap-3 text-gray-600">
                        <Trash2 size={18} className="hover:text-red-500 cursor-pointer" onClick={() => deleteRecord(r.id)} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
