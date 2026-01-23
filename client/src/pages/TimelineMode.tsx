import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

function TimelineItem({ mouseX, item }: { mouseX: MotionValue, item: any }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-200, 0, 200], [63, 242, 63]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const textScale = useTransform(width, [63, 242], [0.8, 4]);

  const opacitySync = useTransform(distance, [-100, 0, 100], [0, 1, 0]);
  const opacity = useSpring(opacitySync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="relative aspect-square rounded-full border-[3px] border-[#4a3b2a] shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer shrink-0 z-10 group overflow-visible bg-gradient-to-br from-[#e6dcc3] via-[#c5a059] to-[#8b7355]"
    >
      {/* Efekt połysku (szkło/klejnot) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/40 rounded-full pointer-events-none overflow-hidden"></div>

      {/* Wewnętrzny pierścień ozdobny */}
      <div className="absolute inset-[3px] border border-[#5c4d3c]/40 rounded-full pointer-events-none"></div>

      <motion.span
        style={{ scale: textScale }}
        className="font-bold text-[#2c241b] text-center leading-none px-1 font-cinzel drop-shadow-sm z-20 pointer-events-none whitespace-nowrap text-[10px]"
      >
        {item.year}
      </motion.span>

      {/* DYMEK Z DETALAMI (Wyskakuje nad datą) */}
      <motion.div
        style={{ opacity, y: -250, x: '-50%', scale: opacity }}
        className="absolute left-1/2 w-80 bg-[#fdfbf7] p-6 rounded-sm border-2 border-[#8b1e1e] shadow-[0_20px_60px_rgba(0,0,0,0.6)] pointer-events-none z-50 origin-bottom font-serif text-left"
      >
        {/* Dekoracyjne narożniki dymka */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#8b1e1e]"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#8b1e1e]"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-[#8b1e1e]"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-[#8b1e1e]"></div>

        {/* Strzałka dymka */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#fdfbf7] border-b-2 border-r-2 border-[#8b1e1e] rotate-45"></div>

        <div className="flex justify-between items-center mb-2 border-b border-[#c5a059]/50 pb-2">
          <span className="text-[10px] text-[#8b1e1e] uppercase tracking-widest font-bold">{item.era}</span>
          <span className="text-xs font-bold text-[#2c241b] bg-[#e6dcc3] px-2 py-0.5 rounded">{item.year}</span>
        </div>

        <h3 className="text-xl font-bold font-cinzel text-[#2c241b] leading-tight mb-3">
          {item.title}
        </h3>

        <p className="text-sm text-[#5c4d3c] italic leading-relaxed">
          {item.description}
        </p>
      </motion.div>

      <div className="absolute top-full left-1/2 w-0.5 h-10 bg-[#5c4d3c] -z-10 opacity-0 pointer-events-none"></div>
    </motion.div>
  );
}

const TimelineMode = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/timeline', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Błąd pobierania osi czasu:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2c241b] text-[#f3e5ab] font-serif overflow-hidden flex flex-col relative">

      {/* Tło - Mapa */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          filter: 'sepia(80%) contrast(110%)'
        }}
      />
      <div className="absolute inset-0 bg-[#2c241b]/40 mix-blend-multiply pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="p-6 flex items-center justify-between border-b border-[#c5a059]/30 relative z-20 bg-[#2c241b]/80 backdrop-blur-md shadow-lg">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[#c5a059] hover:text-[#f3e5ab] font-bold uppercase tracking-widest text-sm cursor-pointer transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Powrót
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-cinzel font-bold text-[#f3e5ab] drop-shadow-md">Wielka Oś Czasu</h1>
          <p className="text-xs text-[#8c7b75] uppercase tracking-[0.3em] mt-1">Interaktywna Chronologia</p>
        </div>
        <Clock className="w-6 h-6 text-[#c5a059]" />
      </nav>

      {/* --- KONTENER PRZEWIJANIA --- */}
      <div className="flex-1 flex flex-col justify-center overflow-x-auto overflow-y-visible custom-scrollbar relative cursor-grab active:cursor-grabbing">

        {/* Główna Linia Pozioma (Oś) - Idealnie wyśrodkowana */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#5c4d3c] min-w-[300vw] z-0 shadow-sm border-t border-b border-[#2c241b]"></div>

        {/* --- STREFA AKTYWNA (HITBOX) --- 
             pl-20: Start od lewej (nie od środka).
             pr-[50vw]: Bufor na końcu.
         */}
        <div
          className="flex items-center gap-6 pl-20 pr-[50vw] min-w-max h-[450px] z-10"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {loading ? (
            <div className="text-[#c5a059] animate-pulse text-xl font-cinzel self-center">Ładowanie kronik historycznych...</div>
          ) : events.length === 0 ? (
            <div className="text-red-400 self-center">Brak danych w bazie. Uruchom seed!</div>
          ) : (
            events.map((item) => (
              <TimelineItem key={item.id} mouseX={mouseX} item={item} />
            ))
          )}
        </div>

        <div className="fixed bottom-8 left-0 right-0 text-center pointer-events-none opacity-80 z-0 bg-[#2c241b]/50 backdrop-blur-sm py-2">
          <p className="text-[#f3e5ab] text-sm uppercase tracking-widest mb-1 font-bold text-shadow">
            Przesuwaj w bok (Shift + Scroll) • Najeżdżaj na daty
          </p>
          <Info className="w-4 h-4 mx-auto text-[#c5a059]" />
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            height: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #1a140e;
            border-top: 1px solid #5c4d3c;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #c5a059;
            border-radius: 6px;
            border: 2px solid #1a140e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #d4c5a6;
        }
      `}</style>
    </div>
  );
};

export default TimelineMode;