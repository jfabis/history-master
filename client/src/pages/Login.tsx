import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Scroll, Feather, Mail, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GOOGLE_AUTH_SUCCESS' && event.data?.token) {
        localStorage.setItem('token', event.data.token);
        navigate('/dashboard');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      'http://localhost:3000/auth/google',
      'Google Login',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/auth/login', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError('Nieprawidłowy email lub hasło.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#e8dec0] font-serif">

      {/* TŁO */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          filter: 'sepia(100%) contrast(120%)'
        }}
      />

      {/* LEWA STRONA */}
      <div className="hidden lg:flex lg:w-3/5 relative justify-center items-center overflow-hidden border-r-4 border-[#5c4d3c] shadow-2xl">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=2070&auto=format&fit=crop"
            alt="Ancient Statue"
            className="w-full h-full object-cover sepia-[.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c241b]/80 via-[#2c241b]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl px-16 text-[#f3e5ab]">
          <div className="mb-6 flex items-center gap-3 opacity-80">
            <Feather className="w-8 h-8" />
            <span className="text-xl font-serif tracking-widest uppercase border-b border-[#f3e5ab]/30 pb-1">Anno Domini 2026</span>
          </div>

          <h1 className="text-6xl xl:text-7xl font-bold mb-8 leading-tight drop-shadow-lg text-[#ffecb3] font-cinzel">
            Odkryj tajemnice <br /> przeszłości.
          </h1>

          <p className="text-xl xl:text-2xl text-[#e6dcc3] mb-12 font-light leading-relaxed drop-shadow-md border-l-4 border-[#c5a059] pl-6 italic font-serif">
            "Historia jest świadkiem czasów, światłem prawdy, życiem pamięci, nauczycielką życia."
            <span className="block mt-4 text-sm not-italic font-sans tracking-wide uppercase text-[#c5a059]">— Cyceron</span>
          </p>
        </div>
      </div>

      {/* PRAWA STRONA */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative z-10 overflow-y-auto">
        <div className="max-w-md w-full">

          <div className="bg-[#fdfbf7] p-10 rounded-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-t-8 border-[#8b1e1e] relative">

            <div className="absolute top-4 right-4 text-[#e6dcc3]">
              <Scroll className="w-12 h-12 text-[#d4c5a6]" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#2c241b] mb-2 uppercase tracking-wide border-b-2 border-[#d4c5a6] inline-block pb-2 font-cinzel">
                HistoryMaster
              </h2>
              <p className="mt-2 text-[#5c4d3c] italic">Zaloguj się, aby otworzyć księgi.</p>
            </div>

            {/* Formularz Email/Hasło */}
            <form onSubmit={handleLocalLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-[#5c4d3c] uppercase mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-[#8c7b75] w-4 h-4" />
                  <input
                    type="email"
                    className="w-full pl-9 p-2.5 bg-white border-2 border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm text-[#2c241b]"
                    placeholder="twoj@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#5c4d3c] uppercase mb-1">Hasło</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-[#8c7b75] w-4 h-4" />
                  <input
                    type="password"
                    className="w-full pl-9 p-2.5 bg-white border-2 border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm text-[#2c241b]"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {error && <div className="text-red-600 text-xs font-bold">{error}</div>}

              <button type="submit" disabled={loading} className="w-full py-3 bg-[#2c241b] text-[#f3e5ab] font-bold uppercase tracking-widest hover:bg-[#3d3226] transition-colors border border-[#2c241b]">
                {loading ? 'Logowanie...' : 'Zaloguj się'}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#d4c5a6]"></div>
              <span className="flex-shrink-0 mx-4 text-[#8c7b75] text-xs uppercase font-bold">Lub</span>
              <div className="flex-grow border-t border-[#d4c5a6]"></div>
            </div>

            {/* Przycisk Google */}
            <button
              onClick={handleGoogleLogin}
              className="mt-4 w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-[#d4c5a6] hover:border-[#c5a059] text-[#5c4d3c] font-bold transition-all shadow-sm hover:bg-[#fffcf5]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
              <span>Kontynuuj przez Google</span>
            </button>

            <div className="mt-8 text-center text-sm text-[#5c4d3c]">
              Nie masz jeszcze konta? <span onClick={() => navigate('/register')} className="font-bold text-[#8b1e1e] cursor-pointer hover:underline uppercase tracking-wide">Zarejestruj się</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;