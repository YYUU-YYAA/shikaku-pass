import type { GlossaryTerm } from '../types';

export const GLOSSARY: GlossaryTerm[] = [
  // ── 財務分析 ──────────────────────────────────────────────────────────────────
  {
    id: 'g-fa-01', term: 'ROE（自己資本利益率）', reading: 'アールオーイー',
    subject: 'financial_analysis', category: '収益性',
    definition: '当期純利益 ÷ 自己資本 × 100。株主が出資した資本でどれだけ利益を稼いだかを示す代表的な収益性指標。',
  },
  {
    id: 'g-fa-02', term: 'ROA（総資産利益率）', reading: 'アールオーエー',
    subject: 'financial_analysis', category: '収益性',
    definition: '当期純利益 ÷ 総資産 × 100。企業が保有するすべての資産を使ってどれだけ効率的に利益を稼いでいるかを示す。',
  },
  {
    id: 'g-fa-03', term: '流動比率', reading: 'りゅうどうひりつ',
    subject: 'financial_analysis', category: '安全性',
    definition: '流動資産 ÷ 流動負債 × 100。1年以内に返済が必要な短期債務に対する支払能力を示す。一般に200%以上が望ましい。',
  },
  {
    id: 'g-fa-04', term: '当座比率', reading: 'とうざひりつ',
    subject: 'financial_analysis', category: '安全性',
    definition: '当座資産（現金・売掛金・有価証券）÷ 流動負債 × 100。棚卸資産を除いたより保守的な短期支払能力の指標。100%以上が目安。',
  },
  {
    id: 'g-fa-05', term: '自己資本比率', reading: 'じこしほんひりつ',
    subject: 'financial_analysis', category: '安全性',
    definition: '自己資本 ÷ 総資産 × 100。総資産に占める株主資本の割合。高いほど財務健全性が高く、倒産リスクが低い。',
  },
  {
    id: 'g-fa-06', term: 'EV/EBITDA', reading: 'イーブイ・イービットディーエー',
    subject: 'financial_analysis', category: '企業価値評価',
    definition: '企業価値（EV）÷ EBITDA。企業買収コストをEBITDA何年分で回収できるかを示す。業種を超えた企業価値比較に使われる。',
  },
  {
    id: 'g-fa-07', term: 'PER（株価収益率）', reading: 'ピーイーアール',
    subject: 'financial_analysis', category: '企業価値評価',
    definition: '株価 ÷ EPS（1株当たり利益）。市場が利益の何倍の価格をつけているかを示す。同業他社比較や割安・割高の判断に使う。',
  },
  {
    id: 'g-fa-08', term: 'PBR（株価純資産倍率）', reading: 'ピービーアール',
    subject: 'financial_analysis', category: '企業価値評価',
    definition: '株価 ÷ BPS（1株当たり純資産）。1倍未満は理論上の解散価値を下回っており、株式市場での評価が低いことを意味する。',
  },
  {
    id: 'g-fa-09', term: 'DCF法', reading: 'ディーシーエフほう',
    subject: 'financial_analysis', category: '企業価値評価',
    definition: '割引キャッシュフロー法。将来のフリーキャッシュフロー予測を割引率（WACC）で現在価値に換算して企業価値を算出する手法。',
  },
  {
    id: 'g-fa-10', term: 'WACC', reading: 'ワック',
    subject: 'financial_analysis', category: '企業価値評価',
    definition: '加重平均資本コスト。負債コストと株主資本コストを有利子負債・株式の時価ウェートで加重平均したもの。DCF法の割引率として使用。',
  },
  {
    id: 'g-fa-11', term: 'EBITDA', reading: 'イービットダー',
    subject: 'financial_analysis', category: '収益性',
    definition: '利払前・税引前・減価償却前・償却前利益。設備投資や税務の影響を排除した事業のキャッシュ創出能力を示す。',
  },
  {
    id: 'g-fa-12', term: 'フリーキャッシュフロー', reading: 'フリーキャッシュフロー',
    subject: 'financial_analysis', category: 'キャッシュフロー',
    definition: '営業CF ー 投資CF。事業運営・設備維持に必要なコストを除いたあとに自由に使えるキャッシュ。配当・借入返済・M&Aの原資となる。',
  },
  {
    id: 'g-fa-13', term: 'インタレスト・カバレッジ・レシオ', reading: 'インタレストカバレッジレシオ',
    subject: 'financial_analysis', category: '安全性',
    definition: '営業利益（またはEBIT）÷ 支払利息。利息を何倍カバーできるかを示す。低いほど金利負担が大きく、財務リスクが高い。',
  },
  {
    id: 'g-fa-14', term: '棚卸資産回転率', reading: 'たなおろししさんかいてんりつ',
    subject: 'financial_analysis', category: '効率性',
    definition: '売上高 ÷ 棚卸資産。棚卸資産が年間何回転するかを示す在庫管理効率の指標。高いほど在庫が滞留せず効率的。',
  },
  {
    id: 'g-fa-15', term: '総資本回転率', reading: 'そうしほんかいてんりつ',
    subject: 'financial_analysis', category: '効率性',
    definition: '売上高 ÷ 総資産。総資産を使ってどれだけ効率的に売上を生み出しているかを示す。ROAはこれに純利益率を掛けたもの。',
  },
  {
    id: 'g-fa-16', term: '損益分岐点', reading: 'そんえきぶんきてん',
    subject: 'financial_analysis', category: '収益性',
    definition: '売上高と総費用（固定費＋変動費）が等しくなる売上高。固定費 ÷（1 ー 変動費率）で算出。これを上回ると利益が発生する。',
  },
  {
    id: 'g-fa-17', term: '売上高営業利益率', reading: 'うりあげだかえいぎょうりえきりつ',
    subject: 'financial_analysis', category: '収益性',
    definition: '営業利益 ÷ 売上高 × 100。本業の稼ぐ力を示す最も基本的な収益性指標。業種平均との比較が重要。',
  },
  {
    id: 'g-fa-18', term: '減損会計', reading: 'げんそんかいけい',
    subject: 'financial_analysis', category: '会計基準',
    definition: '固定資産の収益性が低下し、帳簿価額が回収可能価額（使用価値と正味売却価額の高い方）を上回る場合に帳簿価額を切り下げる会計処理。',
  },
  {
    id: 'g-fa-19', term: 'デュポン分析', reading: 'デュポンぶんせき',
    subject: 'financial_analysis', category: '収益性',
    definition: 'ROEを「純利益率 × 総資産回転率 × 財務レバレッジ」に分解する分析手法。収益性・効率性・レバレッジの3要素からROEの源泉を把握する。',
  },
  {
    id: 'g-fa-20', term: '有利子負債倍率', reading: 'ゆうりしふさいばいりつ',
    subject: 'financial_analysis', category: '安全性',
    definition: '有利子負債 ÷ 自己資本。いわゆるD/Eレシオ。借入依存度を示し、高いほど財務リスクが高い。',
  },

  // ── 証券分析・ポートフォリオ ───────────────────────────────────────────────────
  {
    id: 'g-sa-01', term: '標準偏差', reading: 'ひょうじゅんへんさ',
    subject: 'securities_analysis', category: 'リスク指標',
    definition: 'リターンのばらつき（分散の正の平方根）。投資リスクの最も基本的な指標。値が大きいほど不確実性が高い。',
  },
  {
    id: 'g-sa-02', term: 'ベータ (β)', reading: 'ベータ',
    subject: 'securities_analysis', category: 'リスク指標',
    definition: '市場全体の変動に対する個別資産の感応度。β=1は市場と同じ動き、β>1はより大きく動く。システマティック・リスクの尺度。',
  },
  {
    id: 'g-sa-03', term: 'シャープレシオ', reading: 'シャープレシオ',
    subject: 'securities_analysis', category: 'パフォーマンス評価',
    definition: '（ポートフォリオのリターン ー 無リスク金利）÷ 標準偏差。リスク1単位当たりの超過収益。高いほどリスク調整後のパフォーマンスが優れている。',
  },
  {
    id: 'g-sa-04', term: 'CAPM', reading: 'キャップエム',
    subject: 'securities_analysis', category: '資産評価モデル',
    definition: '資本資産評価モデル。期待リターン = Rf + β × (Rm - Rf)。非システマティック・リスクは分散投資で消去できるため、β（システマティック・リスク）のみが価格付けされる。',
  },
  {
    id: 'g-sa-05', term: 'APT（裁定価格理論）', reading: 'エーピーティー',
    subject: 'securities_analysis', category: '資産評価モデル',
    definition: '複数のマクロ経済ファクター（金利・景気・インフレ等）によって期待リターンを説明するモデル。CAPMより柔軟だがファクターの特定が難しい。',
  },
  {
    id: 'g-sa-06', term: '効率的市場仮説', reading: 'こうりつてきしじょうかせつ',
    subject: 'securities_analysis', category: '市場理論',
    definition: '市場価格はすべての利用可能な情報を即座に反映するという仮説。弱形（過去価格）・準強形（公開情報）・強形（内部情報含む）の3段階がある。',
  },
  {
    id: 'g-sa-07', term: 'デュレーション', reading: 'デュレーション',
    subject: 'securities_analysis', category: '債券',
    definition: '債券のキャッシュフローの加重平均回収期間（マコーレー・デュレーション）。また、金利変動に対する債券価格の感応度（修正デュレーション）としても使う。',
  },
  {
    id: 'g-sa-08', term: 'コンベクシティ', reading: 'コンベクシティ',
    subject: 'securities_analysis', category: '債券',
    definition: 'デュレーションの変化率。金利変動に対する債券価格変化の曲率（非線形部分）を捉える指標。デュレーションによる近似誤差を修正する。',
  },
  {
    id: 'g-sa-09', term: 'コール・オプション', reading: 'コールオプション',
    subject: 'securities_analysis', category: 'デリバティブ',
    definition: '原資産を特定の価格（行使価格）で買う権利。権利行使は任意。原資産価格が上昇するほど価値（プレミアム）が高まる。',
  },
  {
    id: 'g-sa-10', term: 'ブラック・ショールズ・モデル', reading: 'ブラックショールズモデル',
    subject: 'securities_analysis', category: 'デリバティブ',
    definition: 'ヨーロピアン・オプションの理論価格を算出するモデル。原資産価格・行使価格・金利・残存期間・ボラティリティの5変数から価格を計算する。',
  },
  {
    id: 'g-sa-11', term: '相関係数', reading: 'そうかんけいすう',
    subject: 'securities_analysis', category: 'ポートフォリオ理論',
    definition: '2資産のリターンの連動性を ー1 から +1 で表す指標。低い（特にマイナス）ほど分散効果が大きく、ポートフォリオのリスク低減効果が高い。',
  },
  {
    id: 'g-sa-12', term: 'アルファ (α)', reading: 'アルファ',
    subject: 'securities_analysis', category: 'パフォーマンス評価',
    definition: 'CAPMなどのリスクモデルで説明できない超過収益。運用者の付加価値を示す指標。正のアルファは市場予測やスキルによる超過収益を意味する。',
  },
  {
    id: 'g-sa-13', term: 'VaR（バリュー・アット・リスク）', reading: 'バリューアットリスク',
    subject: 'securities_analysis', category: 'リスク指標',
    definition: '一定の信頼水準（例：95%）で、一定期間内に発生しうる最大損失額の推定値。金融機関のリスク管理や規制自己資本計算に広く使われる。',
  },
  {
    id: 'g-sa-14', term: 'イールドカーブ', reading: 'イールドカーブ',
    subject: 'securities_analysis', category: '債券',
    definition: '残存期間と利回りの関係を表した曲線。通常は右肩上がり（順イールド）。逆イールドは景気後退の予兆とされる。',
  },
  {
    id: 'g-sa-15', term: 'スポット・レート', reading: 'スポットレート',
    subject: 'securities_analysis', category: '債券',
    definition: '現時点から特定の将来時点までの期間に適用されるゼロ・クーポン金利。ゼロレートまたはゼロ・クーポン・レートとも呼ぶ。',
  },
  {
    id: 'g-sa-16', term: 'フォワード・レート', reading: 'フォワードレート',
    subject: 'securities_analysis', category: '債券',
    definition: '将来の一定期間（例：1年後から2年後）に適用される先物金利。現在の2つのスポット・レートから無裁定条件によって算出できる。',
  },
  {
    id: 'g-sa-17', term: 'トレイナー・レシオ', reading: 'トレイナーレシオ',
    subject: 'securities_analysis', category: 'パフォーマンス評価',
    definition: '（ポートフォリオのリターン ー 無リスク金利）÷ β。ベータ1単位当たりの超過収益。シャープレシオがリスク全体を考慮するのに対し、こちらはシステマティック・リスクのみ。',
  },
  {
    id: 'g-sa-18', term: 'ゼロ・クーポン債', reading: 'ゼロクーポンさい',
    subject: 'securities_analysis', category: '債券',
    definition: '利息（クーポン）の支払いがない債券。額面より低い価格（割引価格）で発行され、満期に額面で償還される。利息と元本のキャッシュフローを分離した分割債（ストリップス）もある。',
  },
  {
    id: 'g-sa-19', term: '効率的フロンティア', reading: 'こうりつてきフロンティア',
    subject: 'securities_analysis', category: 'ポートフォリオ理論',
    definition: '同じリスク水準で最も期待リターンが高い、または同じ期待リターンで最もリスクが低いポートフォリオの集合。マーコウィッツの現代ポートフォリオ理論の核心概念。',
  },
  {
    id: 'g-sa-20', term: 'グリークス', reading: 'グリークス',
    subject: 'securities_analysis', category: 'デリバティブ',
    definition: 'オプション価格の感応度指標の総称。主なもの：Delta（原資産価格変化への感応度）、Gamma（Deltaの変化率）、Theta（時間的価値の減少）、Vega（ボラティリティへの感応度）。',
  },

  // ── 市場と経済 ────────────────────────────────────────────────────────────────
  {
    id: 'g-me-01', term: 'GDP（国内総生産）', reading: 'ジーディーピー',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '一定期間内に国内で生産されたすべての最終財・サービスの付加価値の合計。支出面からは消費＋投資＋政府支出＋純輸出。',
  },
  {
    id: 'g-me-02', term: 'CPI（消費者物価指数）', reading: 'シーピーアイ',
    subject: 'market_economics', category: '景気指標',
    definition: '家計が購入する財・サービスの価格水準の変化を示す指数。日本ではコアCPI（生鮮食品除く）が金融政策の目標指標として使われる。',
  },
  {
    id: 'g-me-03', term: '金融政策', reading: 'きんゆうせいさく',
    subject: 'market_economics', category: '金融政策',
    definition: '中央銀行が政策金利や通貨供給量を調節することで物価安定・経済安定を図る政策。主な手段は公開市場操作・預金準備率操作・公定歩合操作。',
  },
  {
    id: 'g-me-04', term: '財政政策', reading: 'ざいせいせいさく',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '政府が税収や歳出を調節して景気安定を図る政策。景気後退時に支出拡大・減税（拡張的財政政策）を行うと乗数効果でGDPが増加する。',
  },
  {
    id: 'g-me-05', term: 'テイラー・ルール', reading: 'テイラールール',
    subject: 'market_economics', category: '金融政策',
    definition: '適切な政策金利 = 均衡実質金利 ＋ インフレ率 ＋ α×インフレギャップ ＋ β×需給ギャップ。中央銀行の金利設定行動を説明する標準的なルール。',
  },
  {
    id: 'g-me-06', term: 'フィリップス曲線', reading: 'フィリップスきょくせん',
    subject: 'market_economics', category: 'マクロ経済',
    definition: 'インフレ率と失業率の間のトレードオフ関係を示す曲線。短期では成立するが、長期的には自然失業率水準で垂直になり、インフレは加速するとされる（フリードマン）。',
  },
  {
    id: 'g-me-07', term: '購買力平価（PPP）', reading: 'こうばいりょくへいか',
    subject: 'market_economics', category: '為替',
    definition: '同一の財・サービスが異なる国で同じ価格になるように為替レートが決まるという理論。長期的な為替レートの均衡水準を示すが、短中期では乖離が大きい。',
  },
  {
    id: 'g-me-08', term: 'Jカーブ効果', reading: 'ジェイカーブこうか',
    subject: 'market_economics', category: '為替',
    definition: '通貨安直後はむしろ貿易収支が悪化し、時間が経つと改善するという現象。輸出数量・輸入数量の価格への反応に時間差があるため。',
  },
  {
    id: 'g-me-09', term: 'マネタリーベース', reading: 'マネタリーベース',
    subject: 'market_economics', category: '金融政策',
    definition: '中央銀行が供給する通貨の総量。日銀券残高＋硬貨流通高＋日銀当座預金。量的緩和で直接コントロールされる対象。ベースマネー、ハイパワードマネーとも呼ぶ。',
  },
  {
    id: 'g-me-10', term: '信用創造', reading: 'しんようそうぞう',
    subject: 'market_economics', category: '金融政策',
    definition: '銀行が預金受け入れと貸出を繰り返すことで、マネタリーベースの何倍もの預金通貨を生み出す仕組み。信用乗数（貨幣乗数）＝ 1/預金準備率。',
  },
  {
    id: 'g-me-11', term: '景気循環', reading: 'けいきじゅんかん',
    subject: 'market_economics', category: '景気指標',
    definition: '経済活動が拡張・後退を周期的に繰り返す現象。サイクルの長さにより、キチン（約40ヶ月）・ジュグラー（約10年）・クズネッツ（約20年）・コンドラチェフ（約50年）に分類される。',
  },
  {
    id: 'g-me-12', term: '先行指数', reading: 'せんこうしすう',
    subject: 'market_economics', category: '景気指標',
    definition: '景気の転換点に先行して変動する指標群の合成指数。株価・新規求人数・機械受注・新設住宅着工戸数などが含まれる。景気の先読みに使われる。',
  },
  {
    id: 'g-me-13', term: '量的緩和政策（QE）', reading: 'りょうてきかんわせいさく',
    subject: 'market_economics', category: '金融政策',
    definition: '政策金利がゼロ近傍に達した後、中央銀行が国債等を大量購入してマネタリーベースを拡大する非伝統的金融政策。長期金利の低下と期待インフレ率の引き上げを狙う。',
  },
  {
    id: 'g-me-14', term: 'キャリートレード', reading: 'キャリートレード',
    subject: 'market_economics', category: '為替',
    definition: '低金利通貨で資金を借り入れ、高金利通貨建て資産に投資して金利差益を狙う戦略。リスクオフ時に急激な巻き戻しが発生し、対象通貨が急騰することがある。',
  },
  {
    id: 'g-me-15', term: '国際収支', reading: 'こくさいしゅうし',
    subject: 'market_economics', category: '国際経済',
    definition: '一定期間の一国の対外経済取引を体系的に記録した統計。経常収支（貿易・サービス・所得）＋ 資本移転等収支 ＋ 金融収支 ＝ 0。',
  },
  {
    id: 'g-me-16', term: '乗数効果', reading: 'じょうすうこうか',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '政府支出や投資の増加が限界消費性向（MPC）を通じてGDPをより大きく増加させる効果。財政乗数 = 1/(1-MPC)。増税の乗数は負で、政府支出乗数より絶対値が小さい。',
  },
  {
    id: 'g-me-17', term: 'クラウディング・アウト', reading: 'クラウディングアウト',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '政府が財政赤字を国債で賄うと資金需要が増えて金利が上昇し、民間投資が減少する現象。財政政策の効果を相殺し、政府支出乗数を小さくする。',
  },
  {
    id: 'g-me-18', term: 'マーシャル・ラーナー条件', reading: 'マーシャルラーナーじょうけん',
    subject: 'market_economics', category: '為替',
    definition: '通貨安（為替減価）が経常収支を改善するための条件：輸出の価格弾力性＋輸入の価格弾力性の絶対値之和 ＞ 1。この条件が満たされないとJカーブ効果が長引く。',
  },
  {
    id: 'g-me-19', term: 'IS-LM モデル', reading: 'アイエスエルエムモデル',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '財市場の均衡（IS曲線：投資=貯蓄）と貨幣市場の均衡（LM曲線：貨幣需要=供給）を組み合わせて利子率とGDPの同時決定を分析するモデル。',
  },
  {
    id: 'g-me-20', term: '自然失業率', reading: 'しぜんしつぎょうりつ',
    subject: 'market_economics', category: 'マクロ経済',
    definition: '摩擦的・構造的失業のみが存在する場合の失業率。インフレを加速させない失業率（NAIRU）とも関連する。これを下回る失業率は賃金・インフレ上昇圧力をもたらす。',
  },
];
