import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Save, Activity, ShieldCheck } from 'lucide-react';

interface UserStats {
  totalAnswers: number;
  correctAnswers: number;
  accuracy: number;
}

interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  hasPassword?: boolean;
  progress: {
    xp: number;
    level: number;
    currentStreak: number;
    xpForNextLevel?: number;
    xpProgress?: number;
    xpNeeded?: number;
  };
  stats: UserStats;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error(err);
      // ProtectedRoute obsługuje przekierowanie, więc tutaj tylko logujemy błąd
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });
    setPasswordLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3000/api/users/password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswordMsg({ type: 'success', text: 'Hasło zostało zmienione.' });
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err: any) {
      setPasswordMsg({ type: 'error', text: err.response?.data?.error || 'Błąd zmiany hasła' });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#f0e6d2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1e1e]"></div>
      </div>
    );
  }

  const joinDate = new Date(profile.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-[#2c241b] font-serif text-[#2c241b] relative overflow-hidden flex flex-col">

      {/* Tło */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/dark-leather.png')` }}>
      </div>

      {/* Navbar Powrotu */}
      <nav className="p-6 relative z-10 bg-[#2c241b]/90 backdrop-blur-md border-b border-[#c5a059]/30">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[#c5a059] hover:text-[#f3e5ab] font-bold uppercase tracking-widest text-sm cursor-pointer transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Powrót do Mapy
        </button>
      </nav>

      <main className="flex-1 p-6 md:p-12 overflow-y-auto z-10 flex justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* KOLUMNA 1: Karta Postaci */}
          <div className="lg:col-span-1">
            <div className="bg-[#fdfbf7] rounded-sm p-8 border-4 border-[#d4c5a6] shadow-2xl relative text-center">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#8b1e1e]"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#8b1e1e]"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#8b1e1e]"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#8b1e1e]"></div>

              {/* Awatar */}
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#c5a059] overflow-hidden shadow-md mb-6 relative bg-[#e6dcc3]">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-5xl font-cinzel text-[#8b1e1e] flex items-center justify-center h-full">
                    {profile.email.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold font-cinzel text-[#2c241b] mb-1">{profile.displayName || 'Nieznany Kronikarz'}</h2>
              <p className="text-[#8c7b75] text-sm uppercase tracking-widest font-bold mb-2">Poziom {profile.progress.level}</p>

              {/* Pasek postępu XP */}
              {profile.progress.xpNeeded && (
                <div className="mb-6">
                  <div className="w-full bg-[#e6dcc3] rounded-full h-2 overflow-hidden border border-[#d4c5a6]">
                    <div
                      className="bg-gradient-to-r from-[#c5a059] to-[#8b1e1e] h-full transition-all duration-500"
                      style={{ width: `${Math.min((profile.progress.xpProgress || 0) / profile.progress.xpNeeded * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-center text-[#8c7b75] mt-1">
                    {profile.progress.xpProgress} / {profile.progress.xpNeeded} XP do poziomu {profile.progress.level + 1}
                  </p>
                </div>
              )}

              <div className="text-left space-y-4 text-sm text-[#5c4d3c] border-t border-[#e6dcc3] pt-6">
                <div className="flex justify-between items-center border-b border-[#e6dcc3]/50 pb-2">
                  <span>Dołączył:</span>
                  <span className="font-bold">{joinDate}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase text-[#8c7b75]">Email:</span>
                  <span className="font-bold break-all bg-[#e6dcc3]/30 p-2 rounded border border-[#d4c5a6]">
                    {profile.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLUMNA 2: Statystyki i Ustawienia */}
          <div className="lg:col-span-2 space-y-8">

            {/* Statystyki */}
            <div className="bg-[#fdfbf7] rounded-sm p-8 border-2 border-[#d4c5a6] shadow-lg relative">
              <h3 className="text-xl font-bold font-cinzel text-[#2c241b] mb-6 flex items-center gap-2 border-b border-[#c5a059]/30 pb-2">
                <Activity className="w-5 h-5 text-[#8b1e1e]" /> Osiągnięcia Bitewne
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#e6dcc3]/30 p-4 rounded border border-[#d4c5a6] text-center">
                  <div className="text-[#8b1e1e] font-bold text-3xl font-cinzel mb-1">{profile.progress.xp}</div>
                  <div className="text-xs uppercase tracking-widest text-[#5c4d3c]">Całkowite XP</div>
                </div>
                <div className="bg-[#e6dcc3]/30 p-4 rounded border border-[#d4c5a6] text-center">
                  <div className="text-[#c5a059] font-bold text-3xl font-cinzel mb-1">{profile.stats.totalAnswers}</div>
                  <div className="text-xs uppercase tracking-widest text-[#5c4d3c]">Udzielone Odpowiedzi</div>
                </div>
                <div className="bg-[#e6dcc3]/30 p-4 rounded border border-[#d4c5a6] text-center">
                  <div className={`font-bold text-3xl font-cinzel mb-1 ${profile.stats.accuracy >= 70 ? 'text-green-700' : 'text-[#5c4d3c]'}`}>
                    {profile.stats.accuracy}%
                  </div>
                  <div className="text-xs uppercase tracking-widest text-[#5c4d3c]">Celność</div>
                </div>
              </div>
            </div>

            {/* Zmiana Hasła (Warunkowa) */}
            {profile.hasPassword ? (
              <div className="bg-[#fdfbf7] rounded-sm p-8 border-2 border-[#d4c5a6] shadow-lg relative">
                <h3 className="text-xl font-bold font-cinzel text-[#2c241b] mb-6 flex items-center gap-2 border-b border-[#c5a059]/30 pb-2">
                  <Lock className="w-5 h-5 text-[#8b1e1e]" /> Bezpieczeństwo
                </h3>

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-[#5c4d3c] uppercase mb-1">Obecne Hasło</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-white border border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm"
                      placeholder="••••••••"
                      value={passwordData.currentPassword}
                      onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5c4d3c] uppercase mb-1">Nowe Hasło</label>
                    <input
                      type="password"
                      className="w-full p-2 bg-white border border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm"
                      placeholder="Min. 6 znaków"
                      value={passwordData.newPassword}
                      onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    />
                  </div>

                  {passwordMsg.text && (
                    <div className={`text-sm p-2 rounded ${passwordMsg.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {passwordMsg.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-6 py-2 bg-[#2c241b] text-[#f3e5ab] font-bold uppercase tracking-widest text-sm hover:bg-[#3d3226] transition-colors flex items-center gap-2"
                  >
                    {passwordLoading ? 'Zapisywanie...' : <><Save size={16} /> Zmień Hasło</>}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#fdfbf7] rounded-sm p-8 border-2 border-[#d4c5a6] shadow-lg relative flex flex-col items-center text-center">
                <div className="p-4 bg-[#e6dcc3] rounded-full text-[#8b1e1e] mb-4">
                  <ShieldCheck size={40} />
                </div>
                <h3 className="text-xl font-bold font-cinzel text-[#2c241b] mb-2">Konto Zewnętrzne</h3>
                <p className="text-[#5c4d3c] text-sm max-w-md">
                  Logujesz się za pomocą konta Google. Twoje hasło jest zarządzane przez dostawcę tożsamości i nie może być zmienione w tej aplikacji.
                </p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;