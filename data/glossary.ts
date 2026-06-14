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

  // ════════════════════════════════════════════════════════════════════════
  // G検定（ジェネラリスト検定）— examId: g_kentei
  // ════════════════════════════════════════════════════════════════════════

  // ── AIの定義と分類（強いAI/弱いAI等） ──────────────────────────────────────
  {
    id: 'g-gk-01', term: '強いAI', reading: 'つよいエーアイ',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: '人間と同様の自己意識や汎用的な思考・理解能力を持つAI。哲学者ジョン・サールが提唱した概念で、現時点では実現していない。',
  },
  {
    id: 'g-gk-02', term: '弱いAI', reading: 'よわいエーアイ',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: '特定のタスク（画像認識・翻訳・将棋など）に特化して人間の知的活動を支援・代替するAI。現在実用化されているAIはすべて弱いAIに該当する。',
  },
  {
    id: 'g-gk-03', term: 'AI効果', reading: 'エーアイこうか',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: 'AIが実現したことの仕組みが解明されると「単純な自動化にすぎない」とみなされ、知能の証ではないと評価される現象。AIの定義が常に変化し続ける一因とされる。',
  },
  {
    id: 'g-gk-04', term: 'シンギュラリティ（技術的特異点）', reading: 'シンギュラリティ',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: 'AIの能力が人間の知能を超え、技術の進歩が爆発的かつ予測不能になる仮説上の時点。レイ・カーツワイルが2045年に到来すると予測したことで有名。',
  },
  {
    id: 'g-gk-05', term: 'チューリングテスト', reading: 'チューリングテスト',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: 'アラン・チューリングが提唱した、機械が人間と区別できないレベルの知的な応答ができるかを判定するテスト。判定者が対話相手が人間かAIかを判別できなければ合格とみなす。',
  },
  {
    id: 'g-gk-06', term: '中国語の部屋', reading: 'ちゅうごくごのへや',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: '哲学者ジョン・サールによる思考実験。記号操作のルールに従うだけで中国語を理解しているように見える応答ができても、本当の「理解」とは言えないという、強いAIへの批判として提示された。',
  },
  {
    id: 'g-gk-07', term: 'ELIZA（イライザ）', reading: 'イライザ',
    subject: 'gkentei_ai_overview', category: 'AIの定義と分類',
    definition: '1966年にジョセフ・ワイゼンバウムが開発した初期の対話システム。簡単なパターンマッチングで人間のカウンセラーのように応答し、一部のユーザーが人間と誤解する「ELIZA効果」の語源となった。',
  },

  // ── AIの歴史（探索・知識表現・機械学習の各ブーム） ──────────────────────────
  {
    id: 'g-gk-08', term: '第1次AIブーム', reading: 'だいいちじエーアイブーム',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '1950年代後半〜1960年代。探索・推論を中心としたAI研究が盛んになった時期。迷路の解法やパズル解決などのトイ・プロブレムは解けたが、複雑な現実問題には対応できず冬の時代を迎えた。',
  },
  {
    id: 'g-gk-09', term: 'ダートマス会議', reading: 'ダートマスかいぎ',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '1956年に米国ダートマス大学で開催された会議。ジョン・マッカーシーらが「人工知能（Artificial Intelligence）」という用語を初めて使用し、AI研究の出発点とされる。',
  },
  {
    id: 'g-gk-10', term: '第2次AIブーム', reading: 'だいにじエーアイブーム',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '1980年代。専門家の知識をルールとして蓄積するエキスパートシステムが注目された時期。知識の入力・管理コストの増大（知識獲得のボトルネック）等の課題により再び冬の時代を迎えた。',
  },
  {
    id: 'g-gk-11', term: 'エキスパートシステム', reading: 'エキスパートシステム',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '専門家の知識をif-thenルールとしてコンピュータに蓄積し、推論によって専門家のような判断を行うシステム。第2次AIブームの中心technology。代表例にMYCIN（医療診断）がある。',
  },
  {
    id: 'g-gk-12', term: 'フレーム問題', reading: 'フレームもんだい',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: 'AIが現実の問題に対処する際、関係のある事柄だけを切り出して考えることが極めて困難であるという問題。ダニエル・デネットが紹介し、AIの本質的な限界の一つとされる。',
  },
  {
    id: 'g-gk-13', term: '第3次AIブーム', reading: 'だいさんじエーアイブーム',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '2000年代以降、機械学習・ディープラーニングの発展とビッグデータ・計算機資源の充実により到来したブーム。2012年のILSVRCにおけるディープラーニングの圧倒的勝利が大きな契機となった。',
  },
  {
    id: 'g-gk-14', term: 'シンボルグラウンディング問題', reading: 'シンボルグラウンディングもんだい',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '記号（言葉）とその意味する対象（実世界の指示物）を、AIがどのように結びつけるかという問題。記号操作だけでは記号の本当の意味を理解できないという課題。',
  },
  {
    id: 'g-gk-15', term: 'トイ・プロブレム', reading: 'トイプロブレム',
    subject: 'gkentei_ai_overview', category: 'AIの歴史',
    definition: '迷路・オセロ・ハノイの塔のように、ルールが明確で範囲が限定された簡略化された問題。第1次AIブームのAIはこうした問題は解けたが、現実の複雑な問題には対応できなかった。',
  },

  // ── 機械学習の種類（教師あり/なし・強化学習） ────────────────────────────────
  {
    id: 'g-gk-16', term: '教師あり学習', reading: 'きょうしありがくしゅう',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: '入力データと正解ラベル（教師データ）の組を使い、入力から正解を予測するモデルを学習する手法。回帰（数値予測）と分類（カテゴリ予測）に大別される。',
  },
  {
    id: 'g-gk-17', term: '教師なし学習', reading: 'きょうしなしがくしゅう',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: '正解ラベルのないデータから、データ自体に内在する構造やパターンを見つけ出す学習手法。クラスタリングや次元削減（主成分分析等）が代表例。',
  },
  {
    id: 'g-gk-18', term: '強化学習', reading: 'きょうかがくしゅう',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: 'エージェントが環境と相互作用しながら、得られる報酬（収益）の総和を最大化するように行動方針（policy）を学習する手法。AlphaGo等が代表例。',
  },
  {
    id: 'g-gk-19', term: '半教師あり学習', reading: 'はんきょうしありがくしゅう',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: '少量のラベル付きデータと大量のラベルなしデータを組み合わせて学習する手法。ラベル付けのコストを抑えつつ、教師なしデータの情報も活用できる。',
  },
  {
    id: 'g-gk-20', term: '回帰', reading: 'かいき',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: '連続的な数値（価格・売上等）を予測する教師あり学習のタスク。線形回帰が最も基本的な手法。',
  },
  {
    id: 'g-gk-21', term: '分類', reading: 'ぶんるい',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: 'データが属するカテゴリ（クラス）を予測する教師あり学習のタスク。2クラス分類（迷惑メール判定等）と多クラス分類がある。',
  },
  {
    id: 'g-gk-22', term: '報酬', reading: 'ほうしゅう',
    subject: 'gkentei_machine_learning', category: '機械学習の種類',
    definition: '強化学習において、エージェントが行動した結果として環境から得られるスコア。エージェントはこの報酬の総和（収益）を最大化するように学習する。',
  },

  // ── 代表的な手法（回帰・決定木・SVM・クラスタリング等） ──────────────────────
  {
    id: 'g-gk-23', term: '線形回帰', reading: 'せんけいかいき',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '説明変数と目的変数の関係を直線（1次式）で表現するモデル。パラメータ（係数）は最小二乗法等で誤差を最小化するように求められる。',
  },
  {
    id: 'g-gk-24', term: 'ロジスティック回帰', reading: 'ロジスティックかいき',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '線形回帰の出力をシグモイド関数で0〜1の確率に変換し、2クラス分類に用いる手法。名前に「回帰」とあるが分類モデルである。',
  },
  {
    id: 'g-gk-25', term: '決定木', reading: 'けっていぎ',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '特徴量に対する条件分岐を木構造で繰り返し、データを分類・予測する手法。条件分岐の過程が可視化できるため解釈性が高い。',
  },
  {
    id: 'g-gk-26', term: 'ランダムフォレスト', reading: 'ランダムフォレスト',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '複数の決定木を異なるデータ・特徴量のサブセットで学習し、それらの予測を多数決・平均で統合するアンサンブル学習手法。単独の決定木より過学習しにくい。',
  },
  {
    id: 'g-gk-27', term: 'サポートベクターマシン（SVM）', reading: 'サポートベクターマシン',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '2つのクラスのデータ点間のマージン（境界からの距離）を最大化するように分類境界を決定する手法。カーネル法を使うことで非線形な分類境界も扱える。',
  },
  {
    id: 'g-gk-28', term: 'k近傍法（k-NN）', reading: 'ケーきんぼうほう',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '予測したいデータ点に最も近いk個の既知データの多数決（分類）や平均（回帰）で予測を行う手法。学習段階での計算は不要だが、予測時の計算コストが大きい。',
  },
  {
    id: 'g-gk-29', term: 'k平均法（k-means）', reading: 'ケーへいきんほう',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: 'データをk個のクラスタに分割する代表的なクラスタリング（教師なし学習）手法。各クラスタの重心を繰り返し更新しながら、データ点を最も近い重心のクラスタに割り当てる。',
  },
  {
    id: 'g-gk-30', term: '主成分分析（PCA）', reading: 'しゅせいぶんぶんせき',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: 'データの分散が最大になる方向（主成分）を見つけ、高次元データをより少ない次元に圧縮する次元削減手法。情報の損失を抑えながらデータの可視化や計算量削減に利用される。',
  },
  {
    id: 'g-gk-31', term: 'アンサンブル学習', reading: 'アンサンブルがくしゅう',
    subject: 'gkentei_machine_learning', category: '代表的な手法',
    definition: '複数のモデルの予測を組み合わせて、単独モデルより高い性能を得る手法。バギング（ランダムフォレスト等）、ブースティング（勾配ブースティング等）が代表例。',
  },

  // ── モデル評価（精度・過学習・交差検証） ──────────────────────────────────
  {
    id: 'g-gk-32', term: '過学習（オーバーフィッティング）', reading: 'かがくしゅう',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: 'モデルが学習データに過剰に適合し、未知のデータ（テストデータ）に対する性能（汎化性能）が低下する現象。学習誤差は小さいが検証誤差が大きい状態として現れる。',
  },
  {
    id: 'g-gk-33', term: '汎化性能', reading: 'はんかせいのう',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: 'モデルが学習に使っていない未知のデータに対しても、正しく予測・分類できる能力。機械学習モデルの最終的な目標は汎化性能の高いモデルを構築することである。',
  },
  {
    id: 'g-gk-34', term: '交差検証（クロスバリデーション）', reading: 'こうさけんしょう',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: 'データを複数のグループに分割し、学習と評価の組み合わせを変えながら複数回モデルを評価する手法。データを無駄なく使いつつ、評価結果のばらつきを抑えることができる。',
  },
  {
    id: 'g-gk-35', term: '正解率（Accuracy）', reading: 'せいかいりつ',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: '全予測のうち正しく予測できた割合。直感的だが、クラスの数が不均衡なデータ（例: 99%が正常データ）では正解率だけでは性能を正しく評価できない。',
  },
  {
    id: 'g-gk-36', term: '適合率（Precision）', reading: 'てきごうりつ',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: '「正」と予測したもののうち、実際に正しかった割合。偽陽性（誤って正と判定すること）を避けたいタスクで重視される指標。',
  },
  {
    id: 'g-gk-37', term: '再現率（Recall）', reading: 'さいげんりつ',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: '実際に「正」であるもののうち、正しく「正」と予測できた割合。偽陰性（病気の見逃し等）を避けたいタスクで重視される指標。',
  },
  {
    id: 'g-gk-38', term: 'F1スコア', reading: 'エフワンスコア',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: '適合率と再現率の調和平均。両者をバランスよく評価したい場合に用いる指標で、片方だけが極端に高い場合に値が大きく下がる特徴がある。',
  },
  {
    id: 'g-gk-39', term: 'ハイパーパラメータ', reading: 'ハイパーパラメータ',
    subject: 'gkentei_machine_learning', category: 'モデル評価',
    definition: '学習によって自動で決まるパラメータ（重み等）ではなく、人間が事前に設定する設定値。学習率・木の深さ・正則化の強さ等が該当し、グリッドサーチ等で調整される。',
  },

  // ── ニューラルネットワークの基本構造 ────────────────────────────────────────
  {
    id: 'g-gk-40', term: 'パーセプトロン', reading: 'パーセプトロン',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '1958年にフランク・ローゼンブラットが考案した、人間の神経細胞を模した最も単純なニューラルネットワークの構成単位。複数の入力に重みをかけて合計し、活性化関数で出力を決定する。',
  },
  {
    id: 'g-gk-41', term: '活性化関数', reading: 'かっせいかかんすう',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: 'ニューロンの入力の重み付き合計を非線形変換して出力する関数。シグモイド・ReLU・tanh等があり、ネットワークに非線形性を与えることで複雑な関数を表現できるようにする。',
  },
  {
    id: 'g-gk-42', term: 'ReLU（ランプ関数）', reading: 'レルー',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '入力が0以下なら0、0より大きければそのまま出力する活性化関数。シグモイド関数に比べて勾配消失が起きにくく、現在の深層学習で最も広く使われている。',
  },
  {
    id: 'g-gk-43', term: '誤差逆伝播法（バックプロパゲーション）', reading: 'ごさぎゃくでんぱほう',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '出力層で計算した誤差を、出力側から入力側へ逆方向に伝播させながら各層の重みの勾配を効率的に計算する手法。ニューラルネットワークの学習を実用的にした基盤技術。',
  },
  {
    id: 'g-gk-44', term: '勾配消失問題', reading: 'こうばいしょうしつもんだい',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '層数の多いニューラルネットワークで誤差逆伝播を行う際、入力層に近い層に向かうほど勾配が極端に小さくなり、重みがほとんど更新されなくなる問題。ReLUの採用等で緩和される。',
  },
  {
    id: 'g-gk-45', term: '勾配降下法', reading: 'こうばいこうかほう',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '損失関数の値が小さくなる方向（勾配の逆方向）にパラメータを少しずつ更新していく最適化手法。学習率は1回の更新でパラメータをどの程度動かすかを決める重要なハイパーパラメータ。',
  },
  {
    id: 'g-gk-46', term: 'バッチ正規化', reading: 'バッチせいきか',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '各層への入力をミニバッチ単位で平均0・分散1に正規化する手法。学習の安定化・高速化や、過学習の抑制効果があるとされる。',
  },
  {
    id: 'g-gk-47', term: 'ドロップアウト', reading: 'ドロップアウト',
    subject: 'gkentei_deep_learning', category: 'ニューラルネットワークの基本構造',
    definition: '学習時に各層のニューロンの一部をランダムに無効化する正則化手法。特定のニューロンへの依存を防ぎ、過学習を抑制する。',
  },

  // ── CNN・画像認識 ────────────────────────────────────────────────────────
  {
    id: 'g-gk-48', term: '畳み込みニューラルネットワーク（CNN）', reading: 'たたみこみニューラルネットワーク',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '畳み込み層とプーリング層を組み合わせ、画像の局所的な特徴（エッジ・模様等）を段階的に抽出していくニューラルネットワーク。画像認識タスクで広く使われる。',
  },
  {
    id: 'g-gk-49', term: '畳み込み層', reading: 'たたみこみそう',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '入力画像にフィルタ（カーネル）をスライドさせながら適用し、エッジや模様などの特徴を検出する層。CNNの中心的な処理を担う。',
  },
  {
    id: 'g-gk-50', term: 'プーリング層', reading: 'プーリングそう',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '畳み込み層の出力を一定領域ごとに集約（最大値や平均値）し、情報量を圧縮する層。最大値を取るMaxプーリングが代表的で、位置のずれに対する頑健性を高める。',
  },
  {
    id: 'g-gk-51', term: 'AlexNet', reading: 'アレックスネット',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '2012年のILSVRCで圧倒的な性能を示し、第3次AIブームの契機となったCNNモデル。GPUを用いた大規模な学習とReLU・ドロップアウトの活用が特徴。',
  },
  {
    id: 'g-gk-52', term: 'ILSVRC', reading: 'アイエルエスブイアールシー',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '画像認識の精度を競う国際的なコンペティション（ImageNet Large Scale Visual Recognition Challenge）。2012年にAlexNetがディープラーニングで他手法を大きく上回り注目された。',
  },
  {
    id: 'g-gk-53', term: '物体検出', reading: 'ぶったいけんしゅつ',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '画像中のどこに何が存在するかを、矩形領域（バウンディングボックス）とクラスラベルで検出するタスク。YOLOやR-CNN系のモデルが代表的。',
  },
  {
    id: 'g-gk-54', term: '画像セグメンテーション', reading: 'がぞうセグメンテーション',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '画像をピクセル単位で意味のある領域に分割するタスク。物体ごとの正確な形状・境界を把握する必要がある自動運転や医療画像分析等に応用される。',
  },
  {
    id: 'g-gk-55', term: '転移学習', reading: 'てんいがくしゅう',
    subject: 'gkentei_deep_learning', category: 'CNN・画像認識',
    definition: '大規模データで学習済みのモデルの知識を、別の関連タスクに転用する手法。少量のデータでも高い性能が得やすく、画像認識分野で広く活用される。',
  },

  // ── RNN・自然言語処理・Transformer ──────────────────────────────────────────
  {
    id: 'g-gk-56', term: 'リカレントニューラルネットワーク（RNN）', reading: 'リカレントニューラルネットワーク',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: '時系列データや文章など、順序のあるデータを扱うために、過去の出力（内部状態）を次の入力に再帰的に渡すニューラルネットワーク。長い系列では勾配消失が課題となる。',
  },
  {
    id: 'g-gk-57', term: 'LSTM', reading: 'エルエスティーエム',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: 'RNNの勾配消失問題に対応するため、ゲート機構（入力ゲート・出力ゲート・忘却ゲート）で長期的な情報を保持・制御できるようにしたモデル。長い系列データの扱いに優れる。',
  },
  {
    id: 'g-gk-58', term: 'Attention（注意機構）', reading: 'アテンション',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: '入力系列の中で、出力の生成に重要な部分にどの程度「注目」するかを重みとして計算する仕組み。Transformerの中核技術であり、長い系列でも重要な情報を直接参照できる。',
  },
  {
    id: 'g-gk-59', term: 'Transformer', reading: 'トランスフォーマー',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: 'RNNを使わず、Self-Attention（自己注意機構）のみで系列データを処理するモデル構造。並列計算が可能で学習が高速であり、BERT・GPT等の大規模言語モデルの基盤となっている。',
  },
  {
    id: 'g-gk-60', term: '単語埋め込み（Word Embedding）', reading: 'たんごうめこみ',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: '単語を意味の近さが反映された低次元の実数値ベクトルで表現する手法。Word2Vec等が代表的で、似た文脈で使われる単語は似たベクトルになる。',
  },
  {
    id: 'g-gk-61', term: 'BERT', reading: 'バート',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: '文中の一部の単語をマスクして予測するマスク言語モデルにより、文脈を双方向から捉える言語表現を獲得するTransformerベースのモデル。文章の意味理解タスクに強い。',
  },
  {
    id: 'g-gk-62', term: 'GPT', reading: 'ジーピーティー',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: 'Transformerのデコーダのみを用い、左から右へ次のトークンを予測する自己回帰型の大規模言語モデル。文章生成タスクに強く、対話AIの基盤として広く利用されている。',
  },
  {
    id: 'g-gk-63', term: 'コンテキストウィンドウ', reading: 'コンテキストウィンドウ',
    subject: 'gkentei_deep_learning', category: 'RNN・自然言語処理・Transformer',
    definition: '大規模言語モデルが一度の処理で扱える入出力合計のトークン数の上限。これを超える文章や対話履歴は、要約等で圧縮しないとモデルが直接参照できない。',
  },

  // ── 深層学習の応用分野（生成AI・強化学習との組み合わせ等） ─────────────────────
  {
    id: 'g-gk-64', term: 'GAN（敵対的生成ネットワーク）', reading: 'ガン',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '生成器（Generator）と識別器（Discriminator）を互いに競わせて学習させることで、本物に近いデータを生成できるようにするモデル。画像生成等に応用される。',
  },
  {
    id: 'g-gk-65', term: '拡散モデル（Diffusion Model）', reading: 'かくさんモデル',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '画像にノイズを加える過程とノイズを除去する過程を学習し、ノイズから高品質な画像を生成する生成モデル。Stable Diffusion等の画像生成AIの基盤技術。',
  },
  {
    id: 'g-gk-66', term: '自己符号化器（オートエンコーダ）', reading: 'じこふごうかき',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '入力をエンコーダで低次元の潜在変数に圧縮し、デコーダで元のデータを再構成するように学習するネットワーク。次元削減・異常検知・生成モデル（VAE）に応用される。',
  },
  {
    id: 'g-gk-67', term: 'RLHF（人間のフィードバックに基づく強化学習）', reading: 'アールエルエイチエフ',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '人間の評価をもとに報酬モデルを構築し、その報酬を最大化するように言語モデルを強化学習で調整する手法。ChatGPT等で、より自然で有用な応答生成に用いられている。',
  },
  {
    id: 'g-gk-68', term: 'RAG（検索拡張生成）', reading: 'ラグ',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: 'ユーザーの質問に関連する文書を検索し、その内容をプロンプトに含めて大規模言語モデルに回答させる手法。モデルを再学習せず最新情報・独自データに基づく回答が可能になる。',
  },
  {
    id: 'g-gk-69', term: '知識蒸留（Knowledge Distillation）', reading: 'ちしきじょうりゅう',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '大規模な教師モデルの出力を、小規模な生徒モデルに模倣させて学習することで、性能を保ちながらモデルを軽量化する手法。エッジデバイスでのAI活用に重要。',
  },
  {
    id: 'g-gk-70', term: 'AIエージェント', reading: 'エーアイエージェント',
    subject: 'gkentei_deep_learning', category: '深層学習の応用分野',
    definition: '大規模言語モデルを中核に、計画立案・外部ツール呼び出し・結果確認のサイクルを自律的に繰り返して複数ステップのタスクを遂行する仕組み。',
  },

  // ── 線形代数・微分の基礎 ────────────────────────────────────────────────────
  {
    id: 'g-gk-71', term: 'ベクトル', reading: 'ベクトル',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '大きさと方向を持つ量。機械学習ではデータの特徴量を要素として並べたものとして扱われ、ニューラルネットワークの入出力もベクトルで表現される。',
  },
  {
    id: 'g-gk-72', term: '行列', reading: 'ぎょうれつ',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '数値を縦横に並べたもの。ニューラルネットワークの重みパラメータや、複数のデータ・特徴量の集合を表現する基本的な構造として使われる。',
  },
  {
    id: 'g-gk-73', term: '内積', reading: 'ないせき',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '2つのベクトルの対応する要素を掛けて足し合わせた値。ニューラルネットワークの各ニューロンでは、入力ベクトルと重みベクトルの内積が計算される。',
  },
  {
    id: 'g-gk-74', term: '微分', reading: 'びぶん',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '関数の出力が入力の変化に対してどれだけ変化するか（傾き）を表す。機械学習では損失関数をパラメータで微分した勾配を使って、勾配降下法によりパラメータを更新する。',
  },
  {
    id: 'g-gk-75', term: '偏微分', reading: 'へんびぶん',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '複数の変数を持つ関数において、ある1つの変数だけに注目し、他の変数を固定して微分すること。誤差逆伝播法では各パラメータについての偏微分（勾配）を計算する。',
  },
  {
    id: 'g-gk-76', term: '連鎖律（チェインルール）', reading: 'れんさりつ',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '合成関数の微分を、各構成関数の微分の積として計算できるという法則。誤差逆伝播法は、この連鎖律を層をさかのぼる方向に繰り返し適用することで勾配を計算している。',
  },
  {
    id: 'g-gk-77', term: '勾配', reading: 'こうばい',
    subject: 'gkentei_math_stats', category: '線形代数・微分の基礎',
    definition: '関数の各変数（パラメータ）に関する偏微分を並べたベクトル。関数の値が最も急に増加する方向を示し、勾配降下法ではこの逆方向にパラメータを更新する。',
  },

  // ── 統計の基礎（確率分布・検定の考え方） ────────────────────────────────────
  {
    id: 'g-gk-78', term: '平均・分散・標準偏差', reading: 'へいきん・ぶんさん・ひょうじゅんへんさ',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: '平均はデータの代表値、分散はデータの平均からのばらつきの2乗の平均、標準偏差は分散の平方根。データの中心と散らばりを表す基本的な統計量。',
  },
  {
    id: 'g-gk-79', term: '正規分布', reading: 'せいきぶんぷ',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: '平均値を中心に左右対称の釜状（ベル型）の確率分布。自然現象や測定誤差など多くのデータがこの分布に近づくとされ、統計学で最も重要な分布の一つ。',
  },
  {
    id: 'g-gk-80', term: '条件付き確率', reading: 'じょうけんつきかくりつ',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: 'あるイベントが起こったという条件のもとで、別のイベントが起こる確率。P(B|A) = P(A∩B) / P(A) のように表され、ベイズの定理の基礎となる。',
  },
  {
    id: 'g-gk-81', term: 'ベイズの定理', reading: 'ベイズのていり',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: '事前確率と新たな証拠（データ）から事後確率を更新する公式。P(A|B) = P(B|A)P(A) / P(B)。スパムフィルタやベイズ推定など機械学習の多くの場面で利用される。',
  },
  {
    id: 'g-gk-82', term: '相関係数', reading: 'そうかんけいすう',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: '2つの変数間の線形関係の強さを-1〜1の値で表す指標。1に近いほど強い正の相関、-1に近いほど強い負の相関、0に近いほど線形の相関が弱いことを示す。',
  },
  {
    id: 'g-gk-83', term: '大数の法則', reading: 'たいすうのほうそく',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: 'サンプル数を増やすほど、標本平均が母集団の平均（真の値）に近づいていくという法則。機械学習では大量のデータを使うことの理論的根拠の一つとなる。',
  },
  {
    id: 'g-gk-84', term: '中心極限定理', reading: 'ちゅうしんきょくげんていり',
    subject: 'gkentei_math_stats', category: '統計の基礎',
    definition: '元の分布の形に関わらず、サンプル数を十分に大きくすると、標本平均の分布は正規分布に近づくという定理。統計的検定や信頼区間の理論的基盤となる。',
  },

  // ── AIに関する法律（著作権・個人情報保護法等） ───────────────────────────────
  {
    id: 'g-gk-85', term: '著作権法とAI学習データ', reading: 'ちょさくけんほうとエーアイがくしゅうデータ',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: '日本の著作権法第30条の4は、AI開発のための学習データとして著作物を利用することを、一定の条件下で著作権者の許諾なく認めている（情報解析のための利用）。ただし著作権者の利益を不当に害する場合は対象外となる。',
  },
  {
    id: 'g-gk-86', term: '個人情報保護法', reading: 'こじんじょうほうほごほう',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: '個人を特定できる情報の取得・利用・第三者提供等に関するルールを定めた法律。AIの学習データに個人情報が含まれる場合、利用目的の通知・同意等の規律が適用される。',
  },
  {
    id: 'g-gk-87', term: 'AI生成物と著作権', reading: 'エーアイせいせいぶつとちょさくけん',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: 'AIが自動生成した作品（画像・文章等）には、現行の著作権法上、原則として著作物性（人間の創作的寄与）が認められない場合、著作権が発生しないと解されている。人間の創作的意図・寄与の程度が論点となる。',
  },
  {
    id: 'g-gk-88', term: 'GDPR（EU一般データ保護規則）', reading: 'ジーディーピーアール',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: 'EUの個人データ保護に関する規則。EU域内の個人データを取り扱う事業者に適用され、違反時には高額な制裁金が課される。日本企業もEU向けサービスでは対応が必要。',
  },
  {
    id: 'g-gk-89', term: 'EU AI法', reading: 'イーユーエーアイほう',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: 'AIシステムをリスクの大きさに応じて分類し、規制の強度を変える世界初の包括的なAI規制法。「許容できないリスク」のAIシステムは禁止され、「高リスク」のAIには適合性評価等の義務が課される。',
  },
  {
    id: 'g-gk-90', term: '不正競争防止法と営業秘密', reading: 'ふせいきょうそうぼうしほうとえいぎょうひみつ',
    subject: 'gkentei_law_ethics', category: 'AIに関する法律',
    definition: '秘密管理性・有用性・非公知性の3要件を満たす情報は「営業秘密」として保護される。AIの学習データやアルゴリズムが営業秘密に該当する場合、不正取得・利用は法的責任の対象となる。',
  },

  // ── AI倫理・ガバナンス ──────────────────────────────────────────────────────
  {
    id: 'g-gk-91', term: 'アルゴリズムバイアス', reading: 'アルゴリズムバイアス',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: '学習データに含まれる偏り（性別・年齢・人種等）をAIが学習し、特定の属性に対して不公平な判断を再生産・増幅してしまう現象。採用選考や信用評価等で問題視される。',
  },
  {
    id: 'g-gk-92', term: 'XAI（説明可能なAI）', reading: 'エックスエーアイ',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: 'AIの判断プロセスや根拠を人間が理解できる形で示す技術・アプローチの総称。「ブラックボックス化」したAIの判断の妥当性を検証し、信頼性を高めることを目的とする。',
  },
  {
    id: 'g-gk-93', term: 'Human-in-the-loop', reading: 'ヒューマンインザループ',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: 'AIの判断や出力に対して、人間が確認・修正・承認のプロセスを組み込む設計の考え方。AIの誤りや偏りによる悪影響を抑え、最終的な判断責任を人間が担保する仕組み。',
  },
  {
    id: 'g-gk-94', term: 'ハルシネーション', reading: 'ハルシネーション',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: '大規模言語モデルが、事実に基づかない情報をもっともらしい文章として生成してしまう現象。AI倫理・ガバナンスにおいて、出力の正確性確認の重要性を示す代表的な課題。',
  },
  {
    id: 'g-gk-95', term: 'AI事業者ガイドライン', reading: 'エーアイじぎょうしゃガイドライン',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: '日本政府（総務省・経済産業省）が策定した、AI開発者・提供者・利用者に向けた事業者向けの指針。法的拘束力はないが、AIの安全・安心な活用に向けた実践的な留意点を示すソフトローとして機能する。',
  },
  {
    id: 'g-gk-96', term: 'プライバシー・バイ・デザイン', reading: 'プライバシーバイデザイン',
    subject: 'gkentei_law_ethics', category: 'AI倫理・ガバナンス',
    definition: 'システムやサービスの設計段階から、個人情報保護・プライバシー対策を組み込んでおくという考え方。後から対策を追加するのではなく、設計の初期段階から考慮することが重要とされる。',
  },

  // ── AIの社会実装・産業応用事例 ─────────────────────────────────────────────
  {
    id: 'g-gk-97', term: 'PoC（Proof of Concept）', reading: 'ピーオーシー',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: 'AIを本格導入する前に、小規模なデータや限定的な範囲で実現可能性・効果を検証する取り組み（概念実証）。PoCの結果を踏まえて本格導入の判断を行う。',
  },
  {
    id: 'g-gk-98', term: 'スマートシティ', reading: 'スマートシティ',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: '都市内のセンサー・カメラ等から収集したデータをAIで分析・活用し、交通渋滞の緩和・エネルギー利用の最適化・防犯防災等を実現しようとする都市運営の取り組み。',
  },
  {
    id: 'g-gk-99', term: 'ダイナミックプライシング', reading: 'ダイナミックプライシング',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: '需要・競合価格・在庫状況等をAIがリアルタイムに分析し、商品やサービスの価格を動的に調整する仕組み。航空券・ホテル・ECサイト等で活用される。',
  },
  {
    id: 'g-gk-100', term: 'リーガルテック', reading: 'リーガルテック',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: '契約書のリスク条項検出や判例・法令検索など、法律関連業務を自然言語処理AI等で効率化・支援するサービスや技術の総称。最終的な法的判断は専門家が行うことが前提となる。',
  },
  {
    id: 'g-gk-101', term: 'スマートグリッド', reading: 'スマートグリッド',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: '電力の発電・送配電・消費に関するデータをAIでリアルタイムに分析・調整し、電力網全体の効率化を図る仕組み。再生可能エネルギーの導入拡大への対応技術として注目される。',
  },
  {
    id: 'g-gk-102', term: 'マルチモーダルAI', reading: 'マルチモーダルエーアイ',
    subject: 'gkentei_law_ethics', category: 'AIの社会実装・産業応用事例',
    definition: 'テキスト・画像・音声・動画など複数の種類のデータを統合的に扱うAIモデル。画像と質問文から回答を生成したり、テキストから画像を生成したりするモデルが代表例。',
  },

  // ════════════════════════════════════════════════════════════════════════
  // 危険物取扱者 乙種第4類（kikenbutsu4）— examId: kikenbutsu4
  // ════════════════════════════════════════════════════════════════════════

  // ── 危険物の定義・分類 ──────────────────────────────────────────────────────
  {
    id: 'g-kb4-01', term: '危険物', reading: 'きけんぶつ',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '消防法第2条第7項及び別表第一で定める、火災や爆発の危険性を有する物品。第1類〜第6類に分類され、第4類は「引火性液体」が該当する。',
  },
  {
    id: 'g-kb4-02', term: '第4類危険物（引火性液体）', reading: 'だい4るいきけんぶつ',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: 'ガソリン・灯油・軽油・アルコール類など、引火性を有する液体の総称。乙種第4類危険物取扱者が取り扱える危険物の対象範囲。',
  },
  {
    id: 'g-kb4-03', term: '指定数量', reading: 'していすうりょう',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '消防法上、危険物の危険性の程度に応じて品名ごとに政令で定められた数量。指定数量以上の危険物を貯蔵・取り扱う場合は、製造所等としての許可等が必要となる。',
  },
  {
    id: 'g-kb4-04', term: '引火点', reading: 'いんかてん',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '可燃性液体が空気中で点火源があれば燃え始める最低の温度。第4類危険物は引火点の低さによって特殊引火物・第一石油類〜第四石油類等に分類される。',
  },
  {
    id: 'g-kb4-05', term: '特殊引火物', reading: 'とくしゅいんかぶつ',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '第4類の中で最も危険性が高い品名。発火点100℃以下、または引火点-20℃以下で沸点40℃以下のもの。ジエチルエーテル・二硫化炭素等が該当する。',
  },
  {
    id: 'g-kb4-06', term: '第一石油類〜第四石油類', reading: 'だいいち〜だいよんせきゆるい',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '引火点に応じた第4類危険物の品名区分。第一石油類（引火点21℃未満、ガソリン等）、第二石油類（21℃以上70℃未満、灯油・軽油等）、第三石油類（70℃以上200℃未満、重油等）、第四石油類（200℃以上250℃未満、ギヤー油等）。',
  },
  {
    id: 'g-kb4-07', term: 'アルコール類', reading: 'アルコールるい',
    subject: 'kikenbutsu4_law', category: '危険物の定義・分類',
    definition: '第4類の品名のひとつ。1分子を構成する炭素の原子数が1〜3個の飽和一価アルコール（メタノール・エタノール・プロパノール等）で、含有量が60%以上のものが該当する。',
  },

  // ── 製造所等の区分・許可と届出 ───────────────────────────────────────────────
  {
    id: 'g-kb4-08', term: '製造所等', reading: 'せいぞうしょとう',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '消防法上、危険物を製造・貯蔵・取り扱う施設の総称。製造所・貯蔵所・取扱所の3つに大別され、それぞれさらに細分される。',
  },
  {
    id: 'g-kb4-09', term: '給油取扱所', reading: 'きゅうゆとりあつかいじょ',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: 'ガソリンスタンド等、固定された給油設備によって自動車等の燃料タンクに直接給油するための取扱所。乙種第4類危険物取扱者が最も関わる代表的な施設。',
  },
  {
    id: 'g-kb4-10', term: '屋内貯蔵所・屋外貯蔵所・屋外タンク貯蔵所', reading: 'おくないちょぞうしょ・おくがいちょぞうしょ・おくがいタンクちょぞうしょ',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '危険物を貯蔵するための施設の分類。屋内貯蔵所は屋内で容器のまま貯蔵、屋外タンク貯蔵所は屋外に設置したタンクで貯蔵する施設で、それぞれ位置・構造・設備の基準が定められている。',
  },
  {
    id: 'g-kb4-11', term: '設置許可', reading: 'せっちきょか',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等を新たに設置する場合に必要な、市町村長等（消防本部及び消防署を置く市町村は市町村長、その他は都道府県知事等）からの許可。許可なく設置・変更すると罰則の対象となる。',
  },
  {
    id: 'g-kb4-12', term: '完成検査', reading: 'かんせいけんさ',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等の設置・変更の許可を受けた後、工事完了時に技術上の基準に適合しているかを確認するための検査。完成検査を受け、合格しなければ使用を開始できない。',
  },
  {
    id: 'g-kb4-13', term: '仮使用', reading: 'かりしよう',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等の変更工事中に、変更工事に係る部分以外の部分の全部または一部を、市町村長等の承認を受けて完成検査前に使用すること。',
  },
  {
    id: 'g-kb4-14', term: '品名・数量の変更届出', reading: 'ひんめい・すうりょうのへんこうとどけで',
    subject: 'kikenbutsu4_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等で貯蔵・取り扱う危険物の品名・数量・指定数量の倍数を変更する場合、変更の10日前までに市町村長等に届け出る必要がある（変更許可とは異なる手続き）。',
  },

  // ── 位置・構造・設備の基準 ───────────────────────────────────────────────────
  {
    id: 'g-kb4-15', term: '保安距離', reading: 'ほあんきょり',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '製造所等と、学校・病院・住居等の保護対象物との間に確保しなければならない距離。火災・爆発が発生した際に周囲への影響を抑えるための基準。',
  },
  {
    id: 'g-kb4-16', term: '保有空地', reading: 'ほゆうくうち',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '製造所等の周囲に確保しなければならない、危険物を貯蔵・取り扱う設備等を設けてはならない空地。消火活動や延焼防止のために必要な幅が定められている。',
  },
  {
    id: 'g-kb4-17', term: '防油堤', reading: 'ぼうゆてい',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '屋外タンク貯蔵所等において、タンクから危険物が漏れた場合に周囲への流出を防ぐために設けられる堤防状の設備。容量はタンク容量に応じて定められる。',
  },
  {
    id: 'g-kb4-18', term: '通気管', reading: 'つうきかん',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '貯蔵タンク内の蒸気を放出・吸入させ、タンク内圧を一定に保つための設備。無弁通気管と大気弁付通気管があり、引火を防止する構造（引火防止網等）が必要。',
  },
  {
    id: 'g-kb4-19', term: '電気設備の防爆構造', reading: 'でんきせつびのぼうばくこうぞう',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '可燃性蒸気が発生するおそれのある場所に設置する電気設備に求められる、内部の火花や発熱が外部の可燃性蒸気に引火しないようにする構造。',
  },
  {
    id: 'g-kb4-20', term: '採光・照明・換気設備', reading: 'さいこう・しょうめい・かんきせつび',
    subject: 'kikenbutsu4_law', category: '位置・構造・設備の基準',
    definition: '製造所等に設けることが求められる基本設備。可燃性蒸気が滞留するおそれのある建築物には、屋外の高所に排出する換気・排出設備を設ける必要がある。',
  },

  // ── 貯蔵・取扱いの基準 ──────────────────────────────────────────────────────
  {
    id: 'g-kb4-21', term: '類を異にする危険物の貯蔵', reading: 'るいをことにするきけんぶつのちょぞう',
    subject: 'kikenbutsu4_law', category: '貯蔵・取扱いの基準',
    definition: '原則として、異なる類の危険物は同一の貯蔵所で貯蔵してはならない。ただし、それぞれの危険物を1m以上の間隔を置いて貯蔵する場合等、政令で定める条件下では混在貯蔵が認められる。',
  },
  {
    id: 'g-kb4-22', term: '貯蔵・取扱いの基準（みだりに変更しない）', reading: 'ちょぞう・とりあつかいのきじゅん',
    subject: 'kikenbutsu4_law', category: '貯蔵・取扱いの基準',
    definition: '許可を受けた品名・数量・貯蔵又は取扱方法の基準を、みだりに変更してはならない。変更する場合は、所定の手続き（変更許可・届出等）が必要となる。',
  },
  {
    id: 'g-kb4-23', term: '可燃性ガスの蓄積防止', reading: 'かねんせいガスのちくせきぼうし',
    subject: 'kikenbutsu4_law', category: '貯蔵・取扱いの基準',
    definition: '危険物を貯蔵・取り扱う場所では、可燃性の蒸気・微粉等が滞留しないように、換気を行う等の措置を講じなければならない。',
  },
  {
    id: 'g-kb4-24', term: '廃棄の基準', reading: 'はいきのきじゅん',
    subject: 'kikenbutsu4_law', category: '貯蔵・取扱いの基準',
    definition: '危険物を廃棄する場合、海中・水中への流出や、地下への浸透等を避け、安全な場所で焼却する等、政令で定める基準に従って行わなければならない。',
  },
  {
    id: 'g-kb4-25', term: '空容器の取り扱い', reading: 'からようきのとりあつかい',
    subject: 'kikenbutsu4_law', category: '貯蔵・取扱いの基準',
    definition: '危険物を入れていた空の容器でも、可燃性蒸気が残留している場合があるため、火気を近づけない等、危険物が入っていた容器に準じた取り扱いが求められる。',
  },

  // ── 運搬・移動の基準 ─────────────────────────────────────────────────────────
  {
    id: 'g-kb4-26', term: '運搬', reading: 'うんぱん',
    subject: 'kikenbutsu4_law', category: '運搬・移動の基準',
    definition: '消防法上、容器に収納した危険物を車両等で輸送すること。移送（移動タンク貯蔵所による輸送）とは異なり、危険物取扱者の乗車義務はない。',
  },
  {
    id: 'g-kb4-27', term: '移送', reading: 'いそう',
    subject: 'kikenbutsu4_law', category: '運搬・移動の基準',
    definition: '移動タンク貯蔵所（タンクローリー等）によって危険物を輸送すること。原則として当該危険物を取り扱える危険物取扱者の乗車（または同乗）が必要となる。',
  },
  {
    id: 'g-kb4-28', term: '「危」標識', reading: 'きけんひょうしき',
    subject: 'kikenbutsu4_law', category: '運搬・移動の基準',
    definition: '指定数量以上の危険物を車両で運搬する場合、車両の前後の見やすい場所に掲示しなければならない「危」と表示した標識。',
  },
  {
    id: 'g-kb4-29', term: '運搬容器の収納の基準', reading: 'うんぱんようきのしゅうのうのきじゅん',
    subject: 'kikenbutsu4_law', category: '運搬・移動の基準',
    definition: '運搬容器には、収納する危険物の品名・危険等級・注意事項等を表示する必要がある。容器の構造・材質も、内容物の性質に応じた基準を満たす必要がある。',
  },

  // ── 危険物取扱者制度・保安体制 ─────────────────────────────────────────────────
  {
    id: 'g-kb4-30', term: '甲種・乙種・丙種', reading: 'こうしゅ・おつしゅ・へいしゅ',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物取扱者免状の種類。甲種は全類の危険物を取り扱い・立会いができる。乙種は免状に指定された類のみ取り扱い・立会いができる。丙種は政令で定める特定の危険物のみ取り扱い可能で立会いはできない。',
  },
  {
    id: 'g-kb4-31', term: '立会い', reading: 'たちあい',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物取扱者免状を持たない者が危険物を取り扱う際、甲種または乙種危険物取扱者がその作業に立ち会うこと。丙種免状所有者は立会いを行うことができない。',
  },
  {
    id: 'g-kb4-32', term: '危険物保安監督者', reading: 'きけんぶつほあんかんとくしゃ',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '政令で定める製造所等において選任が義務付けられる、危険物取扱作業の保安監督を行う者。甲種または乙種危険物取扱者であって6か月以上の実務経験を有する者から選任される。',
  },
  {
    id: 'g-kb4-33', term: '免状の書換え・再交付', reading: 'めんじょうのかきかえ・さいこうふ',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '免状の記載事項（氏名・本籍地等）に変更があった場合は書換えを申請する。免状を亡失・滅失・汚損・破損した場合は、交付または書換えをした都道府県知事に再交付を申請できる。免状自体に有効期限はない。',
  },
  {
    id: 'g-kb4-34', term: '免状の返納命令', reading: 'めんじょうのへんのうめいれい',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物取扱者が消防法令に違反しているとき、免状を交付した都道府県知事は当該免状の返納を命じることができる。',
  },
  {
    id: 'g-kb4-35', term: '保安講習', reading: 'ほあんこうしゅう',
    subject: 'kikenbutsu4_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物の取扱作業に従事する危険物取扱者が、一定期間ごとに受講しなければならない講習。最新の法令・保安管理の知識を維持・更新することを目的とする。',
  },

  // ── 物理基礎（燃焼の三要素・熱・比重・圧力） ────────────────────────────────
  {
    id: 'g-kb4-36', term: '燃焼の三要素', reading: 'ねんしょうのさんようそ',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: '燃焼が継続するために必要な「可燃物」「酸素供与体（酸素）」「点火源（熱源）」の3要素。このいずれかを取り除くことが消火の基本原理となる。',
  },
  {
    id: 'g-kb4-37', term: '比重', reading: 'ひじゅう',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: 'ある物質の密度と、基準となる物質（液体は水、気体は空気）の密度との比。第4類危険物の多くは比重1未満（水に浮く）で、蒸気の比重は1より大きい（空気より重く低所に滞留する）ものが多い。',
  },
  {
    id: 'g-kb4-38', term: '沸点', reading: 'ふってん',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: '液体が沸騰し気体に変化する温度。第4類の特殊引火物は沸点が低いものが多く、揮発しやすいため危険性が高い。',
  },
  {
    id: 'g-kb4-39', term: '熱伝導・熱対流・熱放射', reading: 'ねつでんどう・ねつたいりゅう・ねつほうしゃ',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: '熱が伝わる3つの方式。熱伝導は物質内を直接伝わる、熱対流は流体の移動によって伝わる、熱放射は電磁波として空間を伝わる。火災の延焼経路を理解する基礎となる。',
  },
  {
    id: 'g-kb4-40', term: '静電気と火気の管理', reading: 'せいでんきとかきのかんり',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: '可燃性蒸気が存在する場所では、静電気の放電も点火源となり得るため、接地（アース）等により静電気を除去・防止する必要がある。',
  },
  {
    id: 'g-kb4-41', term: '物質の三態', reading: 'ぶっしつのさんたい',
    subject: 'kikenbutsu4_chemistry_physics', category: '物理基礎',
    definition: '物質が取りうる固体・液体・気体の3つの状態。温度・圧力の変化により状態変化（融解・蒸発・凝固・凝結等）が起こる。',
  },

  // ── 化学基礎（物質の種類・化学反応・酸化還元） ──────────────────────────────
  {
    id: 'g-kb4-42', term: '単体・化合物・混合物', reading: 'たんたい・かごうぶつ・こんごうぶつ',
    subject: 'kikenbutsu4_chemistry_physics', category: '化学基礎',
    definition: '単体は1種類の元素からなる物質、化合物は2種類以上の元素が結合した物質、混合物は2種類以上の物質が化学的に結合せず混ざった状態のもの。',
  },
  {
    id: 'g-kb4-43', term: '酸化・還元', reading: 'さんか・かんげん',
    subject: 'kikenbutsu4_chemistry_physics', category: '化学基礎',
    definition: '酸化は物質が酸素と結びつく（または電子を失う）反応、還元はその逆（酸素を失う、または電子を得る）反応。燃焼は急速な酸化反応の一種である。',
  },
  {
    id: 'g-kb4-44', term: '化学反応式', reading: 'かがくはんのうしき',
    subject: 'kikenbutsu4_chemistry_physics', category: '化学基礎',
    definition: '化学反応の前後における物質の変化を化学式で表したもの。反応物と生成物の原子の数は反応の前後で保存される（質量保存の法則）。',
  },
  {
    id: 'g-kb4-45', term: 'pH（水素イオン指数）', reading: 'ピーエイチ',
    subject: 'kikenbutsu4_chemistry_physics', category: '化学基礎',
    definition: '溶液の酸性・アルカリ性の強さを表す指数。pH7が中性、7未満が酸性、7を超えるとアルカリ性（塩基性）を示す。',
  },
  {
    id: 'g-kb4-46', term: '有機化合物', reading: 'ゆうきかごうぶつ',
    subject: 'kikenbutsu4_chemistry_physics', category: '化学基礎',
    definition: '炭素を骨格とする化合物の総称（一部の例外を除く）。石油由来の第4類危険物（ガソリン・アルコール類等）の多くは有機化合物であり、燃えやすい性質を持つ。',
  },

  // ── 静電気・電気の基礎 ──────────────────────────────────────────────────────
  {
    id: 'g-kb4-47', term: '静電気の発生', reading: 'せいでんきのはっせい',
    subject: 'kikenbutsu4_chemistry_physics', category: '静電気・電気の基礎',
    definition: '液体の流動・摩擦・噴出等によって、物体に電荷が蓄積される現象。ガソリン等の第4類危険物は電気を通しにくい（電気抵抗が大きい）ため静電気が蓄積しやすい。',
  },
  {
    id: 'g-kb4-48', term: '接地（アース）', reading: 'せっち（アース）',
    subject: 'kikenbutsu4_chemistry_physics', category: '静電気・電気の基礎',
    definition: '蓄積した静電気を地中に逃がすための処置。タンクローリーからの荷卸し作業時など、静電気火花による引火を防止するために実施される。',
  },
  {
    id: 'g-kb4-49', term: '導体・不導体（絶縁体）', reading: 'どうたい・ふどうたい（ぜつえんたい）',
    subject: 'kikenbutsu4_chemistry_physics', category: '静電気・電気の基礎',
    definition: '導体は電気を通しやすい物質、不導体（絶縁体）は電気を通しにくい物質。第4類危険物の多くは不導体に該当し、静電気が蓄積しやすい性質がある。',
  },
  {
    id: 'g-kb4-50', term: '静電気災害の防止策', reading: 'せいでんきさいがいのぼうしさく',
    subject: 'kikenbutsu4_chemistry_physics', category: '静電気・電気の基礎',
    definition: '接地（アース）の実施、流速を遅くする、湿度を高める（湿度が高いと静電気は逃げやすい）、帯電防止服・帯電防止靴を使用する等の方法で静電気の蓄積・放電を防ぐこと。',
  },

  // ── 第4類危険物の共通性質 ────────────────────────────────────────────────────
  {
    id: 'g-kb4-51', term: '第4類危険物の共通性質', reading: 'だい4るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenbutsu4_properties', category: '第4類危険物の共通性質',
    definition: '第4類危険物（引火性液体）は、いずれも引火しやすく、蒸気は空気より重いものが多く低所に滞留しやすい。比重は1未満（水に浮く）のものが多く、電気の不導体で静電気が蓄積しやすい。',
  },
  {
    id: 'g-kb4-52', term: '燃焼範囲（爆発範囲）', reading: 'ねんしょうはんい（ばくはつはんい）',
    subject: 'kikenbutsu4_properties', category: '第4類危険物の共通性質',
    definition: '可燃性蒸気と空気の混合気体が燃焼（爆発）を起こすことができる濃度の範囲。下限値より低い、または上限値より高い濃度では燃焼しない。',
  },
  {
    id: 'g-kb4-53', term: '発火点', reading: 'はっかてん',
    subject: 'kikenbutsu4_properties', category: '第4類危険物の共通性質',
    definition: '可燃物が点火源なしに自然に燃え始める最低の温度。引火点とは異なり、外部からの火源を必要としない発火を指す。',
  },
  {
    id: 'g-kb4-54', term: '蒸気の重さと滞留', reading: 'じょうきのおもさとたいりゅう',
    subject: 'kikenbutsu4_properties', category: '第4類危険物の共通性質',
    definition: '第4類危険物の蒸気は空気より重い（蒸気比重が1より大きい）ものが多く、低い場所に滞留しやすいため、換気は床面近くから行う必要がある。',
  },
  {
    id: 'g-kb4-55', term: '自己反応性物質ではない', reading: 'じこはんのうせいぶっしつではない',
    subject: 'kikenbutsu4_properties', category: '第4類危険物の共通性質',
    definition: '第4類危険物は「引火性液体」であり、第5類（自己反応性物質）のように分子内に酸素を含み自ら酸化反応を起こすものではない。外部からの酸素供給（空気中の酸素）によって燃焼する。',
  },

  // ── 品名別の特性（ガソリン・灯油・軽油・アルコール類等） ──────────────────────
  {
    id: 'g-kb4-56', term: 'ガソリン', reading: 'ガソリン',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '第一石油類に該当し、引火点は-40℃以下と非常に低い。自動車の燃料として広く使われ、揮発性が高く蒸気は空気より重い。色は無色またはオレンジ系に着色されている。',
  },
  {
    id: 'g-kb4-57', term: '灯油', reading: 'とうゆ',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '第二石油類に該当し、引火点は40℃以上と常温では引火しにくいが、霧状や布等に染み込んだ状態では引火点以下でも燃えやすくなる点に注意が必要。',
  },
  {
    id: 'g-kb4-58', term: '軽油', reading: 'けいゆ',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '第二石油類に該当し、引火点は45℃以上。ディーゼル燃料として使用され、灯油と性質が似ているが引火点が灯油よりやや高い。',
  },
  {
    id: 'g-kb4-59', term: 'メタノール・エタノール（アルコール類）', reading: 'メタノール・エタノール',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: 'アルコール類に該当し、水に溶けやすい性質を持つ。水溶性のため、水溶性液体用泡消火剤（耐アルコール泡）を用いる必要があり、一般の泡消火剤は効果が薄い。',
  },
  {
    id: 'g-kb4-60', term: '重油', reading: 'じゅうゆ',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '第三石油類に該当し、引火点は70℃以上と高い。粘度が高く、加熱しないと流動しにくい性質を持つ。',
  },
  {
    id: 'g-kb4-61', term: '二硫化炭素', reading: 'にりゅうかたんそ',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '特殊引火物に該当し、発火点が約90℃と非常に低く、自然発火の危険性がある。水より重い（比重約1.3）ため、水中貯蔵により蒸気の発生を抑制する貯蔵方法が用いられる。',
  },
  {
    id: 'g-kb4-62', term: 'ジエチルエーテル', reading: 'ジエチルエーテル',
    subject: 'kikenbutsu4_properties', category: '品名別の特性',
    definition: '特殊引火物に該当し、引火点は-45℃と極めて低く、揮発性・引火性が非常に高い。麻酔作用があり、直射日光や空気との接触で爆発性の過酸化物を生成することがある。',
  },

  // ── 火災予防の方法 ───────────────────────────────────────────────────────────
  {
    id: 'g-kb4-63', term: '可燃性蒸気の発生防止', reading: 'かねんせいじょうきのはっせいぼうし',
    subject: 'kikenbutsu4_properties', category: '火災予防の方法',
    definition: '容器のふたを確実に閉める、貯蔵温度を引火点未満に保つ等、可燃性蒸気の発生・滞留を抑えることが火災予防の基本となる。',
  },
  {
    id: 'g-kb4-64', term: '火気・点火源の管理', reading: 'かき・てんかげんのかんり',
    subject: 'kikenbutsu4_properties', category: '火災予防の方法',
    definition: '危険物を取り扱う場所での裸火・タバコの禁止、火花を発生する工具の使用制限など、点火源となり得るものを排除・管理することが重要である。',
  },
  {
    id: 'g-kb4-65', term: '温度管理（直射日光・加熱の回避）', reading: 'おんどかんり',
    subject: 'kikenbutsu4_properties', category: '火災予防の方法',
    definition: '第4類危険物は温度が上昇すると蒸気の発生量が増え引火の危険性が高まるため、直射日光を避け、冷暗所での貯蔵が原則とされる。',
  },
  {
    id: 'g-kb4-66', term: '換気の徹底', reading: 'かんきのてってい',
    subject: 'kikenbutsu4_properties', category: '火災予防の方法',
    definition: '可燃性蒸気が滞留しないよう、低所からの排出を含めた換気を行うことで、燃焼範囲内の濃度に達することを防止する。',
  },
  {
    id: 'g-kb4-67', term: '容器・設備の腐食・劣化防止', reading: 'ようき・せつびのふしょく・れっかぼうし',
    subject: 'kikenbutsu4_properties', category: '火災予防の方法',
    definition: '貯蔵容器やタンク・配管が腐食・劣化すると危険物の漏えいにつながるため、定期的な点検・補修によって設備の健全性を維持することが求められる。',
  },

  // ── 消火の方法・消火剤の種類と適用 ──────────────────────────────────────────
  {
    id: 'g-kb4-68', term: '除去消火・窒息消火・冷却消火', reading: 'じょきょしょうか・ちっそくしょうか・れいきゃくしょうか',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '消火の3原理。除去消火は可燃物を取り除く、窒息消火は酸素の供給を断つ、冷却消火は温度を下げて燃焼を継続できなくする方法。',
  },
  {
    id: 'g-kb4-69', term: '泡消火剤', reading: 'あわしょうかざい',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '燃焼面を泡で覆い窒息効果・冷却効果で消火する薬剤。水溶性液体（アルコール類等）には一般の泡が溶けて効果が落ちるため、耐アルコール泡（水溶性液体用泡消火剤）を用いる必要がある。',
  },
  {
    id: 'g-kb4-70', term: '二酸化炭素消火剤', reading: 'にさんかたんそしょうかざい',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '燃焼面を二酸化炭素で覆い酸素濃度を下げる窒息効果で消火する薬剤。電気絶縁性があり残留物も少ないため、油火災・電気設備の火災に適する。密閉空間では酸素欠乏に注意。',
  },
  {
    id: 'g-kb4-71', term: '粉末消火剤', reading: 'ふんまつしょうかざい',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '燃焼の連鎖反応を抑制する抑制効果（負触媒効果）と窒息効果で消火する薬剤。即効性が高く油火災・電気火災等に広く使われるが、再燃のおそれがある。',
  },
  {
    id: 'g-kb4-72', term: '水消火剤の適否', reading: 'みずしょうかざいのてきひ',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '水は比重1未満の第4類危険物の多くより軽いため、注水すると危険物が水に浮いて燃焼面が拡大するおそれがあり、一般に第4類火災への適用は不適とされる。',
  },
  {
    id: 'g-kb4-73', term: 'ハロゲン化物消火剤', reading: 'ハロゲンかぶつしょうかざい',
    subject: 'kikenbutsu4_properties', category: '消火の方法',
    definition: '燃焼の連鎖反応を抑制する負触媒効果により消火する薬剤。電気絶縁性に優れ汚損が少ないが、環境への影響等の観点から使用が制限されているものもある。',
  },

  // ════════════════════════════════════════════════════════════════════════
  // 危険物取扱者 甲種（kikenbutsu_ko）— examId: kikenbutsu_ko
  // ════════════════════════════════════════════════════════════════════════

  // ── 危険物に関する法令 / 危険物の定義・分類（第1類〜第6類の概要） ──────────
  {
    id: 'g-kbko-01', term: '第1類〜第6類の類別と性質', reading: 'だい1るい〜だい6るいのるいべつとせいしつ',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '消防法別表第一による危険物の分類。第1類: 酸化性固体、第2類: 可燃性固体、第3類: 自然発火性物質及び禁水性物質、第4類: 引火性液体、第5類: 自己反応性物質、第6類: 酸化性液体。甲種ではこの対応関係を全類について正確に把握する必要がある。',
  },
  {
    id: 'g-kbko-02', term: '甲種が取り扱える危険物の範囲', reading: 'こうしゅがとりあつかえるきけんぶつのはんい',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '甲種危険物取扱者は、消防法別表第一に定めるすべての類（第1類〜第6類）の危険物を取り扱うことができる。乙種は免状に指定された類のみ、丙種は第4類のうち特定の品目に限られる。',
  },
  {
    id: 'g-kbko-03', term: '指定数量の倍数（複数類の合算）', reading: 'していすうりょうのばいすう',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '同一の場所で複数の類の危険物を貯蔵・取扱う場合、各危険物ごとに「貯蔵量／指定数量」を求め、その合計値で指定数量以上か判定する。合計が1以上になると消防法上の製造所等の規制対象となる。',
  },
  {
    id: 'g-kbko-04', term: '少量危険物（市町村条例による規制）', reading: 'しょうりょうきけんぶつ',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '指定数量の倍数が1未満の危険物。消防法上の製造所等の規制対象外だが、市町村条例（火災予防条例等）による貯蔵・取扱いの基準の規制を受ける。',
  },
  {
    id: 'g-kbko-05', term: '第3類危険物の共通性質（自然発火性・禁水性）', reading: 'だい3るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '空気との接触により自然発火するもの、または水との接触により発火・可燃性ガスを発生するものを含む類。カリウム・ナトリウム・黄リン等が代表例で、保護液中での貯蔵等の特別な取扱いが必要。',
  },
  {
    id: 'g-kbko-06', term: '第2類危険物の定義（可燃性固体）', reading: 'だい2るいきけんぶつのていぎ',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '消防法別表第一上、火炎により着火しやすく、または比較的低い温度（40℃未満）で着火しやすい固体と定義される類。硫化リン・赤リン・硫黄・鉄粉・金属粉・マグネシウム・引火性固体等が該当する。',
  },
  {
    id: 'g-kbko-07', term: '消防法上の「危険物」の定義', reading: 'しょうぼうほうじょうのきけんぶつのていぎ',
    subject: 'kikenko_law', category: '危険物の定義・分類',
    definition: '消防法第2条第7項により、別表第一の品名欄に掲げる物品で、当該物品が属する区分に応じて同表で定める性状を有するものをいう。高圧ガスや労働安全衛生法上の有害物質とは別の法令体系で規制される。',
  },

  // ── 危険物に関する法令 / 製造所等の区分・許可と届出 ───────────────────
  {
    id: 'g-kbko-08', term: '製造所等', reading: 'せいぞうしょとう',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '消防法上の危険物施設の総称。製造所・貯蔵所・取扱所の3区分に大別され、貯蔵所はさらに屋内貯蔵所・屋外貯蔵所・地下タンク貯蔵所等に、取扱所は給油取扱所・販売取扱所・一般取扱所等に細分される。',
  },
  {
    id: 'g-kbko-09', term: '設置許可（市町村長等）', reading: 'せっちきょか',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等を設置・変更する場合に必要な許可。原則として市町村長等（消防本部及び消防署を置く市町村ではその長、その他は都道府県知事）が許可権者となる。2以上の都道府県にわたる移送取扱所等は総務大臣の許可となる例外がある。',
  },
  {
    id: 'g-kbko-10', term: '完成検査', reading: 'かんせいけんさ',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '設置許可後、工事が完了した製造所等について、市町村長等が位置・構造・設備が技術上の基準に適合しているかを確認する検査。完成検査を受け適合と認められた後でなければ使用できない。',
  },
  {
    id: 'g-kbko-11', term: '完成検査前検査', reading: 'かんせいけんさまえけんさ',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: 'タンクの水圧検査・基礎・地盤検査等、完成検査の前段階で行う必要がある検査。タンクの溶接部等、完成後には確認が困難な部分を工事の途中で検査する。',
  },
  {
    id: 'g-kbko-12', term: '廃止の届出', reading: 'はいしのとどけで',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等を廃止するときに市町村長等へ行う手続き。新設・変更は許可制だが、廃止や危険物の品名・数量等の変更は届出制であり、両者の区別が出題されやすい。',
  },
  {
    id: 'g-kbko-13', term: '品名・数量・指定数量の倍数の変更届出', reading: 'ひんめい・すうりょう・していすうりょうのばいすうのへんこうとどけで',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等で取り扱う危険物の品名・数量または指定数量の倍数を変更する場合、変更しようとする日の10日前までに市町村長等に届け出る手続き（許可ではなく届出制）。',
  },
  {
    id: 'g-kbko-14', term: '仮使用', reading: 'かりしよう',
    subject: 'kikenko_law', category: '製造所等の区分・許可と届出',
    definition: '製造所等の一部を変更する工事の際、変更工事に係る部分以外の部分の全部または一部を、市町村長等の承認を受けて完成検査前に使用すること。',
  },

  // ── 危険物に関する法令 / 位置・構造・設備の基準 ─────────────────────
  {
    id: 'g-kbko-15', term: '保安距離', reading: 'ほあんきょり',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '製造所等が、学校・病院・劇場等の多数の人を収容する施設、文化財、高圧ガス施設、住居等から確保しなければならない距離。同一敷地内の自己の施設は保安距離の対象外。',
  },
  {
    id: 'g-kbko-16', term: '保有空地', reading: 'ほゆうくうち',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '火災時の消火活動を容易にし、他の建築物等への延焼を防止するために製造所等の周囲に確保する空地。指定数量の倍数に応じて幅が定められている。',
  },
  {
    id: 'g-kbko-17', term: '屋内貯蔵所の構造基準', reading: 'おくないちょぞうしょのこうぞうきじゅん',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '屋内貯蔵所の建築物は、壁・柱・床を耐火構造とし、屋根は不燃材料で造るとともに、爆発時の被害軽減のため軽量な金属板等で造る等の基準が定められている。地階は原則として設けてはならない。',
  },
  {
    id: 'g-kbko-18', term: '電気設備の防爆構造', reading: 'でんきせつびのぼうばくこうぞう',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '可燃性の蒸気やガスが発生し爆発の危険性がある場所に設置する電気設備に求められる、その雰囲気中で点火源とならない構造（耐圧防爆構造・本質安全防爆構造等）。',
  },
  {
    id: 'g-kbko-19', term: '防油堤', reading: 'ぼうゆてい',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '屋外タンク貯蔵所等で、タンクからの危険物の流出を防ぐために周囲に設ける囲い（堤）。タンク容量等に応じて容量・高さ等の基準が定められている。',
  },
  {
    id: 'g-kbko-20', term: '通気管', reading: 'つうきかん',
    subject: 'kikenko_law', category: '位置・構造・設備の基準',
    definition: '貯蔵タンク内の温度変化等による内圧の変動を緩和するために設ける配管。無弁通気管・大気弁付通気管等の種類があり、引火を防止する構造（薄綱板や金網等）を備える。',
  },

  // ── 危険物に関する法令 / 貯蔵・取扱いの基準 ───────────────────────
  {
    id: 'g-kbko-21', term: '類を異にする危険物の同時貯蔵禁止', reading: 'るいをことにするきけんぶつのどうじちょぞうきんし',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '混在すると危険性が増す類の組み合わせ（例: 第1類と第4類）は原則として同一の貯蔵所での貯蔵が禁止される。一定の条件下（取り扱う場所を1m以上離す等）で例外的に同時貯蔵が認められる組み合わせもある。',
  },
  {
    id: 'g-kbko-22', term: '危険物保安監督者', reading: 'きけんぶつほあんかんとくしゃ',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '指定数量以上の危険物を取り扱う製造所等のうち、政令で定めるものに選任が必要。甲種・乙種の危険物取扱者であって6か月以上の実務経験を有する者から選任され、甲種は全類について選任資格を持つ。',
  },
  {
    id: 'g-kbko-23', term: '危険物保安統括管理者', reading: 'きけんぶつほあんとうかつかんりしゃ',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '一定量以上の第4類危険物を取り扱う大規模な製造所・一般取扱所等で選任が必要な、事業所全体の保安業務を統括管理する者。危険物取扱者の資格は必須ではない点が危険物保安監督者との違い。',
  },
  {
    id: 'g-kbko-24', term: '容器の取扱いの基準', reading: 'ようきのとりあつかいのきじゅん',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '危険物を収納する容器は、当該危険物の性質に適応した材質を用い、原則として密封し、外部に品名・数量等を表示しなければならない（自然発火性物質等で性質上やむを得ない場合を除く）。',
  },
  {
    id: 'g-kbko-25', term: '立会い（無資格者の取扱作業）', reading: 'たちあい',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '危険物取扱者以外の者は、危険物取扱者（甲種または取り扱う類に応じた乙種）の立会いがなければ、製造所等において危険物の取扱作業に従事してはならないという規制。',
  },
  {
    id: 'g-kbko-26', term: '廃棄の基準', reading: 'はいきのきじゅん',
    subject: 'kikenko_law', category: '貯蔵・取扱いの基準',
    definition: '危険物を廃棄する際は、海中・水中に流出・投下しないこと、燃焼させる場合は他に危害・損害を及ぼさないこと等が定められている基準。',
  },

  // ── 危険物に関する法令 / 運搬・移動の基準 ────────────────────────
  {
    id: 'g-kbko-27', term: '運搬と移送の違い', reading: 'うんぱんといそうのちがい',
    subject: 'kikenko_law', category: '運搬・移動の基準',
    definition: '「運搬」は危険物を容器に収納して車両等で運ぶこと、「移送」は移動タンク貯蔵所（タンク車）によって運ぶことを指し、それぞれ別の規制（運搬基準・移送基準）が適用される。',
  },
  {
    id: 'g-kbko-28', term: '運搬容器の外部表示事項', reading: 'うんぱんようきのがいぶひょうじじこう',
    subject: 'kikenko_law', category: '運搬・移動の基準',
    definition: '運搬容器の外部に表示すべき事項。危険物の品名・危険等級・化学名（水溶性のものは「水溶性」表示を含む）、数量、収納する危険物に応じた注意事項（消火方法等を含む場合がある）。運転者個人の氏名・住所は含まれない。',
  },
  {
    id: 'g-kbko-29', term: '「危」標識', reading: 'きけんひょうしき',
    subject: 'kikenko_law', category: '運搬・移動の基準',
    definition: '指定数量以上の危険物を車両で運搬する場合に、車両の前後の見やすい位置に掲げる標識。地が黒色で「危」の文字を黄色の反射塗料等で表示する。',
  },
  {
    id: 'g-kbko-30', term: '移送時の危険物取扱者の同乗', reading: 'いそうじのきけんぶつとりあつかいしゃのどうじょう',
    subject: 'kikenko_law', category: '運搬・移動の基準',
    definition: '移動タンク貯蔵所により危険物を移送する場合、当該危険物を取り扱うことができる危険物取扱者を乗車させ、その者に免状を携帯させなければならない。長距離移送では2名以上の運転要員確保等の基準もある。',
  },
  {
    id: 'g-kbko-31', term: '混載の禁止', reading: 'こんさいのきんし',
    subject: 'kikenko_law', category: '運搬・移動の基準',
    definition: '運搬において、類によって性質が異なり混在すると危険性が増す危険物を同一車両に積載することを禁止する規制。第1類と第4類のように原則混載禁止の組み合わせが定められている。',
  },

  // ── 危険物に関する法令 / 危険物取扱者制度・保安体制 ───────────────
  {
    id: 'g-kbko-32', term: '甲種・乙種・丙種の違い', reading: 'こうしゅ・おつしゅ・へいしゅのちがい',
    subject: 'kikenko_law', category: '危険物取扱者制度・保安体制',
    definition: '甲種は第1類〜第6類すべて、乙種は免状に指定された類のみ、丙種は第4類のうち特定の品目（ガソリン・灯油・軽油等）に限り取り扱い・立会いができる。',
  },
  {
    id: 'g-kbko-33', term: '甲種危険物取扱者試験の受験資格', reading: 'こうしゅきけんぶつとりあつかいしゃしけんのじゅけんしかく',
    subject: 'kikenko_law', category: '危険物取扱者制度・保安体制',
    definition: '甲種は乙種と異なり受験資格に制限がある。代表的な経路として「大学等で化学に関する学科・課程を修了した者」「乙種免状を取得し、2年以上の危険物取扱いの実務経験を有する者」等が定められている。',
  },
  {
    id: 'g-kbko-34', term: '免状の書換え', reading: 'めんじょうのかきかえ',
    subject: 'kikenko_law', category: '危険物取扱者制度・保安体制',
    definition: '免状の記載事項（本籍地・氏名等）に変更があったとき、免状を交付または書換えをした都道府県知事に対して申請する手続き。',
  },
  {
    id: 'g-kbko-35', term: '免状の返納命令', reading: 'めんじょうのへんのうめいれい',
    subject: 'kikenko_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物取扱者が消防法または同法に基づく命令の規定に違反しているとき、免状を交付した都道府県知事から命じられることがある処分。',
  },
  {
    id: 'g-kbko-36', term: '保安講習', reading: 'ほあんこうしゅう',
    subject: 'kikenko_law', category: '危険物取扱者制度・保安体制',
    definition: '危険物の取扱作業に従事する危険物取扱者が、一定期間ごとに受講しなければならない講習。最新の法令・保安に関する知識の維持を目的とする。',
  },

  // ── 基礎的な物理学及び基礎的な化学 / 物理基礎（燃焼・熱・気体の法則等） ──
  {
    id: 'g-kbko-37', term: 'ボイル・シャルルの法則', reading: 'ボイル・シャルルのほうそく',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '一定量の気体の体積は、圧力に反比例し、絶対温度に比例するという法則（PV/T = 一定）。密閉容器内の危険物の蒸気圧と温度・体積の関係を理解する基礎となる。',
  },
  {
    id: 'g-kbko-38', term: '気体の状態方程式（PV=nRT）', reading: 'きたいのじょうたいほうていしき',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '気体の圧力P・体積V・物質量n・温度Tの関係を表す式（PV=nRT、Rは気体定数）。物質量・温度が一定なら圧力と体積は反比例（ボイルの法則）の関係になる。密閉容器内の蒸気圧上昇による破損リスクの理解の基礎。',
  },
  {
    id: 'g-kbko-39', term: '燃焼熱', reading: 'ねんしょうねつ',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '物質1mol（または1g）が完全燃焼するときに発生する熱量。燃焼熱が大きい物質ほど火災時のエネルギー放出量が大きく、消火が困難になる傾向がある。',
  },
  {
    id: 'g-kbko-40', term: '比熱（比熱容量）', reading: 'ひねつ（ひねつようりょう）',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '物質1gの温度を1℃（1K）上昇させるのに必要な熱量。比熱が小さい物質は少ない熱量で急速に高温化しやすい。比熱が大きい水は冷却消火剤として優れた性質を持つ。',
  },
  {
    id: 'g-kbko-41', term: '引火点と発火点の違い', reading: 'いんかてんとはっかてんのちがい',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '引火点は可燃性蒸気が点火源により燃焼を開始するのに十分な濃度に達する最低の液温。発火点は点火源なしに物質自体が空気中で自然に燃焼を開始する最低温度。一般に発火点は引火点よりかなり高い。',
  },
  {
    id: 'g-kbko-42', term: '燃焼範囲（爆発範囲）', reading: 'ねんしょうはんい（ばくはつはんい）',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '空気中で可燃性蒸気が燃焼・爆発を起こす濃度の範囲。範囲が広く、下限値（爆発下限）が低い物質ほど危険性が高い。二硫化炭素は燃焼範囲が非常に広く危険性が高い例。',
  },
  {
    id: 'g-kbko-43', term: '熱の三形態（伝導・対流・放射）', reading: 'ねつのさんけいたい',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '熱の伝わり方の3形態。伝導は物質内部を熱が伝わる現象、対流は流体（液体・気体）が移動して熱が伝わる現象、放射（輻射）は電磁波により直接接触なしに熱が伝わる現象。火災の延焼形態の理解に重要。',
  },
  {
    id: 'g-kbko-44', term: '比重と消火方法の関係', reading: 'ひじゅうとしょうかほうほうのかんけい',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '比重が1より小さい液体は水に浮く。第4類危険物の多くは比重が1未満のため、注水すると油が水面に広がり火災が拡大するおそれがあり、泡消火剤等による窒息消火が選択される。比重は消火方法の判断に直結する。',
  },
  {
    id: 'g-kbko-45', term: '燃焼の三要素', reading: 'ねんしょうのさんようそ',
    subject: 'kikenko_chemistry_physics', category: '物理基礎',
    definition: '燃焼が成立するために必要な可燃物・酸素供給源（支燃物）・点火源（熱源）の3要素。このいずれか一つを取り除くことが消火の基本原理（除去消火・窒息消火・冷却消火）に対応する。',
  },

  // ── 基礎的な物理学及び基礎的な化学 / 化学基礎（酸化還元・化学反応式・無機化学） ──
  {
    id: 'g-kbko-46', term: '酸化と還元', reading: 'さんかとかんげん',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '酸化は物質が電子を失う（酸化数が増加する）反応、還元は物質が電子を受け取る（酸化数が減少する）反応で、両者は必ず同時に起こる。燃焼は可燃物が酸化される代表的な酸化還元反応で、第1類・第6類の酸化性物質の危険性理解の基礎。',
  },
  {
    id: 'g-kbko-47', term: '化学反応式の量的関係（化学量論）', reading: 'かがくはんのうしきのりょうてきかんけい',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '化学反応式の係数比から、反応に必要な物質量・生成物の物質量を求めること。危険物が燃焼・反応する際に必要な酸素量や生成物量を考える基礎となる。',
  },
  {
    id: 'g-kbko-48', term: '金属の腐食', reading: 'きんぞくのふしょく',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '金属が酸素・水分・酸等と反応して酸化される現象。貯蔵タンクや配管の腐食は漏えい等の重大事故につながるため、材質選定・防食処理・定期点検が重要となる。',
  },
  {
    id: 'g-kbko-49', term: '中和反応', reading: 'ちゅうわはんのう',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '酸と塩基（アルカリ）が反応して塩と水を生じる反応（例: HCl + NaOH → NaCl + H2O）。第6類の酸化性液体（過酸化水素・硝酸等）や腐食性物質の漏えい時の中和処理を理解する基礎となる。',
  },
  {
    id: 'g-kbko-50', term: 'pH（水素イオン指数）', reading: 'ピーエイチ',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '水溶液の水素イオン濃度を表す指標。pH7が中性、7未満は酸性（値が小さいほど酸性が強い）、7より大きいとアルカリ性（値が大きいほどアルカリ性が強い）。第6類の硝酸等の強酸、第1類のアルカリ金属酸化物等の強アルカリ性物質の腐食性評価に関連する。',
  },
  {
    id: 'g-kbko-51', term: '触媒', reading: 'しょくばい',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '化学反応の前後で自身は変化せず（消費されず）、活性化エネルギーを下げることで反応速度を増加させる物質。第5類危険物等の分解反応が微量の不純物によって促進され、自己分解・発熱が加速する危険性の理解と関連する。',
  },
  {
    id: 'g-kbko-52', term: '化学平衡', reading: 'かがくへいこう',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '可逆反応において、正反応と逆反応の速度が等しくなり、見かけ上の組成変化が止まった状態。温度・圧力・濃度の変化により平衡は移動する（ルシャトリエの原理）。',
  },
  {
    id: 'g-kbko-53', term: 'イオン（陽イオン・陰イオン）', reading: 'イオン（ようイオン・いんイオン）',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '原子（または原子団）が電子を放出して正の電荷を帯びた陽イオン、または電子を受け取って負の電荷を帯びた陰イオン。塩素酸塩類（第1類）等の「塩」は陽イオンと陰イオンがイオン結合した物質で、その分解により酸素を放出する性質と関連する。',
  },
  {
    id: 'g-kbko-54', term: '金属元素のイオン化傾向', reading: 'きんぞくげんそのイオンかけいこう',
    subject: 'kikenko_chemistry_physics', category: '化学基礎',
    definition: '金属元素は電子を放出して陽イオンになりやすい性質を持つ。アルカリ金属（カリウム・ナトリウム等）はこの傾向が特に強く、第3類の禁水性物質として水と激しく反応し水素を発生する性質と関連する。',
  },

  // ── 基礎的な物理学及び基礎的な化学 / 物質の状態変化・溶液（有機化学を含む） ──
  {
    id: 'g-kbko-55', term: '物質の三態と状態変化', reading: 'ぶっしつのさんたいとじょうたいへんか',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '固体→液体は融解、液体→気体は蒸発（気化）、液体→固体は凝固、気体→液体は凝縮、固体⇔気体は昇華という。危険物の貯蔵状態（液体・固体）と蒸気の発生（気化）の関係を理解する基礎。',
  },
  {
    id: 'g-kbko-56', term: '飽和溶液', reading: 'ほうわようえき',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '一定温度において、溶媒に溶質がそれ以上溶けることができない最大量まで溶けている状態。第4類のアルコール類・水溶性液体の水への溶解性（水溶性・非水溶性の区分）を理解する基礎となる。',
  },
  {
    id: 'g-kbko-57', term: '蒸気圧と沸点', reading: 'じょうきあつとふってん',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '液体の蒸気圧が外圧（通常は大気圧）と等しくなったときの温度が沸点。蒸気圧は温度が上がるほど高くなる。沸点が低い物質（特殊引火物等）ほど常温で蒸気が発生しやすく、引火の危険性が高い。',
  },
  {
    id: 'g-kbko-58', term: '炭化水素', reading: 'たんかすいそ',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '炭素（C）と水素（H）のみで構成される化合物。メタン・エタン等の飽和炭化水素（アルカン）やベンゼン等の芳香族炭化水素が含まれる。ガソリンや軽油等の第4類危険物の主成分。',
  },
  {
    id: 'g-kbko-59', term: 'アルコール（ヒドロキシ基）', reading: 'アルコール（ヒドロキシき）',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '炭化水素の水素原子の一部がヒドロキシ基（-OH）に置き換わった化合物。ヒドロキシ基により水との親和性（水溶性）を持つものが多く、第4類のアルコール類（エタノール・メタノール等）の水溶性の性質と関連する。',
  },
  {
    id: 'g-kbko-60', term: 'エステル（エステル化）', reading: 'エステル（エステルか）',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: 'カルボン酸とアルコールが脱水縮合して生成する化合物（エステル化）で、特有の芳香を持つものが多い。第4類危険物の「エステル類」（酢酸エチル等）として分類される引火性液体。',
  },
  {
    id: 'g-kbko-61', term: '蒸留', reading: 'じょうりゅう',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '液体混合物を加熱し、各成分の沸点の差を利用して気化・凝縮させることで分離する方法。原油からガソリン・灯油・軽油等を分離する精製プロセス（分留）の基本原理。',
  },
  {
    id: 'g-kbko-62', term: 'コロイド', reading: 'コロイド',
    subject: 'kikenko_chemistry_physics', category: '物質の状態変化・溶液',
    definition: '物質が直径約1nm〜数百nm程度の微粒子として他の物質中に分散している状態。粉末状の金属や炭等が空気中に分散すると粉じん爆発の危険性が高まることと関連し、微細な粒子が表面積の増大により反応性・燃焼性が高まる現象の理解につながる。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第1類（酸化性固体） ──
  {
    id: 'g-kbko-63', term: '第1類危険物の共通性質', reading: 'だい1るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '塩素酸塩類・過マンガン酸塩類等。自身は不燃性だが強い酸化力を持ち、加熱・摩擦・衝撃等により分解して酸素を放出し、他の可燃物の燃焼を著しく促進する（支燃性）。可燃物との混合・接触を避けることが基本の火災予防策。',
  },
  {
    id: 'g-kbko-64', term: '塩素酸カリウム', reading: 'えんそさんカリウム',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '無色（白色）の結晶で、加熱すると分解して酸素を発生する第1類危険物。硫黄・赤リン・有機物等の可燃物と混合した状態で打撃・摩擦を受けると発火・爆発の危険性が高い。',
  },
  {
    id: 'g-kbko-65', term: '過マンガン酸カリウム', reading: 'かマンガンさんカリウム',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '黒紫色（暗紫色）の結晶で強い酸化力を持つ第1類危険物。有機物との混合や濃硫酸との接触により発火するおそれがある。水によく溶け、水溶液は強い酸化作用を示す。',
  },
  {
    id: 'g-kbko-66', term: '無機過酸化物', reading: 'むきかさんかぶつ',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '過酸化ナトリウム等。水と反応して酸素を発生するとともに多量の熱を発生し、可燃物があれば発火させる危険性がある。第1類の中でも「禁水」の注意が必要な品目として出題されやすい。',
  },
  {
    id: 'g-kbko-67', term: '硝酸塩類', reading: 'しょうさんえんるい',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '硝酸カリウム等。無色の結晶で水に溶けやすく、強い酸化力を持つ第1類危険物。可燃物（炭・硫黄等）と混合すると黒色火薬のような爆発性混合物となるため、可燃物との接触・混合を避ける必要がある。',
  },
  {
    id: 'g-kbko-68', term: '第1類危険物の保管条件', reading: 'だい1るいきけんぶつのほかんじょうけん',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '加熱・直射日光・可燃物との接触により分解・発火の危険性が高まるため、冷所で直射日光を避け、可燃物・有機物・還元剤・酸等から隔離して保管することが基本となる。',
  },
  {
    id: 'g-kbko-69', term: '重クロム酸塩類', reading: 'じゅうクロムさんえんるい',
    subject: 'kikenko_properties', category: '第1類_酸化性固体',
    definition: '重クロム酸カリウム等。強い酸化力を持つ第1類の酸化性固体で、有機物・可燃物と混合した状態で加熱・衝撃を受けると発火するおそれがある。毒性を持つため取扱いに注意を要する。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第2類（可燃性固体） ──
  {
    id: 'g-kbko-70', term: '第2類危険物の共通性質', reading: 'だい2るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '硫化リン・赤リン・硫黄・鉄粉・金属粉・マグネシウム等。比較的低温で着火しやすく燃焼速度が速い、または燃焼時に有毒ガスを発生するものがある可燃性の固体。',
  },
  {
    id: 'g-kbko-71', term: '金属粉の危険性', reading: 'きんぞくふんのきけんせい',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: 'アルミニウム粉・マグネシウム粉等。粉末状になることで表面積が増大し、空気中の酸素と反応しやすくなり、発火・粉じん爆発の危険性が高まる。一部は水と反応して水素を発生するため注水消火が不適切な場合がある。',
  },
  {
    id: 'g-kbko-72', term: '硫化リン', reading: 'りゅうかリン',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '水や酸との接触により可燃性・有毒なガス（硫化水素等）を発生するおそれがある第2類危険物。防湿に注意し、酸との接触を避ける必要がある。',
  },
  {
    id: 'g-kbko-73', term: '硫黄', reading: 'いおう',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '第2類危険物（可燃性固体）。燃焼すると有毒で刺激臭のある二酸化硫黄（亜硫酸ガス）を発生する。粉末状になると粉じん爆発の危険性もあり、静電気が蓄積しやすいため帯電防止に注意が必要。',
  },
  {
    id: 'g-kbko-74', term: '赤リンと黄リンの分類の違い', reading: 'せきリンときリンのぶんるいのちがい',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '赤リンはリンの同素体の一つで比較的安定しており第2類危険物に分類される。一方、黄リンは空気中で自然発火する性質を持つため第3類危険物（自然発火性物質及び禁水性物質）に分類される。',
  },
  {
    id: 'g-kbko-75', term: '引火性固体', reading: 'いんかせいこたい',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '固形アルコール、ゴムのりその他1気圧において引火点が40℃未満の固体。第2類危険物に分類され、可燃性蒸気を発生しやすく火気との接触により引火する危険性がある点が第4類の引火性液体と類似する。',
  },
  {
    id: 'g-kbko-76', term: '第2類危険物と酸化剤の隔離', reading: 'だい2るいきけんぶつとさんかざいのかくり',
    subject: 'kikenko_properties', category: '第2類_可燃性固体',
    definition: '第2類危険物（可燃性固体）は、酸化性物質（第1類・第6類危険物）と接触・混合すると、酸化剤の作用により燃焼が促進され危険性が増大するため、両者の隔離が重要となる。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第3類（自然発火性・禁水性） ──
  {
    id: 'g-kbko-77', term: 'カリウム・ナトリウムの保護液保存', reading: 'カリウム・ナトリウムのほごえきほぞん',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: 'カリウム・ナトリウムは空気中の水分や酸素と容易に反応する自然発火性・禁水性の物質であり、石油（流動パラフィン・灯油等）中に保存することで空気・水分との接触を防ぐ。水との接触は水素ガスの発生や発火を招くため厳禁。',
  },
  {
    id: 'g-kbko-78', term: '黄リンの水中保存', reading: 'きリンのすいちゅうほぞん',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: '黄リンは空気中で自然発火する性質があるため水中に保存する（水とは危険な反応をしないため）。カリウム・ナトリウムは「水との反応」が問題で石油中保存、黄リンは「空気との反応」が問題で水中保存という対比が出題されやすい。',
  },
  {
    id: 'g-kbko-79', term: 'アルキルアルミニウム', reading: 'アルキルアルミニウム',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: '第3類の代表例で、空気に触れると自然発火し、水と接触すると激しく反応して可燃性ガスを発生する非常に危険性の高い物質。不活性ガス（窒素等）中での取扱いが必要となる。',
  },
  {
    id: 'g-kbko-80', term: 'リチウム', reading: 'リチウム',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: 'アルカリ金属の一種で第3類危険物に分類される。水と反応して水素ガスを発生し発熱する性質を持ち、カリウム・ナトリウムと同様に保護液（石油等）中での貯蔵が必要となる。',
  },
  {
    id: 'g-kbko-81', term: 'カルシウムカーバイド（炭化カルシウム）', reading: 'カルシウムカーバイド（たんかカルシウム）',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: '水と反応してアセチレンガス（可燃性・燃焼範囲が広く危険性が高い気体）と水酸化カルシウムを生成する第3類の禁水性物質。水分との接触を避けた貯蔵が必要。',
  },
  {
    id: 'g-kbko-82', term: '第3類危険物の消火における注水の禁止', reading: 'だい3るいきけんぶつのしょうかにおけるちゅうすいのきんし',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: '禁水性物質（カリウム・ナトリウム・アルキルアルミニウム等）は水と反応して可燃性ガスを発生し火災を拡大させるため、注水による消火は厳禁。乾燥砂や膨張ひる石等による窒息消火が基本となる。',
  },
  {
    id: 'g-kbko-83', term: 'ジエチル亜鉛', reading: 'ジエチルあえん',
    subject: 'kikenko_properties', category: '第3類_自然発火性禁水性',
    definition: '有機金属化合物で第3類危険物に分類される。空気に触れると自然発火し、水と接触すると激しく反応するため、アルキルアルミニウムと同様に不活性ガス中での取扱い・密閉貯蔵が必要となる。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第5類（自己反応性物質） ──
  {
    id: 'g-kbko-84', term: '第5類危険物の共通性質（自己反応性）', reading: 'だい5るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '有機過酸化物・ニトロ化合物・アゾ化合物等。分子内に酸素を含むものが多く、加熱・摩擦・衝撃・打撃により分解し、外部からの酸素供給がなくても急激に燃焼・爆発する自己反応性の危険性を持つ。',
  },
  {
    id: 'g-kbko-85', term: 'ニトログリセリン', reading: 'ニトログリセリン',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '硝酸エステル類に属する第5類危険物で、極めて衝撃・摩擦に敏感で、わずかな刺激でも爆発する危険性が高い。ダイナマイトの原料として知られ、安定剤を加える等の取扱いが重要となる。',
  },
  {
    id: 'g-kbko-86', term: 'トリニトロトルエン（TNT）', reading: 'トリニトロトルエン',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: 'ニトロ化合物の一種で第5類危険物（自己反応性物質）に分類される。分子内に多数のニトロ基（-NO2）を持ち、加熱・衝撃により急激に分解・爆発する危険性を持つ。',
  },
  {
    id: 'g-kbko-87', term: '有機過酸化物', reading: 'ゆうきかさんかぶつ',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '過酸化ベンゾイル等。分子内に過酸化結合（-O-O-）を持ち、加熱・摩擦・衝撃・打撃により分解しやすく自己反応的に発熱・分解する危険性がある。火気・直射日光を避け、可燃物・酸化性物質との接触を避けて冷所に貯蔵する。',
  },
  {
    id: 'g-kbko-88', term: 'アゾ化合物', reading: 'アゾかごうぶつ',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '分子内に-N=N-結合（アゾ基）を持つ第5類危険物。加熱等により分解して窒素ガスを発生し、発泡剤等にも利用される。分解が急激に進むと自己反応性物質特有の発熱・爆発的反応を起こす危険性がある。',
  },
  {
    id: 'g-kbko-89', term: '第5類危険物の消火方法', reading: 'だい5るいきけんぶつのしょうかほうほう',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '第5類危険物は自身が酸素を含み自己燃焼するため、酸素の遮断による窒息消火の効果が限定的であり、大量の水による冷却消火が基本となる。燃焼の進行が速く爆発的であるため、初期消火・早期避難が重要。',
  },
  {
    id: 'g-kbko-90', term: 'ヒドロキシルアミン類', reading: 'ヒドロキシルアミンるい',
    subject: 'kikenko_properties', category: '第5類_自己反応性',
    definition: '第5類危険物の品名の一つで、加熱や酸化剤との接触等により分解しやすく、燃焼・爆発の危険性を持つ不安定な物質。第5類は品目ごとに分解のしやすさ・危険性が異なるため品目別の特性把握が重要。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第6類（酸化性液体） ──
  {
    id: 'g-kbko-91', term: '第6類危険物の共通性質', reading: 'だい6るいきけんぶつのきょうつうせいしつ',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '過酸化水素・硝酸・過塩素酸等。自身は不燃性の液体だが強い酸化力を持ち、可燃物・有機物と接触すると発火・爆発を引き起こすおそれがある。腐食性が強く、皮膚や金属を腐食させる。',
  },
  {
    id: 'g-kbko-92', term: '過酸化水素', reading: 'かさんかすいそ',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '高濃度のものは分解しやすく酸素を発生する第6類危険物。完全密閉すると内部圧力が上昇して容器が破損する危険があるため、通気性のある容器を用いる等の特別な取扱いが必要となる。',
  },
  {
    id: 'g-kbko-93', term: '硝酸', reading: 'しょうさん',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '強い酸化力と腐食性を持つ酸化性液体（第6類）で、多くの金属を腐食させる。光や熱により分解し二酸化窒素（有毒な褐色のガス）等を生成することがあるため、遮光性のある容器で冷暗所に貯蔵することが望ましい。',
  },
  {
    id: 'g-kbko-94', term: '過塩素酸', reading: 'かえんそさん',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '第6類危険物の一つで、強い酸化力と腐食性を持つ。極めて不安定な物質で、加熱・衝撃・有機物との接触により分解・爆発する危険性が高く、第6類の中でも危険性が高い品目とされる。',
  },
  {
    id: 'g-kbko-95', term: '濃硫酸の希釈方法', reading: 'のうりゅうさんのきしゃくほうほう',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '濃硫酸を水で希釈する際、酸に水を加えると局所的に激しい発熱が生じ突沸・飛散する危険があるため、必ず水に酸を少量ずつ加える（「酸は水に入れる」が原則）。',
  },
  {
    id: 'g-kbko-96', term: '第6類危険物の支燃性', reading: 'だい6るいきけんぶつのしねんせい',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '第6類危険物自身は燃焼しないが、強い酸化力により周囲の可燃物の燃焼を著しく促進する性質（支燃性）。第1類危険物と同様の「酸化性」の危険性として、可燃物との接触を避ける管理が重要となる。',
  },
  {
    id: 'g-kbko-97', term: '第6類危険物の皮膚付着時の応急処置', reading: 'だい6るいきけんぶつのひふふちゃくじのおうきゅうしょち',
    subject: 'kikenko_properties', category: '第6類_酸化性液体',
    definition: '第6類危険物（強酸・強い酸化剤）が皮膚に付着した場合は、直ちに大量の水で洗い流すことが基本的な応急処置。放置すると薬傷（化学熱傷）の重症化につながるため迅速な対応が重要。',
  },

  // ── 危険物の性質並びにその火災予防及び消火の方法 / 第4類（引火性液体）── 甲種固有の追加分
  {
    id: 'g-kbko-98', term: '特殊引火物', reading: 'とくしゅいんかぶつ',
    subject: 'kikenko_properties', category: '第4類_引火性液体',
    definition: '1気圧において発火点が100℃以下、または引火点が-20℃以下で沸点が40℃以下の物質。ジエチルエーテル・二硫化炭素・アセトアルデヒド等が該当し、指定数量は50Lと第4類の中で最も少ない（危険性が高い）。',
  },
  {
    id: 'g-kbko-99', term: '第一石油類', reading: 'だいいちせきゆるい',
    subject: 'kikenko_properties', category: '第4類_引火性液体',
    definition: '1気圧における引火点が21℃未満の液体。ガソリン・ベンゼン・トルエン・酢酸エチル等が該当する。',
  },
  {
    id: 'g-kbko-100', term: '二硫化炭素（甲種）', reading: 'にりゅうかたんそ',
    subject: 'kikenko_properties', category: '第4類_引火性液体',
    definition: '発火点が著しく低く（約90℃）、燃焼範囲が非常に広い特殊引火物。比重が水より大きいため、水中に沈めて蒸気の発生を抑える方法（水封）が用いられることがある。',
  },
  {
    id: 'g-kbko-101', term: 'タンク内の不活性ガスによるパージ', reading: 'タンクないのふかっせいガスによるパージ',
    subject: 'kikenko_properties', category: '第4類_引火性液体',
    definition: '貯蔵タンク内で危険物の蒸気と空気が混合し燃焼範囲に達すると爆発の危険性が生じる。これを防ぐため窒素等の不活性ガスでタンク内のガスを置換（不活性化・パージ）し、可燃性混合気の形成を防ぐ管理。',
  },
];
