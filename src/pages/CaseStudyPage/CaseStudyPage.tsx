import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/templates';
import { Button } from '../../components/atoms';
import './CaseStudyPage.css';

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caseStudies: { [key: string]: any } = {
    '1': {
      title: 'TI Help',
      overview: 'Uma plataforma inovadora de suporte técnico que conecta usuários com especialistas.',
      challenge: 'Criar uma interface intuitiva para facilitar a comunicação entre usuários e técnicos de TI.',
      research: 'Realizei entrevistas com 15 usuários e 10 técnicos para entender os principais problemas.',
      goals: 'Reduzir tempo de resposta em 50% e aumentar satisfação do usuário para 4.8/5.',
      personas: [
        { name: 'João (Usuário Inicial)', pain: 'Falta de conhecimento técnico' },
        { name: 'Maria (Técnica Senior)', pain: 'Múltiplas chamadas simultâneas' }
      ],
      process: 'Wireframes → Protótipos interativos → Testes com usuários → Iteração → Desenvolvimento',
      decisions: [
        'Sistema de priorização automática para tickets',
        'Chat em tempo real com histórico preservado',
        'Opção de vídeo chamada integrada'
      ],
      impact: 'Redução de 45% no tempo médio de resolução, aumento de 4.7/5 na satisfação',
      reflection: 'O projeto mostrou a importância de validar decisões com usuários reais durante o processo.',
      image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=TI+Help',
      prototypeUrl: '#',
      projectUrl: '#'
    },
    '2': {
      title: 'Solar Panel Monitoring',
      overview: 'Sistema de monitoramento em tempo real para painéis solares residenciais.',
      challenge: 'Tornar dados complexos de energia acessíveis para usuários não técnicos.',
      research: 'Análise de 50 painéis solares e entrevistas com proprietários sobre seus hábitos.',
      goals: 'Permitir que 90% dos usuários entendam sua produção de energia sem treinamento.',
      personas: [
        { name: 'Roberto (Proprietário)', pain: 'Não entende os dados técnicos' },
        { name: 'Ana (Instaladora)', pain: 'Precisa monitorar múltiplos sistemas' }
      ],
      process: 'Pesquisa → Design de dashboard → Prototipagem → Testes A/B → Launch',
      decisions: [
        'Visualizações em gráficos simples e coloridas',
        'Alertas automáticos para problemas',
        'Comparativo com consumo anterior'
      ],
      impact: 'Aumentou engajamento de usuários em 200%, reduziu chamadas de suporte em 60%',
      reflection: 'Simplicidade visual foi mais importante que completude de dados para este público.',
      image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Solar+Panel',
      prototypeUrl: '#',
      projectUrl: '#'
    },
    '3': {
      title: 'DN Jeans',
      overview: 'Redesign de e-commerce para marca de jeans brasileira.',
      challenge: 'Aumentar taxa de conversão e reduzir taxa de devolução.',
      research: 'Heatmaps, session recordings e entrevistas com 30 clientes compradoras.',
      goals: 'Aumentar conversão em 35% e reduzir devoluções para menos de 15%.',
      personas: [
        { name: 'Lara (Fashion Conscious)', pain: 'Dificuldade em encontrar o tamanho certo' },
        { name: 'Carla (Mãe Ocupada)', pain: 'Falta de tempo para navegar' }
      ],
      process: 'Análise de concorrentes → Wireframes → Design iterativo → Testes de usabilidade',
      decisions: [
        'Incluir tabela de tamanho detalhada',
        'Fotos 360° dos produtos',
        'Checkout simplificado em 3 passos'
      ],
      impact: 'Conversão aumentou 42%, devoluções caíram para 12%',
      reflection: 'O guia visual de tamanho foi o diferencial mais impactante para reduzir devoluções.',
      image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=DN+Jeans',
      prototypeUrl: '#',
      projectUrl: '#'
    },
    '4': {
      title: 'Real State Platform',
      overview: 'Plataforma de busca e locação de imóveis com tecnologia inteligente.',
      challenge: 'Diferenciar em mercado saturado com melhor experiência de usuário.',
      research: 'Etnografia digital com 40 usuários em jornada de imóvel.',
      goals: 'Conseguir preferência de 60% dos usuários comparado com concorrentes.',
      personas: [
        { name: 'Paulo (Comprador Primeiro)', pain: 'Não sabe por onde começar' },
        { name: 'Adriana (Imobiliária)', pain: 'Muitas propriedades para gerenciar' }
      ],
      process: 'Customer journey mapping → Redesign completo → MVP → Validação com usuários',
      decisions: [
        'Filtros inteligentes com IA',
        'Tours virtuais 3D',
        'Recomendações personalizadas'
      ],
      impact: 'Market share cresceu 25% em 6 meses',
      reflection: 'A integração de IA foi crucial, mas UX clara foi igualmente importante.',
      image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Real+State',
      prototypeUrl: '#',
      projectUrl: '#'
    },
    '5': {
      title: 'Yacht Booking',
      overview: 'Aplicativo para reserva de iates e experiências marítimas.',
      challenge: 'Criar experiência premium que inspire confiança para transações de alto valor.',
      research: 'Entrevistas com 25 viajantes luxury e proprietários de iates.',
      goals: 'Atingir taxa de finalização de booking de 70% e 4.9/5 em reviews.',
      personas: [
        { name: 'Eduardo (High Net Worth)', pain: 'Quer exclusividade e segurança' },
        { name: 'Catarina (Gerenciadora Frota)', pain: 'Controle de reservas complexo' }
      ],
      process: 'Design luxuoso → Prototipagem → Testes de segurança → Iteração final',
      decisions: [
        'Interface minimalista mas sofisticada',
        'Verificação de identidade robusta',
        'Gestos intuitivos premium'
      ],
      impact: 'Bookings cresceram 180%, ticket médio aumentou 45%',
      reflection: 'Menos é mais: design limpo comunica qualidade melhor que informação em excesso.',
      image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Yacht+Booking',
      prototypeUrl: '#',
      projectUrl: '#'
    }
  };

  const project = caseStudies[id || '1'];

  return (
    <MainLayout>
      <div className="case-study-page">
        <button onClick={() => navigate('/')} className="back-button">
          ← Voltar
        </button>

        <header className="case-study-header">
          <h1 className="case-study-title">{project.title}</h1>
        </header>

        <main className="case-study-content">

          <section className="case-study-section">
            <h2>Overview</h2>
            <p>{project.overview}</p>
          </section>

          <section className="case-study-section">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>

          <section className="case-study-section">
            <h2>Research & Inspiration</h2>
            <p>{project.research}</p>
          </section>

          <section className="case-study-section">
            <h2>Design Goals</h2>
            <p>{project.goals}</p>
          </section>

          <section className="case-study-section">
            <h2>Process</h2>
            <p>{project.process}</p>
          </section>

          <section className="case-study-section">
            <h2>Personas</h2>
            <div className="personas-grid">
              {project.personas.map((persona: any, index: number) => (
                <div key={index} className="persona-card">
                  <h3>{persona.name}</h3>
                  <p><strong>Pain Point:</strong> {persona.pain}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Design com hover */}
          <section className="case-study-section">
            <h2>Final Design</h2>
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={`${project.title} design`}
              />
              <div className="project-image-overlay">
                <button
                  className="btn-watch"
                  onClick={() => window.open(project.prototypeUrl, '_blank')}
                >
                  <span className="play-icon" />
                  Watch Prototype
                </button>
                <button
                  className="btn-see"
                  onClick={() => window.open(project.projectUrl, '_blank')}
                >
                  See entire project
                  <span className="arrow-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="case-study-section">
            <h2>Key Decisions</h2>
            <ul className="decisions-list">
              {project.decisions.map((decision: string, index: number) => (
                <li key={index}>{decision}</li>
              ))}
            </ul>
          </section>

          <section className="case-study-section">
            <h2>Expected Impact</h2>
            <p>{project.impact}</p>
          </section>

          <section className="case-study-section">
            <h2>Reflection</h2>
            <p>{project.reflection}</p>
          </section>

        </main>

        <div className="case-study-footer">
          <Button variant="primary" size="large" onClick={() => navigate('/')}>
            Ver Mais Projetos
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CaseStudyPage;