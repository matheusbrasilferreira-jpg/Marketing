
import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Zap, 
  Target, 
  TrendingUp, 
  Globe, 
  Wrench, 
  Wand2, 
  ArrowRight, 
  Menu, 
  X, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  PlayCircle, 
  ShieldAlert, 
  FastForward,
  ChevronRight,
  Star,
  ListChecks,
  Lock,
  User,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';
import { getPersonalizedAdvice } from './services/geminiService';

// --- Utilitário de Scroll ---
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// --- Componentes de Interface ---

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (email: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md p-10 md:p-16 shadow-2xl animate-fade-in border-t-8 border-black">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>
        
        <div className="text-center mb-12">
          <Lock className="mx-auto w-12 h-12 mb-4 text-black" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">Acesso Premium.</h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2 italic">Valide sua licença de aluno</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">E-mail Cadastrado</label>
            <div className="flex items-center border-b-2 border-gray-100 focus-within:border-black transition-colors py-2">
              <User size={18} className="text-gray-300 mr-3" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@venda.com" 
                className="w-full outline-none font-bold text-lg bg-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Senha de Acesso</label>
            <div className="flex items-center border-b-2 border-gray-100 focus-within:border-black transition-colors py-2">
              <Lock size={18} className="text-gray-300 mr-3" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full outline-none font-bold text-lg bg-transparent"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-300 hover:text-black">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 text-sm shadow-2xl"
          >
            {loading ? "Autenticando..." : "Entrar no Treinamento"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

const Header = ({ onAuthClick, onLogout, isAuthenticated, userEmail }: { onAuthClick: () => void, onLogout: () => void, isAuthenticated: boolean, userEmail: string | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Início', id: 'intro' },
    { name: 'O Erro', id: 'erro' },
    { name: 'Método', id: 'metodo' },
    { name: 'Passo a Passo', id: 'passo' },
    { name: 'Mentoria IA', id: 'personalizado' },
  ];

  return (
    <header className="fixed top-0 w-full z-[100] bg-white border-b border-gray-100 backdrop-blur-md bg-opacity-90">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <Smartphone className="w-8 h-8 fill-black" />
          <span className="font-black text-2xl tracking-tighter italic">MC.</span>
        </div>
        
        <nav className="hidden xl:flex gap-8 text-[11px] font-black uppercase tracking-widest">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="hover:text-gray-400 transition-colors uppercase tracking-widest font-black italic">{link.name}</button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={isAuthenticated ? () => scrollToSection('personalizado') : onAuthClick}
            className={`hidden md:flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isAuthenticated ? 'bg-green-500 text-white' : 'bg-black text-white hover:bg-zinc-800'}`}
          >
            {isAuthenticated ? <CheckCircle2 size={12} /> : <Lock size={12} />}
            {isAuthenticated ? userEmail?.split('@')[0] : "Área do Aluno"}
          </button>
          {isAuthenticated && (
            <button onClick={onLogout} className="p-2 text-gray-300 hover:text-red-500 transition-colors" title="Sair">
              <LogOut size={20} />
            </button>
          )}
          <button className="xl:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

/**
 * Fix: Define SectionProps interface used by the Section component.
 */
interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dark?: boolean;
}

const Section = ({ id, title, subtitle, children, dark = false }: SectionProps) => (
  <section id={id} className={`py-24 md:py-32 px-6 md:px-12 ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}>
    <div className="max-w-[1440px] mx-auto">
      <div className="mb-16 md:mb-20">
        {subtitle && <p className="text-sm font-black uppercase tracking-[0.3em] mb-4 text-gray-400 italic">{subtitle}</p>}
        <h2 className="text-4xl md:text-8xl font-black uppercase italic leading-none tracking-tighter">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

export default function App() {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [formData, setFormData] = useState({ skill: 'Design/Artes', hours: 2, income: '2.000' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Efeito para carregar dados salvos
  useEffect(() => {
    const savedEmail = localStorage.getItem('mc_user_email');
    const savedAdvice = localStorage.getItem('mc_last_advice');
    
    if (savedEmail) {
      setIsAuthenticated(true);
      setUserEmail(savedEmail);
    }
    if (savedAdvice) {
      setAdvice(savedAdvice);
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('mc_user_email', email);
    setTimeout(() => scrollToSection('personalizado'), 200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem('mc_user_email');
    localStorage.removeItem('mc_last_advice');
    setAdvice(null);
  };

  const handleGenerateAdvice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await getPersonalizedAdvice(formData.skill, formData.hours, formData.income);
    setAdvice(result);
    localStorage.setItem('mc_last_advice', result);
    setLoading(false);
  };

  return (
    <div className="selection:bg-black selection:text-white">
      <Header 
        onAuthClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated} 
        userEmail={userEmail} 
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLoginSuccess}
      />

      {/* 1. CAPA */}
      <section id="intro" className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-sm font-black uppercase tracking-[0.4em] mb-8 text-gray-400">Manual de Performance Digital // 2024</p>
          <h1 className="text-5xl md:text-[140px] font-black uppercase italic tracking-tighter mb-10 leading-[0.85]">
            LUCRO NA <br /> <span className="text-gray-100 hover:text-black transition-colors duration-700 cursor-default">PALMA DA MÃO.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-gray-500 mb-16 font-bold leading-tight uppercase italic">
            O seu celular não é um brinquedo. É a sua unidade de processamento de liberdade. Menos scroll, mais execução.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-24">
            <button onClick={() => scrollToSection('metodo')} className="bg-black text-white px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-lg md:text-xl uppercase tracking-tighter hover:scale-105 transition-transform shadow-2xl">
              Ver o Método
            </button>
            <button onClick={isAuthenticated ? () => scrollToSection('personalizado') : () => setIsLoginModalOpen(true)} className="bg-white text-black border-2 border-black px-10 md:px-14 py-5 md:py-6 rounded-full font-black text-lg md:text-xl uppercase tracking-tighter hover:bg-gray-50 transition-all">
              {isAuthenticated ? "Abrir Mentoria" : "Login p/ Treino"}
            </button>
          </div>
        </div>
      </section>

      {/* 2. O MÉTODO - Visual Clean */}
      <Section id="metodo" title="A MECÂNICA DO LUCRO." subtitle="The Method">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <Zap className="w-12 h-12" />, title: "Atrair", desc: "Use o algoritmo para gerar tráfego qualificado sem investir em anúncios." },
            { icon: <Target className="w-12 h-12" />, title: "Retener", desc: "Crie conversas persuasivas no WhatsApp que transformam curiosos em clientes." },
            { icon: <TrendingUp className="w-12 h-12" />, title: "Escalar", desc: "Aplique ferramentas de IA para multiplicar sua produção por 10x." }
          ].map((item, i) => (
            <div key={i} className="p-10 border border-gray-100 hover:border-black transition-all group cursor-default">
              <div className="mb-8">{item.icon}</div>
              <h4 className="text-3xl font-black uppercase italic mb-4">{item.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 3. MENTORIA IA - O Produto Principal */}
      <section id="personalizado" className={`py-40 px-6 bg-gray-50 transition-all duration-1000 ${isAuthenticated ? 'opacity-100' : 'opacity-40 grayscale blur-[2px]'}`}>
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative">
          {!isAuthenticated && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="bg-black text-white p-12 text-center space-y-6 shadow-2xl">
                 <Lock className="mx-auto w-12 h-12" />
                 <h3 className="text-3xl font-black uppercase italic tracking-tighter">Área Privada</h3>
                 <p className="text-gray-400 font-bold uppercase text-xs italic">Apenas alunos certificados têm acesso ao Mentor IA</p>
                 <button onClick={() => setIsLoginModalOpen(true)} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">Desbloquear Agora</button>
              </div>
            </div>
          )}
          
          <div>
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px w-20 bg-black"></div>
              <span className="text-xs font-black uppercase tracking-[0.3em]">{isAuthenticated ? `Usuário Ativo: ${userEmail}` : 'Aguardando Login'}</span>
            </div>
            <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-10 leading-[0.8]">MENTOR <br /> DE IA.</h2>
            <p className="text-xl font-bold text-gray-500 mb-12 italic uppercase leading-tight">
              {isAuthenticated ? `Bem-vindo de volta, ${userEmail?.split('@')[0]}! Pronto para o próximo nível?` : "Personalize seu caminho para a liberdade financeira usando inteligência artificial."}
            </p>
          </div>
          
          <div className="bg-white p-10 shadow-2xl rounded-sm border border-gray-100">
            <form onSubmit={handleGenerateAdvice} className="space-y-10">
              <div className="space-y-6">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 italic">Estratégia de Atuação</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Social Media', 'Editor de Vídeos', 'Closer de Vendas', 'Design Mobile'].map(s => (
                    <button key={s} type="button" onClick={() => setFormData({...formData, skill: s})} className={`py-4 px-4 border-2 text-[10px] font-black uppercase transition-all ${formData.skill === s ? 'bg-black text-white border-black shadow-lg' : 'border-gray-50 hover:border-black'}`}>{s}</button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 italic">Horas/Dia</label>
                  <input type="number" value={formData.hours} onChange={(e) => setFormData({...formData, hours: parseInt(e.target.value)})} className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none font-black text-4xl bg-transparent transition-colors" />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 italic">Meta R$/Mês</label>
                  <input type="text" value={formData.income} onChange={(e) => setFormData({...formData, income: e.target.value})} className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none font-black text-4xl bg-transparent transition-colors" />
                </div>
              </div>

              <button type="submit" disabled={loading || !isAuthenticated} className="w-full bg-black text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 text-xl disabled:opacity-30">
                {loading ? "Processando Algoritmo..." : "Gerar Mapa de Execução"}
                {!loading && <ArrowRight />}
              </button>
            </form>

            {advice && (
              <div className="mt-16 animate-fade-in bg-zinc-50 p-8 border-t-8 border-black">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Seu Plano Mestre:</h3>
                  <div className="text-[10px] font-black uppercase bg-green-500 text-white px-2 py-1">Salvo no Dispositivo</div>
                </div>
                <div className="text-gray-800 leading-relaxed font-bold text-lg whitespace-pre-wrap italic bg-white p-6 border border-gray-100 shadow-sm">
                  {advice}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONCLUSÃO */}
      <footer className="bg-black text-white py-32 px-6 text-center">
        <h2 className="text-6xl md:text-[180px] font-black uppercase italic tracking-tighter mb-12 leading-none">VAI LÁ.</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-xl font-bold mb-16 uppercase italic">Você já tem o guia e o mentor. Agora só falta a sua decisão.</p>
        <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.5em]">© 2024 MESTRE DO CELULAR • TECNOLOGIA PARA LIBERDADE.</p>
      </footer>
    </div>
  );
}
