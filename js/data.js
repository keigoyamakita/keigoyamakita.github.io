const PORTFOLIO_DATA = {

  // ===========================
  // 原著論文
  // ===========================
  papers: [
    {
      year: '2025',
      type: 'Journal Article',
      title: 'Dual-directional epi-genotoxicity assay for assessing chemically induced epigenetic effects utilizing the housekeeping TK gene',
      authors: 'Haruto Yamada, Mizuki Odagiri, <strong>Keigo Yamakita</strong>, 他',
      venue: 'Scientific Reports, 2025, 15, 7780',
      tags: ['エピゲノム', 'Genotoxicity', 'TK gene'],
      link: 'https://www.nature.com/articles/s41598-025-92121-6',
    },
  ],

  // ===========================
  // 学会発表（時系列・新しい順）
  // ===========================
  presentations: [
    {
      year: '2025年11月',
      type: 'ポスター · 口頭',
      title: 'ATAC-seqを用いたクロマチン構造を基準とした高次ゲノム不安定性評価法の確立',
      authors: '<strong>山北 啓吾</strong>、他7名',
      venue: '日本環境変異原ゲノム学会 第54回大会',
      tags: ['ATAC-seq', 'クロマチン'],
    },
    {
      year: '2025年11月',
      type: 'ポスター',
      title: 'DNA損傷応答とイノシンRNA修飾の相互作用の解明',
      authors: 'SONG SUJIN、<strong>Keigo YAMAKITA</strong>、他5名',
      venue: '日本環境変異原ゲノム学会 第54回大会',
      tags: [],
    },
    {
      year: '2025年11月',
      type: 'ポスター',
      title: 'DNA修復酵素RNaseH2機能不全によるDNA鎖切断を伴わない自然免疫応答メカニズムの解明',
      authors: '田中 陽菜、<strong>山北 啓吾</strong>、他8名',
      venue: '日本環境変異原ゲノム学会 第54回大会',
      tags: [],
    },
    {
      year: '2025年7月',
      type: '口頭',
      title: 'クロマチン構造を指標とした高次ゲノム不安定性評価法の確立',
      authors: '<strong>山北 啓吾</strong>',
      venue: '変異機構研究会',
      tags: [],
    },
    {
      year: '2025年7月',
      type: 'ポスター · 口頭（英語）',
      title: 'Identification of the Novel Crosstalk Between DNA Damage Response and RNA Modifications',
      authors: 'SONG SUJIN, <strong>Keigo YAMAKITA</strong>、他5名',
      venue: 'Summer School on Genome Stability 2025, Montpellier',
      tags: ['国際', '英語'],
    },
    {
      year: '2024年12月',
      type: 'ポスター',
      title: 'ATAC-seqによるクロマチン構造変化を指標とした高次ゲノム不安定性評価',
      authors: '<strong>山北 啓吾</strong>、他7名',
      venue: '日本環境変異原ゲノム学会 第53回大会',
      tags: ['ATAC-seq'],
    },
    {
      year: '2024年11月',
      type: 'ポスター',
      title: '化学物質に起因するエピジェネティック作用の双方向評価レポーター試験法の確立',
      authors: '山田 治人、<strong>山北 啓吾</strong>、他6名',
      venue: '第47回日本分子生物学会年会',
      tags: [],
    },
    {
      year: '2024年9月',
      type: '口頭（英語）',
      title: 'Gutenberg Workshop RNase H 2024: Structures, Functions and Disorders',
      authors: 'Kazuma Nakatani, Nao Terakoshi, <strong>Keigo Yamakita</strong>、他10名',
      venue: 'Gutenberg Workshop RNase H 2024',
      tags: ['国際', '英語'],
    },
    {
      year: '2024年9月',
      type: 'ポスター · 口頭',
      title: 'DNA鎖切断に起因するインターフェロン応答における核酸センサー cGAS, IFI16の役割の探索',
      authors: '寺越 菜央、<strong>山北 啓吾</strong>、他6名',
      venue: '第31回日本免疫毒性学会学術年会',
      tags: [],
    },
    {
      year: '2024年9月',
      type: 'ポスター',
      title: 'DNA修復の機能不全によるDNA鎖切断を伴わない自然免疫応答メカニズムの解明',
      authors: '田中 陽菜、<strong>山北 啓吾</strong>、他8名',
      venue: '第31回日本免疫毒性学会学術年会',
      tags: [],
    },
  ],

  // ===========================
  // 受賞・奨学金
  // ===========================
  awards: [
    {
      year: '2025',
      type: '学会賞',
      title: 'ベストプレゼンテーション賞',
      org: '日本環境変異原ゲノム学会 第54回大会',
      desc: '',
      link: 'https://uralab.wordpress.com/2025/11/26/1-12/',
    },
    {
      year: '2025–2027',
      type: '奨学金',
      title: 'JASSO 第一種奨学金',
      org: '日本学生支援機構',
      desc: '2025年4月〜2027年3月 採用',
    },
    {
      year: '2024',
      type: '表彰',
      title: '理学部後援会会長賞',
      org: '千葉大学 理学部後援会',
      desc: '2024年度 受賞',
    },
    {
      year: '2023',
      type: '奨学金',
      title: 'キーエンス奨学金「がんばれ！日本の大学生 応援給付金」',
      org: '株式会社キーエンス',
      desc: '2023年度 採用',
    },
  ],

  // ===========================
  // スキル
  // ===========================
  skills: [
    {
      icon: '🧬',
      category: 'Biology / Wet Lab',
      items: ['細胞培養', 'ATAC-seq', 'PCR', '免疫染色', 'タンパク質精製'],
    },
    {
      icon: '🖥️',
      category: 'Bioinformatics',
      items: ['BWA / Bowtie2', 'SAMtools', 'BEDtools', 'MACS2', 'RNA-seq'],
    },
    {
      icon: '💻',
      category: 'Programming',
      items: ['Python', 'R', 'Bash / Shell', 'Java'],
    },
    {
      icon: '📊',
      category: 'Data Analysis',
      items: ['ggplot2', 'Jupyter'],
    },
  ],

  // ===========================
  // 連絡先
  // ===========================
  contact: [
    { icon: '✉', label: 'Email', sub: 'k5ykrennraku{at}gmail.com', href: 'mailto:k5ykrennraku@gmail.com' },
  ],

};
