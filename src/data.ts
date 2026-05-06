export interface Marker {
  id: string;
  gene: string;
  genotype: string;
  cluster: string;
  clusterColor: string;
  confidence: number;
  tone: string;
  insight: string;
  action: string;
  terminalLines: string[];
}

export const MARKERS: Marker[] = [
  {
    id: 'rs7903146',
    gene: 'TCF7L2',
    genotype: 'CT',
    cluster: 'Metabolismo & Glicemia',
    clusterColor: '#2ec98f',
    confidence: 88,
    tone: 'Alta confiança',
    insight:
      'Tendência intermediária de sensibilidade glicêmica. Útil para orientar rotina alimentar com menor carga glicêmica e monitoramento preventivo.',
    action:
      'Priorizar proteína no café da manhã e acompanhar glicemia/insulina com profissional de saúde.',
    terminalLines: [
      '$ vita query --snp rs7903146',
      '',
      '> scanning codex v6.3...',
      '> match found: rs7903146',
      '> gene:      TCF7L2',
      '> locus:     10q25.2',
      '> genotype:  CT  (heterozygous)',
      '> effect:    risk allele T',
      '> OR:        1.32  (95% CI: 1.19–1.47)',
      '> p_value:   3.7e-33',
      '> study:     GWAS T2D meta-analysis',
      '> N:         68,000 participants',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
  {
    id: 'rs4680',
    gene: 'COMT',
    genotype: 'GA',
    cluster: 'Neurociência & Foco',
    clusterColor: '#b846ff',
    confidence: 79,
    tone: 'Confiança moderada',
    insight:
      'Perfil intermediário de processamento dopaminérgico. O impacto prático depende muito de sono, estresse e contexto pessoal.',
    action:
      'Usar rotina estável, blocos de foco e proteção de sono antes de intensificar metas cognitivas.',
    terminalLines: [
      '$ vita query --snp rs4680',
      '',
      '> scanning codex v6.3...',
      '> match found: rs4680',
      '> gene:      COMT',
      '> locus:     22q11.21',
      '> genotype:  GA  (Val158Met heterozygous)',
      '> effect:    intermediate COMT activity',
      '> type:      missense variant',
      '> pathway:   dopamine catabolism',
      '> note:      context-dependent expression',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
  {
    id: 'rs429358+rs7412',
    gene: 'APOE',
    genotype: 'ε3/ε3',
    cluster: 'Cardiovascular & Lipídios',
    clusterColor: '#f28a22',
    confidence: 91,
    tone: 'Alta confiança composta',
    insight:
      'Leitura composta exige dois marcadores. O valor não está em um SNP isolado, mas na interpretação combinada da isoforma APOE e seu impacto no metabolismo lipídico.',
    action:
      'Cruzar com LDL, HDL e triglicérides clínicos antes de gerar recomendação — Clinical Sync obrigatório.',
    terminalLines: [
      '$ vita query --compound APOE',
      '',
      '> scanning codex v6.3...',
      '> mode:      compound haplotype',
      '> snp_1:     rs429358  (C/T)',
      '> snp_2:     rs7412    (C/T)',
      '> haplotype: ε3/ε3  (most common)',
      '> gene:      APOE',
      '> locus:     19q13.32',
      '> pathway:   lipid transport & clearance',
      '> caveat:    requires 2-SNP co-interpretation',
      '',
      '> status: raw · awaiting interpretation...',
    ],
  },
];

export const PIPELINE_STEPS = [
  {
    id: 'codex',
    icon: 'database',
    title: 'Codex Curado',
    subtitle: '33 SNPs validados',
    desc: 'Base de conhecimento curada manualmente: rsID, gene, genótipo, odds ratio e estudos GWAS para cada variante.',
    accent: '#2ec98f',
  },
  {
    id: 'engine',
    icon: 'cpu',
    title: 'Engine v6',
    subtitle: 'Retrieval híbrido',
    desc: 'FAISS + BM25 + lookup dedicado com 50+ aliases clínicos. Zero alucinação de dados genéticos.',
    accent: '#3f6df6',
  },
  {
    id: 'vita',
    icon: 'sparkles',
    title: 'Vita Agent',
    subtitle: 'Confidence gate',
    desc: 'Tradução para linguagem clínica com gate de confiança, flag de abstain e saída estruturada via API.',
    accent: '#b846ff',
  },
];

export const MARKET = [
  { label: 'TAM', value: '$22B', desc: 'Genômica personalizada global' },
  { label: 'SAM', value: '$4.2B', desc: 'Clinical decision support AI, LatAm' },
  { label: 'SOM', value: '$80M', desc: 'Healthtechs e clínicas com genética, BR' },
];

export const ICPS = [
  {
    icon: '🏥',
    title: 'Clínicas & Nutricionistas',
    desc: 'Relatórios genéticos integrados ao prontuário, com linguagem clínica e ações acionáveis.',
    accent: '#2ec98f',
  },
  {
    icon: '🛡️',
    title: 'Operadoras de Saúde',
    desc: 'BI de risco preventivo via perfil genético — redução de sinistros antes que virem custo.',
    accent: '#b846ff',
  },
  {
    icon: '🔌',
    title: 'EMRs / SaaS Healthtech',
    desc: 'API plug-and-play para sistemas de prontuário existentes. Integração em dias, não meses.',
    accent: '#3f6df6',
  },
  {
    icon: '👤',
    title: 'D2C Vitrine',
    desc: 'App direto ao consumidor que transforma o relatório 23andMe em algo que faz sentido.',
    accent: '#f28a22',
  },
];

export const TICKER_ITEMS = [
  'rs7903146 · TCF7L2 · CT · OR 1.32',
  'rs4680 · COMT · GA · Val/Met',
  'rs429358 · APOE · C/T · ε3',
  'rs1801282 · PPARG · CG · Pro/Ala',
  'rs1815739 · ACTN3 · CT · R/X',
  'rs12255372 · TCF7L2 · GT · OR 1.29',
  'rs9939609 · FTO · AT · OR 1.67',
  'rs1801133 · MTHFR · CT · C677T',
  'rs2228570 · VDR · TC · FokI',
  'rs1800497 · DRD2 · GA · Taq1A',
  'rs6265 · BDNF · GA · Val66Met',
  'rs1799945 · HFE · CG · H63D',
  'rs4994 · ADRB3 · AG · Trp64Arg',
  'rs5443 · GNB3 · CT · C825T',
  'rs2234693 · ESR1 · CT · PvuII',
];
