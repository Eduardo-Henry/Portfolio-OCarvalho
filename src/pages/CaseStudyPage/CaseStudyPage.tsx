import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../../components/templates';
import './CaseStudyPage.css';

interface Persona {
  name: string;
  age?: number;
  role?: string;
  pain: string;
  goal?: string;
}

interface CSDMatrix {
  certainties: string[];
  suppositions: string[];
  doubts: string[];
}

interface CaseStudyData {
  title: string;
  type: 'proposal' | 'real' | 'fictional';
  overview: string;
  challenge: string;
  process: string;
  myRole: string;
  csdMatrix: CSDMatrix;
  userFlow: string;
  personas: Persona[];
  solution: string;
  finalProject: string;
  image: string;
  prototypeUrl: string;
}

const caseStudies: { [key: string]: CaseStudyData } = {
  '1': {
    title: 'TI Help',
    type: 'real',
    overview: 'Uma plataforma inovadora de suporte técnico que conecta usuários com especialistas de TI de forma rápida e eficiente.',
    challenge: 'Criar uma interface intuitiva para facilitar a comunicação entre usuários leigos e técnicos de TI, reduzindo o tempo de resolução de chamados.',
    process: 'Iniciamos com pesquisa qualitativa (entrevistas e shadowing), seguida de análise de concorrentes. Criamos wireframes de baixa fidelidade, testamos com usuários, iteramos e desenvolvemos protótipos de alta fidelidade antes da entrega final.',
    myRole: 'Atuei como UX Designer responsável por toda a pesquisa com usuários, arquitetura de informação, fluxos de interação, wireframes e protótipos interativos no Figma.',
    csdMatrix: {
      certainties: [
        'Usuários têm dificuldade em descrever problemas técnicos',
        'O tempo de espera é o principal ponto de frustração',
        'Técnicos precisam de contexto claro antes de atender',
      ],
      suppositions: [
        'Um sistema de triagem automática reduziria o tempo de espera',
        'Chat em tempo real seria preferido ao e-mail',
        'Usuários aceitariam vídeo chamada se necessário',
      ],
      doubts: [
        'Qual o nível médio de letramento digital dos usuários?',
        'Os técnicos adotariam o sistema sem treinamento extenso?',
        'Notificações em tempo real aumentariam ou sobrecarregariam os técnicos?',
      ],
    },
    userFlow: 'Usuário abre ticket → Descreve o problema com template guiado → Sistema categoriza automaticamente → Técnico disponível é notificado → Chat/vídeo chamada é iniciado → Problema resolvido → Avaliação de satisfação.',
    personas: [
      {
        name: 'João Silva',
        age: 42,
        role: 'Gerente Administrativo',
        pain: 'Não consegue descrever problemas técnicos com clareza, perdendo tempo em idas e vindas.',
        goal: 'Resolver problemas de TI rapidamente sem precisar entender tecnologia.',
      },
      {
        name: 'Maria Fernanda',
        age: 31,
        role: 'Técnica Sênior de TI',
        pain: 'Recebe chamados mal descritos e precisa gerenciar múltiplas situações simultâneas.',
        goal: 'Receber contexto claro antes de cada atendimento para ser mais eficiente.',
      },
    ],
    solution: 'Desenvolvemos um sistema de abertura de tickets guiado por perguntas simples, eliminando a necessidade do usuário saber descrever o problema tecnicamente. A triagem automática por categoria reduziu o tempo de espera e o chat em tempo real com histórico preservado facilitou a comunicação contínua.',
    finalProject: 'O produto entregue reduziu em 45% o tempo médio de resolução de chamados e atingiu 4.7/5 de satisfação nas avaliações pós-atendimento. O template guiado de descrição de problema foi o diferencial mais citado pelos técnicos.',
    image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=TI+Help',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '2': {
    title: 'Solar Panel Monitoring',
    type: 'real',
    overview: 'Sistema de monitoramento em tempo real para painéis solares residenciais, tornando dados complexos de energia acessíveis para qualquer pessoa.',
    challenge: 'Traduzir métricas técnicas de geração de energia em informações simples e acionáveis para proprietários sem formação técnica.',
    process: 'Análise de 50 painéis solares em campo, entrevistas com proprietários e instaladores, benchmarking de apps de energia, design de dashboard iterativo com testes A/B para validar as visualizações.',
    myRole: 'UX/UI Designer responsável pela pesquisa de campo, design do sistema de visualização de dados, criação dos fluxos e prototipagem completa.',
    csdMatrix: {
      certainties: [
        'Proprietários não entendem termos como kWh e pico de geração',
        'Alertas de problema geram ansiedade se mal comunicados',
        'Comparativos com períodos anteriores são mais compreensíveis que dados absolutos',
      ],
      suppositions: [
        'Gráficos coloridos seriam mais eficazes que tabelas numéricas',
        'Notificações de economia motivariam engajamento diário',
        'A maioria acessaria pelo celular, não pelo computador',
      ],
      doubts: [
        'Qual frequência ideal de atualização dos dados sem sobrecarregar a bateria?',
        'Usuários comparariam desempenho com vizinhos se tivessem essa opção?',
        'Alertas de manutenção seriam ignorados ou seguidos?',
      ],
    },
    userFlow: 'Usuário abre app → Vê resumo do dia (economia e geração) → Acessa gráfico semanal/mensal → Recebe alerta de anomalia → Contata instalador com um toque → Histórico de atendimentos.',
    personas: [
      {
        name: 'Roberto Alves',
        age: 55,
        role: 'Proprietário Residencial',
        pain: 'Não entende os dados técnicos do painel e não sabe se o sistema está funcionando bem.',
        goal: 'Saber, de forma simples, se está economizando e se algo está errado.',
      },
      {
        name: 'Ana Beatriz',
        age: 28,
        role: 'Instaladora e Técnica',
        pain: 'Precisa monitorar dezenas de sistemas de clientes e ser avisada sobre falhas antes que eles percebam.',
        goal: 'Ter uma visão centralizada de todos os seus clientes com alertas inteligentes.',
      },
    ],
    solution: 'Dashboard com linguagem acessível — "Você economizou R$ 120 este mês" em vez de "Geração: 340 kWh". Alertas com linguagem humana, comparativo visual com mês anterior e botão de contato direto com o instalador em caso de anomalia.',
    finalProject: 'O app aumentou o engajamento diário dos usuários em 200% comparado à versão anterior. As chamadas de suporte técnico caíram 60% pois os alertas passaram a ser acionáveis e compreensíveis. NPS atingiu 72.',
    image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Solar+Panel',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '3': {
    title: 'DN Jeans',
    type: 'real',
    overview: 'Redesign completo do e-commerce de uma marca brasileira de jeans, com foco em aumentar conversão e reduzir devoluções.',
    challenge: 'A loja tinha alta taxa de abandono no checkout e elevado índice de devoluções por tamanho incorreto, dois problemas diretamente ligados a falhas de UX.',
    process: 'Análise de heatmaps e session recordings, entrevistas com 30 clientes, benchmarking de e-commerces de moda, redesign iterativo com testes de usabilidade em cada etapa.',
    myRole: 'UX Designer liderando pesquisa com usuários, redesign da jornada de compra, arquitetura de informação do catálogo e prototipagem dos fluxos de checkout.',
    csdMatrix: {
      certainties: [
        'Usuários abandonam no checkout por processo longo demais',
        'A falta de guia de tamanho causa insegurança na compra',
        'Fotos de produto em ângulo único não transmitem confiança',
      ],
      suppositions: [
        'Um checkout em 3 passos reduziria abandono significativamente',
        'Fotos com modelos de diferentes biotipos reduziriam devoluções',
        'Reviews com foto de cliente aumentariam conversão',
      ],
      doubts: [
        'Usuários usariam um assistente de tamanho interativo?',
        'Parcelamento em destaque mudaria a decisão de compra?',
        'Filtro por biotipo seria bem recebido ou controverso?',
      ],
    },
    userFlow: 'Usuário chega na home → Filtra por categoria/tamanho/biotipo → Página de produto com fotos 360° → Consulta guia de tamanho → Adiciona ao carrinho → Checkout 3 passos → Confirmação com estimativa de entrega.',
    personas: [
      {
        name: 'Lara Mendonça',
        age: 26,
        role: 'Consumidora Fashion-Conscious',
        pain: 'Compra e devolve frequentemente por não confiar no tamanho indicado.',
        goal: 'Comprar com confiança de que o produto vai servir sem precisar trocar.',
      },
      {
        name: 'Carla Souza',
        age: 38,
        role: 'Mãe com Tempo Escasso',
        pain: 'Checkout longo a faz desistir da compra, prefere lojas físicas pela agilidade.',
        goal: 'Comprar online com a mesma rapidez de ir numa loja e já saber o que vai levar.',
      },
    ],
    solution: 'Guia de tamanho interativo com medidas em centímetros (não apenas P/M/G), fotos 360° com modelos de diferentes biotipos, checkout reduzido para 3 passos com progresso visual e reviews com foto de cliente verificado.',
    finalProject: 'Taxa de conversão aumentou 42% em 60 dias. Devoluções caíram de 28% para 12%. O guia de tamanho foi citado em 78% das avaliações positivas como fator decisivo na compra.',
    image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=DN+Jeans',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '4': {
    title: 'Real State Platform',
    type: 'proposal',
    overview: 'Plataforma de busca e locação de imóveis com experiência de usuário diferenciada em um mercado saturado de soluções genéricas.',
    challenge: 'Diferenciar em mercado onde todas as plataformas parecem iguais, criando uma experiência que realmente guie o usuário na jornada de encontrar o imóvel certo.',
    process: 'Etnografia digital acompanhando 40 usuários em jornada real de busca de imóvel, customer journey mapping, redesign completo da arquitetura de informação, MVP validado com usuários.',
    myRole: 'UX Lead responsável por pesquisa etnográfica, customer journey mapping, design de toda a experiência de busca e filtragem, e coordenação dos testes de usabilidade.',
    csdMatrix: {
      certainties: [
        'Usuários se sentem perdidos sem orientação na jornada de compra de imóvel',
        'Fotos de baixa qualidade eliminam o imóvel da consideração imediatamente',
        'Falta de transparência em preços e taxas gera desconfiança',
      ],
      suppositions: [
        'Tour virtual 3D reduziria o número de visitas presenciais desnecessárias',
        'Filtros inteligentes com IA aumentariam relevância dos resultados',
        'Recomendações baseadas em comportamento gerariam mais engajamento',
      ],
      doubts: [
        'Usuários confiariam em avaliações de bairro geradas por IA?',
        'O nível de personalização ideal sem parecer invasivo?',
        'Imobiliárias adotariam tours 3D sem incentivo financeiro?',
      ],
    },
    userFlow: 'Usuário define perfil de busca → Recebe recomendações personalizadas → Filtra com critérios avançados → Visualiza tour 3D → Salva favoritos → Agenda visita presencial → Inicia processo de proposta dentro da plataforma.',
    personas: [
      {
        name: 'Paulo Henrique',
        age: 34,
        role: 'Primeiro Comprador',
        pain: 'Não sabe por onde começar, se sente intimidado com a quantidade de opções e termos técnicos.',
        goal: 'Ser guiado de forma clara na jornada de compra sem precisar consultar corretores o tempo todo.',
      },
      {
        name: 'Adriana Costa',
        age: 45,
        role: 'Corretora Independente',
        pain: 'Gerencia muitas propriedades manualmente, perde tempo com visitas de clientes não qualificados.',
        goal: 'Plataforma que filtre melhor os leads e facilite o agendamento e acompanhamento de propostas.',
      },
    ],
    solution: 'Onboarding com quiz de perfil que personaliza toda a experiência de busca. Filtros contextuais que se adaptam ao comportamento do usuário. Tour virtual 3D integrado. Sistema de proposta e negociação dentro da plataforma, eliminando intermediários desnecessários.',
    finalProject: 'Proposta apresentada ao cliente com validação de 85% de preferência em testes comparativos com as principais plataformas do mercado. O sistema de recomendação personalizado foi o diferencial mais valorizado pelos usuários testados.',
    image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Real+State',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '5': {
    title: 'Yacht Booking',
    type: 'fictional',
    overview: 'Aplicativo conceitual para reserva de iates e experiências marítimas premium, explorando design de alto padrão para público luxury.',
    challenge: 'Criar uma experiência digital que transmita exclusividade, segurança e sofisticação para transações de altíssimo valor — onde a confiança é tudo.',
    process: 'Pesquisa de mercado luxury, análise de benchmarks de apps premium (Porsche, Net-A-Porter, Soho House), definição de linguagem visual e interacional que comunicasse exclusividade sem excesso.',
    myRole: 'Projeto autoral de exploração de design. Responsável por toda a conceituação, pesquisa, definição de linguagem visual, prototipagem e documentação do design system.',
    csdMatrix: {
      certainties: [
        'Público luxury tem altíssima expectativa de qualidade visual e interacional',
        'Segurança e verificação de identidade são inegociáveis para esse público',
        'Excesso de informação e poluição visual comunicam falta de sofisticação',
      ],
      suppositions: [
        'Interface minimalista comunica melhor qualidade que interface densa',
        'Gestos e micro-interações premium diferenciariam da concorrência',
        'Curadoria editorial (como uma revista) seria mais eficaz que listagem tradicional',
      ],
      doubts: [
        'Até onde ir na simplificação sem perder informação essencial para decisão?',
        'Qual o nível ideal de personalização para não parecer intrusivo?',
        'Dark mode seria percebido como mais premium que light mode para esse público?',
      ],
    },
    userFlow: 'Usuário acessa editorial de experiências → Seleciona destino/período → Visualiza iate com galeria imersiva → Verifica disponibilidade em tempo real → Verificação de identidade → Pagamento seguro → Confirmação com concierge dedicado.',
    personas: [
      {
        name: 'Eduardo Ximenes',
        age: 48,
        role: 'Empresário High Net Worth',
        pain: 'Plataformas genéricas de aluguel não transmitem a confiança e exclusividade que ele espera para essa categoria de gasto.',
        goal: 'Reservar uma experiência marítima única com a mesma praticidade de pedir um Uber, mas com nível de serviço de um hotel 5 estrelas.',
      },
      {
        name: 'Catarina Mello',
        age: 35,
        role: 'Gestora de Frota Náutica',
        pain: 'Controle de reservas, manutenção e disponibilidade de múltiplos iates em sistemas diferentes e desconectados.',
        goal: 'Uma plataforma centralizada onde gerencie toda a operação e tenha visibilidade em tempo real de cada embarcação.',
      },
    ],
    solution: 'Interface editorial com curadoria de experiências em vez de lista de produtos. Galeria imersiva de cada iate com vídeo. Processo de reserva simplificado em 4 toques. Verificação de identidade fluida e discreta. Concierge digital disponível 24h via chat.',
    finalProject: 'Projeto conceitual completo com design system documentado, 40 telas prototipadas e apresentação de case. Exploração aprofundada de micro-interações premium e linguagem visual de alto padrão como exercício de portfólio.',
    image: 'https://placehold.co/900x500/1a1a1a/ffffff?text=Yacht+Booking',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
};

const typeConfig = {
  proposal: { label: 'Proposta', color: '#0066ff' },
  real: { label: 'Projeto Real', color: '#00a86b' },
  fictional: { label: 'Projeto Ficcional', color: '#9b59b6' },
};

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = caseStudies[id || '1'];

  if (!project) {
    return (
      <MainLayout>
        <div className="case-study-page case-study-page--not-found">
          <p>Case não encontrado.</p>
          <button onClick={() => navigate('/')} className="back-button">
            ← Voltar
          </button>
        </div>
      </MainLayout>
    );
  }

  const type = typeConfig[project.type];

  return (
    <MainLayout>
      <div className="case-study-page">

        <button onClick={() => navigate(-1)} className="back-button">
          ← Voltar
        </button>

        <header className="case-study-hero">
          <span
            className="case-study-type-tag"
            style={{ borderColor: type.color, color: type.color }}
          >
            {type.label}
          </span>
          <h1 className="case-study-title">{project.title}</h1>
        </header>

        <main className="case-study-content">

          <section className="cs-section">
            <span className="cs-section__label">Overview</span>
            <p className="cs-section__text">{project.overview}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">The Challenge</span>
            <p className="cs-section__text">{project.challenge}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">Process</span>
            <p className="cs-section__text">{project.process}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">My Role</span>
            <p className="cs-section__text">{project.myRole}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">CSD Matrix</span>
            <div className="csd-grid">
              <div className="csd-column csd-column--certainties">
                <h3 className="csd-column__title">Certainties</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.certainties.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--suppositions">
                <h3 className="csd-column__title">Suppositions</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.suppositions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--doubts">
                <h3 className="csd-column__title">Doubts</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.doubts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">User Flow</span>
            <p className="cs-section__text">{project.userFlow}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">Personas</span>
            <div className="personas-grid">
              {project.personas.map((persona, index) => (
                <div key={index} className="persona-card">
                  <div className="persona-card__header">
                    <div className="persona-card__avatar">
                      {persona.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="persona-card__name">{persona.name}</h3>
                      {persona.age && persona.role && (
                        <p className="persona-card__meta">
                          {persona.age} anos · {persona.role}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="persona-card__body">
                    <p className="persona-card__label">Pain Point</p>
                    <p className="persona-card__text">{persona.pain}</p>
                    {persona.goal && (
                      <>
                        <p className="persona-card__label">Goal</p>
                        <p className="persona-card__text">{persona.goal}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">The Solution</span>
            <p className="cs-section__text">{project.solution}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">Final Project</span>
            <p className="cs-section__text">{project.finalProject}</p>
            <div className="project-image-wrapper">
              <img
                src={project.image}
                alt={`${project.title} final design`}
                className="project-final-image"
              />
              <div className="project-image-overlay">
                <button
                  className="btn-watch"
                  onClick={() => window.open(project.prototypeUrl, '_blank')}
                >
                  <span className="play-icon" />
                  Watch Prototype
                </button>
              </div>
            </div>
          </section>

        </main>

        <footer className="case-study-footer">
          <button className="btn-back-projects" onClick={() => navigate('/')}>
            ← Ver Mais Projetos
          </button>
        </footer>

      </div>
    </MainLayout>
  );
};

export default CaseStudyPage;