import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trophy, LogOut, Flame, Target, Scroll, Compass, BrainCircuit } from 'lucide-react';

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  progress: {
    xp: number;
    level: number;
    currentStreak: number;
    totalActiveDays: number;
    xpForNextLevel?: number;
    xpProgress?: number;
    xpNeeded?: number;
  } | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://localhost:3000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (e) {
      console.error("Błąd pobierania profilu:", e);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f0e6d2] font-serif text-[#2c241b] relative">

      {}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      {}
      <nav className="bg-[#2c241b] text-[#e6dcc3] shadow-lg sticky top-0 z-50 border-b-4 border-[#c5a059]">
        <div className="w-full px-6 lg:px-12">
          <div className="flex justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-[#c5a059] rounded-sm text-[#2c241b] shadow-inner">
                <Scroll className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-widest uppercase font-serif">
                HistoryMaster
              </span>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-base font-serif text-[#f3e5ab] tracking-wide">
                  {user?.displayName || user?.email || 'Ładowanie...'}
                </span>
                <span className="text-xs text-[#c5a059] uppercase tracking-widest">
                  Poziom {user?.progress?.level || 1} • {loading ? '...' : 'Kronikarz'}
                </span>
              </div>

              <div
                onClick={() => navigate('/profile')}
                className="h-10 w-10 rounded-full bg-[#f3e5ab] border-2 border-[#c5a059] flex items-center justify-center text-[#2c241b] font-bold shadow-md overflow-hidden relative cursor-pointer hover:scale-105 transition-transform"
                title="Zobacz Profil"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span>{user?.email?.charAt(0).toUpperCase()}</span>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="p-2 text-[#a89f91] hover:text-[#d9534f] transition-colors"
                title="Wyloguj (Zamknij Księgę)"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {}
      <main className="w-full px-6 lg:px-12 py-10 relative z-10">

        {}
        <div className="mb-12 border-b border-[#c5a059]/30 pb-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2c241b] mb-2 drop-shadow-sm font-cinzel">
            Witaj w Archiwum, {user?.displayName ? user.displayName.split(' ')[0] : 'Podróżniku'}.
          </h1>
          <p className="text-xl text-[#5c4d3c] italic font-light">
            "Historia jest nauczycielką życia." Wybierz swoją ścieżkę na dziś.
          </p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          <div className="bg-[#fdfbf7] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,36,27,0.2)] border border-[#d4c5a6] p-6 flex items-center gap-5 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-[#e8dec0] text-[#d9534f] rounded-full border border-[#d4c5a6]">
              <Flame className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-[#8c7b75] uppercase tracking-widest font-bold">Dni Aktywności</p>
              <p className="text-3xl font-bold text-[#2c241b]">
                {loading ? '...' : `${user?.progress?.totalActiveDays || 0}`}
              </p>
            </div>
          </div>

          <div className="bg-[#fdfbf7] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,36,27,0.2)] border border-[#d4c5a6] p-6 flex items-center gap-5 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="p-4 bg-[#e8dec0] text-[#c5a059] rounded-full border border-[#d4c5a6]">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm text-[#8c7b75] uppercase tracking-widest font-bold">Chwała (XP)</p>
              <p className="text-3xl font-bold text-[#2c241b]">
                {loading ? '...' : `${user?.progress?.xp || 0} XP`}
              </p>
            </div>
          </div>

          <div className="bg-[#fdfbf7] rounded-sm shadow-[4px_4px_0px_0px_rgba(44,36,27,0.2)] border border-[#d4c5a6] p-6 flex items-center gap-5 transform hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
            <div className="p-4 bg-[#e8dec0] text-[#5c4d3c] rounded-full border border-[#d4c5a6] z-10">
              <Target className="w-8 h-8" />
            </div>
            <div className="z-10 w-full pr-4">
              <div className="flex justify-between items-baseline">
                <p className="text-sm text-[#8c7b75] uppercase tracking-widest font-bold">
                  Poziom {user?.progress?.level || 1} <span className="mx-1 text-[#c5a059]">→</span> {(user?.progress?.level || 1) + 1}
                </p>
                <span className="text-xs text-[#c5a059] font-bold">
                  {user?.progress?.xpProgress || 0} / {user?.progress?.xpNeeded || 100} XP
                </span>
              </div>

              <div className="w-full bg-[#e6dcc3] h-2 rounded-full mt-2 overflow-hidden border border-[#d4c5a6]">
                <div
                  className="bg-[#8b1e1e] h-full transition-all duration-1000"
                  style={{ width: `${Math.min((user?.progress?.xpProgress || 0) / (user?.progress?.xpNeeded || 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {}
        <h2 className="text-3xl font-bold text-[#2c241b] mb-8 border-l-4 border-[#8b1e1e] pl-4 flex items-center gap-3 font-cinzel">
          <Compass className="w-8 h-8 text-[#8b1e1e]" />
          Mapa Wiedzy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {}
          <div
            onClick={() => navigate('/study')}
            className="group bg-[#fdfbf7] rounded-sm border-2 border-[#d4c5a6] overflow-hidden hover:border-[#c5a059] hover:shadow-2xl transition-all duration-300 cursor-pointer relative flex flex-col"
          >
            <div className="h-48 relative overflow-hidden bg-[#2c241b]">
              <img
                src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 sepia-[.3]"
                alt="Ancient Library"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c241b] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-[#f3e5ab] font-cinzel tracking-wide group-hover:text-[#c5a059] transition-colors drop-shadow-md">Księga Wiedzy</h3>
                <span className="text-[10px] text-[#e6dcc3] uppercase tracking-widest bg-black/30 px-2 py-1 rounded-sm">Fiszki</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#5c4d3c] text-sm mb-6 leading-relaxed flex-1">
                Przeglądaj starożytne zwoje. Odkrywaj daty, postacie i fakty w trybie swobodnej nauki.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/study'); }}
                className="w-full py-2 border-2 border-[#2c241b] text-[#2c241b] font-bold uppercase tracking-widest text-xs hover:bg-[#2c241b] hover:text-[#f3e5ab] transition-all"
              >
                Otwórz Księgę
              </button>
            </div>
          </div>

          {}
          <div
            onClick={() => navigate('/drill')}
            className="group bg-[#fdfbf7] rounded-sm border-2 border-[#d4c5a6] overflow-hidden hover:border-[#c5a059] hover:shadow-2xl transition-all duration-300 cursor-pointer relative flex flex-col"
          >
            <div className="h-48 relative overflow-hidden bg-[#2c241b]">
              <img
                src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 sepia-[.4]"
                alt="Ancient Rome"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c241b] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-[#f3e5ab] font-cinzel tracking-wide group-hover:text-[#c5a059] transition-colors drop-shadow-md">Wielki Test</h3>
                <span className="text-[10px] text-[#e6dcc3] uppercase tracking-widest bg-black/30 px-2 py-1 rounded-sm">Sprawdź Wiedzę</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#5c4d3c] text-sm mb-6 leading-relaxed flex-1">
                Stań do walki z pytaniami o dziejach imperiów. System dostosuje trudność do Twojej wiedzy.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/drill'); }}
                className="w-full py-2 border-2 border-[#2c241b] text-[#2c241b] font-bold uppercase tracking-widest text-xs hover:bg-[#2c241b] hover:text-[#f3e5ab] transition-all"
              >
                Otwórz Test
              </button>
            </div>
          </div>

          {}
          <div
            onClick={() => navigate('/timeline')}
            className="group bg-[#fdfbf7] rounded-sm border-2 border-[#d4c5a6] overflow-hidden hover:border-[#c5a059] hover:shadow-2xl transition-all duration-300 cursor-pointer relative flex flex-col"
          >
            <div className="h-48 relative overflow-hidden bg-[#2c241b]">
              <img
                src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700 sepia-[.2]"
                alt="Timeline"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c241b] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-[#f3e5ab] font-cinzel tracking-wide group-hover:text-[#c5a059] transition-colors drop-shadow-md">Oś Czasu</h3>
                <span className="text-[10px] text-[#e6dcc3] uppercase tracking-widest bg-black/30 px-2 py-1 rounded-sm">Chronologia</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#5c4d3c] text-sm mb-6 leading-relaxed flex-1">
                Interaktywna podróż przez wieki. Zobacz, co działo się w kluczowych momentach historii.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/timeline'); }}
                className="w-full py-2 border-2 border-[#2c241b] text-[#2c241b] font-bold uppercase tracking-widest text-xs hover:bg-[#2c241b] hover:text-[#f3e5ab] transition-all"
              >
                Podróżuj
              </button>
            </div>
          </div>

          {}
          <div
            onClick={() => navigate('/ai')}
            className="group bg-[#fdfbf7] rounded-sm border-2 border-[#d4c5a6] overflow-hidden hover:border-[#c5a059] hover:shadow-2xl transition-all duration-300 cursor-pointer relative flex flex-col"
          >
            <div className="absolute top-4 right-4 bg-[#8b1e1e] text-[#f3e5ab] text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm z-10 border border-[#c5a059] animate-pulse">
              Beta
            </div>
            <div className="h-48 relative overflow-hidden bg-[#2c241b]">
              {}
              <img
                src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=800&auto=format&fit=crop"
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700 sepia-[.2]"
                alt="AI Vision"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c241b] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-[#f3e5ab] font-cinzel tracking-wide group-hover:text-[#c5a059] transition-colors drop-shadow-md">Wizje AI</h3>
                <span className="text-[10px] text-[#e6dcc3] uppercase tracking-widest">Powered by AI</span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-[#5c4d3c] text-sm mb-6 leading-relaxed flex-1">
                Przyzwij obrazy dawnych bitew i zapomnianych królów za pomocą zaklęć sztucznej inteligencji.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/ai'); }}
                className="w-full py-2 border-2 border-[#2c241b] text-[#2c241b] font-bold uppercase tracking-widest text-xs hover:bg-[#2c241b] hover:text-[#f3e5ab] transition-all flex items-center justify-center gap-2"
              >
                <BrainCircuit size={14} />
                Przyzwij
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;