import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Scroll, User, Mail, Lock } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ displayName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/auth/register', formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Błąd rejestracji');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#e8dec0] font-serif">
      <div className="hidden lg:flex lg:w-3/5 relative justify-center items-center overflow-hidden border-r-4 border-[#5c4d3c] shadow-2xl">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=2074" className="w-full h-full object-cover sepia-[.3]" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c241b]/80 via-[#2c241b]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl px-16 text-[#f3e5ab]">
          <h1 className="text-5xl font-bold mb-6 font-cinzel text-[#ffecb3]">Dołącz do Kronik.</h1>
          <p className="text-xl text-[#e6dcc3] mb-8 font-serif italic">"Każda wielka podróż zaczyna się od pierwszego kroku."</p>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full bg-[#fdfbf7] p-10 rounded-sm shadow-2xl border-t-8 border-[#8b1e1e] relative">
          <div className="absolute top-4 right-4 text-[#e6dcc3]">
             <Scroll className="w-10 h-10 text-[#d4c5a6]" />
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2c241b] mb-2 font-cinzel">Rejestracja</h2>
            <p className="text-[#5c4d3c]">Stwórz nowe konto kronikarza</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#5c4d3c] mb-1">Twoje Imię</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-[#8c7b75] w-5 h-5" />
                <input 
                  type="text" 
                  className="w-full pl-10 p-3 bg-white border-2 border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm text-[#2c241b]"
                  placeholder="np. Mieszko I"
                  value={formData.displayName}
                  onChange={e => setFormData({...formData, displayName: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#5c4d3c] mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-[#8c7b75] w-5 h-5" />
                <input 
                  type="email" 
                  className="w-full pl-10 p-3 bg-white border-2 border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm text-[#2c241b]"
                  placeholder="twoj@email.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#5c4d3c] mb-1">Hasło</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-[#8c7b75] w-5 h-5" />
                <input 
                  type="password" 
                  className="w-full pl-10 p-3 bg-white border-2 border-[#d4c5a6] focus:border-[#8b1e1e] outline-none rounded-sm text-[#2c241b]"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm font-bold bg-red-100 p-2 rounded border border-red-200">{error}</div>}

            <button type="submit" disabled={loading} className="w-full py-4 bg-[#8b1e1e] text-[#f3e5ab] font-bold uppercase tracking-widest hover:bg-[#a02323] transition-colors shadow-md">
              {loading ? 'Tworzenie...' : 'Zarejestruj się'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-[#5c4d3c]">
            Masz już konto? <span onClick={() => navigate('/')} className="font-bold text-[#8b1e1e] cursor-pointer hover:underline">Zaloguj się</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;