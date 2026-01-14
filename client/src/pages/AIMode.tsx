import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Swords, Shirt, HelpCircle, ImageOff, CheckCircle, XCircle, BrainCircuit } from 'lucide-react';

// Typy trybów
type GameMode = 'time_detective' | 'battle' | 'costume';

// Dane dla różnych trybów


// Interfejs Bitwy z bazy danych
interface Battle {
  id: string;
  name: string;
  year: string;
  winner: string;
  loser: string;
  forces: string;
  description: string;
  prompt: string;
  options: string[]; // Dynamiczne opcje zwycięzców/przegranych
  poolReset?: boolean;
}

// Interfejs Stroju z bazy danych
interface Costume {
  id: string;
  name: string;
  era: string;
  class: string;
  description: string;
  prompt: string;
  poolReset?: boolean;
}

const AIMode = () => {
  const navigate = useNavigate();

  // Stan wspólny
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [gameState, setGameState] = useState<'START' | 'LOADING' | 'PLAYING' | 'RESULT'>('START');
  const [imageUrl, setImageUrl] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Stan dla Detektywа Czasu
  // Stan dla Detektywа Czasu
  const [correctEra, setCorrectEra] = useState('');
  const [availableEras, setAvailableEras] = useState<string[]>([]);
  const [seenScenarioIds, setSeenScenarioIds] = useState<string[]>([]);
  const [roundXP, setRoundXP] = useState(0);

  // Stan dla Bitwy
  const [currentBattle, setCurrentBattle] = useState<Battle | null>(null);
  const [seenBattleIds, setSeenBattleIds] = useState<string[]>([]);

  // Stan dla Stroju
  const [currentCostume, setCurrentCostume] = useState<Costume | null>(null);
  const [seenCostumeIds, setSeenCostumeIds] = useState<string[]>([]);



  // ==================== DETEKTYW CZASU ====================
  const startTimeDetective = async () => {
    setGameState('LOADING');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');
      const excludeQuery = seenScenarioIds.length > 0 ? `?exclude=${seenScenarioIds.join(',')}` : '';

      // 1. Pobierz losowy scenariusz z bazy
      const scenarioRes = await axios.get(`http://localhost:3000/api/time-detective/random${excludeQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { scenario, allEras, poolReset } = scenarioRes.data;

      setCorrectEra(scenario.era);
      setAvailableEras(allEras);

      // Aktualizacja historii widzianych scenariuszy
      if (poolReset) {
        setSeenScenarioIds([scenario.id]);
      } else {
        setSeenScenarioIds(prev => [...prev, scenario.id]);
      }

      // 2. Wygeneruj obraz na podstawie promptu z bazy
      const res = await axios.post('http://localhost:3000/api/ai/generate',
        {
          era: scenario.era, // Dla logów
          prompt: scenario.prompt,
          mode: 'time_detective'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImageUrl(res.data.imageUrl);
      setGameState('PLAYING');
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.response?.data?.error || 'Nie udało się pobrać zagadki.');
      setGameState('START');
    }
  };

  // Helper do przyznawania XP
  const grantXP = async (amount: number, reason: string) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post('http://localhost:3000/api/users/xp',
          { amount, reason },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (e) {
      console.error('Failed to grant XP:', e);
    }
  };

  const handleTimeGuess = (guess: string) => {
    const isCorrect = guess === correctEra;
    setRoundXP(isCorrect ? 50 : 0);
    if (isCorrect) {
      setUserScore(prev => prev + 1);
      grantXP(50, `Detektyw Czasu: ${correctEra}`);
    }
    setGameState('RESULT');
  };

  // ==================== BITWA ====================
  const startBattle = async () => {
    setGameState('LOADING');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');

      // Budujemy query params z excludeIds
      const excludeQuery = seenBattleIds.length > 0 ? `?exclude=${seenBattleIds.join(',')}` : '';

      // 1. Pobierz losową bitwę z bazy danych (z wykluczeniem powtórzeń)
      const battleRes = await axios.get(`http://localhost:3000/api/battles/random${excludeQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const battleData = battleRes.data;
      setCurrentBattle(battleData);

      // Aktualizacja historii widzianych bitew
      if (battleData.poolReset) {
        setSeenBattleIds([battleData.id]);
      } else {
        setSeenBattleIds(prev => [...prev, battleData.id]);
      }

      // 2. Wygeneruj obraz używając profesjonalnego promptu z bazy
      const aiRes = await axios.post('http://localhost:3000/api/ai/generate',
        {
          era: 'Historyczna bitwa', // Tylko dla logów
          subject: battleData.name,
          style: 'Epic battlefield scene',
          mode: 'battle',
          prompt: battleData.prompt // Przekazujemy PEŁNY prompt Matejki
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImageUrl(aiRes.data.imageUrl);
      setGameState('PLAYING');
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.response?.data?.error || 'Nie udało się pobrać bitwy lub wygenerować obrazu.');
      setGameState('START');
    }
  };

  const handleBattleGuess = (guess: string) => {
    if (!currentBattle) return;

    const isCorrect = guess === currentBattle.winner;
    setRoundXP(isCorrect ? 100 : 0);
    if (isCorrect) {
      setUserScore(prev => prev + 1);
      grantXP(100, `Bitwa: ${currentBattle.name}`);
    }
    setGameState('RESULT');
  };

  // ==================== STRÓJ ====================
  const startCostume = async () => {
    setGameState('LOADING');
    setErrorMessage('');

    try {
      const token = localStorage.getItem('token');

      // Budujemy query params z excludeIds
      const excludeQuery = seenCostumeIds.length > 0 ? `?exclude=${seenCostumeIds.join(',')}` : '';

      // 1. Pobierz losowy strój z bazy
      const res = await axios.get(`http://localhost:3000/api/costumes/random${excludeQuery}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const costumeData = res.data;
      setCurrentCostume(costumeData);

      // Aktualizacja historii
      if (costumeData.poolReset) {
        setSeenCostumeIds([costumeData.id]);
      } else {
        setSeenCostumeIds(prev => [...prev, costumeData.id]);
      }

      // 2. Generuj obraz AI z prompta
      const aiRes = await axios.post('http://localhost:3000/api/ai/generate',
        {
          era: costumeData.era, // Dla logów
          subject: costumeData.name,
          style: 'Museum-quality costume documentation',
          mode: 'costume',
          prompt: costumeData.prompt // PEŁNY PROMPT
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImageUrl(aiRes.data.imageUrl);
      setGameState('PLAYING');

    } catch (e: any) {
      console.error(e);
      setErrorMessage(e.response?.data?.error || 'Nie udało się pobrać stroju lub wygenerować obrazu.');
      setGameState('START');
    }
  };

  // ==================== RESET ====================
  const resetGame = () => {
    setSelectedMode(null);
    setGameState('START');
    setImageUrl('');
  };

  const startNextRound = () => {
    setGameState('START');
    if (selectedMode === 'time_detective') startTimeDetective();
    else if (selectedMode === 'battle') startBattle();
    else if (selectedMode === 'costume') startCostume();
  };

  // ==================== WYBÓR TRYBU ====================
  if (!selectedMode) {
    return (
      <div className="min-h-screen bg-[#1a140e] font-serif text-[#f3e5ab] flex flex-col">
        <nav className="p-6 border-b border-[#c5a059]/30 flex items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[#c5a059] hover:text-[#f3e5ab] font-bold uppercase text-sm">
            <ArrowLeft className="w-5 h-5" /> Powrót
          </button>
        </nav>

        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <Sparkles className="w-16 h-16 text-[#c5a059] mb-6" />
          <h1 className="text-4xl font-bold font-cinzel mb-4">Wizje AI - Nano Banana</h1>
          <p className="text-[#8c7b75] mb-12 text-lg">Wybierz tryb gry:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
            {/* Detektyw Czasu */}
            <div onClick={() => setSelectedMode('time_detective')} className="bg-[#2c241b] p-8 rounded border-2 border-[#c5a059] hover:border-[#f3e5ab] cursor-pointer transition-all group">
              <BrainCircuit className="w-12 h-12 text-[#c5a059] mb-4" />
              <h3 className="text-2xl font-cinzel font-bold mb-3">Detektyw Czasu</h3>
              <p className="text-sm text-[#8c7b75]">Zgadnij epokę na podstawie wygenerowanego obrazu historycznego</p>
            </div>

            {/* Bitwa */}
            <div onClick={() => setSelectedMode('battle')} className="bg-[#2c241b] p-8 rounded border-2 border-[#c5a059] hover:border-[#f3e5ab] cursor-pointer transition-all group">
              <Swords className="w-12 h-12 text-[#c5a059] mb-4" />
              <h3 className="text-2xl font-cinzel font-bold mb-3">Bitwa</h3>
              <p className="text-sm text-[#8c7b75]">Analiza taktyczna słynnych bitew historycznych</p>
            </div>

            {/* Strój przez Wieki */}
            <div onClick={() => setSelectedMode('costume')} className="bg-[#2c241b] p-8 rounded border-2 border-[#c5a059] hover:border-[#f3e5ab] cursor-pointer transition-all group">
              <Shirt className="w-12 h-12 text-[#c5a059] mb-4" />
              <h3 className="text-2xl font-cinzel font-bold mb-3">Strój przez Wieki</h3>
              <p className="text-sm text-[#8c7b75]">Poznaj historyczne stroje i ich znaczenie kulturowe</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==================== GRA (wspólny layout) ====================
  const getModeTitle = () => {
    if (selectedMode === 'time_detective') return 'Detektyw Czasu';
    if (selectedMode === 'battle') return 'Analiza Bitwy';
    return 'Strój przez Wieki';
  };

  return (
    <div className="min-h-screen bg-[#1a140e] font-serif text-[#f3e5ab] flex flex-col">
      <nav className="p-6 border-b border-[#c5a059]/30 flex justify-between items-center">
        <button onClick={resetGame} className="flex items-center gap-2 text-[#c5a059] hover:text-[#f3e5ab] font-bold uppercase text-sm">
          <ArrowLeft className="w-5 h-5" /> Zmień Tryb
        </button>
        <h1 className="text-2xl font-cinzel font-bold">{getModeTitle()}</h1>
        <div className="bg-[#2c241b] px-4 py-2 rounded border border-[#c5a059]">Wynik: {userScore}</div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        {gameState === 'START' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">{selectedMode === 'time_detective' ? 'Rozpocznij Śledztwo' : selectedMode === 'battle' ? 'Rozpocznij Analizę' : 'Rozpocznij Lekcję'}</h2>
            <button onClick={() => selectedMode === 'time_detective' ? startTimeDetective() : selectedMode === 'battle' ? startBattle() : startCostume()} className="px-10 py-4 bg-[#c5a059] text-[#1a140e] font-bold uppercase tracking-widest hover:bg-[#d4b46e] transition-all">
              Start
            </button>
            {errorMessage && <div className="mt-4 text-red-400">{errorMessage}</div>}
          </div>
        )}

        {gameState === 'LOADING' && (
          <div className="text-center max-w-2xl px-6">
            <div className="w-24 h-24 border-t-4 border-[#c5a059] rounded-full animate-spin mx-auto mb-8"></div>
            <h3 className="text-2xl font-cinzel mb-4">Nano Banana generuje wizję...</h3>
            <div className="bg-[#2c241b]/50 p-6 rounded border border-[#5c4d3c]">
              <p className="text-[#c5a059] font-bold mb-2 text-sm uppercase tracking-widest">Ciekawostka Historyczna</p>
              <p className="text-[#f3e5ab] italic text-lg animate-pulse">
                "{
                  [
                    "W bitwie pod Grunwaldem armia krzyżacka miała lepsze uzbrojenie, ale uległa liczebności i taktyce wojsk polsko-litewskich.",
                    "Spartanie szkolili się do walki od 7 roku życia w systemie agoge.",
                    "Samurajski miecz katana był uważany za duszę wojownika.",
                    "Rzymskie legiony budowały obóz warowny każdej nocy podczas kampanii.",
                    "Napoleon Bonaparte bał się kotów (ailurofobia).",
                    "Wikingowie nie nosili hełmów z rogami - to XIX-wieczny mit operowy.",
                    "Piramida Cheopsa była najwyższą budowlą świata przez ponad 3800 lat.",
                    "Husaria w bitwie pod Wiedniem (1683) przeprowadziła największą szarżę kawalerii w historii.",
                    "Średniowieczni rycerze często nie potrafili czytać ani pisać.",
                    "Bitwa pod Stalingradem była jedną z najkrwawszych bitew w historii wojen."
                  ][Math.floor(Math.random() * 10)]
                }"
              </p>
              <p className="text-xs text-[#8c7b75] mt-4">Generowanie obrazu 8K może potrwać do 15 sekund...</p>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && selectedMode === 'time_detective' && (
          <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 aspect-square bg-black border-4 border-[#c5a059] rounded flex items-center justify-center">
              {imageUrl ? <img src={imageUrl} alt="Historical" className="w-full h-full object-cover" /> : <ImageOff className="w-16 h-16 text-[#c5a059]" />}
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><HelpCircle className="text-[#c5a059]" /> Z jakiej to epoki?</h3>
              <div className="grid grid-cols-2 gap-4">
                {availableEras.map((era) => (
                  <button key={era} onClick={() => handleTimeGuess(era)} className="p-4 bg-[#2c241b] border-2 border-[#5c4d3c] hover:border-[#c5a059] text-left transition-all">
                    {era}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && selectedMode === 'battle' && currentBattle && (
          <div className="max-w-4xl w-full">
            <div className="aspect-video bg-black border-4 border-[#c5a059] rounded flex items-center justify-center mb-6">
              {imageUrl ? <img src={imageUrl} alt="Battle" className="w-full h-full object-cover" /> : <ImageOff className="w-16 h-16 text-[#c5a059]" />}
            </div>
            <div className="bg-[#2c241b] p-6 rounded border border-[#c5a059]">
              <h3 className="text-2xl font-bold mb-4">{currentBattle.name} ({currentBattle.year})</h3>
              <p className="mb-6 text-[#8c7b75]">{currentBattle.forces}</p>
              <h4 className="text-lg font-bold mb-4 text-[#f3e5ab]">Kto wygrał tę bitwę?</h4>
              <div className="grid grid-cols-2 gap-4">
                {currentBattle.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleBattleGuess(option)}
                    className="p-4 bg-[#1a140e] border-2 border-[#5c4d3c] hover:border-[#c5a059] text-left transition-all font-bold"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {gameState === 'PLAYING' && selectedMode === 'costume' && currentCostume && (
          <div className="max-w-4xl w-full">
            <div className="aspect-[3/4] max-h-[600px] bg-black border-4 border-[#c5a059] rounded flex items-center justify-center mb-6 mx-auto">
              {imageUrl ? <img src={imageUrl} alt="Costume" className="w-full h-full object-contain" /> : <ImageOff className="w-16 h-16 text-[#c5a059]" />}
            </div>
            <div className="bg-[#2c241b] p-6 rounded border border-[#c5a059]">
              <h3 className="text-2xl font-bold mb-2">{currentCostume.name}</h3>
              <p className="text-sm text-[#c5a059] mb-3">Epoka: {currentCostume.era}</p>
              <p className="text-[#8c7b75] mb-3">Klasa społeczna: {currentCostume.class}</p>
              <p className="text-[#f3e5ab]">{currentCostume.description}</p>
              <button
                onClick={() => {
                  setRoundXP(30);
                  grantXP(30, `Strój: ${currentCostume.name}`);
                  setGameState('RESULT');
                }}
                className="mt-6 px-8 py-3 bg-[#c5a059] text-[#1a140e] font-bold uppercase"
              >
                Odbierz nagrodę (30 XP)
              </button>
            </div>
          </div>
        )}

        {gameState === 'RESULT' && (
          <div className="text-center max-w-2xl bg-[#2c241b] p-10 border-4 border-[#c5a059] rounded">
            {roundXP > 0 ? <CheckCircle size={80} className="text-green-500 mx-auto mb-6" /> : <XCircle size={80} className="text-red-500 mx-auto mb-6" />}
            <h2 className="text-3xl font-bold mb-4">{roundXP > 0 ? 'Doskonale!' : 'Spróbuj ponownie!'}</h2>
            {selectedMode === 'time_detective' && <div className="text-lg mb-6">Poprawna odpowiedź: <span className="text-2xl font-bold text-[#c5a059]">{correctEra}</span></div>}
            {selectedMode === 'battle' && currentBattle && <div className="text-lg mb-6">Zwycięzca: <span className="text-2xl font-bold text-[#c5a059]">{currentBattle.winner}</span></div>}
            {roundXP > 0 && <div className="mb-6 text-xl text-[#f3e5ab] font-bold">+ {roundXP} XP</div>}
            <button onClick={startNextRound} className="px-8 py-3 bg-[#c5a059] text-[#1a140e] font-bold uppercase">Następna Runda</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIMode;