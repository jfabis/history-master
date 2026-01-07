import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, RotateCw, ChevronRight, ChevronLeft, Scroll } from 'lucide-react';

interface StudyCard {
  id: string;
  frontContent: string;
  backContent: string;
  type: 'FACT' | 'DATE' | 'FIGURE' | 'TERM' | 'EVENT';
}

interface Topic {
  id: string;
  name: string;
  description: string;
  _count?: { cards: number };
}

const StudyMode = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const topicId = searchParams.get('topicId');
  const navigate = useNavigate();
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [cards, setCards] = useState<StudyCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pobieranie tematów lub kart
  useEffect(() => {
    if (!topicId) {
      fetchTopics();
    } else {
      fetchCards(topicId);
    }
  }, [topicId]);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/drill/topics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCards = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:3000/api/study/${id}/cards`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCards(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectTopic = (id: string) => {
    setSearchParams({ topicId: id });
  };

  const handleNext = () => {
    if (isFlipped) setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 300);
  };

  const handlePrev = () => {
    if (isFlipped) setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 300);
  };

  // --- EKRAN WYBORU TEMATU ---
  if (!topicId) {
    return (
      <div className="min-h-screen bg-[#f0e6d2] font-serif text-[#2c241b] relative overflow-hidden flex flex-col items-center p-8">
         <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`}}></div>

         <button onClick={() => navigate('/dashboard')} className="self-start mb-8 flex items-center gap-2 text-[#5c4d3c] hover:text-[#8b1e1e] uppercase font-bold tracking-widest text-sm z-10 cursor-pointer">
            <ArrowLeft className="w-5 h-5" /> Powrót do Mapy
         </button>

         <h1 className="text-4xl font-bold text-[#2c241b] mb-2 font-cinzel text-center">Wybierz Księgę do Studiowania</h1>
         <p className="text-[#5c4d3c] mb-12 italic">Którą epokę chcesz dzisiaj zgłębić?</p>

         {loading ? (
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1e1e]"></div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
              {topics.map(topic => (
                <div 
                  key={topic.id}
                  onClick={() => selectTopic(topic.id)}
                  className="group bg-[#fdfbf7] border-2 border-[#d4c5a6] p-8 rounded-sm shadow-md hover:border-[#c5a059] hover:shadow-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="w-24 h-24 text-[#8b1e1e]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-[#2c241b] group-hover:text-[#8b1e1e] transition-colors font-cinzel">{topic.name}</h2>
                  <p className="text-[#5c4d3c] mb-6 leading-relaxed">{topic.description}</p>
                  <div className="flex items-center gap-2 text-sm text-[#8c7b75] font-bold tracking-widest uppercase">
                    <span>Otwórz Fiszki</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </div>
                </div>
              ))}
           </div>
         )}
      </div>
    );
  }

  // --- EKRAN KART (STUDY MODE) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0e6d2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1e1e]"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0e6d2] flex flex-col items-center justify-center font-serif text-[#2c241b]">
        <h2 className="text-2xl font-bold mb-4 font-cinzel">Ta księga jest pusta...</h2>
        <button onClick={() => setSearchParams({})} className="text-[#8b1e1e] underline font-bold cursor-pointer">Wybierz inną księgę</button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const getTypeLabel = (type: string) => {
    switch(type) {
        case 'DATE': return 'Kiedy to było?';
        case 'FIGURE': return 'Kto to jest?';
        case 'TERM': return 'Co to za pojęcie?';
        case 'EVENT': return 'Co to za wydarzenie?';
        default: return 'Zagadka Historyczna';
    }
  };

  return (
    <div className="min-h-screen bg-[#2c241b] flex flex-col items-center justify-center p-4 font-serif relative overflow-hidden">
      
      {/* --- Style CSS dla efektu 3D (Wstrzyknięte bezpośrednio) --- */}
      <style>{`
        .flip-card-container {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden; /* Safari */
          backface-visibility: hidden;
          border-radius: 0.5rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .flipped {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Tło tekstury */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-leather.png')` }}>
      </div>

      {/* Nawigacja Powrotu */}
      <button 
        onClick={() => setSearchParams({})} 
        className="absolute top-6 left-6 text-[#f3e5ab] flex gap-2 items-center hover:text-[#c5a059] transition-colors z-20 cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" /> 
        <span className="uppercase tracking-widest text-sm font-bold">Wybór Tematu</span>
      </button>

      {/* Nagłówek */}
      <div className="text-center mb-8 z-10">
          <h2 className="text-3xl lg:text-4xl text-[#f3e5ab] font-bold tracking-widest mb-2 font-cinzel">Księga Wiedzy</h2>
          <p className="text-[#c5a059] uppercase tracking-widest text-xs">Karta {currentIndex + 1} z {cards.length}</p>
      </div>

      {/* KONTENER KARTY (SCENA 3D) */}
      <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] flip-card-container z-10">
        
        {/* KARTA (OBIEKT OBROTOWY) */}
        <div 
          className={`flip-card-inner cursor-pointer shadow-2xl ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          
          {/* --- PRZÓD KARTY (PYTANIE / OPIS) --- */}
          <div className="flip-card-front bg-[#f0e6d2] border-[6px] border-[#5c4d3c] flex flex-col items-center justify-center p-8 text-center shadow-lg">
             <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#8b1e1e]"></div>
             <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#8b1e1e]"></div>
             <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#8b1e1e]"></div>
             <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#8b1e1e]"></div>

             <div className="mb-6 p-4 bg-[#e6dcc3] rounded-full text-[#8b1e1e] border border-[#d4c5a6] shadow-inner">
                <BookOpen size={48} />
             </div>
             
             <span className="text-[#8c7b75] uppercase text-xs font-bold tracking-[0.2em] mb-4">
                {getTypeLabel(currentCard.type)}
             </span>

             {/* Tutaj wyświetlamy backContent (czyli opis/zagadkę) */}
             <h3 className="text-xl md:text-2xl font-serif italic text-[#2c241b] leading-relaxed drop-shadow-sm px-4">
               "{currentCard.backContent}"
             </h3>

             <div className="mt-8 flex items-center gap-2 text-[#c5a059] text-sm uppercase tracking-widest animate-pulse">
                <RotateCw size={16} />
                <span>Kliknij aby zobaczyć odpowiedź</span>
             </div>
          </div>

          {/* --- TYŁ KARTY (ODPOWIEDŹ) --- */}
          <div className="flip-card-back bg-[#1a140e] border-[6px] border-[#c5a059] flex flex-col items-center justify-center p-8 text-center shadow-lg">
             <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <BookOpen size={150} color="#f3e5ab" />
             </div>

             <div className="relative z-10">
               <h4 className="text-[#c5a059] font-bold uppercase tracking-widest mb-6 border-b border-[#c5a059]/30 pb-2 inline-block">
                 Odpowiedź
               </h4>
               {/* Tutaj wyświetlamy frontContent (czyli hasło/nazwę) */}
               <p className="text-3xl md:text-5xl text-[#f3e5ab] leading-tight font-cinzel font-bold drop-shadow-md">
                 {currentCard.frontContent}
               </p>
             </div>
          </div>

        </div>
      </div>

      {/* PASEK STEROWANIA */}
      <div className="mt-10 flex items-center gap-8 z-10">
        <button 
          onClick={handlePrev}
          className="p-4 rounded-full bg-[#2c241b] border-2 border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#2c241b] transition-all cursor-pointer shadow-lg active:scale-95"
          title="Poprzednia karta"
        >
          <ChevronLeft size={24} />
        </button>

        <span className="text-[#8c7b75] font-serif italic text-lg select-none">Przewróć kartę</span>

        <button 
          onClick={handleNext}
          className="p-4 rounded-full bg-[#2c241b] border-2 border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-[#2c241b] transition-all cursor-pointer shadow-lg active:scale-95"
          title="Następna karta"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar na dole */}
      <div className="absolute bottom-0 left-0 h-2 bg-[#8b1e1e]" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%`, transition: 'width 0.3s' }}></div>

    </div>
  );
};

export default StudyMode;