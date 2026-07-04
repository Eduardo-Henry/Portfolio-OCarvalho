import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../../components/templates';
import './CaseStudyPage.css';
import TIHelpImg from '@/assets/images/TIHelp.png';
import KaloBurnImg from '@/assets/images/KaloBurn.png';
import DNJeansImg from '@/assets/images/DNJeans.png';
import RealStateImg from '@/assets/images/RealState.png';
import YatchImg from '@/assets/images/Yatch.jpeg';
import SolarPanelImg from '@/assets/images/SolarPanel.png';

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
    overview:
      'Sistema integrado de suporte técnico (mobile, web e desktop) desenvolvido como TCC, substituindo o atendimento descentralizado via WhatsApp e e-mail por um fluxo único de abertura e acompanhamento de chamados, com triagem assistida por IA.',
    challenge:
      'O suporte de TI era feito de forma pulverizada, sem rastreabilidade nem visibilidade de status — usuários reenviavam a mesma solicitação em canais diferentes por falta de resposta, e técnicos recebiam chamados sem contexto padronizado.',
    process:
      'Discovery presencial com 11 sponsor users (7 alunos de ADS, 2 de outra turma de ADS, 2 de Psicologia). Na primeira versão do fluxo, o próprio usuário escolhia o nível de prioridade do chamado (baixa/média/alta) — em discussão com professores e a equipe de 4 integrantes, identificamos um viés estrutural antes mesmo de testar: usuários tenderiam a marcar sempre "alta prioridade" para serem atendidos mais rápido, invalidando a triagem. Corrigimos removendo a autoatribuição, substituindo por seleção de tipo de problema (hardware/software/redes) + descrição livre, deixando a prioridade a cargo da triagem (IA + técnico). Esta foi a única entrega das 4 conduzida com backlog formal ao longo dos 6 meses de projeto.',
    myRole:
      'UX/UI Designer e desenvolvedor front-end mobile em equipe de 4 integrantes, responsável pela pesquisa com usuários, arquitetura de informação, fluxos, protótipos de alta fidelidade e implementação da versão mobile em React Native.',
    csdMatrix: {
      certainties: [
        'Usuários não sabiam o status de um chamado já aberto, gerando reenvio repetido em canais diferentes',
        'Deixar o usuário autoatribuir prioridade geraria viés sistemático para "alta prioridade"',
        'Técnicos precisavam de categorização clara (hardware/software/redes) para triagem rápida',
      ],
      suppositions: [
        'Categorização assistida por IA reduziria o tempo de triagem manual',
        'Reposicionar notificações e menu reduziria o tempo de execução das tarefas no app',
      ],
      doubts: [
        'A IA de triagem se manteria precisa em volume real, fora do ambiente controlado de teste?',
        'Usuários não-técnicos (ex. alunos de Psicologia) adaptariam ao fluxo tão bem quanto os de ADS no longo prazo?',
      ],
    },
    userFlow:
      'Usuário identifica o problema → seleciona tipo (hardware/software/redes) e descreve → chamado é categorizado e priorizado pela triagem → usuário acompanha status em tempo real. No fluxo do técnico (Web/Desktop): se não houver tempo de abrir o chamado imediatamente, ele entra automaticamente como prioridade baixa em espera, configurável manualmente ou com sugestão da IA depois. No painel do administrador: criação, exclusão e atualização de funcionários restrita ao admin, incluindo exclusão de dados de funcionários desligados — maior ganho de governança identificado pela equipe.',
    personas: [
      {
        name: 'Participante ADS',
        role: 'Usuário técnico do sistema',
        pain: 'Abria chamados por WhatsApp e e-mail sem saber se alguém estava tratando o problema, reenviando a mesma mensagem em canais diferentes.',
        goal: 'Abrir e acompanhar um chamado em qualquer dispositivo, com status visível, sem precisar cobrar ninguém.',
      },
      {
        name: 'Participante de Psicologia',
        role: 'Usuário não-técnico do sistema',
        pain: 'Dificuldade em descrever problemas técnicos com vocabulário específico, o que atrasava o atendimento.',
        goal: 'Relatar um problema com linguagem simples, sem precisar saber terminologia de TI.',
      },
    ],
    solution:
      'Remoção da autoatribuição de prioridade pelo usuário → seleção de tipo de problema + descrição livre. Reposicionamento de notificações e menu na versão mobile. Fluxo do técnico com estado automático de espera/prioridade baixa para chamados sem atendimento imediato. Restrição de gestão de funcionários e exclusão de dados ao admin.',
    finalProject:
      'MÉTRICA ANTES vs. DEPOIS (teste presencial, 11 participantes + professores da banca): tempo para executar as tarefas principais do app caiu de pouco mais de 5 minutos para 3 minutos e 30 segundos — redução de ~30% — após o reposicionamento de menu/notificações. TAXA DE SUCESSO: 100% mantida em ambas as versões (antes e depois) — ou seja, o ganho foi de EFICIÊNCIA, não de CONCLUSÃO; ninguém deixava de completar a tarefa antes da mudança, apenas demorava mais. ERRO IDENTIFICADO E CORRIGIDO: viés de autoatribuição de prioridade, resolvido no Reflect antes mesmo do teste formal. AVALIAÇÃO ACADÊMICA: nota 8,5/10 na banca do TCC. LIMITAÇÃO DECLARADA: medição de tempo feita de forma informal, sem cronometragem instrumentada por sessão — dado direcional relatado pela equipe e pela banca, não teste de usabilidade instrumentado com stopwatch por tarefa.',
    image: TIHelpImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '2': {
    title: 'KaloBurn',
    type: 'proposal',
    overview:
      'Marketplace fitness de dois lados conectando usuários finais a profissionais de educação física, com IA de personalização de treino e evolução — desenhado com o princípio explícito de nunca fazer alegação de resultado de saúde.',
    challenge:
      'Profissionais de educação física gerenciam alunos, agenda e financeiro em ferramentas desconectadas (WhatsApp, planilha, agenda separada), enquanto usuários iniciam rotinas fitness mas abandonam por falta de acompanhamento contínuo.',
    process:
      'Discovery presencial nos dois lados do marketplace. Antes da fase de desenho, estabelecemos como princípio de design que nenhuma mecânica de retenção (ranking, gamificação) poderia sugerir promessa de resultado de saúde — decisão tomada no Reflect, não corrigida depois. Conduzi auditoria de usabilidade com as 10 heurísticas de Nielsen em 14 telas do protótipo, mapeando inconsistências de UI e gaps de fluxo antes do handoff.',
    myRole:
      'UX/UI Designer responsável pela concepção end-to-end dos dois ecossistemas de tela (usuário e profissional), arquitetura de informação, prototipagem de alta fidelidade e auditoria de usabilidade.',
    csdMatrix: {
      certainties: [
        'Profissionais gerenciam alunos, agenda e financeiro em ferramentas fragmentadas hoje',
        'Usuários abandonam rotinas fitness por falta de registro de evolução visível',
        'Mecânicas de retenção precisam de limite ético explícito para não sugerir promessa de saúde',
      ],
      suppositions: [
        'Consolidar alunos, agenda, financeiro e chat em um único painel aumentaria a adoção pelo profissional',
        'Mecânicas de comunidade (ranking, amigos) sustentam motivação melhor que acompanhamento solo',
      ],
      doubts: [
        'O princípio de "sem alegação de saúde" resistiria a uma auditoria feita por profissional de saúde, e não só a uma decisão de design?',
        'O impacto real de retenção só seria validável com dado de uso em produção, não em protótipo',
      ],
    },
    userFlow:
      'Usuário: onboarding captura restrições → treino e diário são registrados continuamente → evolução e ranking tornam o progresso visível → comunidade sustenta motivação. Profissional: dashboard consolidado com alunos, agenda, plano alimentar, financeiro e chat em um único painel.',
    personas: [
      {
        name: 'Usuário iniciante fitness',
        role: 'Cliente final do marketplace',
        pain: 'Começa uma rotina fitness mas perde o hábito silenciosamente por falta de feedback de progresso.',
        goal: 'Manter consistência ao longo do tempo através de acompanhamento e comunidade, sem depender só de força de vontade.',
      },
      {
        name: 'Profissional de educação física',
        role: 'Prestador de serviço no marketplace',
        pain: 'Gerencia carteira de alunos, agenda e financeiro em ferramentas desconectadas (WhatsApp, planilha, agenda separada).',
        goal: 'Ter toda a gestão do negócio — alunos, agenda e financeiro — em um único painel.',
      },
    ],
    solution:
      'Dois ecossistemas completos e paralelos: usuário (onboarding com restrições, evolução, ranking, amigos, treino, diário, assinatura, estados vazios, múltiplos dispositivos) e profissional (dashboard, alunos, treino, plano alimentar, agenda, financeiro, chat, avaliações, gestão). Identidade visual de fundo escuro, verde neon e ícones outline.',
    finalProject:
      'SEM MÉTRICA QUANTIFICADA — diferente do TI Help, este projeto não tem dado de antes/depois nem taxa de sucesso numérica. Auditoria de usabilidade com as 10 heurísticas de Nielsen em 14 telas mapeou inconsistências corrigidas antes do handoff. Teste presencial moderado confirmou qualitativamente que participantes localizaram as funções principais em ambos os perfis (usuário e profissional), sem backlog formal documentado e sem cronometragem de tarefa. Resposta honesta se questionado em entrevista: "validado qualitativamente, sem métrica formal de antes/depois."',
    image: KaloBurnImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '3': {
    title: 'DN Jeans',
    type: 'real',
    overview:
      'Catálogo digital mobile-first para uma marca de jeans, substituindo checkout tradicional por conversão direta via WhatsApp — já qualificada com cor, tecido e tamanho escolhidos pelo cliente.',
    challenge:
      'Clientes já compravam informalmente por WhatsApp após ver produtos no Instagram, mas sem catálogo central — cada venda exigia perguntas manuais repetidas de disponibilidade, cor, tecido e tamanho antes de fechar.',
    process:
      'Discovery presencial revelou que o problema não era falta de interesse do cliente, e sim ausência de um ponto único de descoberta antes do contato direto. Decisão central: eliminar carrinho e checkout tradicional, mantendo o WhatsApp como canal de fechamento real da marca — em vez de forçar um padrão de e-commerce que a marca não usaria.',
    myRole:
      'UX Estratégico — pesquisa com usuários, redesenho da jornada de compra, arquitetura de navegação e definição de microcopy orientado a conversão.',
    csdMatrix: {
      certainties: [
        'Clientes já perguntavam por WhatsApp sobre produtos vistos no Instagram, sem catálogo central',
        'Cada venda exigia repetir manualmente as mesmas perguntas de cor, tecido e tamanho',
      ],
      suppositions: [
        'Pré-qualificar a escolha (cor, tecido, tamanho) antes de abrir o WhatsApp aceleraria a decisão de compra',
        'Um FAQ posicionado antes do rodapé capturaria objeções de última hora sem tirar o cliente do fluxo',
      ],
      doubts: [
        'A ausência de carrinho multi-produto se tornará um limitador conforme o catálogo crescer?',
      ],
    },
    userFlow:
      'Home (hero + categorias) → grid de produtos paginado → página de produto com seleção de cor, tecido e tamanho → CTA "Comprar Pelo WhatsApp" já contextualizado com as escolhas do cliente.',
    personas: [
      {
        name: 'Cliente de Instagram',
        role: 'Comprador informal via redes sociais',
        pain: 'Via a peça no Instagram e precisava perguntar tudo manualmente no WhatsApp — disponibilidade, cor, tecido, tamanho — antes de decidir.',
        goal: 'Chegar da descoberta à decisão de compra com o mínimo de perguntas possível.',
      },
    ],
    solution:
      'Eliminação do carrinho de compras tradicional, substituído por CTA de WhatsApp por produto já configurado. Grid paginado por categoria (Casual/Lycra), seleção de cor/tecido/tamanho na própria página do produto, FAQ posicionado antes do rodapé e banner de incentivo ("Ganhe 20% na primeira compra") após o grid, no momento em que o cliente já demonstrou interesse.',
    finalProject:
      'SEM MÉTRICA QUANTIFICADA — sem dado de conversão em produção, sem taxa de sucesso numérica, sem backlog formal documentado. Teste presencial moderado confirmou qualitativamente que participantes completaram o fluxo de seleção até o CTA de compra sem orientação prévia. Limite conhecido e não resolvido: se o catálogo crescer, a ausência de carrinho multi-produto pode se tornar limitador — não validado com volume real.',
    image: DNJeansImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '4': {
    title: 'ImovePro',
    type: 'proposal',
    overview:
      'Marketplace imobiliário multi-perfil (comprador/vendedor, consultor, empresa) com busca por raio geográfico e mapa interativo, substituindo o filtro tradicional por cidade/bairro.',
    challenge:
      'Consultores imobiliários gerenciam leads, agenda e comunicação em ferramentas desconectadas (WhatsApp, planilha, agenda separada), enquanto compradores dependem de filtros de localização rasos que não refletem sua real área de interesse.',
    process:
      'Discovery presencial com os três perfis do marketplace. Decidimos tratar cada perfil como workspace visualmente distinto (não um painel único com permissões) para reduzir sobrecarga cognitiva — cada um vê apenas o que precisa no seu contexto.',
    myRole:
      'UX/UI Designer responsável pela concepção dos três dashboards, arquitetura de navegação, pipeline de leads e busca geolocalizada.',
    csdMatrix: {
      certainties: [
        'Consultores tratam gestão de leads fragmentada como o maior ponto de dor, não a busca em si',
        'Compradores tratam descoberta geográfica precisa como decisivo na escolha da plataforma',
      ],
      suppositions: [
        'Consolidar leads, agenda e chat em um único painel reduziria follow-ups esquecidos',
        'Busca por raio com mapa interativo aumentaria a relevância percebida dos resultados',
      ],
      doubts: [
        'Três workspaces visuais distintos (cores/temas diferentes por perfil) resistem à escala sem fragmentar o design system?',
      ],
    },
    userFlow:
      'Consultor: lead entra no pipeline (Novo → Contatado → Em Negociação → Fechado) → agenda e conversa no mesmo painel → alerta de follow-ups pendentes há mais de 24h. Comprador: seleciona workspace → busca por raio no mapa → filtra por tipo/orçamento → solicita cotação.',
    personas: [
      {
        name: 'Consultor imobiliário',
        role: 'Profissional autônomo',
        pain: 'Alterna entre WhatsApp, planilha e agenda separada para saber quais leads já esfriaram.',
        goal: 'Ver todo o pipeline de leads em um único painel, sem cruzar múltiplas ferramentas.',
      },
      {
        name: 'Comprador/Vendedor',
        role: 'Usuário final buscando imóvel',
        pain: 'Filtros tradicionais por bairro/cidade não refletem a real área de interesse.',
        goal: 'Encontrar opções realmente próximas de onde precisa estar, via mapa por raio.',
      },
    ],
    solution:
      'Três dashboards distintos (Consultor, Comprador/Vendedor, Empresa) com identidade visual compartilhada. Pipeline de leads em Kanban e tabela, alerta de follow-ups pendentes, busca por raio com mapa interativo e pins customizados.',
    finalProject:
      'SEM MÉTRICA QUANTIFICADA — sem processo ágil formal documentado (diferente do TI Help), sem taxa de sucesso numérica, sem dado de conversão em produção. Teste presencial moderado confirmou qualitativamente que participantes dos três perfis localizaram as funções centrais do sistema sem orientação prévia. Tensão não resolvida de design system: fundo escuro (Consultor/Empresa) e fundo claro (Comprador) compartilham cor de destaque, mas não tokens completos.',
    image: RealStateImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '5': {
    title: 'Yacht Booking',
    type: 'fictional',
    overview:
      'Aplicativo conceitual para reserva de iates e experiências marítimas premium, explorando design de alto padrão para público luxury.',
    challenge:
      'Criar uma experiência digital que transmita exclusividade, segurança e sofisticação para transações de altíssimo valor — onde a confiança é tudo.',
    process:
      'Pesquisa de mercado luxury, análise de benchmarks de apps premium (Porsche, Net-A-Porter, Soho House), definição de linguagem visual e interacional que comunicasse exclusividade sem excesso.',
    myRole:
      'Projeto autoral de exploração de design. Responsável por toda a conceituação, pesquisa, definição de linguagem visual, prototipagem e documentação do design system.',
    csdMatrix: {
      certainties: [
        'Público luxury tem altíssima expectativa de qualidade visual e interacional',
        'Segurança e verificação de identidade são inegociáveis para esse público',
        'Excesso de informação e poluição visual comunicam falta de sofisticação',
      ],
      suppositions: [
        'Interface minimalista comunica melhor qualidade que interface densa',
        'Gestos e micro-interações premium diferenciariam da concorrência',
        'Curadoria editorial seria mais eficaz que listagem tradicional',
      ],
      doubts: [
        'Até onde ir na simplificação sem perder informação essencial para decisão?',
        'Qual o nível ideal de personalização para não parecer intrusivo?',
        'Dark mode seria percebido como mais premium que light mode para esse público?',
      ],
    },
    userFlow:
      'Usuário acessa editorial de experiências → Seleciona destino/período → Visualiza iate com galeria imersiva → Verifica disponibilidade em tempo real → Verificação de identidade → Pagamento seguro → Confirmação com concierge dedicado.',
    personas: [
      {
        name: 'Eduardo Ximenes',
        age: 48,
        role: 'Empresário High Net Worth',
        pain: 'Plataformas genéricas não transmitem a confiança e exclusividade que ele espera para essa categoria de gasto.',
        goal: 'Reservar uma experiência marítima única com praticidade de um Uber mas nível de um hotel 5 estrelas.',
      },
      {
        name: 'Catarina Mello',
        age: 35,
        role: 'Gestora de Frota Náutica',
        pain: 'Controle de reservas, manutenção e disponibilidade de múltiplos iates em sistemas diferentes e desconectados.',
        goal: 'Uma plataforma centralizada onde gerencie toda a operação com visibilidade em tempo real.',
      },
    ],
    solution:
      'Interface editorial com curadoria de experiências em vez de lista de produtos. Galeria imersiva de cada iate com vídeo. Processo de reserva simplificado em 4 toques. Verificação de identidade fluida e discreta. Concierge digital disponível 24h via chat.',
    finalProject:
      'Projeto conceitual completo com design system documentado, 40 telas prototipadas e apresentação de case. Exploração aprofundada de micro-interações premium e linguagem visual de alto padrão como exercício de portfólio.',
    image: YatchImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '6': {
    title: 'Solar Panel Monitoring',
    type: 'fictional',
    overview:
      'Template conceitual de site/app de monitoramento de painéis solares residenciais, desenvolvido para venda como produto de design — não a partir de pesquisa com clientes reais de energia solar, e sim como exercício de tradução de dado técnico complexo em interface acessível.',
    challenge:
      'Métricas de geração de energia (kWh, pico de geração, eficiência) são técnicas demais para o proprietário residencial médio, que só quer saber, de forma simples, se está economizando e se o sistema está funcionando bem.',
    process:
      'Pesquisa de referência em apps de energia e sustentabilidade existentes no mercado (benchmark, não pesquisa de campo própria), definição de uma hierarquia de informação que priorizasse linguagem humana ("Você economizou X este mês") sobre unidade técnica bruta (kWh).',
    myRole:
      'Projeto autoral, criado como template para venda (Gumroad/UI8/Figma Community). Responsável pela conceituação completa, definição de sistema de visualização de dados e prototipagem do fluxo end-to-end.',
    csdMatrix: {
      certainties: [
        'Termos técnicos como "kWh" e "pico de geração" não são compreendidos pelo usuário residencial médio',
        'Comparativos com período anterior são mais legíveis que valores absolutos isolados',
      ],
      suppositions: [
        'Tradução de dado técnico em linguagem de economia (R$/mês) aumentaria a compreensão e o engajamento com o app',
        'Alertas de manutenção com linguagem humana teriam mais adesão que notificação técnica genérica',
      ],
      doubts: [
        'Sem cliente real de energia solar validando o produto, a hierarquia de informação proposta resistiria a um teste de usabilidade real?',
        'O template serviria igualmente bem para diferentes fabricantes de painel, ou exigiria adaptação por integração técnica?',
      ],
    },
    userFlow:
      'Usuário abre o app → vê resumo do dia em linguagem simples (economia estimada, não kWh bruto) → acessa gráfico comparativo semanal/mensal → recebe alerta de anomalia com linguagem humana → contata suporte/instalador com um toque.',
    personas: [
      {
        name: 'Proprietário residencial (persona de referência)',
        role: 'Usuário final, sem formação técnica em energia',
        pain: 'Não entende os dados técnicos do painel e não sabe se o sistema está funcionando bem.',
        goal: 'Saber, de forma simples, se está economizando e se algo está errado — sem precisar interpretar unidade técnica.',
      },
    ],
    solution:
      'Dashboard com linguagem acessível em vez de unidade técnica bruta, comparativo visual com o mês anterior, alertas com linguagem humana e botão de contato direto com o instalador em caso de anomalia.',
    finalProject:
      'Template de produto de design, desenvolvido para venda (não implementado com cliente real de energia solar). Sem métrica de uso real — é um exercício de hierarquia de informação e visualização de dado técnico, não um case com resultado de negócio validado.',
    image: SolarPanelImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
};

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = id ? caseStudies[id] : undefined;

  // labels do "type tag" (Projeto Real / Proposta / Projeto Ficcional)
  // agora vêm do i18n, com a cor mantida fixa por tipo
  const typeConfig = {
    proposal: { label: t('caseStudyLabels.types.proposal'), color: '#0066ff' },
    real: { label: t('caseStudyLabels.types.real'), color: '#00a86b' },
    fictional: { label: t('caseStudyLabels.types.fictional'), color: '#9b59b6' },
  };

  if (!project) {
    return (
      <MainLayout>
        <div className="case-study-page case-study-page--not-found">
          <p>{t('caseStudyLabels.notFound')}</p>
          <button onClick={() => navigate('/')} className="back-button">
            <span className="back-button__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="17" y1="7" x2="7" y2="17" />
                <polyline points="17 17 7 17 7 7" />
              </svg>
            </span>
            {t('caseStudyLabels.back')}
          </button>
        </div>
      </MainLayout>
    );
  }

  const type = typeConfig[project.type];

  return (
    <MainLayout>
      <div className="case-study-page">
        {/* topbar alinhado ao mesmo container centralizado (max-width
            1400px) usado pelo hero e pelo conteúdo — resolve o
            desalinhamento do botão "Voltar" em telas largas, onde o
            conteúdo centralizado começa mais pra dentro do que um
            margin-left fixo relativo à borda da viewport */}
        <div className="case-study-topbar">
          <button onClick={() => navigate(-1)} className="back-button">
            <span className="back-button__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="17" y1="7" x2="7" y2="17" />
                <polyline points="17 17 7 17 7 7" />
              </svg>
            </span>
            {t('caseStudyLabels.back')}
          </button>
        </div>

        <header className="case-study-hero">
          <span
            className="case-study-type-tag"
            style={{ borderColor: type.color, color: type.color }}
          >
            {type.label}
          </span>
          <h1 className="case-study-title">
            {project.title}
          </h1>
        </header>

        <main className="case-study-content">
          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.overview')}</span>
            <p className="cs-section__text">{project.overview}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.challenge')}</span>
            <p className="cs-section__text">{project.challenge}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.process')}</span>
            <p className="cs-section__text">{project.process}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.myRole')}</span>
            <p className="cs-section__text">{project.myRole}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.csdMatrix')}</span>
            <div className="csd-grid">
              <div className="csd-column csd-column--certainties">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.certainties')}</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.certainties.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--suppositions">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.suppositions')}</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.suppositions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--doubts">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.doubts')}</h3>
                <ul className="csd-column__list">
                  {project.csdMatrix.doubts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.userFlow')}</span>
            <p className="cs-section__text">{project.userFlow}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.personas')}</span>
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
                      {!persona.age && persona.role && (
                        <p className="persona-card__meta">{persona.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="persona-card__body">
                    <p className="persona-card__label">{t('caseStudyLabels.persona.painPoint')}</p>
                    <p className="persona-card__text">{persona.pain}</p>
                    {persona.goal && (
                      <>
                        <p className="persona-card__label">{t('caseStudyLabels.persona.goal')}</p>
                        <p className="persona-card__text">{persona.goal}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.solution')}</span>
            <p className="cs-section__text">{project.solution}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.finalProject')}</span>
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
                  {t('caseStudies.watchPrototype')}
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="case-study-footer">
          <button className="btn-back-projects" onClick={() => navigate('/')}>
            {t('caseStudyLabels.seeMoreProjects')}
            <span className="btn-back-projects__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </footer>
      </div>
    </MainLayout>
  );
};

export default CaseStudyPage;