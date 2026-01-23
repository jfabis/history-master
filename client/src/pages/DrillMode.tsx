import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Scroll, CheckCircle, XCircle, Trophy, BookOpen } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  description: string;
  _count: { questions: number };
}

interface Question {
  id: string;
  content: string;
  options: string[];
  difficulty: number;
  xpValue: number;
}

interface Feedback {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  xpGained: number;
}

const DrillMode = () => {
  const navigate = useNavigate();

  const [stage, setStage] = useState<'TOPICS' | 'QUIZ' | 'SUMMARY'>('TOPICS');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [totalXP, setTotalXP] = useState(0);
  const [maxPossibleXP, setMaxPossibleXP] = useState(0);
  const [currentTopicName, setCurrentTopicName] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/drill/topics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTopics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startQuiz = async (topicId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // Znajdź nazwę tematu
      const selectedTopic = topics.find(t => t.id === topicId);
      if (selectedTopic) {
        setCurrentTopicName(selectedTopic.name);
      }

      const res = await axios.get(`http://localhost:3000/api/drill/${topicId}/quiz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestions(res.data);
      // Oblicz maksymalne możliwe XP
      const maxXP = res.data.reduce((sum: number, q: Question) => sum + q.xpValue, 0);
      setMaxPossibleXP(maxXP);
      setStage('QUIZ');
      setCurrentIndex(0);
      setTotalXP(0);
      setFeedback(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    if (feedback) return;

    setSelectedAnswer(answer);

    try {
      const token = localStorage.getItem('token');
      const currentQ = questions[currentIndex];

      const res = await axios.post('http://localhost:3000/api/drill/answer',
        { questionId: currentQ.id, selectedAnswer: answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFeedback(res.data);
      if (res.data.correct) {
        setTotalXP(prev => prev + res.data.xpGained);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setStage('SUMMARY');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0e6d2] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8b1e1e]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0e6d2] font-serif text-[#2c241b] relative overflow-hidden">

      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>

      <nav className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-[#c5a059]/30">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-[#5c4d3c] hover:text-[#8b1e1e] transition-colors">
          <ArrowLeft className="w-6 h-6" />
          <span className="font-bold tracking-widest uppercase text-sm">Powrót do Mapy</span>
        </button>
        <div className="flex items-center gap-2 text-[#8b1e1e]">
          <BookOpen className="w-6 h-6" />
          <span className="font-bold text-lg">{currentTopicName || 'Drill & Practice'}</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh]">

        {stage === 'TOPICS' && (
          <div className="w-full">
            <h1 className="text-4xl font-bold text-center mb-10 text-[#2c241b]">Wybierz Księgę Wiedzy</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {topics.map(topic => (
                <div
                  key={topic.id}
                  onClick={() => startQuiz(topic.id)}
                  className="group bg-[#fdfbf7] border-2 border-[#d4c5a6] p-8 rounded-sm shadow-md hover:border-[#c5a059] hover:shadow-xl cursor-pointer transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Scroll className="w-24 h-24 text-[#8b1e1e]" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-[#2c241b] group-hover:text-[#8b1e1e] transition-colors">{topic.name}</h2>
                  <p className="text-[#5c4d3c] mb-6 leading-relaxed">{topic.description}</p>
                  <div className="flex items-center gap-2 text-sm text-[#8c7b75] font-bold tracking-widest uppercase">
                    <span>{topic._count.questions} Pytań</span>
                    <span className="w-1 h-1 bg-[#8c7b75] rounded-full"></span>
                    <span>Poziom Adaptacyjny</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 'QUIZ' && questions.length > 0 && (
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex justify-between items-end border-b border-[#c5a059] pb-4">
              <span className="text-[#8c7b75] uppercase tracking-widest font-bold text-sm">Pytanie {currentIndex + 1} / {questions.length}</span>
              <span className="text-[#8b1e1e] font-bold">Za to pytanie: {questions[currentIndex].xpValue} XP</span>
            </div>

            <div className="bg-[#fdfbf7] p-8 md:p-12 rounded-sm shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-[#d4c5a6] relative mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-center leading-snug mb-8">{questions[currentIndex].content}</h2>

              <div className="space-y-4">
                {questions[currentIndex].options.map((option) => {
                  // Określ kolor dla każdej opcji
                  let colorClass = 'border-[#d4c5a6] hover:border-[#8b1e1e] hover:bg-[#fff9f0] text-[#2c241b]';

                  if (feedback) {
                    if (option === feedback.correctAnswer) {
                      // Poprawna odpowiedź - zawsze zielona
                      colorClass = 'bg-green-50 border-green-600 text-green-800';
                    } else if (option === selectedAnswer && !feedback.correct) {
                      // Wybrana zła odpowiedź - czerwona
                      colorClass = 'bg-red-50 border-red-600 text-red-800';
                    } else {
                      // Pozostałe - przygaszone
                      colorClass = 'opacity-50 border-[#d4c5a6]';
                    }
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => submitAnswer(option)}
                      disabled={!!feedback}
                      className={`w-full p-4 text-left border-2 rounded-sm transition-all duration-200 font-serif text-lg ${colorClass}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {feedback && (
              <div className={`p-6 rounded-sm border-l-4 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-300
                ${feedback.correct ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {feedback.correct ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg mb-1 ${feedback.correct ? 'text-green-800' : 'text-red-800'}`}>
                      {feedback.correct ? 'Wspaniale!' : 'Błąd kronikarza.'}
                    </h3>
                    <p className="text-[#5c4d3c] leading-relaxed mb-4">{feedback.explanation}</p>
                    <button
                      onClick={nextQuestion}
                      className="px-6 py-2 bg-[#2c241b] text-[#f3e5ab] font-bold uppercase tracking-widest text-sm hover:bg-[#3d3226] transition-colors"
                    >
                      {currentIndex + 1 === questions.length ? 'Zakończ Test' : 'Następne Pytanie'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {stage === 'SUMMARY' && (
          <div className="text-center max-w-lg w-full bg-[#fdfbf7] p-12 border-4 border-double border-[#d4c5a6] shadow-2xl relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2c241b] p-4 rounded-full border-4 border-[#f3e5ab]">
              <Trophy className="w-12 h-12 text-[#f3e5ab]" />
            </div>

            <h2 className="text-3xl font-bold mt-6 mb-2">Sesja Zakończona</h2>
            <p className="text-[#8c7b75] uppercase tracking-widest font-bold text-sm mb-8">Twoje Osiągnięcia</p>

            <div className="text-6xl font-bold text-[#8b1e1e] mb-2">+{totalXP}</div>
            <div className="text-[#5c4d3c] font-serif italic mb-2">Punktów Chwały (XP)</div>
            <div className="text-sm text-[#8c7b75] mb-10">z {maxPossibleXP} XP możliwych</div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setStage('TOPICS')}
                className="px-6 py-3 border-2 border-[#2c241b] text-[#2c241b] font-bold uppercase tracking-widest hover:bg-[#f0e6d2]"
              >
                Inny Temat
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-[#8b1e1e] text-white border-2 border-[#8b1e1e] font-bold uppercase tracking-widest hover:bg-[#a02323]"
              >
                Powrót
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default DrillMode;