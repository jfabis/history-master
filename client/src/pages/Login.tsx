import { Scroll, Feather } from 'lucide-react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen w-full flex relative overflow-hidden bg-[#e8dec0]">
      
      {/* TŁO - Mapa w tle (Overlay) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')`, // Stabilna tekstura starej mapy
             backgroundSize: 'cover',
             filter: 'sepia(100%) contrast(120%)'
           }} 
      />

      {/* LEWA STRONA - Epicka Grafika / "Okładka" */}
      <div className="hidden lg:flex lg:w-3/5 relative justify-center items-center overflow-hidden border-r-4 border-[#5c4d3c] shadow-2xl">
        <div className="absolute inset-0">
          {/* Niezawodny posąg z Unsplash */}
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
          
          <h1 className="text-6xl xl:text-7xl font-bold mb-8 leading-tight drop-shadow-lg text-[#ffecb3]">
            Odkryj tajemnice <br/> przeszłości.
          </h1>
          
          <p className="text-xl xl:text-2xl text-[#e6dcc3] mb-12 font-light leading-relaxed drop-shadow-md border-l-4 border-[#c5a059] pl-6 italic">
            "Historia jest świadkiem czasów, światłem prawdy, życiem pamięci, nauczycielką życia."
            <span className="block mt-4 text-sm not-italic font-sans tracking-wide uppercase text-[#c5a059]">— Cyceron</span>
          </p>

          <div className="flex gap-4">
             <div className="px-6 py-3 border border-[#c5a059] text-[#c5a059] rounded-sm bg-black/20 backdrop-blur-sm uppercase tracking-widest text-sm hover:bg-[#c5a059] hover:text-[#2c241b] transition-all cursor-default">
                Starożytność
             </div>
             <div className="px-6 py-3 border border-[#c5a059] text-[#c5a059] rounded-sm bg-black/20 backdrop-blur-sm uppercase tracking-widest text-sm hover:bg-[#c5a059] hover:text-[#2c241b] transition-all cursor-default">
                Średniowiecze
             </div>
             <div className="px-6 py-3 border border-[#c5a059] text-[#c5a059] rounded-sm bg-black/20 backdrop-blur-sm uppercase tracking-widest text-sm hover:bg-[#c5a059] hover:text-[#2c241b] transition-all cursor-default">
                Nowożytność
             </div>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA - "Pergamin" Logowania */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 relative z-10">
        <div className="max-w-md w-full">
          
          {/* Karta Logowania stylizowana na dokument */}
          <div className="bg-[#fdfbf7] p-10 rounded-sm shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-t-8 border-[#8b1e1e] relative">
            
            {/* Ozdobny narożnik */}
            <div className="absolute top-4 right-4 text-[#e6dcc3]">
               <Scroll className="w-12 h-12 text-[#d4c5a6]" />
            </div>

            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold text-[#2c241b] mb-2 uppercase tracking-wide border-b-2 border-[#d4c5a6] inline-block pb-2">
                HistoryMaster
              </h2>
              <p className="mt-4 text-[#5c4d3c] italic text-lg">
                Zaloguj się, aby otworzyć księgi wiedzy.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="group relative w-full flex items-center justify-center gap-4 py-4 px-6 bg-[#2c241b] hover:bg-[#3d3226] text-[#f3e5ab] border-2 border-[#2c241b] hover:border-[#c5a059] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <div className="bg-white p-1 rounded-full">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <span className="font-serif text-lg tracking-wide">Rozpocznij Podróż (Google)</span>
              
              {/* Ozdobny element na przycisku */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#c5a059] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            {/* LAUREL - Ręcznie rysowany SVG zamiast zewnętrznego pliku */}
            <div className="mt-8 flex justify-center text-[#d4c5a6]/40">
               <svg width="80" height="60" viewBox="0 0 100 80" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  {/* Lewa gałąź */}
                  <path d="M50 70 Q 30 70, 20 30 Q 15 10, 30 10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M25 50 Q 15 45, 20 35" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M30 60 Q 20 55, 25 45" stroke="currentColor" strokeWidth="2" fill="none"/>
                  
                  {/* Prawa gałąź */}
                  <path d="M50 70 Q 70 70, 80 30 Q 85 10, 70 10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M75 50 Q 85 45, 80 35" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M70 60 Q 80 55, 75 45" stroke="currentColor" strokeWidth="2" fill="none"/>
               </svg>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;