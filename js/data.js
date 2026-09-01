const PORTFOLIO_DATA = {

  // ===========================
  // 原著論文
  // ===========================
  papers: [
    {
      year: '2025',
      type: 'Journal Article',
      title: 'Dual-directional epi-genotoxicity assay for assessing chemically induced epigenetic effects utilizing the housekeeping TK gene',
      authors: 'Haruto Yamada, Mizuki Odagiri, <span class="me">Keigo YAMAKITA</span>, 他',
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
      year: '2026年8月',
      type: '口頭',
      title: 'ATAC-seqを用いたクロマチン構造を基準とした非遺伝毒性影響評価法の確立',
      authors: '<span class="me">山北 啓吾</span>',
      venue: '変異機構研究会 第37回「夏の学校」（大阪）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2026年7月1日',
      type: 'ポスター · 口頭',
      title: 'Establishment of a chromatin structure-based method for evaluating non-genotoxic genome instability using ATAC-seq',
      authors: '<span class="me">Keigo YAMAKITA</span>、他7名',
      venue: '第53回日本毒性学会学術年会（大阪）',
      tags: ['ATAC-seq', 'クロマチン', '非遺伝毒性'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2026年7月8日',
      type: 'ポスター',
      title: 'Chronic genomic stress induces elevated A-to-I RNA editing in transcripts associated with auxiliary DNA repair pathways',
      authors: 'Sujin SONG、<span class="me">Keigo YAMAKITA</span>、他5名',
      venue: '第27回日本RNA学会年会（兵庫）',
      tags: ['RNA editing', 'DNA repair'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2026年6月25日',
      type: 'ポスター',
      title: 'クロマチンアクセシビリティ解析による非遺伝毒性ゲノム不安定性の評価指標の検討',
      authors: '<span class="me">山北 啓吾</span>、他7名',
      venue: '第19回日本エピジェネティクス研究会年会（千葉）',
      tags: ['ATAC-seq', 'クロマチン', 'エピゲノム'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2025年11月22日',
      type: 'ポスター · 口頭',
      title: 'ATAC-seqを用いたクロマチン構造を基準とした高次ゲノム不安定性評価法の確立',
      authors: '<span class="me">山北 啓吾</span>、他7名',
      venue: '日本環境変異原ゲノム学会第54回大会（静岡）',
      tags: ['ATAC-seq', 'クロマチン'],
      link: 'https://uralab.wordpress.com/2025/11/26/1-12/',
    },
    {
      year: '2025年11月22日',
      type: 'ポスター',
      title: 'DNA損傷応答とイノシンRNA修飾の相互作用の解明',
      authors: 'SONG SUJIN、<span class="me">Keigo YAMAKITA</span>、他5名',
      venue: '日本環境変異原ゲノム学会第54回大会（静岡）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2025年11月22日',
      type: 'ポスター',
      title: 'DNA修復酵素RNaseH2機能不全によるDNA鎖切断を伴わない自然免疫応答メカニズムの解明',
      authors: '田中 陽菜、<span class="me">山北 啓吾</span>、他8名',
      venue: '日本環境変異原ゲノム学会第54回大会（静岡）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2025年7月',
      type: '口頭',
      title: 'クロマチン構造を指標とした高次ゲノム不安定性評価法の確立',
      authors: '<span class="me">山北 啓吾</span>',
      venue: '変異機構研究会 第36回「夏の学校」（東京）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2025年7月15日',
      type: 'ポスター · 口頭（英語）',
      title: 'Identification of the Novel Crosstalk Between DNA Damage Response and RNA Modifications',
      authors: 'SONG SUJIN, <span class="me">Keigo YAMAKITA</span>、他5名',
      venue: 'Summer School on Genome Stability 2025, Montpellier',
      tags: ['国際', '英語'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2024年12月7日',
      type: 'ポスター',
      title: 'ATAC-seqによるクロマチン構造変化を指標とした高次ゲノム不安定性評価',
      authors: '<span class="me">山北 啓吾</span>、他7名',
      venue: '日本環境変異原ゲノム学会第53回大会（岡山）',
      tags: ['ATAC-seq'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2024年11月27日',
      type: 'ポスター',
      title: '化学物質に起因するエピジェネティック作用の双方向評価レポーター試験法の確立',
      authors: '山田 治人、<span class="me">山北 啓吾</span>、他6名',
      venue: '第47回日本分子生物学会年会（福岡）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2024年9月16日',
      type: '口頭（英語）',
      title: 'Gutenberg Workshop RNase H 2024: Structures, Functions and Disorders',
      authors: 'Kazuma Nakatani, Nao Terakoshi, <span class="me">Keigo YAMAKITA</span>、他10名',
      venue: 'Gutenberg Workshop RNase H 2024',
      tags: ['国際', '英語'],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2024年9月19日',
      type: 'ポスター · 口頭',
      title: 'DNA鎖切断に起因するインターフェロン応答における核酸センサー cGAS, IFI16の役割の探索',
      authors: '寺越 菜央、<span class="me">山北 啓吾</span>、他6名',
      venue: '第31回日本免疫毒性学会学術年会（兵庫）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
    {
      year: '2024年9月19日',
      type: 'ポスター',
      title: 'DNA修復の機能不全によるDNA鎖切断を伴わない自然免疫応答メカニズムの解明',
      authors: '田中 陽菜、<span class="me">山北 啓吾</span>、他8名',
      venue: '第31回日本免疫毒性学会学術年会（兵庫）',
      tags: [],
      link: 'https://uralab.wordpress.com/conferences/',
    },
  ],

  // ===========================
  // 受賞・表彰
  // ===========================
  awards: [
    {
      year: '2025',
      type: '学会賞',
      title: 'ベストプレゼンテーション賞',
      org: '日本環境変異原ゲノム学会第54回大会（静岡）',
      desc: '',
      link: 'https://uralab.wordpress.com/2025/11/26/1-12/',
    },
    {
      year: '2024',
      type: '表彰',
      title: '理学部後援会会長賞',
      org: '千葉大学 理学部後援会',
      desc: '2024年度 受賞',
    },
  ],

  // ===========================
  // 採択・奨学金
  // ===========================
  scholarships: [
    {
      year: '2025–2027',
      type: '奨学金',
      title: 'JASSO 第一種奨学金',
      org: '日本学生支援機構',
      desc: '2025年4月〜2027年3月 採用',
    },
    {
      year: '2023',
      type: '採択',
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
  // 制作物（解析ツール・アプリ）
  // ===========================
  works: [
  ],

  // ===========================
  // 資格・免許
  // ===========================
  licenses: [
    {
      year: '2025',
      title: '中学校教諭一種免許状（理科）',
      org: '文部科学省',
    },
    {
      year: '2025',
      title: '高等学校教諭一種免許状（理科）',
      org: '文部科学省',
    },
  ],

  // ===========================
  // 連絡先
  // ===========================
  contact: [
    { icon: '✉', label: 'Email', sub: 'k5ykrennraku{at}gmail.com', href: 'mailto:k5ykrennraku@gmail.com' },
    { icon: '💼', label: 'LinkedIn', sub: 'keigoyamakita1024', href: 'https://www.linkedin.com/in/keigoyamakita1024/' },
    { icon: '🐙', label: 'GitHub', sub: '@keigoyamakita', href: 'https://github.com/keigoyamakita' },
    { icon: '🔬', label: '所属研究室', sub: 'クロマチン代謝制御研究室', href: 'https://uralab.wordpress.com' },
  ],

};
